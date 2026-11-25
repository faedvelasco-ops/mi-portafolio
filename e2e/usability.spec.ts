import { AxeBuilder } from '@axe-core/playwright'
import { devices } from '@playwright/test'
import { test, expect } from './fixtures'

const isMobileProject = (name: string) => name !== 'desktop'

test.describe('Accessibility (axe)', () => {
  for (const path of ['/qa', '/dev']) {
    test(`${path} has no serious or critical axe violations`, { tag: ['@regression'] }, async ({
      page,
      portfolio,
    }) => {
      await portfolio.goto(path)

      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
        .analyze()
      const blocking = results.violations
        .filter((violation) => violation.impact === 'serious' || violation.impact === 'critical')
        .map((violation) => `${violation.id}: ${violation.nodes.map((node) => node.target.join(' ')).join(', ')}`)

      expect(blocking).toEqual([])
    })
  }
})

test.describe('Responsive layout', () => {
  const viewports = [
    { width: 320, height: 640 },
    { width: 360, height: 740 },
    { width: 375, height: 812 },
    { width: 390, height: 844 },
    { width: 414, height: 896 },
    { width: 768, height: 1024 },
    { width: 1024, height: 768 },
    { width: 844, height: 390 }, // phone in landscape
  ]

  test('no horizontal scroll at any common width', { tag: ['@regression'] }, async ({ browser }, testInfo) => {
    test.skip(testInfo.project.name !== 'mobile', 'One Chromium mobile run covers all widths')

    for (const path of ['/qa', '/dev']) {
      for (const viewport of viewports) {
        // A real mobile profile (mobile UA, overlay scrollbars) resized to each width.
        const context = await browser.newContext({ ...devices['Pixel 7'], viewport })
        const page = await context.newPage()
        await page.goto(path)
        await expect(page.locator('.hero__role')).toBeVisible()

        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
        )
        expect(overflow, `${path} at ${viewport.width}x${viewport.height}`).toBeLessThanOrEqual(0)
        await context.close()
      }
    }
  })

  test('touch targets are at least 44x44 px on mobile', { tag: ['@regression'] }, async ({
    page,
    portfolio,
  }, testInfo) => {
    test.skip(!isMobileProject(testInfo.project.name), 'Touch target size applies to touch layouts')
    await portfolio.goto('/qa')

    const tooSmall = await page.evaluate(() => {
      const selector = 'a[href], button, input:not([type="hidden"]), select, textarea, [role="button"]'
      return [...document.querySelectorAll<HTMLElement>(selector)]
        .filter((element) => {
          // Skip elements nobody can reach: hidden, inert or removed from the tab order on purpose.
          if (element.closest('[inert], [aria-hidden="true"]') || element.tabIndex < 0) return false
          const style = getComputedStyle(element)
          const box = element.getBoundingClientRect()
          return style.visibility !== 'hidden' && box.width > 0 && box.height > 0
        })
        .filter((element) => {
          const box = element.getBoundingClientRect()
          return box.width < 44 || box.height < 44
        })
        .map((element) => {
          const box = element.getBoundingClientRect()
          const name = element.getAttribute('aria-label') ?? element.textContent?.trim() ?? ''
          return `${element.tagName.toLowerCase()} "${name.slice(0, 30)}" ${Math.round(box.width)}x${Math.round(box.height)}`
        })
    })

    expect(tooSmall).toEqual([])
  })

  test('anchor links land below the mobile top bar', { tag: ['@regression'] }, async ({
    page,
    portfolio,
  }, testInfo) => {
    test.skip(!isMobileProject(testInfo.project.name), 'The top bar only exists on mobile')
    await portfolio.goto('/qa')

    await page.getByRole('button', { name: 'Abrir menú de navegación' }).click()
    await page.getByRole('navigation', { name: 'Navegación principal' }).getByRole('link', { name: 'Experiencia' }).click()

    const barBottom = await page.locator('.mobile-bar').evaluate((bar) => bar.getBoundingClientRect().bottom)
    await expect
      .poll(() => page.locator('#experience-heading').evaluate((heading) => heading.getBoundingClientRect().top))
      .toBeGreaterThanOrEqual(barBottom)
  })
})

test.describe('Mobile menu', () => {
  test.skip(({ isMobile }) => !isMobile, 'The drawer menu only exists on mobile')

  test('is out of the tab order while closed', { tag: ['@regression'] }, async ({ page, portfolio }) => {
    await portfolio.goto('/qa')

    await expect(page.locator('#sidebar')).toHaveAttribute('inert', '')
    // The drawer sits off-screen; inert must keep its links from receiving focus.
    const firstLink = page.locator('#sidebar a').first()
    await firstLink.evaluate((link) => (link as HTMLElement).focus())
    await expect(firstLink).not.toBeFocused()
  })

  test('moves focus in, closes with Escape and returns focus', { tag: ['@smoke'] }, async ({
    page,
    portfolio,
  }) => {
    await portfolio.goto('/qa')
    const toggle = page.getByRole('button', { name: 'Abrir menú de navegación' })

    await toggle.click()

    const closeButton = page.locator('#sidebar').getByRole('button', { name: 'Cerrar menú de navegación' })
    await expect(closeButton).toBeFocused()
    await expect(page.locator('.app-content')).toHaveAttribute('inert', '')
    await expect(page.locator('body')).toHaveCSS('overflow', 'hidden')

    await page.keyboard.press('Escape')

    await expect(page.locator('#sidebar')).toHaveAttribute('inert', '')
    await expect(page.getByRole('button', { name: 'Abrir menú de navegación' })).toBeFocused()
    await expect(page.locator('.app-content')).not.toHaveAttribute('inert', '')
  })

  test('closes when tapping outside', { tag: ['@regression'] }, async ({ page, portfolio }) => {
    await portfolio.goto('/qa')
    await page.getByRole('button', { name: 'Abrir menú de navegación' }).click()

    const viewport = page.viewportSize()!
    await page.mouse.click(viewport.width - 10, viewport.height / 2)

    await expect(page.locator('#sidebar')).toHaveAttribute('inert', '')
  })
})

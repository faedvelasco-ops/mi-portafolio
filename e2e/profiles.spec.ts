import { test, expect } from './fixtures'

test.describe('Profile by URL', () => {
  test('the root URL shows the QA profile', { tag: ['@smoke'] }, async ({ page, portfolio }) => {
    await portfolio.goto('/')

    await portfolio.expectProfile('qa')
    await expect(page).toHaveURL(/\/$/)
  })

  for (const profile of ['qa', 'dev'] as const) {
    test(`/${profile} loads the ${profile} profile directly`, { tag: ['@smoke'] }, async ({ portfolio }) => {
      await portfolio.goto(`/${profile}`)

      await portfolio.expectProfile(profile)
    })
  }

  test('each profile orders its sections differently', { tag: ['@regression'] }, async ({ portfolio }) => {
    await portfolio.goto('/qa')
    const qaOrder = await portfolio.sectionOrder()
    expect(qaOrder.indexOf('automation-lab')).toBeLessThan(qaOrder.indexOf('projects'))

    await portfolio.switchTo('dev')
    await portfolio.expectProfile('dev')
    const devOrder = await portfolio.sectionOrder()
    expect(devOrder.indexOf('projects')).toBeLessThan(devOrder.indexOf('experience'))
    expect(devOrder.indexOf('projects')).toBeLessThan(devOrder.indexOf('automation-lab'))
  })
})

test.describe('Profile switch', () => {
  test('switching updates URL, title, content and accent color', { tag: ['@smoke'] }, async ({
    page,
    portfolio,
  }) => {
    await portfolio.goto('/qa')

    await portfolio.switchTo('dev')

    await expect(page).toHaveURL(/\/dev$/)
    await portfolio.expectProfile('dev')
    await expect(portfolio.switchOption('qa')).toHaveAttribute('aria-pressed', 'false')
  })

  test('browser back and forward restore the profile', { tag: ['@regression'] }, async ({
    page,
    portfolio,
  }) => {
    await portfolio.goto('/qa')
    await portfolio.switchTo('dev')
    await portfolio.expectProfile('dev')

    await page.goBack()
    await expect(page).toHaveURL(/\/qa$/)
    await portfolio.expectProfile('qa')

    await page.goForward()
    await expect(page).toHaveURL(/\/dev$/)
    await portfolio.expectProfile('dev')
  })

  test('the switch is operable with the keyboard', { tag: ['@regression'] }, async ({ portfolio }) => {
    await portfolio.goto('/qa')

    await portfolio.switchOption('dev').focus()
    await expect(portfolio.switchOption('dev')).toBeFocused()
    await portfolio.switchOption('dev').press('Enter')

    await portfolio.expectProfile('dev')
  })
})

test('the profile switch never covers the name in the hero', { tag: ['@regression'] }, async ({
  page,
  portfolio,
}) => {
  await portfolio.goto('/dev')

  const switchBox = await portfolio.profileSwitch.boundingBox()
  const nameBox = await page.getByRole('heading', { level: 1 }).boundingBox()
  expect(switchBox).not.toBeNull()
  expect(nameBox).not.toBeNull()
  const overlaps =
    switchBox!.x < nameBox!.x + nameBox!.width &&
    nameBox!.x < switchBox!.x + switchBox!.width &&
    switchBox!.y < nameBox!.y + nameBox!.height &&
    nameBox!.y < switchBox!.y + switchBox!.height
  expect(overlaps).toBe(false)
})

test.describe('First-visit notice', () => {
  test.use({ showProfileNotice: true })

  test('offers the other profile and stays dismissed after reload', { tag: ['@regression'] }, async ({
    page,
    portfolio,
  }) => {
    await portfolio.goto('/')
    await expect(portfolio.notice).toContainText('QA Engineer')

    await portfolio.notice.getByRole('button', { name: /Ver perfil Desarrollador/ }).click()

    await portfolio.expectProfile('dev')
    await expect(portfolio.notice).toBeHidden()
    await page.reload()
    await expect(portfolio.heroRole).toBeVisible()
    await expect(portfolio.notice).toBeHidden()
  })

  test('can be closed without changing profile', { tag: ['@regression'] }, async ({ portfolio }) => {
    await portfolio.goto('/qa')

    await portfolio.notice.getByRole('button', { name: 'Cerrar aviso' }).click()

    await expect(portfolio.notice).toBeHidden()
    await portfolio.expectProfile('qa')
  })
})

test.describe('Page health', () => {
  for (const path of ['/qa', '/dev']) {
    test(`${path} loads without console errors`, { tag: ['@smoke'] }, async ({ page, portfolio, consoleErrors }) => {
      await portfolio.goto(path)
      // 'load' instead of 'networkidle': third-party widgets (hCaptcha) can keep the
      // network busy and would make this test depend on an external service.
      await page.waitForLoadState('load')
      await expect(page.locator('#contact')).toBeAttached()

      expect(consoleErrors).toEqual([])
    })
  }
})

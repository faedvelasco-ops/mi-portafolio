import { test as base, expect } from '@playwright/test'
import { PortfolioPage } from './pages/PortfolioPage'

/**
 * hCaptcha (contact form) logs this on localhost only; it does not happen on the
 * deployed domain, so it is the one console error the suite tolerates.
 */
const IGNORED_CONSOLE_ERRORS = [/localhost detected/i]

type Fixtures = {
  portfolio: PortfolioPage
  /** Whether the first-visit profile notice should appear. Off by default. */
  showProfileNotice: boolean
  consoleErrors: string[]
}

export const test = base.extend<Fixtures>({
  showProfileNotice: [false, { option: true }],

  page: async ({ page, showProfileNotice }, use) => {
    if (!showProfileNotice) {
      await page.addInitScript(() => {
        window.localStorage.setItem('portfolio.profileNotice.dismissed', 'true')
      })
    }
    await use(page)
  },

  consoleErrors: async ({ page }, use) => {
    const errors: string[] = []
    page.on('console', (message) => {
      if (message.type() !== 'error') return
      const text = message.text()
      if (!IGNORED_CONSOLE_ERRORS.some((pattern) => pattern.test(text))) errors.push(text)
    })
    page.on('pageerror', (error) => errors.push(error.message))
    await use(errors)
  },

  portfolio: async ({ page }, use) => {
    await use(new PortfolioPage(page))
  },
})

export { expect }

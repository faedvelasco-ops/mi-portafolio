import { expect, type Locator, type Page } from '@playwright/test'

export type Profile = 'qa' | 'dev'

export const expectedProfile = {
  qa: {
    title: 'Faed Velasco — QA Engineer · Playwright & API Testing',
    heroRole: 'QA Engineer · Playwright & API Testing',
    switchLabel: 'QA',
    // Computed value of --color-accent on light backgrounds.
    accent: 'rgb(15, 118, 110)',
  },
  dev: {
    title: 'Faed Velasco — Desarrollador de Software · React & TypeScript',
    heroRole: 'Desarrollador de Software · React & TypeScript',
    switchLabel: 'Dev',
    accent: 'rgb(109, 40, 217)',
  },
} as const

export class PortfolioPage {
  readonly profileSwitch: Locator
  readonly heroRole: Locator
  readonly notice: Locator

  constructor(private readonly page: Page) {
    // Only one switch is visible per viewport (sidebar on desktop, floating on mobile);
    // role queries ignore the hidden one.
    this.profileSwitch = page.getByRole('group', { name: 'Perfil profesional' })
    this.heroRole = page.locator('.hero__role')
    this.notice = page.getByRole('complementary', { name: 'Aviso de perfil' })
  }

  async goto(path = '/') {
    await this.page.goto(path)
    await expect(this.heroRole).toBeVisible()
  }

  switchOption(profile: Profile): Locator {
    return this.profileSwitch.getByRole('button', { name: expectedProfile[profile].switchLabel, exact: true })
  }

  async switchTo(profile: Profile) {
    await this.switchOption(profile).click()
  }

  async accentColor(): Promise<string> {
    return this.page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue('--color-accent').trim(),
    )
  }

  /** Asserts every visible signal of the active profile at once. */
  async expectProfile(profile: Profile) {
    const expected = expectedProfile[profile]
    await expect(this.page.locator('html')).toHaveAttribute('data-profile', profile)
    await expect(this.page).toHaveTitle(expected.title)
    await expect(this.heroRole).toHaveText(expected.heroRole)
    await expect(this.switchOption(profile)).toHaveAttribute('aria-pressed', 'true')
    await expect.poll(() => this.accentColor()).toBe(expected.accent)
  }

  /** Index of each home section in DOM order, to compare their relative position. */
  async sectionOrder(): Promise<string[]> {
    return this.page.locator('main.home > section').evaluateAll((sections) => sections.map((s) => s.id))
  }
}

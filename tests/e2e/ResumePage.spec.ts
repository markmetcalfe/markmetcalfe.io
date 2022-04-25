import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/resume')
})

test.describe('ResumePage', () => {
  test('matches snapshot', async ({ page }) => {
    await page.waitForTimeout(1000)
    expect(await page.screenshot()).toMatchSnapshot()
  })

  test('can navigate back home', async ({ page }) => {
    const link = await page.locator('[aria-label="Back"]')

    await Promise.all([page.waitForNavigation(), link.click()])

    await expect(page.locator('body')).toContainText('Mark Metcalfe')
    await expect(page.locator('body')).toContainText('Kia ora, I’m Mark')
  })
})

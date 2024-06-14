import { test, expect } from '@chromatic-com/playwright'

test.describe('NetworkStatusPage', () => {
  test('can load page', async ({ page }) => {
    await page.goto('/status')
    await expect(page.locator('text="Connection Status"')).toBeVisible()
    await page.waitForTimeout(1000)
  })

  test('can navigate back home', async ({ page }) => {
    await page.goto('/status')
    const link = page.locator('[aria-label="Back"]')

    await Promise.all([page.waitForURL('/'), link.click()])
    await page.waitForTimeout(1000)
    await expect(page.locator('body')).toContainText('Mark Metcalfe')
  })

  test('can see unsuccesful network status', async ({ page }) => {
    await page.route(
      'http://192.168.1.100/15350ad27ddde2548299e9fe8895d54d585a5e779db269d051e38739e21bd81d',
      async route => {
        await route.abort('timedout')
      },
    )
    await page.goto('/status')
    await page.waitForTimeout(3000)
    await expect(page.locator('.networkstatus')).toContainText(
      'Not Connected To Local Network',
    )
  })

  test('can see succesful network status', async ({ page }) => {
    await page.route(
      'http://192.168.1.100/15350ad27ddde2548299e9fe8895d54d585a5e779db269d051e38739e21bd81d',
      async route => {
        await route.fulfill({
          status: 200,
          body: 'Connected',
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'text/plain',
          },
        })
      },
    )
    await page.goto('/status')
    await page.waitForTimeout(3000)
    await expect(page.locator('.networkstatus')).toContainText(
      'Connected To Local Network',
    )
    await expect(page.locator('.networkstatus')).not.toContainText(
      'Not Connected To Local Network',
    )
  })
})

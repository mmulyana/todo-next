import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
})

test('input todo', async ({ page }) => {
  const input = await page.getByTestId('input')
  await input.waitFor({ state: 'visible' })
  await input.fill('todo baru')
  await page.getByRole('button', { name: 'Save' }).click()
})

const { test, expect, beforeEach, describe } = require('@playwright/test')
const { createBlog, loginWith } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:5173/api/testing/reset')
    
    await request.post('http://localhost:5173/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const locator = page.getByText('log in to application')
    await expect(locator).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')

      await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
      await expect(page.getByRole('button', {name: 'logout'})).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'wrong')

      await expect(page.getByText('Matti Luukkainen logged in')).not.toBeVisible()
      await expect(page.getByRole('button', {name: 'logout'})).not.toBeVisible()
      await expect(page.getByText('wrong username or password')).toBeVisible()
    })

    describe('When logged in', () => {
      beforeEach(async ({ page }) => {
        await loginWith(page, 'mluukkai', 'salainen')
      })
    
      test('a new blog can be created', async ({ page }) => {
        await createBlog(page, 'blogi', 'authori', 'osoite')

        await expect(page.getByRole('button', {name: 'view'})).toBeVisible()
        await expect(page.getByRole('button', {name: 'hide'})).not.toBeVisible()
        await expect(page.getByText('blogi - authori', { exact: true })).toBeVisible()
      })

      describe('existing blog', () => {
        beforeEach(async ({ page }) => {
          await createBlog(page, 'blogi', 'authori', 'osoite')
          await page.getByRole('button', { name: 'view' }).click()
        })
        test('can be viewed', async ({ page }) => {

          await expect(page.getByRole('button', {name: 'hide'})).toBeVisible()
          await expect(page.getByText('osoite')).toBeVisible()
        })

        test('and liked', async ({ page }) => {
          //await page.getByRole('button', { name: 'view' }).click()
          await page.getByRole('button', { name: 'like' }).click()
          
          await expect(page.getByText('likes 1like')).toBeVisible()
        })
        
        test('can be removed by its owner', async ({ page }) => {
          page.on('dialog', dialog => dialog.accept())
          await page.getByRole('button', {name: 'remove'}).click()

          await expect(page.getByText('oops. No blogs yet....')).toBeVisible()
        })

        test('remove-button is not visible for non-owner', async ({ page, request }) => {
          await page.getByRole('button', {name: 'logout'}).click()

          await request.post('http://localhost:5173/api/users', {
            data: {
              name: 'wrong user',
              username: 'wrong',
              password: 'salainen'
            }
          })

          await loginWith(page, 'wrong', 'salainen')
          await page.getByRole('button', {name: 'view'}).click()
          await expect(page.getByRole('button', {name: 'remove'})).not.toBeVisible()
        })

        test('blogs are in order by likes', async ({ page, request }) => {
          await createBlog(page, 'other blogi', 'tekija', 'osoite')
          await page.getByRole('button', { name: 'view' }).click()
          await page.getByRole('button', { name: 'like' }).nth(1).click()

          await expect(page.getByRole('button', { name: 'hide' }).first().locator('..')).toHaveText('other blogi - tekijahide')
          //otherBlog.click
          //await expect(page.getByText('other blogi - tekijaview')).toBeVisible()
        })
      })

    })
  })
  
})
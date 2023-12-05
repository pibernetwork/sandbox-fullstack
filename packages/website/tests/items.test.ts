import { expect, test } from '@playwright/test';

test('List items', async ({ page }) => {
  // Mock the api call before navigating
  await page.route('**/graphql', async (route) => {
    const json = {
      data: {
        itemsConnection: {
          nodes: [
            {
              _id: '656749d05e217410b0512d88',
              name: 'Mauricio Piber Fão - WORKING2',
            },
            {
              _id: '6567506ffff9aa880aee2bad',
              name: 'Mauricio Piber Fão',
            },
            {
              _id: '6567518afff9aa880aee2bb0',
              name: 'Mauricio Piber Fão',
            },
            {
              _id: '6567518efff9aa880aee2bb1',
              name: 'Mauricio Piber Fão',
            },
            {
              _id: '656741d65e217410b0512d85',
              name: 'Mauricio Piber',
            },
            {
              _id: '656742715e217410b0512d86',
              name: 'Mauricio Piber',
            },
            {
              _id: '65674b855e217410b0512d8e',
              name: 'Mauricio Piber',
            },
            {
              _id: '65674b945e217410b0512d8f',
              name: 'Mauricio Piber',
            },
            {
              _id: '6567985024f1260ad54d7f22',
              name: 'Mauricio Piber',
            },
            {
              _id: '6564f2642b6801822c416f90',
              name: 'Item Name',
            },
            {
              _id: '6564f26d2b6801822c416f91',
              name: 'Item Name',
            },
            {
              _id: '6564aedcef22c06dc0f0d188',
              name: 'Edited!',
            },
            {
              _id: '656781dbcd94caa46bbd87c8',
              name: 'Edited!',
            },
            {
              _id: '65674a3a5e217410b0512d8c',
              name: 'Daily 2 2222',
            },
            {
              _id: '65674a2d5e217410b0512d8b',
              name: 'Daily',
            },
          ],
          pageInfo: {
            totalNodes: 15,
            totalPages: 1,
          },
        },
      },
    };
    await route.fulfill({ json });
  });

  await page.goto('/items');
  await expect(page.getByRole('heading', { name: 'Items' })).toBeVisible();

  await expect(page.getByRole('listitem')).toHaveCount(15);
});

test('Add item', async ({ page }) => {
  await page.route('**/graphql', async (route) => {
    const post = route.request().postData();
    if (!post) {
      throw new Error('Missing post data');
    }
    const postData = JSON.parse(post) as { operationName: string };

    switch (postData.operationName) {
      case 'GetItems': {
        const json = {
          data: {
            itemsConnection: {
              nodes: [
                {
                  _id: '656749d05e217410b0512d88',
                  name: 'Mauricio Piber Fão - WORKING2',
                },
              ],
              pageInfo: {
                totalNodes: 1,
                totalPages: 1,
              },
            },
          },
        };
        await route.fulfill({ json });
        break;
      }
    }
  });

  await page.route('**/items/add', async (route) => {
    const json = {
      data: '[{"fetching":1,"variables":2,"data":4,"errors":9,"partial":1,"stale":1,"source":10},false,{"name":3},"Mauricio Piber",{"addItem":5},{"node":6,"errors":8},{"_id":7,"name":3},"656f40504494389b05d4f727",[],null,"network"]',
      status: 200,
      type: 'success',
    };
    route.fulfill({ json });
  });

  await page.goto('/items');

  await page.click('a:has-text("Add")');

  await expect(page.getByRole('heading', { name: 'Add item' })).toBeVisible();

  await page.getByLabel('Name').fill('Mauricio Piber');

  await page.locator('button:text("Create")').click();

  await expect(page.getByText('Item added to server')).toBeVisible();
});

test('Edit item', async ({ page }) => {
  // Get the response and add to it
  await page.route('**/graphql', async (route) => {
    const post = route.request().postData();
    if (!post) {
      throw new Error('Missing post data');
    }
    const postData = JSON.parse(post) as { operationName: string };

    switch (postData.operationName) {
      case 'GetItems': {
        const json = {
          data: {
            itemsConnection: {
              nodes: [
                {
                  _id: '656749d05e217410b0512d88',
                  name: 'Mauricio Piber Fão - WORKING2',
                },
              ],
              pageInfo: {
                totalNodes: 1,
                totalPages: 1,
              },
            },
          },
        };
        await route.fulfill({ json });
        break;
      }
      case 'GetItemView': {
        const json = {
          data: {
            item: {
              _id: '656749d05e217410b0512d88',
              name: 'Mauricio Piber Fão - WORKING2',
            },
          },
        };
        await route.fulfill({ json });
        break;
      }
    }
  });
  await page.goto('/items');

  await page.click('a:has-text("Edit")');

  await expect(page.getByRole('heading', { name: 'Edit item' })).toBeVisible();
});

test('View item', async ({ page }) => {
  // Get the response and add to it
  await page.route('**/graphql', async (route) => {
    const post = route.request().postData();
    if (!post) {
      throw new Error('Missing post data');
    }
    const postData = JSON.parse(post) as { operationName: string };

    switch (postData.operationName) {
      case 'GetItems': {
        const json = {
          data: {
            itemsConnection: {
              nodes: [
                {
                  _id: '656749d05e217410b0512d88',
                  name: 'Mauricio Piber Fão - WORKING2',
                },
              ],
              pageInfo: {
                totalNodes: 1,
                totalPages: 1,
              },
            },
          },
        };
        await route.fulfill({ json });
        break;
      }
      case 'GetItemTwo': {
        const json = {
          data: {
            item: {
              _id: '656749d05e217410b0512d88',
              name: 'Mauricio Piber Fão - WORKING2',
            },
          },
        };
        await route.fulfill({ json });
        break;
      }
    }
  });
  await page.goto('/items');

  await page.click('a:has-text("View")');

  await expect(page.getByRole('heading', { name: 'View item' })).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'Item loaded' }),
  ).toBeVisible();

  await expect(page.getByText('Mauricio Piber Fão - WORKING2')).toBeVisible();
});

test('Del item', async ({ page }) => {
  await page.goto('/items');

  await page.click('a:has-text("Del")');

  await expect(page.getByRole('heading', { name: 'Del item' })).toBeVisible();
});

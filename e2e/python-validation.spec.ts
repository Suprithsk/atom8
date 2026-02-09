import { test, type Page, type Locator } from '@playwright/test';

/**
 * Helper: open the Add Test Case modal from the page,
 * fill all fields, and save.
 */
async function addTestCase(
  page: Page,
  opts: {
    name: string;
    description: string;
    endpoint: string;
    httpMethod: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    statusCode: string;
    marks: string;
    tableName?: string;
    exampleInput?: object;
    exampleOutput?: object;
    dependsOn?: string[];
  }
) {
  // Click the page's "Add Test Case" button (inside main, not modal)
  await page.locator('main').getByRole('button', { name: 'Add Test Case' }).click();

  // Wait for modal to appear
  const modal = page.locator('div.fixed.inset-0');
  await modal.waitFor({ state: 'visible' });
  await page.waitForTimeout(400);

  // Name
  await modal.getByPlaceholder('e.g. Check for successful product creation').fill(opts.name);

  // Description
  await modal.getByPlaceholder('e.g. Verify POST /api/products creates product and stores in PostgreSQL').fill(opts.description);

  // Endpoint
  await modal.getByPlaceholder('e.g. /api/products/{id}').fill(opts.endpoint);

  // HTTP Method — use the first <select> in modal (no for/id binding, so getByLabel won't work)
  await modal.locator('select').first().selectOption(opts.httpMethod);

  // Expected Status Code
  await modal.getByPlaceholder('e.g. 200, 201').fill(opts.statusCode);

  // Marks
  await modal.getByPlaceholder('e.g. 10').fill(opts.marks);

  // Table Name (optional)
  if (opts.tableName) {
    await modal.getByPlaceholder('e.g. products, customers, billing').fill(opts.tableName);
  }

  // Example Input JSON (optional)
  if (opts.exampleInput) {
    await modal.getByPlaceholder('{"name": "Laptop", "price": 999, "quantity": 50}').fill(
      JSON.stringify(opts.exampleInput, null, 2)
    );
  }

  // Example Output JSON (optional)
  if (opts.exampleOutput) {
    await modal.getByPlaceholder('{"id": 1, "name": "Laptop", "price": 999}').fill(
      JSON.stringify(opts.exampleOutput, null, 2)
    );
  }

  // Dependencies (optional)
  if (opts.dependsOn && opts.dependsOn.length > 0) {
    for (let i = 0; i < opts.dependsOn.length; i++) {
      await modal.locator('button:has-text("Add dependency")').click();
      await page.waitForTimeout(300);
      // Each new dependency select is added after the HTTP Method select
      // nth(0) = HTTP Method, nth(1) = first dep, nth(2) = second dep, etc.
      const depSelect = modal.locator('select').nth(1 + i);
      await depSelect.selectOption({ label: opts.dependsOn[i] });
    }
  }

  // Save — click the modal footer's "Add Test Case" button
  await modal.getByRole('button', { name: 'Add Test Case' }).click();
  await page.waitForTimeout(500);
}

test('Demo: Fill Python Validation — Go Lang Inventory System', async ({ page }) => {
  await page.goto('/python-based-validations');
  await page.waitForLoadState('networkidle');

  // --- Fill Project Information ---
  await page.getByPlaceholder('e.g. GOLANG_API, FLASK_API, DJANGO_API').fill('GOLANG_API');
  await page.getByPlaceholder('e.g. inventory-billing-system').fill('inventory-billing-system');
  await page.getByPlaceholder('e.g. Generate Python validation code following ValidateGoLangTemplate.py pattern with PostgreSQL validation').fill(
    'Generate Python validation code following ValidateGoLangTemplate.py pattern with PostgreSQL validation'
  );

  // ============================================================
  // Test Case 1: Create Product (POST /api/products → 201)
  // ============================================================
  await addTestCase(page, {
    name: 'Check for successful product creation',
    description: 'Verify POST /api/products creates product and stores in PostgreSQL',
    endpoint: '/api/products',
    httpMethod: 'POST',
    statusCode: '201',
    marks: '10',
    tableName: 'products',
    exampleInput: { name: "Laptop", price: 999, quantity: 50 },
    exampleOutput: { id: 1, name: "Laptop", price: 999, quantity: 50 },
  });

  // ============================================================
  // Test Case 2: Get Product by ID (GET /api/products/{id} → 200)
  // ============================================================
  await addTestCase(page, {
    name: 'Check for successful product retrieval by id',
    description: 'Verify GET /api/products/{id} returns correct product',
    endpoint: '/api/products/{id}',
    httpMethod: 'GET',
    statusCode: '200',
    marks: '10',
    tableName: 'products',
  });

  // ============================================================
  // Test Case 3: Update Product (PUT /api/products/{id} → 200)
  // ============================================================
  await addTestCase(page, {
    name: 'Check for updating a product',
    description: 'Verify PUT /api/products/{id} updates product in database',
    endpoint: '/api/products/{id}',
    httpMethod: 'PUT',
    statusCode: '200',
    marks: '10',
    tableName: 'products',
    exampleInput: { name: "Updated Laptop", price: 1099, quantity: 45 },
  });

  // ============================================================
  // Test Case 4: Delete Product (DELETE /api/products/{id} → 200)
  // ============================================================
  await addTestCase(page, {
    name: 'Check for deleting a product',
    description: 'Verify DELETE /api/products/{id} removes product from database',
    endpoint: '/api/products/{id}',
    httpMethod: 'DELETE',
    statusCode: '200',
    marks: '10',
    tableName: 'products',
  });

  // ============================================================
  // Test Case 5: Create Customer (POST /api/customers → 201)
  // ============================================================
  await addTestCase(page, {
    name: 'Check for successful customer creation',
    description: 'Verify POST /api/customers creates customer',
    endpoint: '/api/customers',
    httpMethod: 'POST',
    statusCode: '201',
    marks: '10',
    tableName: 'customers',
    exampleInput: { name: "John Doe", email: "john@example.com" },
    exampleOutput: { id: 1, name: "John Doe", email: "john@example.com" },
  });

  // ============================================================
  // Test Case 6: Get All Customers (GET /api/customers → 200)
  // ============================================================
  await addTestCase(page, {
    name: 'Check for retrieving all customers',
    description: 'Verify GET /api/customers returns all customers',
    endpoint: '/api/customers',
    httpMethod: 'GET',
    statusCode: '200',
    marks: '10',
    tableName: 'customers',
  });

  // ============================================================
  // Test Case 7: Create Billing (POST /api/billing → 201)
  //   dependsOn: product creation + customer creation
  // ============================================================
  await addTestCase(page, {
    name: 'Check for successful billing creation',
    description: 'Verify POST /api/billing creates billing record (depends on product and customer)',
    endpoint: '/api/billing',
    httpMethod: 'POST',
    statusCode: '201',
    marks: '10',
    tableName: 'billing',
    exampleInput: { cust_id: 1, prod_id: 1, quantity: 2 },
    dependsOn: ['Check for successful product creation', 'Check for successful customer creation'],
  });

  // ============================================================
  // Test Case 8: Update Billing Quantity (POST /api/billing → 200)
  //   dependsOn: billing creation
  // ============================================================
  await addTestCase(page, {
    name: 'Check for updating quantity if product is already bought',
    description: 'Verify quantity updates when same product is bought again',
    endpoint: '/api/billing',
    httpMethod: 'POST',
    statusCode: '200',
    marks: '10',
    tableName: 'billing',
    dependsOn: ['Check for successful billing creation'],
  });

  // ============================================================
  // Test Case 9: Get Billings by Customer (GET /api/billing/{custId} → 200)
  //   dependsOn: billing creation
  // ============================================================
  await addTestCase(page, {
    name: 'Check for retrieving all billings by customer id',
    description: 'Verify GET /api/billing/{custId} returns customer billings',
    endpoint: '/api/billing/{custId}',
    httpMethod: 'GET',
    statusCode: '200',
    marks: '20',
    tableName: 'billing',
    dependsOn: ['Check for successful billing creation'],
  });

  // Scroll to submit
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1000);

  console.log('✅ Python Validation form filled successfully! Click Submit when ready.');

  // Keep browser open — click Resume in the Playwright Inspector when done
  await page.pause();
});

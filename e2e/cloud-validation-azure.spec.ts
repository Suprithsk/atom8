import { test } from '@playwright/test';

test('Demo: Fill Cloud Validation — Azure Complete (App Gateway + LB)', async ({ page }) => {
  await page.goto('/cloud-validation');
  await page.waitForLoadState('networkidle');

  // --- Fill Project Information ---
  // Switch provider to Azure
  await page.getByLabel('Cloud Provider').selectOption('AZURE');
  await page.waitForTimeout(300);

  await page.getByPlaceholder('e.g. orders-serverless-app').fill('bluesky-azure-app');

  // ============================================================
  // Test Case 1: Check Application Gateway Name — APPLICATION_GATEWAY (8 marks)
  // ============================================================
  await page.getByRole('button', { name: 'Add Test Case' }).click();
  await page.waitForTimeout(400);

  await page.getByPlaceholder('e.g. Check Lambda Post Role Policies').fill('Check Application Gateway Name');
  await page.getByPlaceholder('e.g. Verify that the lambda-post-role').fill(
    'Verify that bluesky-appgw Application Gateway exists'
  );
  await page.getByPlaceholder('e.g. IAM_ROLE').fill('APPLICATION_GATEWAY');
  await page.getByPlaceholder('e.g. 10').fill('8');

  await page.getByRole('button', { name: 'Add Test Case' }).last().click();
  await page.waitForTimeout(500);

  // ============================================================
  // Test Case 2: Check Application Gateway Size — APPLICATION_GATEWAY (6 marks)
  // ============================================================
  await page.getByRole('button', { name: 'Add Test Case' }).click();
  await page.waitForTimeout(400);

  await page.getByPlaceholder('e.g. Check Lambda Post Role Policies').fill('Check Application Gateway Size');
  await page.getByPlaceholder('e.g. Verify that the lambda-post-role').fill(
    'Verify that Application Gateway has Standard_v2 SKU'
  );
  await page.getByPlaceholder('e.g. IAM_ROLE').fill('APPLICATION_GATEWAY');
  await page.getByPlaceholder('e.g. 10').fill('6');

  await page.getByRole('button', { name: 'Add Test Case' }).last().click();
  await page.waitForTimeout(500);

  // ============================================================
  // Test Case 3: Check Backend Pools — APPLICATION_GATEWAY (10 marks)
  // ============================================================
  await page.getByRole('button', { name: 'Add Test Case' }).click();
  await page.waitForTimeout(400);

  await page.getByPlaceholder('e.g. Check Lambda Post Role Policies').fill('Check Backend Pools');
  await page.getByPlaceholder('e.g. Verify that the lambda-post-role').fill(
    'Verify backend pools bluesky-appgwbe, bluesky-imagebe exist'
  );
  await page.getByPlaceholder('e.g. IAM_ROLE').fill('APPLICATION_GATEWAY');
  await page.getByPlaceholder('e.g. 10').fill('10');

  await page.getByRole('button', { name: 'Add Test Case' }).last().click();
  await page.waitForTimeout(500);

  // ============================================================
  // Test Case 4: Check Load Balancer Name — LOAD_BALANCER (8 marks)
  // ============================================================
  await page.getByRole('button', { name: 'Add Test Case' }).click();
  await page.waitForTimeout(400);

  await page.getByPlaceholder('e.g. Check Lambda Post Role Policies').fill('Check Load Balancer Name');
  await page.getByPlaceholder('e.g. Verify that the lambda-post-role').fill(
    'Verify that bluesky-lb Load Balancer exists'
  );
  await page.getByPlaceholder('e.g. IAM_ROLE').fill('LOAD_BALANCER');
  await page.getByPlaceholder('e.g. 10').fill('8');

  await page.getByRole('button', { name: 'Add Test Case' }).last().click();
  await page.waitForTimeout(500);

  // ============================================================
  // Test Case 5: Check Load Balancer Backend Pool — LOAD_BALANCER (8 marks)
  // ============================================================
  await page.getByRole('button', { name: 'Add Test Case' }).click();
  await page.waitForTimeout(400);

  await page.getByPlaceholder('e.g. Check Lambda Post Role Policies').fill('Check Load Balancer Backend Pool');
  await page.getByPlaceholder('e.g. Verify that the lambda-post-role').fill(
    'Verify backend pool bluesky-be exists'
  );
  await page.getByPlaceholder('e.g. IAM_ROLE').fill('LOAD_BALANCER');
  await page.getByPlaceholder('e.g. 10').fill('8');

  await page.getByRole('button', { name: 'Add Test Case' }).last().click();
  await page.waitForTimeout(500);

  // ============================================================
  // Test Case 6: Check Health Probe — LOAD_BALANCER (6 marks)
  // ============================================================
  await page.getByRole('button', { name: 'Add Test Case' }).click();
  await page.waitForTimeout(400);

  await page.getByPlaceholder('e.g. Check Lambda Post Role Policies').fill('Check Health Probe');
  await page.getByPlaceholder('e.g. Verify that the lambda-post-role').fill(
    'Verify health probe bluesky-hp is configured'
  );
  await page.getByPlaceholder('e.g. IAM_ROLE').fill('LOAD_BALANCER');
  await page.getByPlaceholder('e.g. 10').fill('6');

  await page.getByRole('button', { name: 'Add Test Case' }).last().click();
  await page.waitForTimeout(500);

  // Scroll to submit
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1000);

  console.log('✅ Cloud Validation (Azure App Gateway + LB) — 6 test cases filled! Click Submit when ready.');

  // Keep browser open — click Resume in the Playwright Inspector when done
  await page.pause();
});

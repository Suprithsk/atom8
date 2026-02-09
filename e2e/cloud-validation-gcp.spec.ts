import { test } from '@playwright/test';

test('Demo: Fill Cloud Validation — GCP Complete (Cloud Run + Compute)', async ({ page }) => {
  await page.goto('/cloud-validation');
  await page.waitForLoadState('networkidle');

  // --- Fill Project Information ---
  // Switch provider to GCP
  await page.getByLabel('Cloud Provider').selectOption('GCP');
  await page.waitForTimeout(300);

  await page.getByPlaceholder('e.g. orders-serverless-app').fill('flask-app-deployment');

  // ============================================================
  // Test Case 1: Check Cloud Run Service Name — CLOUD_RUN (10 marks)
  // ============================================================
  await page.getByRole('button', { name: 'Add Test Case' }).click();
  await page.waitForTimeout(400);

  await page.getByPlaceholder('e.g. Check Lambda Post Role Policies').fill('Check Cloud Run Service Name');
  await page.getByPlaceholder('e.g. Verify that the lambda-post-role').fill(
    'Verify flask-app Cloud Run service exists'
  );
  await page.getByPlaceholder('e.g. IAM_ROLE').fill('CLOUD_RUN');
  await page.getByPlaceholder('e.g. 10').fill('10');

  await page.getByRole('button', { name: 'Add Test Case' }).last().click();
  await page.waitForTimeout(500);

  // ============================================================
  // Test Case 2: Check Cloud Run Region — CLOUD_RUN (5 marks)
  // ============================================================
  await page.getByRole('button', { name: 'Add Test Case' }).click();
  await page.waitForTimeout(400);

  await page.getByPlaceholder('e.g. Check Lambda Post Role Policies').fill('Check Cloud Run Region');
  await page.getByPlaceholder('e.g. Verify that the lambda-post-role').fill(
    'Verify Cloud Run is in us-central1'
  );
  await page.getByPlaceholder('e.g. IAM_ROLE').fill('CLOUD_RUN');
  await page.getByPlaceholder('e.g. 10').fill('5');

  await page.getByRole('button', { name: 'Add Test Case' }).last().click();
  await page.waitForTimeout(500);

  // ============================================================
  // Test Case 3: Check Artifact Registry — ARTIFACT_REGISTRY (5 marks)
  // ============================================================
  await page.getByRole('button', { name: 'Add Test Case' }).click();
  await page.waitForTimeout(400);

  await page.getByPlaceholder('e.g. Check Lambda Post Role Policies').fill('Check Artifact Registry');
  await page.getByPlaceholder('e.g. Verify that the lambda-post-role').fill(
    'Verify my-repo repository exists'
  );
  await page.getByPlaceholder('e.g. IAM_ROLE').fill('ARTIFACT_REGISTRY');
  await page.getByPlaceholder('e.g. 10').fill('5');

  await page.getByRole('button', { name: 'Add Test Case' }).last().click();
  await page.waitForTimeout(500);

  // ============================================================
  // Test Case 4: Check VPC Network — VPC (10 marks)
  // ============================================================
  await page.getByRole('button', { name: 'Add Test Case' }).click();
  await page.waitForTimeout(400);

  await page.getByPlaceholder('e.g. Check Lambda Post Role Policies').fill('Check VPC Network');
  await page.getByPlaceholder('e.g. Verify that the lambda-post-role').fill(
    'Verify simple-vpc exists'
  );
  await page.getByPlaceholder('e.g. IAM_ROLE').fill('VPC');
  await page.getByPlaceholder('e.g. 10').fill('10');

  await page.getByRole('button', { name: 'Add Test Case' }).last().click();
  await page.waitForTimeout(500);

  // ============================================================
  // Test Case 5: Check VM Instance — COMPUTE_ENGINE (10 marks)
  // ============================================================
  await page.getByRole('button', { name: 'Add Test Case' }).click();
  await page.waitForTimeout(400);

  await page.getByPlaceholder('e.g. Check Lambda Post Role Policies').fill('Check VM Instance');
  await page.getByPlaceholder('e.g. Verify that the lambda-post-role').fill(
    'Verify simple-vm exists'
  );
  await page.getByPlaceholder('e.g. IAM_ROLE').fill('COMPUTE_ENGINE');
  await page.getByPlaceholder('e.g. 10').fill('10');

  await page.getByRole('button', { name: 'Add Test Case' }).last().click();
  await page.waitForTimeout(500);

  // Scroll to submit
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1000);

  console.log('✅ Cloud Validation (GCP Cloud Run + Compute) — 5 test cases filled! Click Submit when ready.');

  // Keep browser open — click Resume in the Playwright Inspector when done
  await page.pause();
});

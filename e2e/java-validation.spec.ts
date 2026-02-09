import { test } from '@playwright/test';

test('Demo: Fill Java Validation — Basic CRUD API', async ({ page }) => {
  await page.goto('/java-validation');
  await page.waitForLoadState('networkidle');

  // --- Fill Project Information ---
  await page.getByPlaceholder('e.g. course-enrollment-system').fill('course-enrollment-system');
  await page.getByPlaceholder('e.g. courseenrol').fill('courseenrol');

  // ============================================================
  // Test Case 1: Add a valid course (POST /api/courses → 201)
  // ============================================================
  await page.getByRole('button', { name: 'Add Test Case' }).click();
  await page.waitForTimeout(400);

  await page.getByPlaceholder('e.g. Validate Course Entity Annotations').fill('Add a valid course');
  await page.getByPlaceholder('e.g. Verify @Entity annotation').fill('Should create a new course with 201 status');

  // Change validation type to API
  await page.getByLabel('Validation Type').selectOption('API');
  await page.waitForTimeout(300);

  await page.getByPlaceholder('e.g. /api/courses').fill('/api/courses');
  await page.getByLabel('HTTP Method').selectOption('POST');
  await page.getByPlaceholder('e.g. 200, 201').fill('201');

  // Request Body
  await page.getByPlaceholder('"name": "Java Programming"').first().fill(JSON.stringify({
    name: "Java Programming",
    instructor: "John Doe",
    startDate: "2024-01-15",
    endDate: "2024-04-15"
  }, null, 2));

  // Expected Response
  await page.getByPlaceholder('"name": "Java Programming"').last().fill(JSON.stringify({
    name: "Java Programming",
    instructor: "John Doe"
  }, null, 2));

  await page.getByPlaceholder('e.g. id, name, instructor').fill('id, name, instructor');
  await page.getByPlaceholder('e.g. 10').last().fill('10');

  // Save test case
  await page.getByRole('button', { name: 'Add Test Case' }).last().click();
  await page.waitForTimeout(500);

  // ============================================================
  // Test Case 2: Get all courses (GET /api/courses → 200)
  // ============================================================
  await page.getByRole('button', { name: 'Add Test Case' }).click();
  await page.waitForTimeout(400);

  await page.getByPlaceholder('e.g. Validate Course Entity Annotations').fill('Get all courses');
  await page.getByPlaceholder('e.g. Verify @Entity annotation').fill('Should return all courses with 200 status');
  await page.getByLabel('Validation Type').selectOption('API');
  await page.waitForTimeout(300);

  await page.getByPlaceholder('e.g. /api/courses').fill('/api/courses');
  await page.getByLabel('HTTP Method').selectOption('GET');
  await page.getByPlaceholder('e.g. 200, 201').fill('200');
  await page.locator('label:has-text("Validate array") input[type="checkbox"]').check();
  await page.getByPlaceholder('e.g. 10').last().fill('8');

  await page.getByRole('button', { name: 'Add Test Case' }).last().click();
  await page.waitForTimeout(500);

  // ============================================================
  // Test Case 3: Get course by ID (GET /api/courses/{id} → 200)
  // ============================================================
  await page.getByRole('button', { name: 'Add Test Case' }).click();
  await page.waitForTimeout(400);

  await page.getByPlaceholder('e.g. Validate Course Entity Annotations').fill('Get course by ID');
  await page.getByPlaceholder('e.g. Verify @Entity annotation').fill('Should return a specific course by ID');
  await page.getByLabel('Validation Type').selectOption('API');
  await page.waitForTimeout(300);

  await page.getByPlaceholder('e.g. /api/courses').fill('/api/courses/{id}');
  await page.getByLabel('HTTP Method').selectOption('GET');
  await page.getByPlaceholder('e.g. 200, 201').fill('200');
  await page.getByPlaceholder('e.g. id, name, instructor').fill('id, name');
  await page.getByPlaceholder('e.g. 10').last().fill('6');

  await page.getByRole('button', { name: 'Add Test Case' }).last().click();
  await page.waitForTimeout(500);

  // ============================================================
  // Test Case 4: Update course (PUT /api/courses/{id} → 200)
  // ============================================================
  await page.getByRole('button', { name: 'Add Test Case' }).click();
  await page.waitForTimeout(400);

  await page.getByPlaceholder('e.g. Validate Course Entity Annotations').fill('Update course');
  await page.getByPlaceholder('e.g. Verify @Entity annotation').fill('Should update an existing course');
  await page.getByLabel('Validation Type').selectOption('API');
  await page.waitForTimeout(300);

  await page.getByPlaceholder('e.g. /api/courses').fill('/api/courses/{id}');
  await page.getByLabel('HTTP Method').selectOption('PUT');
  await page.getByPlaceholder('e.g. 200, 201').fill('200');

  await page.getByPlaceholder('"name": "Java Programming"').first().fill(JSON.stringify({
    name: "Advanced Java Programming",
    instructor: "Jane Doe"
  }, null, 2));

  await page.getByPlaceholder('e.g. 10').last().fill('8');

  await page.getByRole('button', { name: 'Add Test Case' }).last().click();
  await page.waitForTimeout(500);

  // ============================================================
  // Test Case 5: Delete course (DELETE /api/courses/{id} → 204)
  // ============================================================
  await page.getByRole('button', { name: 'Add Test Case' }).click();
  await page.waitForTimeout(400);

  await page.getByPlaceholder('e.g. Validate Course Entity Annotations').fill('Delete course');
  await page.getByPlaceholder('e.g. Verify @Entity annotation').fill('Should delete a course and return 204');
  await page.getByLabel('Validation Type').selectOption('API');
  await page.waitForTimeout(300);

  await page.getByPlaceholder('e.g. /api/courses').fill('/api/courses/{id}');
  await page.getByLabel('HTTP Method').selectOption('DELETE');
  await page.getByPlaceholder('e.g. 200, 201').fill('204');
  await page.getByPlaceholder('e.g. 10').last().fill('6');

  await page.getByRole('button', { name: 'Add Test Case' }).last().click();
  await page.waitForTimeout(500);

  // Scroll to submit
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1000);

  console.log('✅ Java Validation form filled successfully! Click Submit when ready.');

  // Keep browser open — click Resume in the Playwright Inspector when done
  await page.pause();
});

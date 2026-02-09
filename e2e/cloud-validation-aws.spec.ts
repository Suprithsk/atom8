import { test } from '@playwright/test';

test('Demo: Fill Cloud Validation — AWS Serverless (Complete)', async ({ page }) => {
  await page.goto('/cloud-validation');
  await page.waitForLoadState('networkidle');

  // --- Fill Project Information (AWS is default provider) ---
  await page.getByPlaceholder('e.g. orders-serverless-app').fill('orders-serverless-app');
  await page.getByPlaceholder('e.g. Generate Python validation code').fill(
    'Generate Python validation code following ValidationTemplateAws.py pattern with boto3'
  );

  // ============================================================
  // Test Case 1: Check Lambda Post Role Policies — IAM_ROLE (8 marks)
  // ============================================================
  await page.getByRole('button', { name: 'Add Test Case' }).click();
  await page.waitForTimeout(400);

  await page.getByPlaceholder('e.g. Check Lambda Post Role Policies').fill('Check Lambda Post Role Policies');
  await page.getByPlaceholder('e.g. Verify that the lambda-post-role').fill(
    'Verify that the lambda-post-role IAM role exists and has AWSStepFunctionsFullAccess policy attached'
  );
  await page.getByPlaceholder('e.g. IAM_ROLE').fill('IAM_ROLE');
  await page.getByPlaceholder('e.g. 10').fill('8');
  await page.getByPlaceholder('e.g. Use check_if_all_policies').fill('Use check_if_all_policies_are_attached_to_role helper method');

  await page.getByRole('button', { name: 'Add Test Case' }).last().click();
  await page.waitForTimeout(500);

  // ============================================================
  // Test Case 2: Check Step Function Invoke Lambda Role — IAM_ROLE (8 marks)
  // ============================================================
  await page.getByRole('button', { name: 'Add Test Case' }).click();
  await page.waitForTimeout(400);

  await page.getByPlaceholder('e.g. Check Lambda Post Role Policies').fill('Check Step Function Invoke Lambda Role');
  await page.getByPlaceholder('e.g. Verify that the lambda-post-role').fill(
    'Verify that the step-function-invoke-lambda role exists with AWSLambdaRole and AmazonSNSFullAccess policies'
  );
  await page.getByPlaceholder('e.g. IAM_ROLE').fill('IAM_ROLE');
  await page.getByPlaceholder('e.g. 10').fill('8');

  await page.getByRole('button', { name: 'Add Test Case' }).last().click();
  await page.waitForTimeout(500);

  // ============================================================
  // Test Case 3: Check Process Payment Lambda — LAMBDA_FUNCTION (10 marks)
  // ============================================================
  await page.getByRole('button', { name: 'Add Test Case' }).click();
  await page.waitForTimeout(400);

  await page.getByPlaceholder('e.g. Check Lambda Post Role Policies').fill('Check Process Payment Lambda Function');
  await page.getByPlaceholder('e.g. Verify that the lambda-post-role').fill(
    'Verify that the process-payment Lambda function exists with Python runtime'
  );
  await page.getByPlaceholder('e.g. IAM_ROLE').fill('LAMBDA_FUNCTION');
  await page.getByPlaceholder('e.g. 10').fill('10');

  await page.getByRole('button', { name: 'Add Test Case' }).last().click();
  await page.waitForTimeout(500);

  // ============================================================
  // Test Case 4: Check Process Restaurant Lambda — LAMBDA_FUNCTION (10 marks)
  // ============================================================
  await page.getByRole('button', { name: 'Add Test Case' }).click();
  await page.waitForTimeout(400);

  await page.getByPlaceholder('e.g. Check Lambda Post Role Policies').fill('Check Process Restaurant Lambda Function');
  await page.getByPlaceholder('e.g. Verify that the lambda-post-role').fill(
    'Verify that the process-restaurant Lambda function exists with Python runtime'
  );
  await page.getByPlaceholder('e.g. IAM_ROLE').fill('LAMBDA_FUNCTION');
  await page.getByPlaceholder('e.g. 10').fill('10');

  await page.getByRole('button', { name: 'Add Test Case' }).last().click();
  await page.waitForTimeout(500);

  // ============================================================
  // Test Case 5: Check Update Order Status Lambda — LAMBDA_FUNCTION (10 marks)
  // ============================================================
  await page.getByRole('button', { name: 'Add Test Case' }).click();
  await page.waitForTimeout(400);

  await page.getByPlaceholder('e.g. Check Lambda Post Role Policies').fill('Check Update Order Status Lambda Function');
  await page.getByPlaceholder('e.g. Verify that the lambda-post-role').fill(
    'Verify that the update-order-from-pending-state Lambda function exists with Python runtime'
  );
  await page.getByPlaceholder('e.g. IAM_ROLE').fill('LAMBDA_FUNCTION');
  await page.getByPlaceholder('e.g. 10').fill('10');

  await page.getByRole('button', { name: 'Add Test Case' }).last().click();
  await page.waitForTimeout(500);

  // ============================================================
  // Test Case 6: Check Step Function Creation — STEP_FUNCTION (8 marks)
  // ============================================================
  await page.getByRole('button', { name: 'Add Test Case' }).click();
  await page.waitForTimeout(400);

  await page.getByPlaceholder('e.g. Check Lambda Post Role Policies').fill('Check Step Function Creation');
  await page.getByPlaceholder('e.g. Verify that the lambda-post-role').fill(
    'Verify that the process-order-status Step Function state machine is created with ACTIVE status'
  );
  await page.getByPlaceholder('e.g. IAM_ROLE').fill('STEP_FUNCTION');
  await page.getByPlaceholder('e.g. 10').fill('8');

  await page.getByRole('button', { name: 'Add Test Case' }).last().click();
  await page.waitForTimeout(500);

  // ============================================================
  // Test Case 7: Check Step Function States — STEP_FUNCTION (15 marks)
  // ============================================================
  await page.getByRole('button', { name: 'Add Test Case' }).click();
  await page.waitForTimeout(400);

  await page.getByPlaceholder('e.g. Check Lambda Post Role Policies').fill('Check Step Function States Configuration');
  await page.getByPlaceholder('e.g. Verify that the lambda-post-role').fill(
    'Verify Step Function has states: ProcessPayment, WaitForPayment, PaymentStatus, ProcessRestaurant, UpdateOrderStatus, PaymentFailed, SendOrderStatus'
  );
  await page.getByPlaceholder('e.g. IAM_ROLE').fill('STEP_FUNCTION');
  await page.getByPlaceholder('e.g. 10').fill('15');

  await page.getByRole('button', { name: 'Add Test Case' }).last().click();
  await page.waitForTimeout(500);

  // ============================================================
  // Test Case 8: Check SNS Topic Creation — SNS_TOPIC (8 marks)
  // ============================================================
  await page.getByRole('button', { name: 'Add Test Case' }).click();
  await page.waitForTimeout(400);

  await page.getByPlaceholder('e.g. Check Lambda Post Role Policies').fill('Check SNS Topic Creation');
  await page.getByPlaceholder('e.g. Verify that the lambda-post-role').fill(
    'Verify that the order-status-notifier SNS topic is created'
  );
  await page.getByPlaceholder('e.g. IAM_ROLE').fill('SNS_TOPIC');
  await page.getByPlaceholder('e.g. 10').fill('8');

  await page.getByRole('button', { name: 'Add Test Case' }).last().click();
  await page.waitForTimeout(500);

  // ============================================================
  // Test Case 9: Check SNS Email Subscription — SNS_TOPIC (10 marks)
  // ============================================================
  await page.getByRole('button', { name: 'Add Test Case' }).click();
  await page.waitForTimeout(400);

  await page.getByPlaceholder('e.g. Check Lambda Post Role Policies').fill('Check SNS Topic Email Subscription');
  await page.getByPlaceholder('e.g. Verify that the lambda-post-role').fill(
    'Verify that an email subscription exists and is confirmed for the order-status-notifier topic'
  );
  await page.getByPlaceholder('e.g. IAM_ROLE').fill('SNS_TOPIC');
  await page.getByPlaceholder('e.g. 10').fill('10');

  await page.getByRole('button', { name: 'Add Test Case' }).last().click();
  await page.waitForTimeout(500);

  // ============================================================
  // Test Case 10: Check SQS Dead Letter Queue — SQS_QUEUE (6 marks)
  // ============================================================
  await page.getByRole('button', { name: 'Add Test Case' }).click();
  await page.waitForTimeout(400);

  await page.getByPlaceholder('e.g. Check Lambda Post Role Policies').fill('Check SQS Dead Letter Queue');
  await page.getByPlaceholder('e.g. Verify that the lambda-post-role').fill(
    'Verify that the orders-async-dead-letter-queue SQS queue is created'
  );
  await page.getByPlaceholder('e.g. IAM_ROLE').fill('SQS_QUEUE');
  await page.getByPlaceholder('e.g. 10').fill('6');

  await page.getByRole('button', { name: 'Add Test Case' }).last().click();
  await page.waitForTimeout(500);

  // ============================================================
  // Test Case 11: Check SQS Orders Queue — SQS_QUEUE (8 marks)
  // ============================================================
  await page.getByRole('button', { name: 'Add Test Case' }).click();
  await page.waitForTimeout(400);

  await page.getByPlaceholder('e.g. Check Lambda Post Role Policies').fill('Check SQS Orders Queue');
  await page.getByPlaceholder('e.g. Verify that the lambda-post-role').fill(
    'Verify that the orders-async-queue SQS queue is created with dead letter queue configured'
  );
  await page.getByPlaceholder('e.g. IAM_ROLE').fill('SQS_QUEUE');
  await page.getByPlaceholder('e.g. 10').fill('8');

  await page.getByRole('button', { name: 'Add Test Case' }).last().click();
  await page.waitForTimeout(500);

  // ============================================================
  // Test Case 12: Check API Gateway Creation — API_GATEWAY (10 marks)
  // ============================================================
  await page.getByRole('button', { name: 'Add Test Case' }).click();
  await page.waitForTimeout(400);

  await page.getByPlaceholder('e.g. Check Lambda Post Role Policies').fill('Check API Gateway Creation');
  await page.getByPlaceholder('e.g. Verify that the lambda-post-role').fill(
    'Verify that the orders-api HTTP API Gateway is created'
  );
  await page.getByPlaceholder('e.g. IAM_ROLE').fill('API_GATEWAY');
  await page.getByPlaceholder('e.g. 10').fill('10');

  await page.getByRole('button', { name: 'Add Test Case' }).last().click();
  await page.waitForTimeout(500);

  // ============================================================
  // Test Case 13: Check DynamoDB Orders Table — DYNAMODB_TABLE (10 marks)
  // ============================================================
  await page.getByRole('button', { name: 'Add Test Case' }).click();
  await page.waitForTimeout(400);

  await page.getByPlaceholder('e.g. Check Lambda Post Role Policies').fill('Check DynamoDB Orders Table');
  await page.getByPlaceholder('e.g. Verify that the lambda-post-role').fill(
    'Verify that the orders-database DynamoDB table exists with correct schema'
  );
  await page.getByPlaceholder('e.g. IAM_ROLE').fill('DYNAMODB_TABLE');
  await page.getByPlaceholder('e.g. 10').fill('10');

  await page.getByRole('button', { name: 'Add Test Case' }).last().click();
  await page.waitForTimeout(500);

  // Scroll to submit
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1000);

  console.log('✅ Cloud Validation (AWS Serverless Complete) — 13 test cases filled! Click Submit when ready.');

  // Keep browser open — click Resume in the Playwright Inspector when done
  await page.pause();
});

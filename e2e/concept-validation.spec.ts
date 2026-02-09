import { test } from '@playwright/test';

test('Demo: Fill Concept Validation — Software Architecture Assessment', async ({ page }) => {
  await page.goto('/concept-based-validation');
  await page.waitForLoadState('networkidle');

  // --- Fill Assessment Information ---
  await page.getByPlaceholder('e.g. software-arch-002').fill('software-arch-002');
  await page.getByPlaceholder('e.g. Software Architecture Assessment').fill('Software Architecture Assessment');
  await page.getByPlaceholder('e.g. C:/Users/.../assessment.docx').fill(
    'C:/Users/SuprithSK/Documents/Software_Architecture_Assessment_Correct Answers (1).docx'
  );
  await page.getByPlaceholder('e.g. 10').first().fill('10');
  await page.getByPlaceholder('e.g. validation-results').fill('validation-results');

  // ============================================================
  // Question 1: Architecture Selection — text-only (10 pts)
  // ============================================================
  await page.getByRole('button', { name: 'Add Question' }).click();
  await page.waitForTimeout(400);

  await page.getByPlaceholder('e.g. Q1').fill('Q1');
  const pointsQ1 = page.locator('input[placeholder="e.g. 10"]').last();
  await pointsQ1.fill('10');
  await page.getByPlaceholder('e.g. Architecture Selection').fill('Architecture Selection (Client-Server and Layered Architecture)');
  await page.getByPlaceholder('e.g. text-only').fill('text-only');
  await page.getByPlaceholder('e.g. You are hired as a Software Architect').fill(
    'You are hired as a Software Architect for a mid-size airline company planning to build an Airline Management System (AMS).'
  );
  await page.getByPlaceholder('e.g. a) Propose a high-level architecture').fill(
    'a) Propose a high-level architecture using Client-Server and Layered Architecture. b) Identify each layer and its responsibility. c) Explain why layered architecture is suitable.'
  );
  await page.getByPlaceholder('e.g. client-server architecture').fill(
    'client-server architecture, layered architecture, presentation layer, business logic layer, data access layer, separation of concerns'
  );
  await page.getByPlaceholder('The expected answer content').fill(
    'PART A - Proposed Architecture: Client-Server with Layered design on server side. Clients: Web browser (Customer UI), Internal Admin Portal. Server: Application Server, Database Server. PART B - Layers: Presentation Layer handles UI, Business Layer contains core business rules, Data Access Layer communicates with database. PART C - Why Suitable: Clear separation of concerns, easier maintenance and testing, business logic independent of UI.'
  );

  await page.getByRole('button', { name: 'Add Question' }).last().click();
  await page.waitForTimeout(500);

  // ============================================================
  // Question 2: Diagram Interpretation — text-and-diagram (10 pts, 70/30)
  // ============================================================
  await page.getByRole('button', { name: 'Add Question' }).click();
  await page.waitForTimeout(400);

  await page.getByPlaceholder('e.g. Q1').fill('Q2');
  const pointsQ2 = page.locator('input[placeholder="e.g. 10"]').last();
  await pointsQ2.fill('10');
  await page.getByPlaceholder('e.g. Architecture Selection').fill('Diagram Interpretation (Error Spotting and Correction)');
  await page.getByPlaceholder('e.g. text-only').fill('text-and-diagram');
  await page.waitForTimeout(300);

  await page.getByPlaceholder('e.g. You are hired as a Software Architect').fill(
    'Below is a proposed architecture diagram: [UI Layer] -> [Database Layer] -> [Business Logic Layer]'
  );
  await page.getByPlaceholder('e.g. a) Propose a high-level architecture').fill(
    'a) Identify two architectural issues. b) Redraw the corrected layered architecture. c) Explain how the corrected version improves maintainability.'
  );
  await page.getByPlaceholder('e.g. client-server architecture').fill(
    'layered architecture, separation of concerns, maintainability, proper layer ordering'
  );
  await page.getByPlaceholder('The expected answer content').fill(
    'Issues: 1) Incorrect Layer Ordering - Business logic below Database. 2) Direct UI to Database connection. Corrected: [Presentation] -> [Business] -> [Data Access] -> [Database]. Improvements: Clear dependency direction, separation of concerns, easier testing.'
  );

  // Diagram-specific fields
  await page.getByPlaceholder('e.g. 70').fill('70');
  await page.getByPlaceholder('e.g. 30').fill('30');
  await page.getByPlaceholder('e.g. Presentation Layer at top').fill(
    'Presentation Layer at top, Business Layer in second position, Data Access Layer third, Database at bottom'
  );

  await page.getByRole('button', { name: 'Add Question' }).last().click();
  await page.waitForTimeout(500);

  // ============================================================
  // Question 3: Identifying Bounded Contexts (DDD) — text-only (8 pts)
  // ============================================================
  await page.getByRole('button', { name: 'Add Question' }).click();
  await page.waitForTimeout(400);

  await page.getByPlaceholder('e.g. Q1').fill('Q3');
  const pointsQ3 = page.locator('input[placeholder="e.g. 10"]').last();
  await pointsQ3.fill('8');
  await page.getByPlaceholder('e.g. Architecture Selection').fill('Identifying Bounded Contexts (DDD)');
  await page.getByPlaceholder('e.g. text-only').fill('text-only');
  await page.getByPlaceholder('e.g. You are hired as a Software Architect').fill(
    'Based on the AMS scenario: flight scheduling, ticket booking, passenger management, payment processing.'
  );
  await page.getByPlaceholder('e.g. a) Propose a high-level architecture').fill(
    'a) Identify at least four bounded contexts. b) For each context, mention: Core responsibility and Example entities.'
  );
  await page.getByPlaceholder('e.g. client-server architecture').fill(
    'bounded context, domain-driven design, flight management, booking context, payment context'
  );
  await page.getByPlaceholder('The expected answer content').fill(
    'Bounded Contexts: 1) Booking Context - Ticket booking. Entities: Booking, Ticket. 2) Flight Management - Flight schedules. Entities: Flight, Aircraft. 3) Payment Context - Payment processing. Entities: Payment, Transaction. 4) User Management - Users and roles. Entities: User, Role.'
  );

  await page.getByRole('button', { name: 'Add Question' }).last().click();
  await page.waitForTimeout(500);

  // ============================================================
  // Question 4: Tactical DDD Design (Booking Context) — text-only (8 pts)
  // ============================================================
  await page.getByRole('button', { name: 'Add Question' }).click();
  await page.waitForTimeout(400);

  await page.getByPlaceholder('e.g. Q1').fill('Q4');
  const pointsQ4 = page.locator('input[placeholder="e.g. 10"]').last();
  await pointsQ4.fill('8');
  await page.getByPlaceholder('e.g. Architecture Selection').fill('Tactical DDD Design (Booking Context)');
  await page.getByPlaceholder('e.g. text-only').fill('text-only');
  await page.getByPlaceholder('e.g. a) Propose a high-level architecture').fill(
    'a) Identify: Aggregate Root, Entities, Value Objects. b) Explain why this aggregate boundary is important.'
  );
  await page.getByPlaceholder('e.g. client-server architecture').fill(
    'aggregate root, entities, value objects, aggregate boundary'
  );
  await page.getByPlaceholder('The expected answer content').fill(
    'Aggregate Root: Booking. Entities: Passenger, Ticket. Value Objects: SeatNumber, Money, FlightDate. Importance: Ensures consistency during booking operations, prevents partial updates.'
  );

  await page.getByRole('button', { name: 'Add Question' }).last().click();
  await page.waitForTimeout(500);

  // Scroll to submit
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1000);

  console.log('✅ Concept Validation form filled — 4 questions! Click Submit when ready.');

  // Keep browser open — click Resume in the Playwright Inspector when done
  await page.pause();
});

# AI Prompts – Requirements and Planning

## Entry 1: Understanding the Application

- **Prompt:** "Analyze the Practice Software Testing Toolshop (https://practicesoftwaretesting.com/). It's an e-commerce app for tools. I need to test: user registration, login, product browsing, cart management, checkout with Cash on Delivery, and invoice verification. The API docs are at https://api.practicesoftwaretesting.com/api/documentation. Identify the key testable flows and risks."

- **AI Response Summary:** The AI identified the following key flows:
  1. User Registration & Login (AC1)
  2. End-to-End Purchase Flow (AC2)
  3. Cart CRUD operations
  4. Invoice generation and viewing
  
  Key risks identified:
  - Double confirm button requirement for invoice (unique app behavior)
  - Session/token expiry during long checkout flows
  - Data conflicts with shared test environment (multiple users testing simultaneously)
  - API rate limiting on public test server

## Entry 2: Risk Analysis

- **Prompt:** "For the Toolshop application, what are the top risks from a QA perspective? Consider: data integrity, authentication, payment flow, and concurrent user access."

- **AI Response Summary:** Top risks ranked:
  1. HIGH: Invoice generation requires double-confirm (non-standard UX, easy to miss)
  2. HIGH: Authentication token expiry mid-checkout could lose cart state
  3. MEDIUM: Shared test environment — test data from other users may interfere
  4. MEDIUM: No real payment gateway — COD is the only testable method
  5. LOW: Product stock management not enforced (unlimited inventory)

## Entry 3: Requirement Validation

- **Prompt:**  "Review my planned smoke and regression scope for the Toolshop assignment. Identify any missing critical scenarios."

- **AI Response Summary:** 

Suggested adding:

- Invoice generation verification
- Invalid login
- Duplicate registration
- API authentication validation
- Cart update scenarios

- Validation Notes:

Compared suggestions against assignment requirements.

Accepted invoice verification (TC-UI-07, TC-API-07) and invalid-auth negatives (TC-UI-08, TC-API-08).

Deferred duplicate-registration automation — covered in planning/risk notes but not in the final 8-case UI/API automation scope.
# AI Prompts – Test Design

## Entry 1: UI Test Scenarios

- **Prompt:** "Generate 8 UI test cases for the Practice Software Testing Toolshop covering: registration, login, cart, checkout, and invoice. Include positive, negative, and edge cases. Tag each as @smoke or @regression."

- **AI Response Summary:** Generated 8 UI test cases (aligned to automated specs in `tests/ui/`):
  - TC-UI-01: Register new user with valid details (@smoke @regression) — `registration.spec.js`
  - TC-UI-02: Login with valid credentials (@smoke @regression) — `login.spec.js`
  - TC-UI-03: Verify profile information after login (@smoke) — `profile.spec.js`
  - TC-UI-04: Browse products listing (@smoke) — `products.spec.js`
  - TC-UI-05: Add multiple products to cart (@regression) — `cart.spec.js`
  - TC-UI-06: Update product quantity in cart (@regression) — `cart.spec.js`
  - TC-UI-07: Complete COD checkout and view invoice (@regression) — `checkout.spec.js`
  - TC-UI-08: Reject invalid login credentials (@regression) — `login-negative.spec.js`

- **Validation Notes:**  
- Verified every generated test case against the acceptance criteria.
- Removed duplicate scenarios.
- Added smoke/regression tags.
- Included application-specific "Confirm twice" checkout behavior.
- Ensured positive, negative and edge cases were balanced.
- Confirmed all scenarios were automatable using Playwright.

## Entry 2: API Test Scenarios

- **Prompt:** "Generate 8 API test cases for the Toolshop API (base: https://api.practicesoftwaretesting.com). Cover: user registration, login, cart creation, product retrieval, invoice generation. Include negative cases."

- **AI Response Summary:** Generated 8 API test cases (aligned to automated specs in `tests/api/`):
  - TC-API-01: Register user via POST /users/register (@smoke) — `register.spec.js`
  - TC-API-02: Login and get bearer token (@smoke @regression) — `login.spec.js`
  - TC-API-03: Create new cart with authentication (@smoke) — `cart.spec.js`
  - TC-API-04: Retrieve products list (@smoke) — `products.spec.js`
  - TC-API-05: Add in-stock product to cart (@regression) — `cart-flow.spec.js`
  - TC-API-06: Verify cart contents after add item (@regression) — `cart-flow.spec.js`
  - TC-API-07: Generate invoice for cart with COD (@regression) — `invoice.spec.js`
  - TC-API-08: Reject request with invalid bearer token (@regression) — `auth-negative.spec.js`

- **Validation Notes:** Endpoint paths match Swagger. Creation endpoints return 201 (register, cart, invoice). Token chain: register → login → token → cart → add item → invoice. Manual CSV uses `TC-MAN-*` IDs in `FunctionalTestCase/FunctionalTestCase.csv`; automation uses `TC-UI-*` / `TC-API-*` with matching AC coverage.

## Entry 3: Test Case Traceability

- **Prompt:** "Map my test cases to the acceptance criteria: AC1 (Registration & Login) and AC2 (End-to-End Purchase Flow). Show which TCs validate which AC."

- **AI Response Summary:**
  - UI AC1 (registration, login, profile): TC-UI-01, TC-UI-02, TC-UI-03, TC-UI-08
  - UI AC2 (products, cart, checkout, invoice): TC-UI-04, TC-UI-05, TC-UI-06, TC-UI-07
  - API AC1 (auth, cart creation): TC-API-01, TC-API-02, TC-API-03, TC-API-08
  - API AC2 (products, cart items, invoice): TC-API-04, TC-API-05, TC-API-06, TC-API-07

- **Validation Notes:** Every AC has smoke and regression coverage across UI and API. Negative cases: TC-UI-08 (invalid login), TC-API-08 (invalid token). Checkout double-Confirm behavior is covered in TC-UI-07 and documented in `pages/CheckoutPage.js`.

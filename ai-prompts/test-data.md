# AI Prompts — Test Data

Prompts used to generate and validate test data for UI and API automation.

---

## Entry 1 — Dynamic Registration Data

- **Prompt:**
  > How should test data avoid duplicate registration failures on the public SUT? Generate unique users for UI register and API register tests.

- **AI Response (summary):**
  Added `utils/data-generator.js` with `randomEmail()`, `randomPassword()`, and `buildRegistrationData()` using timestamp + random string. UI registration uses `readJson('ui/registration-user.json')` merged with dynamic email/password.

- **Validation Notes:**
  Email format: `testuser_{random}_{timestamp}@example.com`. Password includes complexity + timestamp. Verified 201 from `POST /users/register` across repeated runs.

---

## Entry 2 — Static UI Registration Template

- **Prompt:**
  > Create JSON test data for UI registration form fields (country, postal code, DOB, phone).

- **AI Response (summary):**
  Created `test-data/ui/registration-user.json` with firstName, lastName, dob, country (`United States of America (the)`), postalCode `33101`, houseNumber, phone.

- **Validation Notes:**
  Country label matches SUT dropdown text exactly. Used by `registration.spec.js` and `buildUiUser()` in `ui-auth.helper.js`.

---

## Entry 3 — API Invoice Payload

- **Prompt:**
  > Use assignment invoice POST body example. Merge dynamic cart_id at runtime.

- **AI Response (summary):**
  Created `test-data/api/invoice-payload.json` based on assessment doc sample (billing fields, `payment_method: cash-on-delivery`, `payment_details: {}`). `invoice.spec.js` reads JSON and sets `cart_id` from freshly created cart.

- **Validation Notes:**
  Validated against OpenAPI `InvoiceRequest`. Invoice number matches `INV-*` pattern; total > 0 on success.

---

## Entry 4 — Checkout Billing Address Data

- **Prompt:**
  > Checkout billing postcode lookup returns random invalid city/state. What address data should automation use?

- **AI Response (summary):**
  Default billing in `CheckoutPage.fillBillingAddress()`: country US, postal `33101`, house `123`, street `123 Main Street`, city `Miami`, state `FL`. Explicit city/state override after lookup prevents invoice 422 errors.

- **Validation Notes:**
  Confirmed `POST /invoices` returns 201 when billing fields align with `billing_country` US selection.

---

## Entry 5 — Environment vs Hardcoded Credentials

- **Prompt:**
  > Should tests use demo customer account or .env credentials?

- **AI Response (summary):**
  `constants/test-users.js` documents demo customer for reference. `loginAsCustomer()` prefers `TEST_USER_EMAIL` / `TEST_USER_PASSWORD` from `.env` when set; otherwise registers fresh user via API to avoid account lockout (HTTP 423).

- **Validation Notes:**
  Never commit `.env`. `.env.example` documents optional overrides. Secrets not pasted into AI prompts.

---

## Entry 6 — API Cart Flow Test Data Chain

- **Prompt:**
  > How to chain register → login → cart → product → add item in API regression tests?

- **AI Response (summary):**
  `cart-flow.spec.js` uses `beforeEach`: `buildRegistrationData()` → register → login → `findInStockProduct()` from GET /products → create cart → store token, cartId, productId for TC-API-05 and TC-API-06.

- **Validation Notes:**
  Fresh user and cart per test avoids stale `cart_id` and token expiry risks documented in risk table.

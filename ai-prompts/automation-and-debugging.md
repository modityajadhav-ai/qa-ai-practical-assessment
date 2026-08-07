# AI Prompts — Automation and Debugging

Prompts used for Playwright automation structure, assertions, and analyzing failures/logs.

---

## Entry 1 — UI/API Automation Scaffold (Phase 3)

- **Prompt:**
  > Create Playwright UI page objects and API service classes for Toolshop AC1 (register, login, profile) and AC2 (products, cart, checkout with double Confirm, invoices). Use existing fixtures and constants. Max 8 UI and 8 API specs with @smoke and @regression tags.

- **AI Response (summary):**
  Created `pages/` (Login, Register, Profile, Home, ProductDetail, Checkout, Invoices), `api/endpoints/` (Auth, Cart, Products, Invoices), helpers, and 16 spec files under `tests/ui/` and `tests/api/`. Mapped TC-UI-01–08 and TC-API-01–08 to manual CSV IDs.

- **Debugging Outcome:**
  Initial scaffold ran but checkout and login needed live-SUT validation against practicesoftwaretesting.com.

---

## Entry 2 — Checkout Double Confirm Failure (TC-UI-07)

- **Prompt:**
  > Checkout test fails waiting for `invoice number is INV-`. Page shows "Payment was successful" with Confirm still visible. Why?

- **AI Response (summary):**
  Identified two-step payment flow: first Confirm → `POST /payment/check` → "Payment was successful"; second Confirm → `POST /invoices` → invoice number. Rapid double-click skipped the first step completion.

- **Debugging Outcome:**
  Updated `CheckoutPage.confirmPaymentTwice()` to wait for `/payment/check`, then success message, then second click and invoice API. Test passed.

- **Validation Notes:**
  Verified with live network trace: payment/check (200) then invoices (201).

---

## Entry 3 — Shared Demo Account Lockout (5 UI login failures)

- **Prompt:**
  > Multiple UI tests fail at `nav-menu` wait after login. Login spec stuck on `/auth/login`.

- **AI Response (summary):**
  Error snapshot showed: "Account locked, too many failed attempts." API login for `customer@practicesoftwaretesting.com` returned HTTP 423. Parallel workers amplified lockout from repeated test runs.

- **Debugging Outcome:**
  - Added `registerAndLogin()` in `helpers/ui-auth.helper.js` (API register + UI login with unique user).
  - Fixed `LoginPage.login()` to use `getByRole('button', { name: 'Login' })` and wait for `/users/login` response.
  - Set local `workers: 1` and `fullyParallel: false` for UI project.
  - Profile/login specs updated to use dynamic users instead of locked demo account.

---

## Entry 4 — Checkout Billing Address / Invoice 422

- **Prompt:**
  > Checkout passes billing but second Confirm never shows invoice. API returns 422 on POST /invoices.

- **AI Response (summary):**
  Postcode lookup returned invalid city/state (e.g. random city not in US). Invoice API error: `billing_country does not match the entered address`.

- **Debugging Outcome:**
  Updated `CheckoutPage.fillBillingAddress()` to fill house number after postcode lookup, then explicitly set street, city (Miami), and state (FL) before proceeding to payment.

---

## Entry 5 — Parallel Workers / Flaky Login

- **Prompt:**
  > What are 4 workers? Tests fail when running full suite in parallel.

- **AI Response (summary):**
  Explained Playwright workers run tests in parallel processes. Multiple UI tests logging in simultaneously caused flaky failures on shared SUT.

- **Debugging Outcome:**
  Documented `--workers=1` for stability. Config default set to 1 worker locally; unique user per test reduces shared-state risk.

---

## Entry 6 — Chromium-Only Execution

- **Prompt:**
  > Tests repeat on WebKit, Firefox, Chromium. Want Chromium only.

- **AI Response (summary):**
  `playwright.config.js` had three UI browser projects. Removed Firefox/WebKit; npm scripts target `ui-chromium` + `api`.

- **Validation Notes:**
  UI test count reduced from 24 (8×3 browsers) to 8 per run.

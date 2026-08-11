# AI Prompts – Automation and Debugging

## Entry 1: Framework Structure

- **Prompt:** "Set up a Playwright JavaScript project using Prism/POM pattern for the Toolshop. I need: pages/ for Page Objects, tests/ui/ and tests/api/ for specs, api/endpoints/ for API services, fixtures/ for Playwright fixtures, helpers/ for domain helpers, and utils/ for generic utilities."

- **AI Response Summary:** Generated the full project scaffold:
  - `playwright.config.js` with `ui-chromium` and `api` projects, reporters under `reports/html`, `reports/json`, `reports/junit`
  - Page Objects: HomePage, RegisterPage, LoginPage, ProductDetailPage, CheckoutPage, ProfilePage, InvoicesPage
  - API service classes (`AuthService`, `CartService`, `ProductsService`, `InvoicesService`) wired via `fixtures/api.fixture.js`
  - Dynamic test data in `utils/data-generator.js` (`buildRegistrationData()`, `randomEmail()`)

- **Debugging Outcome:** Global `fullyParallel: true` is fine for API; the `ui-chromium` project sets `fullyParallel: false` and `workers: 1` locally to avoid login/session conflicts. UI specs use `helpers/ui-auth.helper.js` (`registerAndLogin()`, `loginAsCustomer()`) for isolated authenticated setup.

## Entry 2: Selector Strategy

- **Prompt:** "The Toolshop uses data-test attributes. Generate Playwright locators using data-test selectors for: login form, cart page, checkout steps."

- **AI Response Summary:** Provided selectors:
  - Login: `#email`, `#password`, `getByRole('button', { name: 'Login' })` (per `.cursor/rules/pom-and-api-layer.mdc`)
  - Cart/checkout: `[data-test="proceed-1"]`, `[data-test="product-quantity"]`, `[data-test="proceed-2"]`, `[data-test="proceed-3"]`, `#payment-method`, `[data-test="finish"]`
  - Navigation: `[data-test="nav-cart"]`, `[data-test="nav-menu"]`, `[data-test="nav-my-invoices"]`

- **Debugging Outcome:** Checkout `data-test` selectors worked directly. Login needed stable IDs and role-based submit because `data-test` login fields were unreliable. Nav locators were added after DevTools inspection.

## Entry 3: Double Confirm Issue

- **Prompt:** "The checkout requires pressing the Confirm button twice to generate an invoice. How should I handle this in Playwright? Just clicking twice doesn't always work due to timing."

- **AI Response Summary:** Suggested `waitForResponse` after the first Confirm (payment check) before clicking again, or a short `waitForTimeout` as a fallback.

- **Debugging Outcome:** Implemented `confirmPaymentTwice()` in `pages/CheckoutPage.js`: first click waits for `/payment/check`, then second click waits for `POST /invoices` and the `invoice number is INV-` message. This proved more reliable than a fixed timeout alone.

## Entry 4: API Token Management

- **Prompt:** "How should I manage the bearer token across API tests? Each test needs authentication."

- **AI Response Summary:** Recommended `test.beforeEach` to register/login and store the bearer token for dependent API flows, or inline register → login per test for full isolation.

- **Debugging Outcome:** `tests/api/regression/cart-flow.spec.js` uses `beforeEach` with `dataGenerator.buildRegistrationData()` and service fixtures. Smoke specs (e.g. `register.spec.js`, `login.spec.js`) keep setup inline. Tokens are never hardcoded; services receive the token from the login response.

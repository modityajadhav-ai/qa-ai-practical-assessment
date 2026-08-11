# AI Prompts – Test Data

## Entry 1: User Registration Data

- **Prompt:** "Generate a test data strategy for user registration on the Toolshop. I need unique users per test run to avoid conflicts on the shared public server."

- **AI Response Summary:** Recommended timestamp-based unique emails and a centralized factory. Implemented as `utils/data-generator.js` with `randomEmail()` (`testuser_<random>_<timestamp>@example.com`) and `buildRegistrationData()` for full API registration payloads.

- **Validation Notes:** Works on the public test server. UI flows also use `test-data/ui/registration-user.json` as a template combined with dynamic email/password from `helpers/ui-auth.helper.js` (`buildUiUser()`). Prefer dynamic users over the shared demo account (`customer@practicesoftwaretesting.com`) to avoid lockout.

## Entry 2: API Request Payloads

- **Prompt:** "Generate the invoice creation API payload for the Toolshop API. The endpoint is POST /invoices and requires billing details and cart_id."

- **AI Response Summary:** Generated payload stored in `test-data/api/invoice-payload.json`:
  ```json
  {
    "billing_street": "Zoey Shore",
    "billing_city": "Hesselbury",
    "billing_state": "Florida",
    "billing_country": "TG",
    "billing_postal_code": "1234AA",
    "payment_method": "cash-on-delivery",
    "payment_details": {}
  }
  ```
  Tests merge this template with a dynamic `cart_id` from `POST /carts`.

- **Validation Notes:** Verified against Swagger and assignment examples. Country is 2-letter ISO (TG, IN, US). `payment_method` must be exactly `cash-on-delivery`. Invoice creation returns HTTP 201 with `invoice_number` matching `INV-`.

## Entry 3: Negative Test Data

- **Prompt:** "What test data should I use for negative/edge cases? Specifically: invalid login, duplicate registration, and invalid cart operations."

- **AI Response Summary:**
  - Invalid login: `invalid@test.com` / `wrongpassword` (non-existent user)
  - Duplicate registration: Use `customer@practicesoftwaretesting.com` (default user, always exists)
  - Invalid cart: quantity=0 or quantity=-1 to trigger validation errors
  - Empty cart invoice: Create cart via API but don't add items before invoicing

- **Validation Notes:** Confirmed the existing user email is always available on the public server. The server resets data periodically but default accounts persist.

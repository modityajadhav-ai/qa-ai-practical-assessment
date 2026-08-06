# API Test Plan — Toolshop API v5.0.0

**Base URL:** `https://api.practicesoftwaretesting.com`  
**OpenAPI:** Toolshop API 5.0.0 (Testsmith)  
**Auth:** Bearer JWT (`Authorization: Bearer <access_token>`)  
**Date:** 06 Aug 2026

---

## 1. Objectives

Validate the **Toolshop REST API** against assessment acceptance criteria:

| AC | Requirement |
|----|-------------|
| **API AC1** | Register → login → bearer token → create cart |
| **API AC2** | GET products → add to cart → verify cart → POST invoice |

Manual cases live in `FunctionalTestCase/FunctionalTestCase.csv` (`TC-MAN-API-01`–`08`). Automated specs map to `TC-API-01`–`08` in `tests/api/`.

---

## 2. Scope

### In scope (this assessment)

| Tag | API areas | Manual IDs |
|-----|-----------|------------|
| `@smoke @api` | Register, login, create cart, GET products | TC-MAN-API-01–04 |
| `@regression @api` | Add to cart, verify cart, invoice, auth negative | TC-MAN-API-05–08 |

### Out of scope (documented in OpenAPI but not in assessment)

- Admin-only endpoints (DELETE brand/category/product/user, reports)
- Brands, categories, favorites, messages, TOTP, guest invoice
- HTTP QUERY variants (`query` operations on search endpoints)
- Product specs CRUD, invoice PDF download, payment/check
- Postcode lookup (used indirectly via UI checkout)

---

## 3. Endpoint Matrix (Assessment Coverage)

| # | Method | Endpoint | Auth | Smoke | Regression | Manual ID | Auto ID |
|---|--------|----------|------|-------|------------|-----------|---------|
| 1 | POST | `/users/register` | No | Yes | Yes | TC-MAN-API-01 | TC-API-01 |
| 2 | POST | `/users/login` | No | Yes | Yes | TC-MAN-API-02 | TC-API-02 |
| 3 | POST | `/carts` | Bearer | Yes | — | TC-MAN-API-03 | TC-API-03 |
| 4 | GET | `/products` | No | Yes | — | TC-MAN-API-04 | TC-API-04 |
| 5 | POST | `/carts/{id}` | Optional* | — | Yes | TC-MAN-API-05 | TC-API-05 |
| 6 | GET | `/carts/{cartId}` | Optional* | — | Yes | TC-MAN-API-06 | TC-API-06 |
| 7 | POST | `/invoices` | Bearer | — | Yes | TC-MAN-API-07 | TC-API-07 |
| 8 | GET | `/users/me` | Bearer | — | Yes (negative) | TC-MAN-API-08 | TC-API-08 |

\*Cart add/get may work without auth for guest carts; assessment flow uses authenticated user.

---

## 4. E2E API Flow (Happy Path)

```
POST /users/register
        │
        ▼
POST /users/login  ──► access_token
        │
        ├──► POST /carts  ──► cart_id
        │
        ├──► GET /products  ──► product_id (in_stock = true)
        │
        ▼
POST /carts/{cart_id}  { product_id, quantity }
        │
        ▼
GET /carts/{cart_id}  ──► verify cart_items
        │
        ▼
POST /invoices  { billing_*, payment_method, cart_id, payment_details }
        │
        ▼
invoice_number (INV-*), total > 0
```

---

## 5. Test Data Strategy

| Data | Source | Notes |
|------|--------|-------|
| Registration payload | `utils/data-generator.js` | Unique email + password per run |
| Login | Same user from register | email + password |
| Product ID | `GET /products` → `in_stock: true` | Do not hardcode IDs |
| Cart ID | `POST /carts` response | Fresh cart per flow |
| Invoice payload | `test-data/api/invoice-payload.json` | Merge dynamic `cart_id` |

### Sample registration body (`UserRequest`)

```json
{
  "first_name": "Test",
  "last_name": "User",
  "email": "testuser_unique@example.com",
  "password": "Zx9!mKUniqueQw1",
  "dob": "1990-05-15",
  "phone": "555-123-4567",
  "address": {
    "street": "123 Main Street",
    "city": "New York",
    "state": "NY",
    "country": "United States",
    "postal_code": "10001"
  }
}
```

### Sample login body

```json
{
  "email": "customer@practicesoftwaretesting.com",
  "password": "welcome01"
}
```

### Sample add-to-cart body

```json
{
  "product_id": "<in-stock-product-id>",
  "quantity": 1
}
```

### Sample invoice body (`InvoiceRequest`)

```json
{
  "billing_street": "Zoey Shore",
  "billing_city": "Hesselbury",
  "billing_state": "Florida",
  "billing_country": "TG",
  "billing_postal_code": "1234AA",
  "payment_method": "cash-on-delivery",
  "cart_id": "<cart-id>",
  "payment_details": {}
}
```

---

## 6. Smoke vs Regression Classification

| Tier | Goal | Max runtime target | Cases |
|------|------|--------------------|-------|
| **Smoke** | Critical API path for fast CI feedback | &lt; 2 min | TC-MAN-API-01–04 |
| **Regression** | Full AC2 + negative auth | &lt; 5 min | TC-MAN-API-01–08 |

### Smoke suite (`@smoke @api`)

1. Register user → 201  
2. Login → 200 + `access_token`  
3. Create cart → 201 + `id`  
4. GET products → 200 + non-empty `data`

### Regression suite (`@regression @api`)

5. Add product to cart → 200  
6. GET cart → 200 + matching `cart_items`  
7. POST invoice → 201 + `invoice_number`  
8. GET `/users/me` with invalid token → 401  

---

## 7. Manual Execution Guide

### Tools

- **Swagger UI:** https://api.practicesoftwaretesting.com/api/documentation  
- **Postman / curl** for scripted manual runs  
- **Playwright API project** for automated replay

### Manual execution order

| Step | Action | Pass criteria |
|------|--------|---------------|
| 1 | Run TC-MAN-API-01 | 201 + user id |
| 2 | Run TC-MAN-API-02 with same credentials | Token received |
| 3 | Authorize Swagger with Bearer token | Authorize button in UI |
| 4 | Run TC-MAN-API-03–07 in sequence | Each step passes |
| 5 | Run TC-MAN-API-08 without valid token | 401 |

### Headers

```
Content-Type: application/json
Accept: application/json
Authorization: Bearer <access_token>   # protected endpoints only
```

---

## 8. Automation Mapping (Phase 3)

| Manual ID | Spec file | Playwright project |
|-----------|-----------|-------------------|
| TC-MAN-API-01 | `tests/api/smoke/register.spec.js` | `api` |
| TC-MAN-API-02 | `tests/api/smoke/login.spec.js` | `api` |
| TC-MAN-API-03 | `tests/api/smoke/cart.spec.js` | `api` |
| TC-MAN-API-04 | `tests/api/smoke/products.spec.js` | `api` |
| TC-MAN-API-05–06 | `tests/api/regression/cart-flow.spec.js` | `api` |
| TC-MAN-API-07 | `tests/api/regression/invoice.spec.js` | `api` |
| TC-MAN-API-08 | `tests/api/regression/auth-negative.spec.js` | `api` |

**Run commands:**

```bash
npm run test:api:smoke
npm run test:api:regression
npm run test:api
```

---

## 9. Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| Duplicate email on register (409) | Dynamic email via `data-generator.js` |
| Password breach list rejection (422) | Unique password per registration |
| Out-of-stock product in cart | Filter `in_stock: true` from GET /products |
| Token expiry (300s) | Chain login → cart → invoice in one test |
| Wrong path prefix (`/api/users` vs `/users`) | Base URL has no `/api` prefix for resources |
| Invoice 401 without auth | Always pass Bearer on POST /invoices |

---

## 10. OpenAPI Tags Reference (Full API)

For future expansion beyond assessment scope:

| Tag | Example endpoints | Auth |
|-----|-------------------|------|
| User | `/users/register`, `/users/login`, `/users/me` | Mixed |
| Cart | `/carts`, `/carts/{id}`, `/carts/{cartId}` | Optional |
| Product | `/products`, `/products/{productId}` | Public read |
| Invoice | `/invoices`, `/invoices/{invoiceId}` | Bearer |
| Brand / Category | CRUD + search | Public read; admin delete |
| Contact / Favorite | `/messages`, `/favorites` | Bearer |
| Report | `/reports/*` | Admin Bearer |
| Payment / Postcode | `/payment/check`, `/postcode-lookup` | Mixed |

---

## 11. Traceability Summary

| Requirement | Manual cases | Automation |
|-------------|--------------|------------|
| API AC1 — Auth & cart | TC-MAN-API-01, 02, 03, 08 | TC-API-01–03, 08 |
| API AC2 — Products & invoice | TC-MAN-API-04, 05, 06, 07 | TC-API-04–07 |

**Total manual API cases:** 8 (within assignment 5–8 per tier guideline)

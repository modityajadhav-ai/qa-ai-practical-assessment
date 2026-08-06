# Requirements and Risk Analysis

**SUT:** [Practice Software Testing Toolshop](https://practicesoftwaretesting.com)  
**API:** [Toolshop API Documentation](https://api.practicesoftwaretesting.com/api/documentation)  
**Date:** 06 Aug 2026

---

## Functional Requirements (Acceptance Criteria)

### UI

| ID | Requirement |
|----|-------------|
| UI-AC1 | User can register, login, and verify profile |
| UI-AC2 | User can browse products, manage cart (multi-item + quantity), checkout via COD, view invoice (double Confirm) |

### API

| ID | Requirement |
|----|-------------|
| API-AC1 | Register → login → bearer token → create cart |
| API-AC2 | GET products → add to cart → verify cart → POST invoice |

### API Invoice Payload Reference

```json
{
  "billing_street": "Zoey Shore",
  "billing_city": "Hesselbury",
  "billing_state": "Florida",
  "billing_country": "TG",
  "billing_postal_code": "1234AA",
  "payment_method": "cash-on-delivery",
  "cart_id": "<dynamic-cart-id>",
  "payment_details": {}
}
```

---

## Risk Register

| # | Risk | Severity | Test Mitigation |
|---|------|----------|---------------|
| R1 | Missed double-confirm on invoice UI | High | TC-MAN-007; explicit automation step |
| R2 | Duplicate email on registration | Medium | Dynamic email per run (`data-generator.js`) |
| R3 | Stale cart_id in API invoice call | High | Fresh cart per API test flow |
| R4 | Auth token expiry mid-flow | Medium | Login immediately before dependent API calls |
| R5 | Flaky element timing on SPA | Medium | Playwright auto-wait; stable locators |
| R6 | Scope creep beyond 5–8 cases per tier | Low | Traceability matrix in `project-info.md` |

---

## Smoke vs Regression Classification

### Manual / UI

| Tag | Test Cases |
|-----|------------|
| `@smoke` | TC-MAN-001, TC-MAN-002, TC-MAN-003, TC-MAN-004 |
| `@regression` | TC-MAN-001 through TC-MAN-008 (full AC + negative) |

### API (planned automation)

| Tag | Planned IDs |
|-----|-------------|
| `@smoke` | TC-API-01 Register, TC-API-02 Login, TC-API-03 Create cart, TC-API-04 GET products |
| `@regression` | TC-API-05 Add to cart, TC-API-06 Verify cart, TC-API-07 Invoice, TC-API-08 Invalid token |

---

## Out of Scope

- Non-COD payment methods
- Performance and security penetration testing
- Cross-browser manual execution (automation covers Chromium primary)

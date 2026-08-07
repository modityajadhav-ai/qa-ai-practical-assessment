# Test Execution Report — QA AI Practical Assessment

**Application:** Practice Software Testing Toolshop  
**Execution date:** 07 Aug 2026  
**Command:** `npm test` (`playwright test --project=ui-chromium --project=api`)  
**Environment:** Node.js 18+, Chromium, Windows 10  
**Workers:** 1 (local stability)  
**Duration:** ~2.2 minutes  
**Result:** **16 passed, 0 failed**

---

## Summary

| Suite | Tests | Passed | Failed | Status |
|-------|-------|--------|--------|--------|
| UI (`ui-chromium`) | 8 | 8 | 0 | ✅ Passed |
| API (`api`) | 8 | 8 | 0 | ✅ Passed |
| **Total** | **16** | **16** | **0** | ✅ **All Passed** |

---

## UI Automation Results

| Test ID | Spec | Tags | Duration (approx) | Status |
|---------|------|------|-------------------|--------|
| TC-UI-01 | `tests/ui/smoke/registration.spec.js` | @smoke @regression @ui | 6.0s | ✅ Passed |
| TC-UI-02 | `tests/ui/smoke/login.spec.js` | @smoke @regression @ui | 5.8s | ✅ Passed |
| TC-UI-03 | `tests/ui/smoke/profile.spec.js` | @smoke @ui | 9.8s | ✅ Passed |
| TC-UI-04 | `tests/ui/smoke/products.spec.js` | @smoke @ui | 4.4s | ✅ Passed |
| TC-UI-05 | `tests/ui/regression/cart.spec.js` | @regression @ui | 25.3s | ✅ Passed |
| TC-UI-06 | `tests/ui/regression/cart.spec.js` | @regression @ui | 19.5s | ✅ Passed |
| TC-UI-07 | `tests/ui/regression/checkout.spec.js` | @regression @ui | 35.1s | ✅ Passed |
| TC-UI-08 | `tests/ui/regression/login-negative.spec.js` | @regression @ui | 3.5s | ✅ Passed |

---

## API Automation Results

| Test ID | Spec | Tags | Duration (approx) | Status |
|---------|------|------|-------------------|--------|
| TC-API-01 | `tests/api/smoke/register.spec.js` | @smoke @api | 0.8s | ✅ Passed |
| TC-API-02 | `tests/api/smoke/login.spec.js` | @smoke @regression @api | 1.3s | ✅ Passed |
| TC-API-03 | `tests/api/smoke/cart.spec.js` | @smoke @api | 1.7s | ✅ Passed |
| TC-API-04 | `tests/api/smoke/products.spec.js` | @smoke @api | 0.6s | ✅ Passed |
| TC-API-05 | `tests/api/regression/cart-flow.spec.js` | @regression @api | 2.9s | ✅ Passed |
| TC-API-06 | `tests/api/regression/cart-flow.spec.js` | @regression @api | 4.7s | ✅ Passed |
| TC-API-07 | `tests/api/regression/invoice.spec.js` | @regression @api | 3.4s | ✅ Passed |
| TC-API-08 | `tests/api/regression/auth-negative.spec.js` | @regression @api | 0.6s | ✅ Passed |

---

## Manual Test Suite (reference)

Manual cases in `FunctionalTestCase/FunctionalTestCase.csv` map to the automation IDs above (TC-MAN-001–008 UI, TC-MAN-API-01–08 API). Automation covers all 16 manual cases.

---

## Report Artefacts

| Artefact | Location | Committed to repo |
|----------|----------|-------------------|
| HTML report | `reports/html/index.html` | No (gitignored — regenerate with `npm test`) |
| JSON results | `reports/json/test-results.json` | No (gitignored) |
| JUnit XML | `reports/junit/test-results.xml` | No (gitignored) |
| Execution summary | `PrismStructure/execution-summary.json` | ✅ Yes |
| This report | `PrismStructure/execution-report.md` | ✅ Yes |

### Regenerate reports locally

```bash
npm install
npx playwright install
cp .env.example .env
npm test
npm run report
```

---

## Notes

- UI checkout (TC-UI-07) validates **double Confirm** for Cash on Delivery invoice generation.
- UI login-dependent tests register a fresh user via API to avoid the shared demo account lockout.
- API invoice (TC-API-07) uses `test-data/api/invoice-payload.json` with dynamic `cart_id`.

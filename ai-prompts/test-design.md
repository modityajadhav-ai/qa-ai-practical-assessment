# AI Prompts — Test Design

Prompts used to generate or refine test scenarios and test cases for UI + API.

---

## Entry 1 — API OpenAPI Test Plan (Phase 2)

- **Prompt:**
  > Shared Toolshop OpenAPI 3.2.0 JSON. Add manual API test cases and create a test plan mapped to API AC1 (register, login, token, cart) and API AC2 (products, cart, invoice). Limit to 8 manual API cases. Include smoke vs regression, endpoint matrix, test data samples, and automation mapping.

- **AI Response (summary):**
  Added 8 manual API rows to `FunctionalTestCase.csv` as `TC-MAN-API-01` through `TC-MAN-API-08`. Created `PrismStructure/api-test-plan.md` with scope, endpoint matrix, E2E flow diagram, test data strategy (registration, login, cart, invoice payloads), smoke/regression split, manual execution guide, risks, and traceability to `TC-API-01`–`08` automation specs.

- **Validation Notes:**
  Endpoints verified against live API (`/users/login` not `/api/users/login`). Invoice POST requires Bearer auth per OpenAPI `security: apiAuth`. Negative case uses GET `/users/me` with invalid token (401). Out-of-scope OpenAPI areas (reports, admin DELETE, TOTP) documented but excluded to stay within 5–8 case limit.

---

## Entry 2 — UI Test Design (Phase 1 reference)

- **Prompt:**
  > From UI AC1 and AC2, list smoke vs regression scenarios for Playwright automation.

- **AI Response (summary):**
  Defined TC-MAN-001–008 for UI manual cases and TC-UI-01–08 for automation mapping in `project-info.md` traceability matrix.

- **Validation Notes:**
  TC-MAN-007 includes double Confirm for invoice per assignment doc.

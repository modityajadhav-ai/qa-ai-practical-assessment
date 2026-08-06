# Project Information

**Primary AI Tool(s) Used:** Cursor AI (Auto / Composer for planning; Sonnet for automation phases)

**Application Under Test:** Practice Software Testing Toolshop — Checkout & Application Flow

**Assessment Start Date:** 06 Aug 2026

**Submission Date:** _(update before final submission)_

---

## Project Summary

This assessment validates the **Practice Software Testing** ecommerce application through AI-assisted QA across the full testing lifecycle. The primary flows under test are **AC1: User Registration & Login** (register, authenticate, verify profile) and **AC2: End-to-End Purchase Flow** (browse products, manage cart, checkout via Cash on Delivery, generate invoice with **double Confirm**). Parallel API coverage follows **AC1: User Authentication & Cart Creation** and **AC2: Product Selection & Invoice Generation** against the [Toolshop API](https://api.practicesoftwaretesting.com/api/documentation). Automation uses **Playwright (JavaScript)** with Page Object Model for UI and a service layer for API tests, organised by `@smoke` and `@regression` tags.

---

## Tools Used

| Category | Tools |
|----------|-------|
| IDE / AI | Cursor AI |
| UI Automation | Playwright Test, Chromium |
| API Automation | Playwright `APIRequestContext` |
| Language | JavaScript (Node.js ≥ 18) |
| Test Data | JSON files, `utils/data-generator.js`, `.env` |
| Reporting | Playwright HTML / JSON / JUnit reporters |
| Version Control | Git, GitHub |
| Manual Traceability | `FunctionalTestCase/FunctionalTestCase.csv` |

---

## Requirement & Risk Analysis

### Application Context

| Area | Detail |
|------|--------|
| UI SUT | https://practicesoftwaretesting.com |
| API SUT | https://api.practicesoftwaretesting.com |
| Domain | Ecommerce toolshop (products, cart, checkout, invoices, user accounts) |
| Auth | UI login/register; API bearer token after login |

### Acceptance Criteria (from assessment)

**UI AC1 — User Registration & Login**

The user should be able to register with valid details, log in using registered credentials, and verify profile information successfully.

**UI AC2 — End-to-End Purchase Flow**

The user should be able to browse products, add multiple items to the cart (including updating quantity), complete checkout using Cash on Delivery, and successfully view the generated invoice under My Invoices. **Invoice generation requires pressing Confirm twice.**

**API AC1 — User Authentication & Cart Creation**

A new user should be able to register via API, log in with registered credentials, obtain a valid bearer token, and create a new cart successfully.

**API AC2 — Product Selection & Invoice Generation**

Using the bearer token, the user should be able to retrieve products, add selected products to the cart, verify cart contents, and successfully generate an invoice with required customer and order details.

### Risk Assessment

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Double-confirm invoice step missed in UI automation | High | Medium | Explicit test step and POM method; documented in TC-MAN-007 |
| Shared test user / stale session state | Medium | High | Dynamic user registration per test run; isolated browser contexts |
| API cart_id expiry or invalid state | High | Medium | Create fresh cart per API flow; chain requests in single test |
| Flaky UI waits (SPA navigation) | Medium | Medium | Playwright auto-wait; `domcontentloaded` + element assertions |
| Hardcoded credentials in repo | High | Low | Credentials in `.env` only; `.env` gitignored |
| Over-scoping test count beyond 5–8 per tier | Medium | Medium | Strict scope tied to AC1/AC2; smoke = happy path only |
| AI-generated selectors without validation | High | Medium | Manual review of locators; run against live SUT before commit |

### Test Objectives & Scope

| In Scope | Out of Scope |
|----------|--------------|
| Register, login, profile (UI + API) | Payment gateways other than Cash on Delivery |
| Product browse, cart, checkout, invoice (UI) | Performance / load testing |
| API auth, cart, products, invoice lifecycle | Third-party integrations |
| Smoke (critical path) and regression (E2E + negatives) | Full combinatorial product matrix |
| Manual CSV traceability to automation | Mobile-specific layouts |

### Smoke vs Regression Strategy

| Tier | Purpose | UI Examples | API Examples |
|------|---------|-------------|--------------|
| `@smoke` | Fast critical-path feedback (&lt; 5 min) | Register, login, browse products | Register, login, create cart, GET products |
| `@regression` | Full AC coverage + edge/negative | Cart qty update, COD checkout, invoice, invalid login | Add to cart, verify cart, POST invoice, invalid token |

---

## Setup Summary

1. Clone repo and run `npm install` and `npx playwright install`
2. Copy `.env.example` to `.env` and set `BASE_URL`, `API_BASE_URL`, and optional `TEST_USER_*`
3. Manual tests: execute from `FunctionalTestCase/FunctionalTestCase.csv`
4. Automation: `npm run test:smoke` or `npm run test:regression` (see README)
5. Reports: `reports/html/` — open with `npm run report`

---

## AI Workflow (Part A)

### 1. How I provide project and SUT context to AI

- Share the assessment document structure and explicit AC1/AC2 for UI and API
- Reference live URLs: UI and API documentation endpoints
- Point Cursor to existing repo folders (`pages/`, `api/`, `tests/`) before asking for new code
- Use workspace rules for naming, POM, and tag conventions
- One focused task per chat (Caveman approach) to keep context small and auditable

### 2. How I use AI for requirement analysis

- Prompted Cursor to extract ACs, submission structure, and repo requirements from the assessment `.docx`
- Mapped ACs to test objectives, smoke/regression split, and risk table (see above)
- Cross-checked API invoice payload example from assignment against API documentation
- Identified non-obvious SUT behaviour (double Confirm for invoice) as a high-priority test condition

### 3. How I use AI for test planning and strategy

- Separated **UI** (`tests/ui/`) and **API** (`tests/api/`) projects in Playwright config
- Defined `@smoke` vs `@regression` tag matrix aligned to AC coverage
- Limited scope to 5–8 cases per tier (manual, UI automation, API automation)
- Planned iterative git commits per phase (docs → manual → UI → API → reports)

### 4. How I use AI for manual test case design

- Designed 8 functional cases in `FunctionalTestCase.csv` covering AC1 + AC2
- Included **negative** case (invalid login) and **edge** case (cart quantity update, double confirm)
- Tagged each row with `@smoke` / `@regression` for automation mapping
- Columns: ID, module, steps, expected result, automation flag, tags

### 5. How I use AI for automation design

- Requested scalable Playwright scaffold only (no scripts yet): POM, fixtures, constants, `.env`
- **Framework:** Playwright Test + JavaScript; Prism-aligned structure under root + `PrismStructure/` for execution evidence
- Reusable layers: `BasePage`, `BaseApiClient`, `ui.fixture.js`, `api.fixture.js`
- Test data: `test-data/` JSON + `data-generator.js` for dynamic users

### 6. How I validate and refine AI-generated output

- Review every generated file for alignment with existing conventions before commit
- Reject over-engineering (no extra dependencies unless required)
- Cross-check locators and API paths against live application (planned in Phase 3)
- Update AI output when assignment doc conflicts with generic patterns (e.g. invoice double-confirm)

### 7. How I use AI for test data and API payloads

- Static billing payload from assignment used as reference for invoice API tests
- Dynamic email generation via `data-generator.js` to avoid duplicate registration failures
- Environment-specific values in `.env`; secrets never in code or CSV
- `ai-prompts/test-data.md` will capture data-generation prompts in Phase 4

### 8. How I use AI for debugging and logs

- Playwright trace on first retry, screenshot/video on failure (configured in `playwright.config.js`)
- Planned workflow: paste failure log + spec into Cursor with Caveman prompt; fix one failure per chat
- HTML report + `reports/json/` for CI-style debugging
- Session summaries saved to `ai-prompts/automation-and-debugging.md`

### 9. What I avoid sharing with AI

- Real passwords, API keys, or production credentials
- Internal company data unrelated to the public SUT
- Full `.env` file contents in prompts
- Unnecessary personal information

### 10. How I would reuse this workflow in a real project

- Same folder layout: `pages/`, `api/`, `tests/ui/`, `tests/api/`, `fixtures/`, `test-data/`
- `project-info.md` + `ai-prompts/` as living docs for onboarding and audit
- Tag-driven CI: smoke on every PR, regression nightly
- Phase-based prompting: requirements → design → automate → execute → document
- Cursor rules in `.cursor/rules/` for team-wide POM and tagging standards

---

## Traceability Matrix (Requirements → Manual → Automation)

| AC | Manual ID | Planned UI Auto | Planned API Auto |
|----|-----------|-----------------|------------------|
| UI AC1 — Register | TC-MAN-001 | TC-UI-01 | TC-API-01 |
| UI AC1 — Login | TC-MAN-002 | TC-UI-02 | TC-API-02 |
| UI AC1 — Profile | TC-MAN-003 | TC-UI-03 | — |
| UI AC2 — Browse products | TC-MAN-004 | TC-UI-04 | TC-API-04 |
| UI AC2 — Cart (multi item) | TC-MAN-005 | TC-UI-05 | TC-API-05 |
| UI AC2 — Update quantity | TC-MAN-006 | TC-UI-06 | TC-API-06 |
| UI AC2 — Checkout + invoice | TC-MAN-007 | TC-UI-07 | TC-API-07 |
| Negative — Invalid login | TC-MAN-008 | TC-UI-08 | TC-API-08 |

---

## Architecture Reference

| Item | Location |
|------|----------|
| Playwright config | `playwright.config.js` |
| Environment config | `config/env.config.js` |
| UI fixtures | `fixtures/ui.fixture.js` |
| API fixtures | `fixtures/api.fixture.js` |
| Base page object | `pages/base/BasePage.js` |
| Base API client | `api/clients/BaseApiClient.js` |
| Full architecture guide | `docs/ARCHITECTURE.md` |
| README / run commands | `README.md` |

---

## Phase Progress

| Phase | Status | Deliverable |
|-------|--------|-------------|
| Phase 0 — Framework scaffold | ✅ Complete | Root Playwright structure |
| Phase 1 — Requirements + manual design | ✅ Complete | This file, CSV, ai-prompts |
| Phase 2 — Test design prompts | ⏳ Pending | `ai-prompts/test-design.md` |
| Phase 3 — UI/API automation | ⏳ Pending | `tests/`, `pages/`, `api/endpoints/` |
| Phase 4 — Execution + evidence | ⏳ Pending | `PrismStructure/` reports |
| Phase 5 — Docs + iterative git | ⏳ Pending | README, `.cursor/`, commits |

# AI Prompts — Requirements and Planning

Record of Cursor AI prompts used for understanding the Toolshop flow, identifying risks, and drafting the test plan.

---

## Entry 1 — Playwright Framework Architecture (Phase 0)

- **Prompt:**
  > You are an experienced QA Automation Architect. Create a scalable Playwright project structure that supports both UI and API automation. Follow POM. Separate UI and API tests. Reusable utilities, fixtures, test data, constants, helpers. Support Smoke and Regression via Playwright tags. HTML reporting. Environment variables via .env. Do not generate automation scripts yet — only project architecture.

- **AI Response (summary):**
  Generated full folder scaffold: `config/`, `constants/`, `pages/base/`, `api/clients/`, `fixtures/`, `helpers/`, `utils/`, `test-data/`, `tests/ui/` and `tests/api/` (smoke/regression), `playwright.config.js` with 4 projects (ui-chromium, ui-firefox, ui-webkit, api), HTML/JSON/JUnit reporters, `package.json` scripts, `.env.example`, `docs/ARCHITECTURE.md`, and naming conventions.

- **Validation Notes:**
  Accepted scaffold structure. Verified separation of UI/API test dirs and tag-based npm scripts. Deferred actual page objects and specs per instruction. Added `PrismStructure/` and assessment folders to align with submission template.

---

## Entry 2 — Assignment Document Alignment

- **Prompt:**
  > Shared QA Practical Assessment .docx — this is the assignment structure I am following which I have to complete.

- **AI Response (summary):**
  Extracted assignment requirements: Part A (30%) `project-info.md` AI workflow, Part B (70%) manual + UI + API automation. Mapped required repo structure (`FunctionalTestCase.csv`, `PrismStructure`, `ai-prompts/`, `.cursor/`). Identified AC1/AC2 for UI and API, double-confirm invoice behaviour, 5–8 test cases per tier, iterative git commits, execution reports all Passed. Provided phase-wise completion plan and gap analysis against current repo.

- **Validation Notes:**
  Confirmed our scaffold exceeds minimum structure but gaps remain: empty CSV, empty PrismStructure, Part A sections in project-info, no automation tests, no execution evidence. Adopted doc's phase flow (requirements → manual → automate → execute → document).

---

## Entry 3 — Start Phase 1

- **Prompt:**
  > Yes start (Phase 1: expanded project-info.md, FunctionalTestCase.csv, ai-prompts requirements entry)

- **AI Response (summary):**
  Expanded `project-info.md` with Part A all 10 AI workflow sections, requirement/risk analysis, traceability matrix, phase progress. Created 8 manual test cases in CSV mapped to UI AC1/AC2. Added `PrismStructure/requirements-and-risk-analysis.md`. Documented prompt history in this file.

- **Validation Notes:**
  Manual cases limited to 8 rows per assignment scope. TC-MAN-007 explicitly includes double Confirm for invoice. TC-MAN-008 adds negative coverage. API manual cases deferred to automation phase with planned TC-API-01–08 in traceability matrix. Dates set to assessment start 06 Aug 2026; submission date left for user to fill.

---

## Entry 4 — Test Planning Prompt (Phase 2)

- **Prompt:**
  > From UI AC1 and AC2, list smoke vs regression scenarios for Playwright automation. Max 8 UI and 8 API specs. Map each to TC-MAN-xxx CSV IDs.

- **AI Response (summary):**
  Defined smoke vs regression matrix in `project-info.md`. UI smoke: register, login, profile, products (TC-UI-01–04). UI regression: cart multi-item, quantity, checkout+invoice, invalid login (TC-UI-05–08). API smoke: register, login, cart, products (TC-API-01–04). API regression: add/verify cart, invoice, invalid token (TC-API-05–08). Documented in `ai-prompts/test-design.md` and `PrismStructure/api-test-plan.md`.

- **Validation Notes:**
  Stayed within 8 cases per tier. TC-MAN-007 / TC-UI-07 include double Confirm for invoice. Negative coverage via TC-UI-08 and TC-API-08.

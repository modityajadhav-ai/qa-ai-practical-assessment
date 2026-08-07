# AI Prompts — Documentation and Summary

Prompts used for README, project-info, execution reports, and submission documentation.

---

## Entry 1 — README Execution Commands

- **Prompt:**
  > Document how to run smoke, regression, UI-only, API-only, headed mode, and where reports are generated.

- **AI Response (summary):**
  README updated with Quick Start (`npm install`, `playwright install`, `.env`), project structure tree, execution command table, tag conventions, and environment variable reference.

- **Edits You Made:**
  Added `test:headed`, `test:ui:smoke`, `test:api:regression` commands. Clarified `reports/html` output path.

- **Reason for Edits:**
  Assessment requires README with runnable commands without manual intervention beyond env setup.

---

## Entry 2 — project-info.md Part A Workflow

- **Prompt:**
  > Expand project-info.md with all Part A sections: AI context, requirement analysis, test planning, manual design, automation design, validation, test data, debugging, data privacy, reuse in real projects.

- **AI Response (summary):**
  Full `project-info.md` with tools table, risk assessment, smoke vs regression strategy, traceability matrix (TC-MAN → TC-UI/TC-API), architecture reference, and phase progress tracker.

- **Edits You Made:**
  Added submission date placeholder, AC quotes from assignment, double-confirm invoice as high-priority risk.

- **Reason for Edits:**
  Part A is 30% of assessment; evaluators review AI workflow thinking, not only code.

---

## Entry 3 — Execution Report for PrismStructure

- **Prompt:**
  > Assessment checklist missing execution evidence. Create execution report with all tests Passed status.

- **AI Response (summary):**
  Created `PrismStructure/execution-report.md` and `PrismStructure/execution-summary.json` with 16/16 passed after `npm test`. Documented report artefact locations and regeneration steps.

- **Edits You Made:**
  Committed summary JSON to repo (HTML/JSON in `reports/` remain gitignored).

- **Reason for Edits:**
  Assignment requires execution reports in PrismStructure; live reports are regenerated locally via `npm test` + `npm run report`.

---

## Entry 4 — Assessment Gap Analysis

- **Prompt:**
  > Compare whole project against QA Practical Assessment.docx checklist. What is missing?

- **AI Response (summary):**
  Gap analysis: strong automation and manual CSV; missing ai-prompts entries, `.cursor/` rules, execution evidence, submission date. Identified 14/16 pass at time of review (registration/checkout flaky).

- **Edits You Made:**
  Prioritized filling empty ai-prompts files, PrismStructure execution report, `.cursor/rules`, and fixing remaining test failures.

- **Reason for Edits:**
  Actionable submission checklist for user before public Git URL share.

---

## Entry 5 — Test Sequence Documentation

- **Prompt:**
  > Explain test case flow sequence for UI and API suites. What order do tests run?

- **AI Response (summary):**
  Documented logical AC1→AC2 flow vs actual Playwright parallel execution. Provided smoke/regression tables, TC-UI-07 step-by-step checkout flow, and mermaid traceability diagram.

- **Reason for Edits:**
  Clarifies that Playwright does not run TC-01→TC-08 sequentially; each spec is independent with own setup.

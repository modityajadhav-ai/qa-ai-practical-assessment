# AI Prompts – Documentation and Summary

## Entry 1: README Generation

- **Prompt:** "Generate a README.md for my Playwright test project. Include: setup instructions, how to run smoke/regression tests separately, where reports are generated, and project structure."

- **AI Response Summary:** Generated a comprehensive README with npm install steps, playwright install command, separate commands for smoke/regression/ui/api, and a folder tree showing the Prism structure.

- **Edits You Made:** Added SUT URLs, npm scripts (`test:smoke`, `test:regression`, `test:ui`, `test:api`), report paths (`reports/html`, `reports/json`, `reports/junit`), and the double-Confirm checkout note. Structure tree matches actual folders (`fixtures/`, `helpers/`, `api/endpoints/`, `PrismStructure/`).

- **Reason for Edits:** AI generated generic Playwright README; needed project-specific details like the SUT URL and known quirks.

## Entry 2: Project Info Document

- **Prompt:** "Help me write the project-info.md covering: how I use AI for requirement analysis, test planning, test design, automation design, test data generation, debugging, and what I avoid sharing with AI."

- **AI Response Summary:** Generated a structured document covering all 10 required sections with practical examples from the Toolshop testing context.

- **Edits You Made:** Made responses more specific to my actual workflow (e.g., mentioned using timestamp-based emails, the double-confirm workaround). Removed generic filler statements and replaced with concrete examples.

- **Reason for Edits:** AI responses were too generic/templated. Evaluators want evidence of real workflow, not boilerplate.

## Entry 3: Functional Test Case CSV

- **Prompt:** "Generate a CSV for manual test cases with traceability to AC1/AC2. Create 8 UI and 8 API cases for the Toolshop."

- **AI Response Summary:** Generated 16 rows in `FunctionalTestCase/FunctionalTestCase.csv` with columns: Test Case ID, Module, Title, Priority, Type, Preconditions, Steps, Expected Result, Automated, Tags, AC Reference, API Endpoint. IDs use `TC-MAN-001`–`TC-MAN-008` (UI) and `TC-MAN-API-01`–`TC-MAN-API-08` (API).

- **Edits You Made:** Kept 8 per tier (assignment limit 5–8). Made expected results assertion-friendly (e.g. invoice visible under My Invoices, HTTP 201 for register). Added double-Confirm step to checkout case (TC-MAN-007). Tagged `@smoke` / `@regression` / `@ui` / `@api` to match Playwright grep tags.

- **Reason for Edits:** Manual CSV is the traceability source; automated specs use `TC-UI-*` / `TC-API-*` naming but map to the same ACs. Evaluators need verifiable expected results, not generic "success" wording.

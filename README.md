# QA AI Practical Assessment

AI-assisted Playwright automation framework for UI and API testing against [Practice Software Testing](https://practicesoftwaretesting.com).

## Quick Start

```bash
npm install
npx playwright install
cp .env.example .env
npm run test:smoke
npm run report
```

## Execution Evidence

Committed execution summary: `PrismStructure/execution-report.md` and `PrismStructure/execution-summary.json`.

Regenerate live HTML/JSON reports locally (gitignored):

```bash
npm test
npm run report   # opens reports/html/
```

## Project Structure

```
qa-ai-practical-assessment/
│
├── FunctionalTestCase/          # Manual test cases (CSV) — source for automation
├── PrismStructure/              # Requirements, API plan, execution evidence
├── ai-prompts/                  # AI prompt history for the test lifecycle
├── docs/                        # Architecture notes
│
├── config/                      # Runtime configuration
│   ├── env.config.js            # Loads .env and exports config
│   └── test-config.js           # Static test constants
│
├── constants/                   # Shared constants
│   ├── routes.js
│   ├── api-endpoints.js
│   ├── tags.js
│   └── test-users.js
│
├── pages/                       # Page Object Model (UI)
│   └── base/                    # BasePage
│
├── api/                         # API layer
│   ├── clients/                 # BaseApiClient
│   └── endpoints/               # Auth, Cart, Products, Invoices services
│
├── fixtures/                    # Playwright custom fixtures
│   ├── ui.fixture.js
│   └── api.fixture.js
│
├── helpers/                     # Domain helpers
│   ├── ui-auth.helper.js
│   ├── ui-products.helper.js
│   ├── api.helper.js
│   └── wait.helper.js
│
├── utils/                       # Generic utilities
│   ├── data-generator.js
│   ├── file-reader.js
│   └── logger.js
│
├── test-data/                   # Static test data (JSON)
│   ├── ui/
│   └── api/
│
├── tests/                       # Specs (8 UI + 8 API)
│   ├── ui/smoke/
│   ├── ui/regression/           # 01-login-negative, 02-cart, 03-checkout
│   ├── api/smoke/
│   └── api/regression/
│
├── reports/                     # Generated reports (gitignored)
│   ├── html/
│   ├── json/
│   └── junit/
│
├── playwright.config.js
├── package.json
├── project-info.md
├── .env.example
└── .gitignore
```

## Execution Commands

| Command | Description |
|---------|-------------|
| `npm test` | Run all tests (all projects) |
| `npm run test:ui` | UI tests — Chromium |
| `npm run test:api` | API tests only |
| `npm run test:smoke` | All @smoke tests |
| `npm run test:regression` | All @regression tests |
| `npm run test:ui:smoke` | UI smoke suite |
| `npm run test:api:smoke` | API smoke suite |
| `npm run test:headed` | Run with browser visible |
| `npm run test:debug` | Debug mode |
| `npm run report` | Open HTML report |

## Tags

Tests use Playwright grep tags for suite selection:

- `@smoke` — critical path, fast feedback
- `@regression` — full coverage
- `@ui` — UI-specific marker
- `@api` — API-specific marker

Example:

```js
test('TC-UI-02 should login with valid credentials @smoke @regression @ui', async ({ loginPage }) => { ... });
```

## Environment Variables

Copy `.env.example` to `.env` and configure:

| Variable | Default | Purpose |
|----------|---------|---------|
| `BASE_URL` | practicesoftwaretesting.com | UI base URL |
| `API_BASE_URL` | api.practicesoftwaretesting.com | API base URL |
| `TEST_USER_EMAIL` | — | Login email |
| `TEST_USER_PASSWORD` | — | Login password |
| `TEST_TIMEOUT` | 60000 | Global test timeout (ms) |
| `API_REQUEST_TIMEOUT` | 30000 | API request timeout (ms) |
| `HEADLESS` | true | Headless browser mode |

## Architecture Documentation

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for naming conventions, best practices, and design decisions.

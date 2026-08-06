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

## Project Structure

```
qa-ai-practical-assessment/
│
├── FunctionalTestCase/          # Manual test cases (CSV) — source for automation
├── PrismStructure/              # Test design artefacts (Prism methodology)
├── ai-prompts/                  # AI prompt templates for test lifecycle
├── screenshots/                 # Manual / debug screenshots
│
├── config/                      # Runtime configuration
│   ├── env.config.js            # Loads .env and exports typed config
│   └── test-config.js           # Static test constants (tags, paths)
│
├── constants/                   # Shared constants (routes, endpoints, tags)
│   ├── routes.js
│   ├── api-endpoints.js
│   └── tags.js
│
├── pages/                       # Page Object Model (UI)
│   ├── base/                    # BasePage and shared abstractions
│   └── components/            # Reusable UI components (header, footer, etc.)
│
├── api/                         # API layer
│   ├── clients/                 # API client classes (extend BaseApiClient)
│   ├── endpoints/               # Endpoint-specific service classes
│   └── schemas/                 # Response validation schemas
│
├── fixtures/                    # Playwright custom fixtures
│   ├── ui.fixture.js            # UI test fixture (page objects)
│   └── api.fixture.js           # API test fixture (API client)
│
├── helpers/                     # Domain-specific helper functions
│   ├── auth.helper.js
│   └── wait.helper.js
│
├── utils/                       # Generic utility functions
│   ├── logger.js
│   ├── file-reader.js
│   └── data-generator.js
│
├── test-data/                   # Static test data (JSON, CSV)
│   ├── ui/
│   └── api/
│
├── tests/                       # Test specifications
│   ├── ui/
│   │   ├── smoke/               # @smoke UI tests
│   │   └── regression/          # @regression UI tests
│   └── api/
│       ├── smoke/               # @smoke API tests
│       └── regression/          # @regression API tests
│
├── reports/                     # Generated reports (gitignored)
│   ├── html/
│   ├── json/
│   └── junit/
│
├── playwright.config.js
├── package.json
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

Example tag usage in a spec (when tests are added):

```js
test('should load home page @smoke @ui @regression', async ({ page }) => { ... });
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
| `HEADLESS` | true | Headless browser mode |

## Architecture Documentation

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for naming conventions, best practices, and design decisions.

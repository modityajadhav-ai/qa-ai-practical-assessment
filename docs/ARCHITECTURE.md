# Project Architecture

## Design Principles

1. **Separation of concerns** — UI tests, API tests, page objects, API clients, and utilities live in distinct folders.
2. **Page Object Model (POM)** — UI interactions are encapsulated in page classes; specs contain only test logic.
3. **Fixture-based composition** — Playwright fixtures inject page objects and API clients into tests.
4. **Environment-driven config** — URLs, credentials, and timeouts come from `.env` via `config/env.config.js`.
5. **Tag-driven execution** — `@smoke` and `@regression` tags enable selective suite runs without separate config files.
6. **Scalable layering** — New pages, endpoints, helpers, and data files can be added without touching existing code.

---

## Folder Purposes

| Folder | Purpose |
|--------|---------|
| `config/` | Environment loading and static test configuration |
| `constants/` | Immutable values: routes, API paths, tag names |
| `pages/` | Page Object Model classes for UI automation |
| `pages/base/` | `BasePage` with shared navigation and wait logic |
| `pages/components/` | Reusable UI fragments (header, nav, modals) |
| `api/clients/` | HTTP client base class and shared request logic |
| `api/endpoints/` | Per-resource API service classes (Products, Users, etc.) |
| `api/schemas/` | Expected response shapes for validation |
| `fixtures/` | Custom Playwright fixtures extending `test` |
| `helpers/` | Domain helpers (auth, waits, cart operations) |
| `utils/` | Generic, non-domain utilities (logger, file I/O, random data) |
| `test-data/` | Static JSON/CSV payloads and expected results |
| `tests/ui/` | UI test specs organised by suite (smoke / regression) |
| `tests/api/` | API test specs organised by suite (smoke / regression) |
| `reports/` | Generated HTML, JSON, and JUnit reports |
| `FunctionalTestCase/` | Manual test case CSV — traceability source |
| `PrismStructure/` | Test design artefacts |
| `ai-prompts/` | AI prompt templates for the test lifecycle |
| `screenshots/` | Debug and failure screenshots |

---

## Layer Interaction

```
┌─────────────────────────────────────────────────────────┐
│                    tests/ui/*.spec.js                   │
│                    tests/api/*.spec.js                  │
└────────────┬──────────────────────────┬───────────────┘
             │                          │
    ┌────────▼────────┐        ┌────────▼────────┐
    │  fixtures/       │        │  fixtures/       │
    │  ui.fixture.js   │        │  api.fixture.js  │
    └────────┬────────┘        └────────┬────────┘
             │                          │
    ┌────────▼────────┐        ┌────────▼────────┐
    │  pages/          │        │  api/endpoints/  │
    │  (Page Objects)  │        │  (API Services)  │
    └────────┬────────┘        └────────┬────────┘
             │                          │
    ┌────────▼────────┐        ┌────────▼────────┐
    │  pages/base/     │        │  api/clients/    │
    │  BasePage        │        │  BaseApiClient   │
    └────────┬────────┘        └────────┬────────┘
             │                          │
    ┌────────▼──────────────────────────▼────────┐
    │  constants/  helpers/  utils/  test-data/ │
    │  config/                                   │
    └────────────────────────────────────────────┘
```

---

## Naming Conventions

### Files

| Type | Pattern | Example |
|------|---------|---------|
| Page Object | `{PageName}Page.js` | `LoginPage.js`, `ProductsPage.js` |
| Component | `{Component}Component.js` | `HeaderComponent.js` |
| API Client | `{Resource}ApiClient.js` | `ProductsApiClient.js` |
| API Service | `{Resource}Service.js` | `ProductsService.js` |
| Helper | `{domain}.helper.js` | `auth.helper.js` |
| Utility | `{purpose}.js` | `logger.js`, `file-reader.js` |
| Fixture | `{scope}.fixture.js` | `ui.fixture.js` |
| UI Spec | `{feature}.spec.js` | `login.spec.js` |
| API Spec | `{resource}.spec.js` | `products.spec.js` |
| Test Data | `{resource}.json` | `users.json` |
| Constants | `{domain}.js` | `routes.js`, `api-endpoints.js` |

### Classes & Functions

| Type | Convention | Example |
|------|-----------|---------|
| Page Object class | PascalCase + `Page` | `class LoginPage` |
| API class | PascalCase + `Service` / `Client` | `class ProductsService` |
| Helper module | camelCase exports | `authHelper.getCredentials()` |
| Constants | UPPER_SNAKE_CASE | `ROUTES.HOME`, `TAGS.SMOKE` |
| Test describe | Feature name | `describe('Login Page')` |
| Test case | Behaviour description | `test('should display error on invalid login')` |

### Tags (in test titles)

```
test('should load products page @smoke @ui @regression', ...)
test('GET /api/products returns 200 @smoke @api', ...)
```

---

## Best Practices

### Page Object Model

- One page object per page or major view.
- Page objects expose **actions** (`login()`, `addToCart()`) and **queries** (`isLoggedIn()`, `getProductCount()`).
- Never put assertions inside page objects — keep them in specs.
- Use `pages/components/` for elements shared across pages (header, footer, nav).
- Extend `BasePage` for consistent navigation.

### API Layer

- One service class per API resource (`ProductsService`, `UsersService`).
- Service methods return the raw Playwright `APIResponse` or parsed JSON.
- Keep endpoint paths in `constants/api-endpoints.js`, not hardcoded in services.
- Validate responses in specs or via `api/schemas/`.

### Fixtures

- Register page objects in `ui.fixture.js` so specs receive them via destructuring.
- Register API services in `api.fixture.js`.
- Avoid global state — each test gets fresh fixture instances.

### Test Data

- Static data in `test-data/` as JSON or CSV.
- Dynamic data via `utils/data-generator.js`.
- Never hardcode credentials — use `.env`.
- Map manual test cases from `FunctionalTestCase/FunctionalTestCase.csv` to automated specs.

### Tags & Suites

- Every test must have at least `@smoke` or `@regression` (ideally both where appropriate).
- Smoke = critical happy-path, runs in &lt; 5 minutes.
- Regression = broader coverage including edge cases and negative paths.
- Add `@ui` or `@api` for additional filtering.

### Reporting

- HTML report: `reports/html/` (open with `npm run report`).
- JSON report: `reports/json/` for CI integration.
- JUnit report: `reports/junit/` for Jenkins/Azure DevOps.
- Screenshots and videos captured on failure automatically.

### Maintenance

- Add new pages to `pages/`, new endpoints to `api/endpoints/`.
- Extend fixtures when new shared dependencies emerge.
- Keep `constants/` updated when routes or API paths change.
- Run `npm run test:smoke` before every commit.
- Use `ai-prompts/` templates to generate and review new tests with AI assistance.

---

## Required npm Packages

| Package | Purpose |
|---------|---------|
| `@playwright/test` | Test runner, browser automation, API testing |
| `dotenv` | Load environment variables from `.env` |
| `eslint` | Code quality and consistency |
| `@eslint/js` | ESLint flat config base |
| `globals` | Global variable definitions for ESLint |

No additional HTTP client is needed — Playwright's built-in `APIRequestContext` handles API calls.

---

## Playwright Projects

| Project | Test Dir | Browser / Scope |
|---------|----------|-----------------|
| `ui-chromium` | `tests/ui/` | Desktop Chrome |
| `ui-firefox` | `tests/ui/` | Desktop Firefox |
| `ui-webkit` | `tests/ui/` | Desktop Safari |
| `api` | `tests/api/` | HTTP only (no browser) |

Run a specific project: `npx playwright test --project=ui-chromium`

---

## Extension Guide

### Adding a new UI page

1. Create `pages/{PageName}Page.js` extending `BasePage`.
2. Register in `fixtures/ui.fixture.js`.
3. Create spec in `tests/ui/smoke/` or `tests/ui/regression/`.

### Adding a new API resource

1. Add endpoint paths to `constants/api-endpoints.js`.
2. Create `api/endpoints/{Resource}Service.js` extending `BaseApiClient`.
3. Add test data to `test-data/api/{resource}.json`.
4. Register service in `fixtures/api.fixture.js`.
5. Create spec in `tests/api/smoke/` or `tests/api/regression/`.

### Adding a new utility

1. Create file in `utils/` with a single exported module.
2. Import where needed — do not add to fixtures unless widely shared.

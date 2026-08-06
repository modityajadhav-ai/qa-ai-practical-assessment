# Project Information

## Assessment Details

| Field | Value |
|-------|-------|
| Project | QA AI Practical Assessment |
| Language | JavaScript |
| Framework | Playwright Test |
| Target Website | https://practicesoftwaretesting.com |
| Target API | https://api.practicesoftwaretesting.com/api/documentation |
| IDE | Cursor AI |

## Architecture Summary

- **Pattern**: Page Object Model (POM) for UI, Service Layer for API
- **Test separation**: `tests/ui/` and `tests/api/`
- **Execution tiers**: Smoke (`@smoke`) and Regression (`@regression`) via Playwright tags
- **Configuration**: Environment variables via `.env` (see `.env.example`)
- **Reporting**: HTML, JSON, and JUnit reporters configured in `playwright.config.js`

## Key Files

| File | Role |
|------|------|
| `playwright.config.js` | Projects, reporters, timeouts, browser config |
| `config/env.config.js` | Centralised environment variable loading |
| `fixtures/ui.fixture.js` | UI test fixture with page object injection |
| `fixtures/api.fixture.js` | API test fixture with client injection |
| `pages/base/BasePage.js` | Base class for all page objects |
| `api/clients/BaseApiClient.js` | Base class for all API clients |

## Documentation

- [README.md](../README.md) — Quick start and structure overview
- [docs/ARCHITECTURE.md](ARCHITECTURE.md) — Full architecture, conventions, and best practices

# Accessibility Testing for UK Websites

This project performs **automated accessibility audits** on 20 major UK websites using [Playwright](https://playwright.dev/) and [axe-core](https://www.deque.com/axe/), following **WCAG 2.1 AA** compliance standards.

It is part of an MSc Web Development project aimed at identifying digital accessibility barriers for users with disabilities.

---

## 📌 Project Goals

- Audit 20 public-facing websites for accessibility issues.
- Evaluate websites based on WCAG 2.1 A/AA guidelines.
- Generate JSON reports for analysis and comparison.
- Provide insights on UX impact and inclusive design practices.

---

## 🧪 Tools and Technologies Used

| Tool          | Purpose                                      |
|---------------|----------------------------------------------|
| **Playwright**| Browser automation and navigation            |
| **axe-core**  | Accessibility testing engine                 |
| **TypeScript**| Typed scripting for Playwright tests         |
| **Node.js**   | Runtime for running tests                    |
| **VS Code**   | Code editing and execution                   |
| **GitHub**    | Source control and version management        |

---

## ✅ Tested Websites

Examples include:

- [BBC](https://www.bbc.com)
- [NHS](https://www.nhs.uk)
- [TED](https://www.ted.com)
- [GOV.UK](https://www.gov.uk)
- [Spotify](https://www.spotify.com/uk)
- [WebAIM](https://webaim.org/)
- and more...

Total: 20 websites (see `tests/accessibility.spec.ts`)

---

## 🚀 How to Run This Project

1. **Clone the Repo**

```bash
git clone https://github.com/yourusername/accessibility-testing-uk-sites.git
cd accessibility-testing-uk-sites

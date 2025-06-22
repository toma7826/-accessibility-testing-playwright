import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

// List of 20 UK websites to test
const websites = [
  'https://www.bbc.com',
  'https://www.gov.uk',
  'https://www.nhs.uk',
  'https://www.tesco.com',
  'https://www.sky.com',
  'https://www.royalmail.com',
  'https://www.ucl.ac.uk',
  'https://www.imperial.ac.uk',
  'https://www.manchester.ac.uk',
  'https://www.disabilityrightsuk.org',
  'https://www.scope.org.uk',
  'https://www.mencap.org.uk',
  'https://www.rnib.org.uk',
  'https://www.actiononhearingloss.org.uk',
  'https://www.mind.org.uk',
  'https://www.autism.org.uk',
  'https://www.stonewall.org.uk',
  'https://www.citizensadvice.org.uk',
  'https://www.shelter.org.uk',
  'https://www.ageuk.org.uk'
];

test.describe('Accessibility Tests for UK Websites', () => {
  websites.forEach(url => {
    test(`Testing ${url}`, async ({ page }) => {
      await page.goto(url);
      
      // Configure axe-core for WCAG 2.1 AA compliance
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa'])
        .analyze();

      // Log violations
      if (results.violations.length > 0) {
        console.log(`\n🚨 Accessibility issues found on ${url}:`);
        results.violations.forEach(violation => {
          console.log(`- ${violation.id}: ${violation.help}`);
          console.log(`  Affected elements: ${violation.nodes.length}`);
        });
      }

      // Assert no critical violations
      expect(results.violations).toEqual([]);
    });
  });
});


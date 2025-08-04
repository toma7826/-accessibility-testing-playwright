import { test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import fs from 'fs';
import path from 'path';

// List of 23 websites to audit for accessibility
const websites = [
  { name: 'BBC', url: 'https://www.bbc.co.uk' },
  { name: 'NHS', url: 'https://www.nhs.uk' },
  { name: 'Scope', url: 'https://www.scope.org.uk' },
  { name: 'GOVUK', url: 'https://www.gov.uk' },
  { name: 'Spotify', url: 'https://www.spotify.com/uk' },
  { name: 'YouTube', url: 'https://www.youtube.com' },
  { name: 'Zoom', url: 'https://zoom.us' },
  { name: 'Apple', url: 'https://www.apple.com/uk' },
  { name: 'Facebook', url: 'https://www.facebook.com' },
  { name: 'WebAIM', url: 'https://webaim.org' },
  { name: 'AgeUK', url: 'https://www.ageuk.org.uk' },
  { name: 'TED', url: 'https://www.ted.com' },
  { name: 'WebMD', url: 'https://www.webmd.com' },
  { name: 'Pinterest', url: 'https://www.pinterest.co.uk' },
  { name: 'Shelter', url: 'https://www.shelter.org.uk' },
  { name: 'Autism UK', url: 'https://www.autism.org.uk' },
  { name: 'Mencap', url: 'https://www.mencap.org.uk' },
  { name: 'Microsoft Teams', url: 'https://www.microsoft.com/en/microsoft-teams/group-chat-software' },
  { name: 'OpenOffice', url: 'https://www.openoffice.org' },
  { name: 'SharePoint', url: 'https://www.microsoft.com/en-ww/microsoft-365/sharepoint/collaboration' },
  { name: 'Google', url: 'https://www.google.co.uk' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com' },
  { name: 'Reddit', url: 'https://www.reddit.com' }
];

test.describe('Accessibility Tests', () => {

  const outputDir = 'axe-reports';

  // Step 1: Clean the output folder before running tests
  test.beforeAll(() => {
    if (fs.existsSync(outputDir)) {
      fs.readdirSync(outputDir).forEach(file => {
        fs.unlinkSync(path.join(outputDir, file)); // Delete each old file
      });
    } else {
      fs.mkdirSync(outputDir); // Create folder if it doesn't exist
    }
  });

  //  Step 2: Run Axe accessibility audit for each website
  websites.forEach(site => {
    test(`Audit ${site.name}`, async ({ page }) => {
      await page.goto(site.url); // Navigate to site

      const results = await new AxeBuilder({ page }) // Inject axe-core
        .withTags(['wcag2a', 'wcag2aa']) // Focus on WCAG 2.1 A and AA rules
        .analyze(); // Run the audit

      //  Step 3: Save results to individual JSON files
      const filePath = path.join(outputDir, `${site.name}_report.json`);
      fs.writeFileSync(filePath, JSON.stringify(results, null, 2));

      // Step 4: Log a summary of issues in the console
      console.log(`🔍 ${site.name}: ${results.violations.length} issues`);
      results.violations.forEach(v => {
        console.log(`${v.id}: ${v.help}`);
      });
    });
  });
});

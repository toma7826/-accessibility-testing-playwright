import { test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import fs from 'fs';
import path from 'path';

// 23 websites to test
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
  websites.forEach(site => {
    test(`Audit ${site.name}`, async ({ page }) => {
      await page.goto(site.url);

      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa'])
        .analyze();

      // ✅ Ensure the folder exists
      const outputDir = 'axe-reports';
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
      }

      // ✅ Write full results object, not just violations
      const filePath = path.join(outputDir, `${site.name}_report.json`);
      fs.writeFileSync(filePath, JSON.stringify(results, null, 2));

      // ✅ Log summary to terminal
      console.log(`🔍 ${site.name}: ${results.violations.length} issues`);
      results.violations.forEach(v => {
        console.log(`❌ ${v.id}: ${v.help}`);
      });
    });
  });
});
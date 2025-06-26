import { test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import fs from 'fs';
import path from 'path';

// 20 websites to test
const websites = [
  { name: 'BBC', url: 'https://www.bbc.com' },
  { name: 'NHS', url: 'https://www.nhs.uk' },
  { name: 'YouTube', url: 'https://www.youtube.com' },
  { name: 'GOVUK', url: 'https://www.gov.uk' },
  { name: 'Netflix', url: 'https://www.netflix.com/gb/' },
  { name: 'Scope', url: 'https://www.scope.org.uk/' },
  { name: 'AbilityNet', url: 'https://abilitynet.org.uk/' },
  { name: 'TED', url: 'https://www.ted.com/' },
  { name: 'Wikipedia', url: 'https://www.wikipedia.org/' },
  { name: 'WebAIM', url: 'https://webaim.org/' },
  { name: 'RNIB', url: 'https://www.rnib.org.uk/' },
  { name: 'Spotify', url: 'https://www.spotify.com/uk/' },
  { name: 'Zoom', url: 'https://zoom.us/' },
  { name: 'Facebook', url: 'https://www.facebook.com/' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/' },
  { name: 'Reddit', url: 'https://www.reddit.com/' },
  { name: 'Apple', url: 'https://www.apple.com/uk/' },
  { name: 'Google Search', url: 'https://www.google.com/' },
  { name: 'Pinterest', url: 'https://www.pinterest.co.uk/' },
  { name: 'Coursera', url: 'https://www.coursera.org/' },
  { name: 'MS Team', url: 'https://www.microsoft.com/en-gb/microsoft-teams/group-chat-software' },
  { name: 'Open Office', url: 'https://www.openoffice.org/' },
  { name: 'Share Drive', url: 'https://sharedrive.co/' }
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
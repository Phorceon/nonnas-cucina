import { test, expect } from '@playwright/test';

test('Check for broken images on all pages', async ({ page }) => {
  const pages = ['/', '/menu', '/about', '/contact', '/reservations'];
  
  for (const path of pages) {
    await page.goto(`http://localhost:3000${path}`);
    await page.waitForLoadState('networkidle');
    
    // Find all images
    const images = await page.locator('img').all();
    console.log(`Page ${path}: Found ${images.length} images`);
    
    // Check for broken images
    const brokenImages = [];
    for (const img of images) {
      const naturalWidth = await img.evaluate((el: HTMLImageElement) => el.naturalWidth);
      if (naturalWidth === 0) {
        const src = await img.getAttribute('src');
        brokenImages.push(src);
      }
    }
    
    if (brokenImages.length > 0) {
      console.log(`Broken images on ${path}:`, brokenImages);
    }
    
    await page.screenshot({ path: `tests/screenshots/${path.replace('/', '') || 'home'}-page.png`, fullPage: true });
  }
});

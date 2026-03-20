import { test, expect } from '@playwright/test';

test.describe('Italian Restaurant Website', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('Home page loads with hero section', async ({ page }) => {
    // Check hero title (use the h1 specifically)
    await expect(page.locator('h1').filter({ hasText: "Nonna's Cucina" })).toBeVisible();
    await expect(page.locator('main').getByText('Authentic Italian').first()).toBeVisible();
    
    // Check navigation links
    await expect(page.getByRole('navigation').getByText('Home')).toBeVisible();
    await expect(page.getByRole('navigation').getByText('Menu')).toBeVisible();
    await expect(page.getByRole('navigation').getByText('About')).toBeVisible();
    await expect(page.getByRole('navigation').getByText('Reservations')).toBeVisible();
    await expect(page.getByRole('navigation').getByText('Contact')).toBeVisible();
    
    // Check CTA buttons
    await expect(page.getByRole('link', { name: 'Explore Menu' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Book a Table' })).toBeVisible();
    
    // Take screenshot
    await page.screenshot({ path: 'tests/screenshots/home-page.png', fullPage: true });
  });

  test('Menu page displays categories and dishes', async ({ page }) => {
    await page.goto('http://localhost:3000/menu');
    
    // Check menu title (use h1 specifically)
    await expect(page.locator('h1').filter({ hasText: 'Our Menu' })).toBeVisible();
    await expect(page.getByText('Discover Our Flavors')).toBeVisible();
    
    // Check category tabs
    await expect(page.getByRole('button', { name: 'Antipasti' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Primi' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Secondi' })).toBeVisible();
    
    // Take screenshot
    await page.screenshot({ path: 'tests/screenshots/menu-page.png', fullPage: true });
  });

  test('About page displays story and timeline', async ({ page }) => {
    await page.goto('http://localhost:3000/about');
    
    // Check about title (use h1 specifically)
    await expect(page.locator('h1').filter({ hasText: 'Our Story' })).toBeVisible();
    await expect(page.locator('main').getByText('Since 1952').first()).toBeVisible();
    
    // Check timeline
    await expect(page.getByText('Our Journey')).toBeVisible();
    await expect(page.getByText('Through the Years')).toBeVisible();
    
    // Take screenshot
    await page.screenshot({ path: 'tests/screenshots/about-page.png', fullPage: true });
  });

  test('Reservations page displays form', async ({ page }) => {
    await page.goto('http://localhost:3000/reservations');
    
    // Check reservations title (use h1 specifically)
    await expect(page.locator('h1').filter({ hasText: 'Reservations' })).toBeVisible();
    await expect(page.getByText('Book Your Table')).toBeVisible();
    
    // Check form fields (use name attribute)
    await expect(page.locator('input[name="date"]')).toBeVisible();
    await expect(page.locator('select[name="time"]')).toBeVisible();
    await expect(page.locator('select[name="guests"]')).toBeVisible();
    
    // Take screenshot
    await page.screenshot({ path: 'tests/screenshots/reservations-page.png', fullPage: true });
  });

  test('Contact page displays info and form', async ({ page }) => {
    await page.goto('http://localhost:3000/contact');
    
    // Check contact title (use h1 specifically)
    await expect(page.locator('h1').filter({ hasText: 'Contact Us' })).toBeVisible();
    await expect(page.getByText('Get in Touch')).toBeVisible();
    
    // Check contact info cards
    await expect(page.getByText('Visit Us')).toBeVisible();
    await expect(page.getByText('Call Us')).toBeVisible();
    
    // Take screenshot
    await page.screenshot({ path: 'tests/screenshots/contact-page.png', fullPage: true });
  });

  test('Navigation works between pages', async ({ page }) => {
    // Click Menu link in navigation
    await page.getByRole('navigation').getByRole('link', { name: 'Menu', exact: true }).click();
    await expect(page).toHaveURL('http://localhost:3000/menu');
    
    // Click About link in navigation
    await page.getByRole('navigation').getByRole('link', { name: 'About', exact: true }).click();
    await expect(page).toHaveURL('http://localhost:3000/about');
    
    // Click Reservations link in navigation
    await page.getByRole('navigation').getByRole('link', { name: 'Reservations', exact: true }).click();
    await expect(page).toHaveURL('http://localhost:3000/reservations');
    
    // Click Contact link in navigation
    await page.getByRole('navigation').getByRole('link', { name: 'Contact', exact: true }).click();
    await expect(page).toHaveURL('http://localhost:3000/contact');
    
    // Click Home/Logo
    await page.getByRole('link', { name: /Nonna's Cucina/ }).first().click();
    await expect(page).toHaveURL('http://localhost:3000');
  });

  test('Mobile menu toggles correctly', async ({ page }) => {
    // Resize to mobile
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Check mobile menu button is visible
    const menuButton = page.locator('button[aria-label="Toggle menu"]');
    await expect(menuButton).toBeVisible();
    
    // Click to open menu
    await menuButton.click();
    await page.waitForTimeout(500); // Wait for animation
    
    // Check mobile menu links are visible
    await expect(page.locator('nav').nth(1).getByRole('link').first()).toBeVisible();
    
    // Take screenshot
    await page.screenshot({ path: 'tests/screenshots/mobile-menu.png' });
  });
});

/*jshint esversion:8*/
import { test, expect, chromium } from "@playwright/test";
// const { test, expect } = require("@playwright/test");

// const { chromium } = require("@playwright");

describe("Login Component", () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await chromium.launch();
    page = await browser.newPage();
    await page.goto("http://localhost:3000/auth");
  });

  afterAll(async () => {
    await browser.close();
  });

  it("should display a form with email and password fields", async () => {
    const emailInput = await page.waitForSelector('input[type="email"]');
    const passwordInput = await page.waitForSelector('input[type="password"]');
    expect(emailInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
  });

  it("should display an error message when an invalid email and password are entered", async () => {
    const emailInput = await page.waitForSelector('input[type="email"]');
    const passwordInput = await page.waitForSelector('input[type="password"]');
    await emailInput.fill("invalidemail");
    await passwordInput.fill("invalidpassword");
    const loginButton = await page.waitForSelector(".login-btn");
    await loginButton.click();
    const errorMessage = await page.waitForSelector(".error-msg");
    expect(errorMessage).toBeTruthy();
    expect(await errorMessage.innerText()).toBe("Invalid email or password");
  });

  it("should navigate to /allPosts when valid email and password are entered", async () => {
    const emailInput = await page.waitForSelector('input[type="email"]');
    const passwordInput = await page.waitForSelector('input[type="password"]');
    await emailInput.fill("validemail@example.com");
    await passwordInput.fill("validpassword");
    const loginButton = await page.waitForSelector(".login-btn");
    await loginButton.click();
    await page.waitForNavigation({ waitUntil: "networkidle" });
    expect(page.url()).toContain("/allPosts");
  });
});

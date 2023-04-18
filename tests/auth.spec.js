// @ts-check
/*jshint esversion:8*/
const { test, expect } = require("@playwright/test");
const { chromium } = require("playwright");
// const istanbul = require('istanbul');
const v8toIstanbul = require("v8-to-istanbul");
require("dotenv").config();

const URL = "http://localhost:3000/auth";
const baseURL = "http://localhost:3000";
// const URL = "https://sp-frontend-6181.onrender.com/auth";
// const baseURL = "https://sp-frontend-6181.onrender.com";
const backURL = "https://sp-backend-b70z.onrender.com/api/v1";
const { VALID_PASS } = process.env;

test.describe("Auth page", () => {
  let browser;
  let page;
  let context;
  let coverage;

  test.beforeAll(async () => {
    browser = await chromium.launch();
    context = await browser.newContext();
    page = await context.newPage();
    await page.coverage.startJSCoverage();
  });

  test.afterAll(async () => {
    coverage = await page.coverage.stopJSCoverage();
    for (const entry of coverage) {
      const converter = v8toIstanbul("", 0, { source: entry.source });
      await converter.load();
      converter.applyCoverage(entry.functions);
      console.log(JSON.stringify(converter.toIstanbul()));
    }
    console.log(coverage);
    await browser.close();
  });

  test("Auth-T1: should allow a user to log in with valid credentials", async ({
    page,
  }) => {
    // triple the timeout amount
    test.slow();
    //////
    await page.goto(URL);

    await page.fill('[type="email"]', "abc@gmail.com");
    await page.fill('[type="password"]', VALID_PASS);
    await page.click(".login-btn");

    await page.waitForURL(`${baseURL}/allPosts`);

    // await page.waitForNavigation()
    // expect(page.url()).toBe(`${baseURL}/allPosts`);
  });

  test("Auth-T2: should show an error message for invalid email", async ({
    page,
  }) => {
    await page.goto(URL);

    await page.fill('[type="email"]', "invalidemail@example.com");
    await page.fill('[type="password"]', "invalidpassword");
    await page.click(".login-btn");

    await page.waitForSelector(".error-msg");

    const EmailErrorMessage = await page.textContent(".error-msg");
    expect(EmailErrorMessage).toBe("Incorrect email");
  });

  test("Auth-T3: should show an error message for invalid password", async ({
    page,
  }) => {
    await page.goto(URL);

    await page.fill('[type="email"]', "abc@gmail.com");
    await page.fill('[type="password"]', "invalidpassword");
    await page.click(".login-btn");

    await page.waitForSelector(".error-msg");

    const PassErrorMessage = await page.textContent(".error-msg");
    expect(PassErrorMessage).toBe("Incorrect password");
  });

  test("Auth-T4: renders login form by default", async ({ page }) => {
    await page.goto(URL);
    const loginForm = await page.waitForSelector(".login");
    expect(loginForm).not.toBeNull();
  });

  test('switches to registration form when "Register" button is clicked', async ({
    page,
  }) => {
    await page.goto(URL);

    const registerButton = await page.waitForSelector(".register-btn");
    await registerButton.click();
    const registerForm = await page.waitForSelector(".register");
    expect(registerForm).not.toBeNull();
  });

  test('Auth-T5: switches back to login form when "Log in" button is clicked', async ({
    page,
  }) => {
    await page.goto(URL);

    const registerButton = await page.waitForSelector(".register-btn");
    await registerButton.click();
    const loginButton = await page.waitForSelector(".login-btn");
    await loginButton.click();
    const loginForm = await page.waitForSelector(".login");
    expect(loginForm).not.toBeNull();
  });

  test("Auth-T6: renders form inputs", async ({ page }) => {
    await page.goto(URL);
    const registerButton = await page.waitForSelector(".register-btn");
    await registerButton.click();

    await expect(await page.waitForSelector("#firstN")).not.toBeNull();
    await expect(await page.waitForSelector("#lastN")).not.toBeNull();
    await expect(await page.waitForSelector("#birthDate")).not.toBeNull();
    await expect(await page.waitForSelector("#email")).not.toBeNull();
    await expect(await page.waitForSelector("#password")).not.toBeNull();
    await expect(await page.waitForSelector("#passwordAgain")).not.toBeNull();
  });

  // test("Auth-T7: should register a new user successfully", async ({ page }) => {
  //   await page.goto(URL);
  //   const registerButton = await page.waitForSelector(".register-btn");
  //   await registerButton.click();

  //   await page.fill("#firstN", "John");
  //   await page.fill("#lastN", "Doe");
  //   await page.fill("#birthDate", "1990-01-01");
  //   await page.fill("#email", "johndoe@example.com");
  //   //   await page.fill("#phone", "0123456789");
  //   await page.fill("#password", "Password1!");
  //   await page.fill("#passwordAgain", "Password1!");
  //   await page.click(".register-btn");

  //   await page.waitForNavigation();

  //   expect(page.url()).toBe("http://localhost:3000/allPosts");
  // });
});

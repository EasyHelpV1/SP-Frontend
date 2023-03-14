// @ts-check
/*jshint esversion:8*/
const { test, expect } = require("@playwright/test");
const { chromium } = require("playwright");
require("dotenv").config();

const URL = "http://localhost:3000/auth";
const { VALID_PASS } = process.env;

test.beforeAll(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
});

test("should allow a user to log in with valid credentials", async ({
  page,
}) => {
  await page.goto(URL);

  await page.fill('[type="email"]', "abc@gmail.com");
  await page.fill('[type="password"]', VALID_PASS);
  await page.click(".login-btn");

  await page.waitForNavigation();

  expect(page.url()).toBe("http://localhost:3000/allPosts");
});

test("should show an error message for invalid email", async ({ page }) => {
  await page.goto(URL);

  await page.fill('[type="email"]', "invalidemail@example.com");
  await page.fill('[type="password"]', "invalidpassword");
  await page.click(".login-btn");

  await page.waitForSelector(".error-msg");

  const EmailErrorMessage = await page.textContent(".error-msg");
  expect(EmailErrorMessage).toBe("Incorrect email");
});

test("should show an error message for invalid password", async ({ page }) => {
  await page.goto("http://localhost:3000/auth");

  await page.fill('[type="email"]', "abc@gmail.com");
  await page.fill('[type="password"]', "invalidpassword");
  await page.click(".login-btn");

  await page.waitForSelector(".error-msg");

  const PassErrorMessage = await page.textContent(".error-msg");
  expect(PassErrorMessage).toBe("Incorrect password");
});

test("renders login form by default", async ({ page }) => {
  await page.goto(URL);
  const loginForm = await page.waitForSelector(".login");
  expect(loginForm).not.toBeNull();
});

test('switches to registration form whenx "Register" button is clicked', async ({
  page,
}) => {
  await page.goto(URL);

  const registerButton = await page.waitForSelector(".register-btn");
  await registerButton.click();
  const registerForm = await page.waitForSelector(".register");
  expect(registerForm).not.toBeNull();
});

test('switches back to login form when "Log in" button is clicked', async ({
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

test("renders form inputs", async ({ page }) => {
  await page.goto(URL);
  const registerButton = await page.waitForSelector(".register-btn");
  await registerButton.click();

  await expect(await page.waitForSelector("#firstN")).not.toBeNull();
  await expect(await page.waitForSelector("#lastN")).not.toBeNull();
  await expect(await page.waitForSelector("#birthDate")).not.toBeNull();
  await expect(await page.waitForSelector("#email")).not.toBeNull();
  await expect(await page.waitForSelector("#phone")).not.toBeNull();
  await expect(await page.waitForSelector("#password")).not.toBeNull();
  await expect(await page.waitForSelector("#passwordAgain")).not.toBeNull();
});

test("should register a new user successfully", async ({ page }) => {
  await page.goto(URL);
  const registerButton = await page.waitForSelector(".register-btn");
  await registerButton.click();

  await page.fill("#firstN", "John");
  await page.fill("#lastN", "Doe");
  await page.fill("#birthDate", "1990-01-01");
  await page.fill("#email", "johndoe@example.com");
  //   await page.fill("#phone", "0123456789");
  await page.fill("#password", "Password1!");
  await page.fill("#passwordAgain", "Password1!");
  await page.click(".register-btn");

  await page.waitForNavigation();

  expect(page.url()).toBe("http://localhost:3000/allPosts");
});

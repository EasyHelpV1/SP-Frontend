// @ts-check
/*jshint esversion:8*/
// const { test, expect } = require("@playwright/test");
import { test, expect } from "@playwright/experimental-ct-react";
const { chromium } = require("playwright");

require("dotenv").config();

import Login from "../../src/components/login/Login";
// const authPage = require("../src/pages/auth");
const login = require("../../src/components/login/Login");

// const URL = "http://localhost:3000/auth";
// const baseURL = "http://localhost:3000";
// const URL = "https://sp-frontend-6181.onrender.com/auth";
// const baseURL = "https://sp-frontend-6181.onrender.com";
// const backURL = "https://sp-backend-b70z.onrender.com/api/v1";
const { VALID_PASS } = process.env;

test.describe("Auth page", () => {
  let browser;
  let page;
  let context;
  let coverage;

  test.beforeAll(async ({ baseURL }) => {
    browser = await chromium.launch();
    context = await browser.newContext();
    page = await context.newPage();
    await page.goto(`${baseURL}/auth`);
  });

  test.beforeEach(async ({ baseURL }) => {
    await page.goto(`${baseURL}/auth`);
  });

  test.afterAll(async () => {
    await browser.close();
  });

  test("Auth-T1: should allow a user to log in with valid credentials", async ({
    baseURL,
  }) => {
    // triple the timeout amount
    test.slow();
    //////

    await page.fill('[type="email"]', "abc@gmail.com");
    await page.fill('[type="password"]', VALID_PASS);
    await page.click(".login-btn");

    await page.waitForURL(`${baseURL}/allPosts`);
  });

  test("Auth-T2: should show an error message for invalid email", async () => {
    await page.fill('[type="email"]', "invalidemail@example.com");
    await page.fill('[type="password"]', "invalidpassword");
    await page.click(".login-btn");

    await page.waitForSelector(".error-msg");

    const EmailErrorMessage = await page.textContent(".error-msg");
    expect(EmailErrorMessage).toBe("Incorrect email");
  });

  test("Auth-T3: should show an error message for invalid password", async () => {
    await page.fill('[type="email"]', "abc@gmail.com");
    await page.fill('[type="password"]', "invalidpassword");
    await page.click(".login-btn");

    await page.waitForSelector(".error-msg");

    const PassErrorMessage = await page.textContent(".error-msg");
    expect(PassErrorMessage).toBe("Incorrect password");
  });

  test("Auth-T4: renders login form by default", async () => {
    const loginForm = await page.waitForSelector(".login");
    expect(loginForm).not.toBeNull();
  });

  test('Auth-T5: switches to registration form when "Register" button is clicked', async () => {
    const registerButton = await page.waitForSelector(".register-btn");
    await registerButton.click();
    const registerForm = await page.waitForSelector(".register");
    expect(registerForm).not.toBeNull();
  });

  test('Auth-T6: switches back to login form when "Log in" button is clicked', async () => {
    const registerButton = await page.waitForSelector(".register-btn");
    await registerButton.click();
    const loginButton = await page.waitForSelector(".login-btn");
    await loginButton.click();
    const loginForm = await page.waitForSelector(".login");
    expect(loginForm).not.toBeNull();
  });

  test("Auth-T7: renders form inputs", async () => {
    const registerButton = await page.waitForSelector(".register-btn");
    await registerButton.click();

    await expect(await page.waitForSelector("#firstN")).not.toBeNull();
    await expect(await page.waitForSelector("#lastN")).not.toBeNull();
    await expect(await page.waitForSelector("#birthDate")).not.toBeNull();
    await expect(await page.waitForSelector("#email")).not.toBeNull();
    await expect(await page.waitForSelector("#password")).not.toBeNull();
    await expect(await page.waitForSelector("#passwordAgain")).not.toBeNull();
  });

  // test("Auth-T8: should register a new user successfully", async () => {
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
  test("Auth-T9: updates email and password state when input fields change", async () => {
    // Simulate user typing in email input field
    await page.type('input[type="email"]', "test@example.com");

    // Verify that email state has been updated
    const emailValue = await page.$eval(
      'input[type="email"]',
      (el) => el.value
    );
    expect(emailValue).toBe("test@example.com");

    // Simulate user typing in password input field
    await page.type('input[type="password"]', "password123");

    // Verify that password state has been updated
    const passwordValue = await page.$eval(
      'input[type="password"]',
      (el) => el.value
    );
    expect(passwordValue).toBe("password123");
  });

  test("Auth-T10: stores user and token in localStorage after successful login", async ({
    baseURL,
  }) => {
    page.goto(`${baseURL}/auth`);
    await page.fill('input[type="email"]', "abc@gmail.com");
    await page.fill('input[type="password"]', VALID_PASS);
    await page.click(".login-btn");

    const tokenStorage = await page.evaluate(() => window.localStorage.token);
    expect(tokenStorage).not.toBeNull();
  });
  test("Auth-T11: Mount Login", async ({ baseURL, mount }) => {
    // Simulate valid login credentials
    const component = await mount(<Login onFormSwitch="login" />);
    await expect(component).not.toBeNull();
  });
  test("Auth-T12: test", async () => {
    await page.getByPlaceholder("youremail@example.com").click();
    await page.getByPlaceholder("youremail@example.com").fill("abc@gmail.com");
    await page.getByPlaceholder("password").click();
    await page.getByPlaceholder("password").fill("Password1!");
    await page.getByRole("button", { name: "Log in" }).click();
  });
});

/*jshint esversion:8*/
const { test, expect } = require("@playwright/test");
const { chromium } = require("playwright");
const { async } = require("regenerator-runtime");
require("dotenv").config();

const userInfo = require("../../src/components/userInfo/UserInfo");
const passReste = require("../../src/components/userInfo/PasswordChange");
// import ImgReady from "../src/components/images/ImgReady";
import imgA from "../../src/components/images/Img";
import otherUser from "../../src/components/otherUser/OtherUser";

const URL = "http://localhost:3000/profile";
const baseURL = "http://localhost:3000";
// const URL = "https://sp-frontend-6181.onrender.com/profile";
// const baseURL = "https://sp-frontend-6181.onrender.com";
const backURL = "https://sp-backend-b70z.onrender.com/api/v1";
const { VALID_PASS } = process.env;

test.describe("Profile page", () => {
  let browser;
  let page;
  let context;

  test.beforeAll(async () => {
    browser = await chromium.launch();
    context = await browser.newContext();
    page = await context.newPage();

    //log in
    test.slow();
    await page.goto(`${baseURL}/auth`);
    await page.fill('[type="email"]', "abc@gmail.com");
    await page.fill('[type="password"]', VALID_PASS);
    await page.click(".login-btn");

    await page.waitForURL(`${baseURL}/allPosts`);

    await page.goto(URL);
  });

  test.afterAll(async () => {
    await browser.close();
  });

  test("Profile-T1: should show prfile image", async () => {
    const profileLeft = await page.waitForSelector(".profile-left");
    expect(profileLeft).not.toBeNull();
    expect(await page.locator(".profile-left:has(image)")).not.toBeNull();
  });

  test("Profile-T2: should show the profile information", async () => {
    const profileRight = await page.waitForSelector(".profile-right");
    expect(profileRight).not.toBeNull();
    expect(
      await page.locator(".profile-right:has(div.user-fields)")
    ).not.toBeNull();
    expect(
      await page.locator(".profile-right:has(div.options)")
    ).not.toBeNull();
  });

  test("Profile-T3: should not show edit input field by default", async () => {
    expect(await page.locator("input#firstN")).not.toBeVisible();
    expect(await page.locator("input#lastN")).not.toBeVisible();
    expect(await page.locator("input#email")).not.toBeVisible();
    expect(
      await page.locator('.user-fields button:has-text("Save Changes")')
    ).not.toBeVisible();
  });

  test("Profile-T4: should allow for editing information", async () => {
    //click to open edit and get input
    // const editIcons = await page.locator(".edit-icon >> svg").nth(2);
    for (let editI = 0; editI < 3; editI++) {
      await page.click(`.edit-icon svg >> nth=${editI}`);
    }
    expect(await page.waitForSelector("input#firstN")).not.toBeNull();
    expect(await page.waitForSelector("input#lastN")).not.toBeNull();
    expect(await page.waitForSelector("input#email")).not.toBeNull();
    expect(
      await page.locator('.user-fields button:has-text("Save Changes")')
    ).not.toBeNull();
    //click to close edit
    for (let editI = 0; editI < 3; editI++) {
      await page.click(`.edit-icon svg >> nth=${editI}`);
    }
    expect(await page.locator("input#firstN").isVisible()).toEqual(false);
    expect(await page.locator("input#lastN").isVisible()).toEqual(false);
    expect(await page.locator("input#email").isVisible()).toEqual(false);
    expect(
      await page
        .locator('.user-fields button:has-text("Save Changes")')
        .isVisible()
    ).toEqual(false);
  });

  test("Profile-T5: should display password reset form", async () => {
    expect(
      await page.locator('.options button:has-text("Save Password")')
    ).not.toBeNull();
    expect(await page.waitForSelector("input#newPassword")).not.toBeNull();
    expect(await page.waitForSelector("input#passwordAgain")).not.toBeNull();
  });
});

// @ts-check
/*jshint esversion:8*/
const { test, expect } = require("@playwright/test");
const { chromium } = require("playwright");
require("dotenv").config();

// const URL = "http://localhost:3000";
const URL = "https://sp-frontend-6181.onrender.com";

test.describe("Home page", () => {
  let browser;
  let page;

  test.beforeAll(async () => {
    browser = await chromium.launch();
  });

  test.afterAll(async () => {
    await browser.close();
  });

  test.beforeEach(async () => {
    page = await browser.newPage();
    await page.goto(URL);
  });

  test.afterEach(async () => {
    await page.close();
  });

  test("Home-T1: renders the home page", async () => {
    await expect(page).toHaveTitle("Easy Help");
    expect(await page.innerText(".text h1")).toEqual("Communicate and Help");
    expect(await page.innerText(".text button")).toEqual("Register Now!");
  });

  test("Home-T2: navigates to the auth page when the register button is clicked", async () => {
    await page.click(".text button");
    expect(page.url()).toBe(`${URL}/auth`);
  });

  //   test("Home-T3: clicks on the Facebook icon and opens the Facebook page", async () => {
  //     await page.click("#facebook-link");
  //     const contexts = await browser.contexts();
  //     const pages = await contexts[0].pages();
  //     const facebookPage = pages[pages.length - 1];
  //     // console.log(facebookPage);
  //     await facebookPage.waitForLoadState();
  //     expect(await facebookPage.title()).toContain("Facebook");
  //   });
});

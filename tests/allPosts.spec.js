/*jshint esversion:8*/
const { test, expect } = require("@playwright/test");
const { chromium } = require("playwright");
require("dotenv").config();

// const URL = "http://localhost:3000/allPosts";
// const baseURL = "http://localhost:3000/";
const URL = "https://sp-frontend-6181.onrender.com/allPosts";
const baseURL = "https://sp-frontend-6181.onrender.com";

const backURL = "https://sp-backend-b70z.onrender.com/api/v1";

const { VALID_PASS } = process.env;

test.describe("Posts page", () => {
  let browser;
  let page;
  let context;

  test.beforeAll(async () => {
    browser = await chromium.launch();
    context = await browser.newContext();
    page = await context.newPage();
    await page.goto(URL);

    // login in
    test.slow();
    //////
    await page.goto(`${baseURL}/auth`);

    await page.fill('[type="email"]', "abc@gmail.com");
    await page.fill('[type="password"]', VALID_PASS);
    await page.click(".login-btn");

    await page.waitForURL(`${baseURL}/allPosts`);
  });

  test.afterAll(async () => {
    await browser.close();
  });

  test("Posts-T1: should show the create post form", async () => {
    const createPostForm = await page.waitForSelector(".create");
    expect(createPostForm).not.toBeNull();
    expect(await page.waitForSelector("#title")).not.toBeNull();
    expect(await page.waitForSelector("#date")).not.toBeNull();
    expect(await page.waitForSelector("#location")).not.toBeNull();
    expect(await page.waitForSelector("#time")).not.toBeNull();
    expect(await page.waitForSelector("#money")).not.toBeNull();
    expect(await page.waitForSelector("#urgency")).not.toBeNull();
    expect(await page.waitForSelector("#content")).not.toBeNull();
  });

  test("Posts-T2: should display posts", async ({ request }) => {
    const storageToken = await page.evaluate(() => window.localStorage.token);
    const response = await request.get(`${backURL}/posts`, {
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${storageToken}`,
      },
    });
    //check status
    await expect(response).toBeOK();
    //check it is not empty
    const result = await response.json();
    expect(result.length).toBeGreaterThan(0);
    //count posts
    await page.locator(".post").first().waitFor();
    const postsCount = await page.locator(".post").count();
    //compare count
    expect(postsCount).toEqual(result.length);
  });
});

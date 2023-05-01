/*jshint esversion:8*/
// const { test, expect } = require("@playwright/test");
import { test, expect } from "@playwright/experimental-ct-react";

// import ImgReady from "../src/components/images/ImgReady";

const { chromium } = require("playwright");
require("dotenv").config();

import App from "../../src/App";
const AllPosts = require("../../src/pages/allPosts");
console.log(<AllPosts />);

// import Post from "../src/components/post/Post";
// import CreatePost from "../src/components/post/CreatePost";
// import Comment from "../src/components/post/Comment";
// import Reply from "../src/components/post/Reply";

// const aPost = require("../src/components/post/Post");
// const createAPost = require("../src/components/post/CreatePost");
// const comment = require("../src/components/post/Comment");
// const reply = require("../src/components/post/Reply");

// const URL = "http://localhost:3000/allPosts";
// const baseURL = "http://localhost:3000/";

const backURL = "https://sp-backend-b70z.onrender.com/api/v1";

const { VALID_PASS } = process.env;

test.describe("Posts page", () => {
  let browser;
  let page;
  let context;

  test.beforeAll(async ({ baseURL }) => {
    browser = await chromium.launch();
    context = await browser.newContext();
    page = await context.newPage();
    // await page.goto(`${baseURL}/allPosts`);

    // login in
    test.slow();
    //////
    await page.goto(`${baseURL}/auth`);

    await page.fill('[type="email"]', "abc@gmail.com");
    await page.fill('[type="password"]', VALID_PASS);
    await page.click(".login-btn");

    await page.waitForURL(`${baseURL}/allPosts`);
  });

  test.beforeEach(async ({ baseURL }) => {
    await page.goto(`${baseURL}/allPosts`);
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

  test("Posts-T3: should display post information correctly", async () => {
    const postId = "12345";
    const title = "Test post";
    const date = "2022-05-01";
    const location = "Test location";
    const money = "free";
    const time = "30 minutes";
    const urgency = true;
    const content = "Test content";
    const comments = [];
    const createdById = "67890";
    const createdBy = "Test user";
    const userPhoto = "testphoto.jpg";
    const CreatedAt = "2022-04-23T12:00:00Z";

    await page.setContent(`
        <Post
          postId="${postId}"
          title="${title}"
          date="${date}"
          location="${location}"
          money="${money}"
          time="${time}"
          urgency="${urgency}"
          content="${content}"
          comments='${JSON.stringify(comments)}'
          createdById="${createdById}"
          createdBy="${createdBy}"
          userPhoto="${userPhoto}"
          CreatedAt="${CreatedAt}"
        />
    `);

    // Check that the post information is displayed correctly
    expect(await page.textContent(".heading-left")).toBe(title);
    expect(await page.textContent(".heading-right")).toBe(createdBy);
    expect(await page.textContent(".timing")).toBe(CreatedAt);
    expect(await page.textContent(".inside-post p")).toBe(content);
    expect(await page.textContent(".post-properties .date")).toBe(
      `When? ${date}`
    );
    expect(await page.textContent(".post-properties .location")).toBe(
      `Where? ${location}`
    );
    expect(await page.textContent(".post-properties .time")).toBe(
      `Estimated time needed: ${time}`
    );
    expect(await page.textContent(".post-properties .money")).toBe(
      `This request is ${money}`
    );
    expect(await page.locator(".urgent-dot").isVisible()).toBe(true);
  });

  test("Posts-T4: should show and hide comments correctly", async ({
    mount,
  }) => {
    // const postComp = await mount();
    // <Post
    // key="12345"
    // postId="id12345"
    // title="Test post"
    // date="2022-05-01"
    // location="Test location"
    // money="free"
    // time="30 minutes"
    // urgency="false"
    // content="Test content"
    // comments="[]"
    // createdById="test name"
    // createdBy="Test user"
    // userPhoto="testphoto.jpg"
    // CreatedAt="2022-04-23T12"
    // />
    // const post = aPost.default({postId:"12345"});
    // const post = await mount(
    //   <Post
    //     key="12345"
    //     postId="id12345"
    //     title="Test post"
    //     date="2022-05-01"
    //     location="Test location"
    //     money="free"
    //     time="30 minutes"
    //     urgency="false"
    //     content="Test content"
    //     comments="[]"
    //     createdById="test name"
    //     createdBy="Test user"
    //     userPhoto="testphoto.jpg"
    //     CreatedAt="2022-04-23T12"
    //   />
    // );
    // const postField = await page.locator("#root");
    // console.log(await postField.allTextContents());
    // const postStuff = await post.all();
    // console.log(await postStuff);
    // expect(post).not.toBeNull();
    // await expect(post).toHaveAttribute("postId", "id12345");
    // const h3 = await post.locator(".timing").allInnerTexts();
    // console.log(h3);
    // expect(await page.waitForSelector("#id12345 .heading-right")).toContain(
    //   "Test"
    // );
    // console.log(post);
    // const post = aPost({
    //   key: "12345",
    //   postId: "id12345",
    //   title: "Test post",
    //   date: "2022-05-01",
    //   location: "Test location",
    //   money: "free",
    //   time: "30 minutes",
    //   urgency: "false",
    //   content: "Test content",
    //   comments: "[]",
    //   createdById: "test name",
    //   createdBy: "Test user",
    //   userPhoto: "testphoto.jpg",
    //   CreatedAt: "2022-04-23T12",
    // });
    // expect(post).not.toBeNull();
    // expect(await page.waitForSelector("#id12345 .heading-right")).toContainText(
    //   "test name"
    // );
    // expect(await page.waitForSelector("#id12345 .heading-left")).toContainText(
    //   "Test post"
    // );
    // expect(await page.locator(".comments-section").isVisible()).toBe(false);
    // const showComments = await page.waitForSelector(".commentPShow");
    // await showComments.click();
    // const commentsSection = await page.locator(".posts-right");
    // expect(commentsSection.isVisible()).toEqual(true);
    // await showComments.click();
    // expect(commentsSection.isVisible()).toBe(false);
  });
});

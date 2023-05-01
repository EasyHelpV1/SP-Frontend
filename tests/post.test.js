/*jshint esversion:8*/
/**
 * @jest-environment jsdom
 */

import Post from "../src/components/post/Post";
import Reply from "../src/components/post/Reply";
import Comment from "../src/components/post/Comment";
import CreatePost from "../src/components/post/CreatePost";
import React from "react";
import "@testing-library/jest-dom";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
  act,
} from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
global.fetch = jest.fn();

describe("Post Component", () => {
  it("Should display post and test its states", async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <Post
            postId="id12345"
            title="Test post"
            date="2022-05-01"
            location="Test location"
            money="free"
            time="30 minutes"
            urgency="false"
            content="Test content"
            comments={[]}
            createdById="test name"
            createdBy="Test user"
            userPhoto=""
            CreatedAt="2022-04-23T12"
          />
        </BrowserRouter>
      );
    });
    // click to show and hide comments
    const showCommentClick = document.querySelector(".commentPShow");
    fireEvent.click(showCommentClick);
    expect(document.querySelector(".comments-section")).not.toBeNull();
    fireEvent.click(showCommentClick);
    expect(document.querySelector(".comments-section")).toBeNull();
    // click to show add comment form
    const showAddCommentClick = document.querySelector("#add-comment");
    fireEvent.click(showAddCommentClick);
    expect(screen.getByRole("button")).not.toBeNull();
    expect(document.querySelector("form button").innerHTML).toEqual(
      "Add Comment"
    );
    // test form input for adding comment
    const formInput = document.querySelector("#addComment");
    fireEvent.change(formInput, { target: { value: "Test Comment" } });
    expect(document.querySelector("#addComment").value).toEqual("Test Comment");
    // click to hide add comment form
    fireEvent.click(showAddCommentClick);
    expect(document.querySelector(".post-text")).not.toContain(<form></form>);
  });

  it("Should test the comments section", async () => {
    const fakeComment = [
      {
        "_id": "6410224b1b7ef4849bc95b77",
        "content": "firstComment",
        "replies": [],
        "createdBy": "64101d39bfc02adead6f42b7",
        "post": "6410223e1b7ef4849bc95b6d",
        "createdAt": "2023-03-14T07:29:15.733Z",
        "updatedAt": "2023-03-14T07:29:15.733Z",
        "__v": 0,
        "userData": [
          {
            "_id": "64101d39bfc02adead6f42b7",
            "firstN": "Ana",
            "lastN": "Doe",
            "birthDate": "2015-02-11T00:00:00.000Z",
            "email": "abc@gmail.com",
            "phone": "",
            "password":
              "$2a$12$Aq1yr5kCx0LuaD1tPhdEMeYvzBvukYX66YaOgO2xYKPlsqzZGBFsu",
            "__v": 0,
            "verifiedEmail": true,
            "userImg": "642cf0718ad69e71b22469a6",
            "role": "admin",
          },
        ],
      },
    ];
    // Mock the API responses
    const commentId = "your-comment-id";
    const commentData = {
      _id: commentId,
      content: "Sample comment content",
      userData: [
        {
          userImg: "sample-user-img",
          firstN: "John",
          lastN: "Doe",
        },
      ],
      createdAt: "2023-04-27T12:34:56Z",
      createdBy: "sample-user-id",
      replies: [],
    };
    const replyData = {
      reply: "Sample reply",
      userId: "sample-user-id",
    };
    global.fetch.mockImplementation((url) => {
      if (url.endsWith(`/comment/${commentId}`)) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve([commentData]),
        });
      } else if (url.endsWith(`/reply/${commentId}`)) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(replyData),
        });
      }
      return Promise.reject(new Error("Unhandled API request"));
    });

    // Render the Comment component
    await act(async () => {
      render(
        <BrowserRouter>
          <Comment comment={commentId} />
        </BrowserRouter>
      );
    });

    // Wait for the component to finish loading and display the comment details
    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("Sample comment content")).toBeInTheDocument();
      //   expect(screen.getByText("Add Reply")).toBeInTheDocument();
    });

    //click to add reply
    fireEvent.click(document.querySelector(".commentReply"));
    // Simulate adding a reply
    const replyInput = screen.getByPlaceholderText("Add a reply");
    // const addButton = screen.getByText("Add Reply");
    fireEvent.change(replyInput, { target: { value: "Sample reply" } });
    // fireEvent.click(addButton);
  });
  it("renders reply data when loading is false", async () => {
    // Mock the API response
    const commentId = "your-comment-id";
    const mockReply = [
      {
        _id: "sample-reply-id",
        createdBy: "sample-user-id",
        userData: [
          {
            userImg: "",
            firstN: "John",
            lastN: "Doe",
          },
        ],
        content: "Sample reply content",
        createdAt: "2023-04-27T12:34:56Z",
      },
    ];
    const replyId = "sample-reply-id";
    const token = "sample-token";
    // global.fetch.mockResolvedValueOnce({
    //   ok: true,
    //   json: () => Promise.resolve(mockReply),
    // });

    global.fetch.mockImplementation((url) => {
      if (url.endsWith(`/reply/${replyId}`)) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockReply),
        });
      }
      return Promise.reject(new Error("Unhandled API request"));
    });

    // Render the Reply component
    await act(async () => {
      render(
        <BrowserRouter>
          <Reply reply={replyId} />
        </BrowserRouter>
      );
    });

    // Wait for the data to be rendered
    await screen.findByText("John Doe");
    await screen.findByText("Sample reply content");
    await screen.findByText("Apr 27, 2023 12:34 PM");

    // Assert the rendered output
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Sample reply content")).toBeInTheDocument();
    expect(screen.getByText("Apr 27, 2023 12:34 PM")).toBeInTheDocument();
  });

  it("test create post component", async () => {
    render(<CreatePost />);
    fireEvent.change(document.querySelector("#title"), {
      target: { value: "title" },
    });
    fireEvent.change(document.querySelector("#date"), {
      target: { value: "date" },
    });
    fireEvent.change(document.querySelector("#location"), {
      target: { value: "location" },
    });
    fireEvent.change(document.querySelector("#time"), {
      target: { value: "1 hour" },
    });
    fireEvent.change(document.querySelector("#money"), {
      target: { value: "paid" },
    });
    fireEvent.change(document.querySelector("#urgency"), {
      target: { value: true },
    });
    fireEvent.click(screen.getByText("Create Post"));
  });
});

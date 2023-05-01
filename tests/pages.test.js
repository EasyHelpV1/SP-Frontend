/*jshint esversion:8*/
/**
 * @jest-environment jsdom
 */
require("@babel/register")();
jest.mock("react-password-checklist");
jest.mock("jwt-decode");
import React from "react";
import Admin from "../src/pages/Admin";
import AllPosts from "../src/pages/allPosts";
import Auth from "../src/pages/auth";
import EmailConfirmation from "../src/pages/EmailConfirmation";
import PageNotFound from "../src/pages/PageNotFound";
import Profile from "../src/pages/profile";
import "@testing-library/jest-dom";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
  act,
} from "@testing-library/react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
global.fetch = jest.fn();
const localStorageMock = (function () {
  let store = {};

  return {
    getItem(key) {
      return store[key];
    },

    setItem(key, value) {
      store[key] = value;
    },

    clear() {
      store = {};
    },

    removeItem(key) {
      delete store[key];
    },

    getAll() {
      return store;
    },
  };
})();

Object.defineProperty(window, "localStorage", { value: localStorageMock });

describe("Pages", () => {
  it("should test admin page", async () => {
    render(
      <BrowserRouter>
        <Admin />
      </BrowserRouter>
    );
  });

  it("should test allPosts page with succefull fetch", async () => {
    const mockPosts = [
      {
        _id: "1",
        title: "Post 1",
        date: "2023-04-30T10:00:00Z",
        location: "Location 1",
        money: 100,
        time: "10:00 AM",
        urgency: "High",
        content: "Post content 1",
        comments: [],
        createdBy: "user1",
        userData: [{ firstN: "John", lastN: "Doe", userImg: "user1.jpg" }],
        createdAt: "2023-04-30T09:00:00Z",
      },
    ];
    global.fetch.mockImplementation((url) => {
      if (url.endsWith("/posts")) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockPosts),
        });
      }
      return Promise.reject(new Error("Unhandled API request"));
    });
    await act(async () => {
      render(
        <BrowserRouter>
          <AllPosts />
        </BrowserRouter>
      );
    });
    // Wait for posts to load
    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });

    // Check if posts are rendered
    expect(screen.getByText("Post 1")).toBeInTheDocument();
  });

  it("should test allPosts page with failed fetch", async () => {
    //test faild fetch
    global.fetch.mockImplementation(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ msg: "Fetch error" }),
      })
    );

    await act(async () => {
      render(
        <BrowserRouter>
          <AllPosts />
        </BrowserRouter>
      );
    });

    // Wait for error message to display
    await waitFor(() => {
      expect(screen.getByText("Fetch error")).toBeInTheDocument();
    });
  });

  it("should test auth page with failed fetch", async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <Auth />
        </BrowserRouter>
      );
    });

    expect(document.querySelector("#email")).toBeInTheDocument();
    expect(document.querySelector("#password")).toBeInTheDocument();
    expect(screen.getByText("Register")).toBeInTheDocument();

    //
    fireEvent.click(screen.getByText("Register"));

    expect(document.querySelector("#firstN")).toBeInTheDocument();
    expect(document.querySelector("#lastN")).toBeInTheDocument();
    expect(document.querySelector("#birthDate")).toBeInTheDocument();
    expect(document.querySelector("#email")).toBeInTheDocument();
    expect(document.querySelector("#password")).toBeInTheDocument();
    expect(document.querySelector("#passwordAgain")).toBeInTheDocument();
    expect(screen.getByText("Log in")).toBeInTheDocument();

    //
    fireEvent.click(screen.getByText("Register"));
    //
    fireEvent.click(screen.getByText("Log in"));

    expect(document.querySelector("#email")).toBeInTheDocument();
    expect(document.querySelector("#password")).toBeInTheDocument();
    expect(screen.getByText("Register")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Log in"));
  });

  it("renders the success message and redirects after 3 seconds for email confirmation page", async () => {
    jest.useFakeTimers(); // Mock the setTimeout function

    render(
      <MemoryRouter>
        <EmailConfirmation />
      </MemoryRouter>
    );

    const successMessage = screen.getByText("Email confirmed! Redirecting...");
    expect(successMessage).toBeInTheDocument();

    act(() => {
      jest.runAllTimers(); // Fast-forward the timers
    });
  });

  it("renders the not found message and image", () => {
    render(<PageNotFound />);

    const notFoundMessage = screen.getByText(
      "404: The Page your are looking for could not be found, please verify that the url address is correct."
    );
    expect(notFoundMessage).toBeInTheDocument();

    const notFoundImage = screen.getByAltText("notfound");
    expect(notFoundImage).toBeInTheDocument();
    // expect(notFoundImage).toHaveAttribute("src", "path/to/pageNotFoundImg.gif");
  });

  it("should test the porfile page", async () => {
    //local storage id
    const userData = { _id: "12345" };
    const tokenData = "token123";
    window.localStorage.setItem("user", JSON.stringify(userData));
    window.localStorage.setItem("token", JSON.stringify(tokenData));
    expect(localStorage.getItem("user")).toEqual(JSON.stringify(userData));

    const mockUser = {
      _id: "1",
      userImg: "profile.jpg",
      name: "John Doe",
      email: "john@example.com",
    };

    // Mock the fetch API response
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockUser),
    });

    await act(async () => {
      render(
        <BrowserRouter>
          <Profile />
        </BrowserRouter>
      );
    });

    await waitFor(() => {
      //   expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("Email: john@example.com")).toBeInTheDocument();
    });
  });
  test("handles photo deletion and change on profile", async () => {
    const mockUser = {
      _id: "1",
      userImg: "profile.jpg",
      firstN: "John",
      lastN: "Doe",
      email: "john@example.com",
    };

    //local storage id
    const userData = { _id: "12345" };
    const tokenData = "token123";
    window.localStorage.setItem("user", JSON.stringify(userData));
    window.localStorage.setItem("token", JSON.stringify(tokenData));
    expect(localStorage.getItem("user")).toEqual(JSON.stringify(userData));
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockUser),
    });

    await act(async () => {
      render(
        <BrowserRouter>
          <Profile />
        </BrowserRouter>
      );
    });

    await waitFor(() => {
      expect(screen.getByText("Email: john@example.com")).toBeInTheDocument();
    });

    // Mock the fetch API response for photo deletion
    global.fetch = jest
      .fn()
      .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({}) })
      .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({}) });

    fireEvent.click(screen.getByText("Delete Photo"));

    await waitFor(() => {
      expect(screen.getByText("Photo deleted...")).toBeInTheDocument();
    });

    // Mock the fetch API response for photo change
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockUser),
    });

    fireEvent.click(screen.getByText("Change Photo"));

    await waitFor(() => {
      expect(screen.getByText("Upload a Profile Picture")).toBeInTheDocument();
    });
  });
});

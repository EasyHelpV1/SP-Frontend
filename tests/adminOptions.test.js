/*jshint esversion: 8*/
/**
 * @jest-environment jsdom
 */
require("@babel/register")();
jest.mock("react-password-checklist");
import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
  act,
} from "@testing-library/react";
import { MemoryRouter, BrowserRouter } from "react-router-dom";
import AddAdmin from "../src/components/adminOptions/AddAdmin";
import DeletePost from "../src/components/adminOptions/DeletePost";
import DeleteUser from "../src/components/adminOptions/DeleteUser";
import EditUser from "../src/components/adminOptions/EditUser";
import FindUser from "../src/components/adminOptions/FindUser";
import RemoveAdmin from "../src/components/adminOptions/RemoveAdmin";
import ResetUserPass from "../src/components/adminOptions/ResetUserPass";
import "@testing-library/jest-dom";

// Mock the fetch function
global.fetch = jest.fn();

const original = window.location;
const reloadFn = () => {
  window.location.reload();
};

describe("Admin Options", () => {
  it("Handels adding admin", async () => {
    Object.defineProperty(window, "location", {
      configurable: true,
      value: { reload: jest.fn() },
    });
    const mockEmail = "user@gmail.com";
    const fetchEndpoint = `/admin/AddAdmin/${mockEmail}`;
    // global.fetch.mockImplementationOnce(() => {
    //   Promise.resolve({ ok: false, json: () => Promise.resolve("error") });
    // });
    global.fetch.mockImplementationOnce((url) => {
      if (url.endsWith(fetchEndpoint)) {
        Promise.resolve({ ok: true, json: () => Promise.resolve(mockEmail) });
      }
      return Promise.reject(new Error("Unhandled API request"));
    });
    reloadFn(); // as defined above..
    expect(window.location.reload).toHaveBeenCalled();
    render(<AddAdmin />);
    const emailId = document.querySelector("#email");
    expect(emailId).not.toBeNull();
    fireEvent.change(emailId, { target: { value: "email@gmail.com" } });
    await act(async () => {
      await fireEvent.click(screen.getByRole("button"));
    });
  });

  it("Handels deleting post", async () => {
    const mockPost = {
      PostTitle: "title",
      createdBy: "user@gmail.com",
      content: "content",
    };
    const fetchEndpoint = `/admin/DeletePost`;
    // reloadFn();
    // expect(window.location.reload).toHaveBeenCalled();
    render(<DeletePost />);

    const postTitle = document.querySelector("#postTitle");
    expect(postTitle).not.toBeNull();
    fireEvent.change(postTitle, { target: { value: mockPost.title } });

    const createdBy = document.querySelector("#createdBy");
    expect(createdBy).not.toBeNull();
    fireEvent.change(createdBy, { target: { value: mockPost.createdBy } });

    const content = document.querySelector("#content");
    expect(content).not.toBeNull();
    fireEvent.change(content, { target: { value: mockPost.content } });

    await act(async () => {
      await fireEvent.click(screen.getByRole("button"));
      global.fetch.mockImplementationOnce((url) => {
        if (url.endsWith(fetchEndpoint)) {
          Promise.resolve({
            ok: true,
            json: () => Promise.resolve("Post Deleted"),
          });
        }
        return Promise.reject(new Error("Unhandled API request"));
      });
    });
  });

  it("Handels deleting user", async () => {
    Object.defineProperty(window, "location", {
      configurable: true,
      value: { reload: jest.fn() },
    });
    const mockEmail = "user@gmail.com";
    const fetchEndpoint = `/admin/DeleteUser/${mockEmail}`;
    // global.fetch.mockImplementationOnce(() => {
    //   Promise.resolve({ ok: false, json: () => Promise.resolve("error") });
    // });
    global.fetch.mockImplementationOnce((url) => {
      if (url.endsWith(fetchEndpoint)) {
        Promise.resolve({ ok: true, json: () => Promise.resolve(mockEmail) });
      }
      return Promise.reject(new Error("Unhandled API request"));
    });
    reloadFn(); // as defined above..
    expect(window.location.reload).toHaveBeenCalled();
    render(<DeleteUser />);
    const emailId = document.querySelector("#email");
    expect(emailId).not.toBeNull();
    fireEvent.change(emailId, { target: { value: "email@gmail.com" } });
    await act(async () => {
      await fireEvent.click(screen.getByRole("button"));
    });
  });

  it("Handels editing user", async () => {
    const mockUser = {
      firstN: "first",
      lastN: "last",
      email: "email@gmail.com",
      phone: "",
    };
    global.fetch.mockImplementation((url) => {
      if (url.endsWith(fetchEndpoint)) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockUser),
        });
      }
      return Promise.reject(new Error("Unhandled API request"));
    });

    render(
      <BrowserRouter>
        <EditUser userInfo={mockUser} />
      </BrowserRouter>
    );
    await waitFor(() => {
      expect(
        screen.getByText(`First Name: ${mockUser.firstN}`)
      ).toBeInTheDocument();
      const editIcons = document.querySelectorAll(".edit-icon");
      fireEvent.click(editIcons[0]);
      const FNE = document.querySelector("#firstN");
      fireEvent.change(FNE, { target: { value: "new" } });

      expect(
        screen.getByText(`Last Name: ${mockUser.lastN}`)
      ).toBeInTheDocument();
      fireEvent.click(editIcons[1]);
      const LNE = document.querySelector("#lastN");
      fireEvent.change(LNE, { target: { value: "new" } });

      expect(screen.getByText(`Email: ${mockUser.email}`)).toBeInTheDocument();
      fireEvent.click(editIcons[2]);
      const ENE = document.querySelector("#email");
      fireEvent.change(ENE, { target: { value: "new" } });

      fireEvent.click(screen.getByText("Save Changes"));
    });
  });

  it("Handels finding user", async () => {
    Object.defineProperty(window, "location", {
      configurable: true,
      value: { reload: jest.fn() },
    });
    const mockUser = {
      firstN: "first",
      lastN: "last",
      email: "email@gmail.com",
      phone: "",
    };
    const mockEmail = "user@gmail.com";
    const fetchEndpoint = `/admin/FindUser/${mockEmail}`;
    global.fetch.mockImplementationOnce((url) => {
      if (url.endsWith(fetchEndpoint)) {
        Promise.resolve({ ok: true, json: () => Promise.resolve(mockUser) });
      }
      return Promise.reject(new Error("Unhandled API request"));
    });
    render(<FindUser />);
    const emailId = document.querySelector("#useremail");
    expect(emailId).not.toBeNull();
    fireEvent.change(emailId, { target: { value: "email@gmail.com" } });
    await act(async () => {
      await fireEvent.click(screen.getByText("Find User"));
    });
  });

  it("Handels removing admin rights", async () => {
    const mockEmail = "user@gmail.com";
    const fetchEndpoint = `/admin/RemoveAdmin/${mockEmail}`;
    global.fetch.mockImplementationOnce((url) => {
      if (url.endsWith(fetchEndpoint)) {
        Promise.resolve({ ok: true, json: () => Promise.resolve(mockEmail) });
      }
      return Promise.reject(new Error("Unhandled API request"));
    });
    render(<RemoveAdmin />);
    const emailId = document.querySelector("#email");
    expect(emailId).not.toBeNull();
    fireEvent.change(emailId, { target: { value: "email@gmail.com" } });
    await act(async () => {
      await fireEvent.click(screen.getByText("Remove Admin"));
    });
  });

  it("Handels reseting password", async () => {
    const mockEmail = "user@gmail.com";
    const mockBD = "01-01-0101";
    const mockPass = "Pass";
    const mockPassAgain = "Pass";

    const fetchEndpoint = `/admin/ResetUserPassword`;
    global.fetch.mockImplementationOnce((url) => {
      if (url.endsWith(fetchEndpoint)) {
        Promise.resolve({ ok: true, json: () => Promise.resolve(mockEmail) });
      }
      return Promise.reject(new Error("Unhandled API request"));
    });
    render(<ResetUserPass />);

    const emailId = document.querySelector("#email");
    expect(emailId).not.toBeNull();
    fireEvent.change(emailId, { target: { value: mockEmail } });

    const bdId = document.querySelector("#birthDate");
    expect(bdId).not.toBeNull();
    fireEvent.change(bdId, { target: { value: mockBD } });

    const passId = document.querySelector("#password");
    expect(passId).not.toBeNull();
    fireEvent.change(passId, { target: { value: mockPass } });

    const passAgainId = document.querySelector("#passwordAgain");
    expect(passAgainId).not.toBeNull();
    fireEvent.change(passAgainId, { target: { value: mockPassAgain } });

    await act(async () => {
      await fireEvent.click(screen.getByText("Submit"));
    });
  });
});

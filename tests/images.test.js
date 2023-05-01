/*jshint esversion: 8*/
/**
 * @jest-environment jsdom
 */

import React from "react";
import Img from "../src/components/images/Img";
import ImgReady from "../src/components/images/ImgReady";
import "@testing-library/jest-dom";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import { MemoryRouter, BrowserRouter } from "react-router-dom";

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

describe("Img Components", () => {
  it("should Test the Img forms", async () => {
    render(<Img />);
    const imageInput = document.querySelector("#image-input");
    expect(imageInput).not.toBeNull();

    //local storage id
    const userData = { _id: "12345" };
    const tokenData = "token123";
    window.localStorage.setItem("user", JSON.stringify(userData));
    window.localStorage.setItem("token", JSON.stringify(tokenData));
    expect(localStorage.getItem("user")).toEqual(JSON.stringify(userData));

    fireEvent.change(imageInput, { target: { value: "" } });
    fireEvent.click(screen.getByText("Upload"));

    global.fetch.mockImplementation((url) => {
      if (url.endsWith("/imgs/")) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(userData),
        });
      }
      return Promise.reject(new Error("Unhandled API request"));
    });
  });

  it("should Test image ready component", async () => {
    render(
      <BrowserRouter>
        <ImgReady />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByRole("img")).toBeInTheDocument();
      expect(document.querySelector(".image")).toBeInTheDocument();
    });
  });
});

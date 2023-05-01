/*jshint esversion:8*/
/**
 * @jest-environment jsdom
 */
import React from "react";
import AdminRoute from "../src/util/AdminRoute";
import ProtectedRoute from "../src/util/ProtectedRoute";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
  act,
} from "@testing-library/react";
import {
  BrowserRouter,
  MemoryRouter,
  Route,
  useNavigate,
} from "react-router-dom";
import jwtDecode from "jwt-decode";
global.fetch = jest.fn();

jest.mock("jwt-decode");

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

describe("AdminRoute", () => {
  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it("renders children when user is an admin", () => {
    // Mock the token and payload for an admin user
    const mockToken = "mock-token";
    const mockRole = { role: "admin" };
    window.localStorage.setItem("token", JSON.stringify(mockToken));

    // Render the component wrapped in a MemoryRouter with a dummy route
    render(
      <MemoryRouter initialEntries={["/dummy"]}>
        <AdminRoute>
          <div>Admin content</div>
        </AdminRoute>
      </MemoryRouter>
    );
  });

  it("renders children when user authenticated", () => {
    // Mock the token and payload for an admin user
    const mockToken = "mock-token";
    const mockRole = { role: "user" };
    window.localStorage.setItem("token", JSON.stringify(mockToken));

    render(
      <MemoryRouter initialEntries={["/dummy"]}>
        <ProtectedRoute>
          <div>content</div>
        </ProtectedRoute>
      </MemoryRouter>
    );
  });
});

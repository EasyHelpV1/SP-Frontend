/*jshint esversion:8*/
/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "../src/components/login/Login";
import "@testing-library/jest-dom";

// Mock the fetch function
global.fetch = jest.fn();

describe("Login component", () => {
  it("handles login and redirects after successful login", async () => {
    // Mock the API response
    const mockUser = {
      _id: "sample-user-id",
      email: "user@example.com",
      token: "sample-token",
    };
    const loginEndpoint = `/auth/login`;
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockUser),
      })
    );

    // Render the Login component
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    // Fill in the login form and submit
    const loginFormHeading = screen.getByRole("heading").textContent;
    expect(loginFormHeading).toEqual("Log in to your account");
    const inputEmail = document.querySelector("#email");
    expect(inputEmail).not.toBeNull();
    fireEvent.change(inputEmail, { target: { value: "email@gmail.com" } });
    const inputPass = document.querySelector("#password");
    expect(inputPass).not.toBeNull();
    fireEvent.change(inputPass, { target: { value: "Password" } });
    fireEvent.click(screen.getByText("Log in"));
    // Wait for the login to be processed and redirect to the specified route
    await screen.findByText("Login successful, redirecting...");

    expect(localStorage.getItem("token")).toBe("sample-token");
  });

  it("displays an error message on login failure", async () => {
    // Mock the API response for failed login
    const errorMessage = "Invalid email or password";
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ msg: errorMessage }),
      })
    );

    // Render the Login component
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    // Fill in the login form and submit
    const loginFormHeading = screen.getByRole("heading").textContent;
    expect(loginFormHeading).toEqual("Log in to your account");
    const inputEmail = document.querySelector("#email");
    expect(inputEmail).not.toBeNull();
    fireEvent.change(inputEmail, { target: { value: "email@gmail.com" } });
    const inputPass = document.querySelector("#password");
    expect(inputPass).not.toBeNull();
    fireEvent.change(inputPass, { target: { value: "Password" } });
    fireEvent.click(screen.getByText("Log in"));
    // Wait for the error message to be displayed
    await screen.findByText(errorMessage);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
});

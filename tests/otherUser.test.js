/*jshint esversion:8*/
/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import { MemoryRouter, BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import OtherUser from "../src/components/otherUser/OtherUser";

describe("OtherUser component", () => {
  test("renders other user information", async () => {
    const mockUser = {
      _id: "1",
      userImg: "profile.jpg",
      firstN: "John",
      lastN: "Doe",
      email: "john@example.com",
    };
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockUser),
    });

    await act(async () => {
      render(
        <BrowserRouter>
          <OtherUser />
        </BrowserRouter>
      );
    });
    await waitFor(() => {
      expect(screen.getByText("First Name: John")).toBeInTheDocument();
      expect(screen.getByText("Last Name: Doe")).toBeInTheDocument();
      expect(screen.getByText("Email: john@example.com")).toBeInTheDocument();
    });
  });
});

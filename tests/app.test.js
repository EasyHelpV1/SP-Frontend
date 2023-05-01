import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../src/App";
// Mock react-password-checklist module
jest.mock("react-password-checklist", () => {
  return {
    __esModule: true,
    default: () => <div data-testid="password-checklist-mock"></div>,
  };
});
describe("App", () => {
  it("renders without errors", () => {
    render(
      //   <StaticRouter location="/">
      <App />
      //   </StaticRouter>
    );
  });
});

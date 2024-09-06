import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "../pages/Home";

it("renders welcome message", () => {
  render(<Home />);
  expect(screen.getByText("Bem-vindo à Home")).toBeInTheDocument();
});

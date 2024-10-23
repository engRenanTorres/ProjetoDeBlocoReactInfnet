import { render, screen } from "@testing-library/react";
import Home from "../../pages/Home";

describe("Page Home", () => {
  it("renders Bem-vindo à Home", () => {
    render(<Home />);
    expect(screen.getByText("Bem-vindo à Home")).toBeInTheDocument();
  });
});

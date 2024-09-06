import { render, screen, fireEvent } from "@testing-library/react";
import Button from "../components/Button";

test("renders Button with label and handles click", () => {
  const handleClick = jest.fn(); // Mock da função onClick
  render(<Button label="Click Me" onClick={handleClick} />);

  // Verifica se o label está presente
  const buttonElement = screen.getByText(/Click Me/i);
  expect(buttonElement).toBeInTheDocument();

  // Simula o click e verifica se a função foi chamada
  fireEvent.click(buttonElement);
  expect(handleClick).toHaveBeenCalledTimes(1);
});

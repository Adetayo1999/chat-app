import { render, screen, fireEvent } from "@testing-library/react";
import Button from ".";

describe("tests for the button component", () => {
  it("tests the buton component text renders correctly", () => {
    render(<Button text='Click me' type='button' variant='primary' />);
    const title = screen.getByText(/click me/i);
    expect(title.textContent).toBe("Click me");
  });
  it("tests that the button component click handler fires onclick", () => {
    const clickHandler = jest.fn();
    render(
      <Button
        text='Click me'
        type='button'
        clickHandler={clickHandler}
        variant='primary-outline'
      />
    );

    const buttonElement = screen.getByRole("button", { name: "Click me" });
    fireEvent.click(buttonElement);
    expect(clickHandler).toBeCalledTimes(1);
  });
});

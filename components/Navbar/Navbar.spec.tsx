import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from ".";

describe("Navbar", () => {
  const mockSetTheme = jest.fn();
  const defaultProps = {
    theme: "light",
    onSetTheme: mockSetTheme,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders title and logo", () => {
    render(<Navbar {...defaultProps} />);
    expect(screen.getByText("COVER CREATOR")).toBeInTheDocument();
    // BookOpen is rendered as an SVG, not an img
    expect(screen.getByTestId("book-open-icon")).toBeInTheDocument();
  });

  test("renders theme switch with correct default state", () => {
    render(<Navbar {...defaultProps} />);
    const switchElement = screen.getByRole("switch");
    expect(switchElement).not.toBeChecked();
  });

  test("theme switch is checked when theme is dark", () => {
    render(<Navbar {...defaultProps} theme="dark" />);
    const switchElement = screen.getByRole("switch");
    expect(switchElement).toBeChecked();
  });

  test("calls onSetTheme with correct theme when switch is toggled", () => {
    const { theme, onSetTheme } = defaultProps;
    render(<Navbar theme={theme} onSetTheme={onSetTheme} />);

    const switchElement = screen.getByRole("switch");
    fireEvent.click(switchElement);
    expect(mockSetTheme).toHaveBeenCalledWith("dark");
  });
});

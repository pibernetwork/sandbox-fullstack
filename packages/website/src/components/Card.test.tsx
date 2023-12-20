import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import Card from "./Card";

describe("Page", () => {
  it("Render card", () => {
    render(<Card title="Card 1" />);

    expect(screen.getByText("Card 1")).toBeInTheDocument();
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("Add item to count", () => {
    render(<Card title="Card 1" />);

    fireEvent.click(screen.getByText("Add 1"));

    expect(screen.getByText("1", { exact: true })).toBeInTheDocument();
  });
});

import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import Card from "./Card";

describe("Page", () => {
  it("Render card", () => {
    const setBoardPoints = jest.fn();
    render(
      <Card title="Card 1" boardPoints={0} setBoardPoints={setBoardPoints} />,
    );

    expect(screen.getByText("Card 1")).toBeInTheDocument();
    expect(screen.getByText("0 / 0")).toBeInTheDocument();
  });

  it("Add item to count", () => {
    const setBoardPoints = jest.fn();

    render(
      <Card title="Card 1" boardPoints={0} setBoardPoints={setBoardPoints} />,
    );

    fireEvent.click(screen.getByText("Add 1"));

    expect(screen.getByText("1 / 0", { exact: true })).toBeInTheDocument();
    expect(setBoardPoints).toHaveBeenCalled();
  });
});

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import BoardWrapper from "./BoardWrapper";

describe("Page", () => {
  it("Render card", () => {
    render(
      <BoardWrapper>
        <div>My Board information</div>
      </BoardWrapper>,
    );

    expect(screen.getByText("My Board information")).toBeInTheDocument();
  });
});

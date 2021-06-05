import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "../index";

describe("<Home />", () => {
  it("renders Hello", () => {
    render(<Home />);

    expect(screen.getByText("Hello")).toBeInTheDocument();
  });
});

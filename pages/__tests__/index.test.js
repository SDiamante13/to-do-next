import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import Home from "../index";

describe("<Home />", () => {
  it("renders the text Task Manager", () => {
    renderComponent();

    expect(
      screen.getByRole("heading", { name: /Task Manager/i })
    ).toBeInTheDocument();
  });

  it("adds new tasks when enter is clicked", async () => {
    renderComponent();

    addNewTask("Take out the trash");
    addNewTask("Write Blog Post");

    const listItems = await screen.findAllByRole("listitem");
    expect(listItems.length).toBe(2);
    expect(listItems[0].textContent).toBe("Take out the trash");
    expect(listItems[1].textContent).toBe("Write Blog Post");
  });

  it("clears input field after pressing enter", () => {
    renderComponent();

    type(getTaskInputField(), "Clear this after pressing enter, please");
    expect(getTaskInputField().value).toBe(
      "Clear this after pressing enter, please"
    );
    
    pressEnter(getTaskInputField());
    expect(getTaskInputField().value).toBe("");
  });
});

const renderComponent = () => {
  render(<Home />);
};

const addNewTask = (taskName) => {
  const taskInputField = getTaskInputField();
  type(taskInputField, taskName);
  pressEnter(taskInputField);
};

const getTaskInputField = () => {
  return screen.getByRole("textbox", { name: /Add New Task/i });
};

const type = (input, text) => {
  fireEvent.change(input, { target: { value: text } });
};

const pressEnter = (domElement) => {
  fireEvent.keyPress(domElement, { key: "Enter", keyCode: 13 });
};

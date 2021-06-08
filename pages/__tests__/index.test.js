import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import Home from "../index";

describe("<Home />", () => {
  it("should render the heading Task Manager", () => {
    renderComponent();

    expect(
      screen.getByRole("heading", { name: /Task Manager/i })
    ).toBeInTheDocument();
  });

  it("should adds new tasks when enter key is pressed", async () => {
    renderComponent();

    addNewTask("Take out the trash");
    addNewTask("Write Blog Post");

    screen.getByLabelText(/Take out the trash/i);
    screen.getByLabelText(/Write Blog Post/i);
  });

  it("clears input field after pressing enter", () => {
    renderComponent();
    const taskInputField = getTaskInputField();

    type(taskInputField, "Clear this after pressing enter, please");
    expect(taskInputField.value).toBe(
      "Clear this after pressing enter, please"
    );

    pressEnter(taskInputField);
    expect(taskInputField.value).toBe("");
  });

  it("should add the new task as a TaskItem with unchecked checkbox", async () => {
    renderComponent();

    addNewTask("Take out the trash");

    const taskCheckBox = await screen.findByRole("checkbox");

    expect(taskCheckBox.checked).toBeFalsy();
  });

  it("should remove the task when the checkbox is clicked", async () => {
    renderComponent();

    addNewTask("Take out the trash");

    const taskCheckBox = await screen.findByRole("checkbox");

    userEvent.click(taskCheckBox);

    expect(screen.queryByLabelText("Take out the trash")).not.toBeInTheDocument();
  });

  it("should only contain unchecked tasks", async () => {
    renderComponent();

    addNewTask("Take out the trash");
    addNewTask("Wash dishes");
    addNewTask("Program awesome code");

    const checkboxes = await screen.findAllByRole("checkbox");

    userEvent.click(checkboxes[1]);

    const remainingCheckboxes = screen.getAllByRole("checkbox");

    expect(screen.queryByLabelText(/Wash dishes/i)).not.toBeInTheDocument();
    expect(remainingCheckboxes.length).toBe(2);
    expect(remainingCheckboxes[0].checked).toBeFalsy();
    expect(remainingCheckboxes[1].checked).toBeFalsy();
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

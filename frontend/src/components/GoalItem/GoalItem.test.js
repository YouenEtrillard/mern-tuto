/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import GoalItem from "./GoalItem";

const goal = {
  createdAt: "26/04/2022",
  _id: 123,
  text: "Goal description"
};

test("renders learn react link", () => {
  render(
    <Provider store={store}>
      <GoalItem goal={goal} />
    </Provider>
  );
  screen.debug();

  // expect(getByText(/learn/i)).toBeInTheDocument();
});

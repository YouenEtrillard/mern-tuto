/* eslint-disable no-undef */
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import GoalItem from "./GoalItem";

const goal = {
  createdAt: "2022-04-26",
  _id: 123,
  text: "Goal description"
};
  
describe("GoalItem", () => {
  it("should render goal date formatted to fr", () => {
    render(
      <Provider store={store}>
        <GoalItem goal={goal} />
      </Provider>
    );
    expect(screen.getByText("26 avril 2022")).toBeInTheDocument();
  });
});

import { BrowserRouter } from "react-router-dom";
import StatsPage from "../pages/StatsPage";
import {
  screen,
  render,
  waitForElementToBeRemoved,
} from "@testing-library/react";

it("Stats page renders correctly", async () => {
  window.localStorage.setItem("token", JSON.stringify("data"));
  const { asFragment } = render(
    <BrowserRouter>
      <StatsPage />
    </BrowserRouter>
  );
  await waitForElementToBeRemoved(screen.queryByText("Loading..."));
  expect(asFragment()).toMatchSnapshot();
});

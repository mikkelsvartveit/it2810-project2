import { BrowserRouter } from "react-router-dom";
import StatsPage from "../pages/StatsPage";
import {
  screen,
  render,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { RepoContext } from "../App";

it("Stats page renders correctly", async () => {
  const { asFragment } = render(
    <BrowserRouter>
      <RepoContext.Provider
        value={{
          repoData: {
            repoURI: "hei",
            repoToken: "test",
          },
          setRepoData: () => {},
        }}
      >
        <StatsPage />
      </RepoContext.Provider>
    </BrowserRouter>
  );
  await waitForElementToBeRemoved(screen.queryByText("Loading..."));
  expect(asFragment()).toMatchSnapshot();
});

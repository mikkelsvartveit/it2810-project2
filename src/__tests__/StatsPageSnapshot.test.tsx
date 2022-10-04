import { BrowserRouter } from "react-router-dom";
import StatsPage from "../pages/StatsPage";
import {
  screen,
  render,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { RepoContext } from "../App";

let originalFetch: any;

const mockFetch = (data: any) => {
  return new Promise((res) =>
    setTimeout(
      () =>
        res({
          json: () => Promise.resolve(mockData),
          status: 200,
        }),
      100
    )
  );
};

const mockUser = {
  name: "test",
  username: "test",
  avatar_url: "test",
  web_url: "test",
};

const mockData = [
  {
    id: 1,
    iid: 1,
    project_id: 1,
    title: "test",
    description: "test",
    state: "opened",
    created_at: "2021-05-01T00:00:00.000Z",
    updated_at: "2021-05-01T00:00:00.000Z",
    closed_at: "2021-05-01T00:00:00.000Z",
    closed_by: mockUser,
  },
  {
    id: 2,
    iid: 2,
    project_id: 1,
    title: "test",
    description: "test",
    state: "opened",
    created_at: "2021-05-01T00:00:00.000Z",
    updated_at: "2021-05-01T00:00:00.000Z",
    closed_at: "2021-05-01T00:00:00.000Z",
    closed_by: mockUser,
  },
  {
    id: 3,
    iid: 4,
    project_id: 1,
    title: "test",
    description: "test",
    state: "opened",
    created_at: "2021-05-01T00:00:00.000Z",
    updated_at: "2021-05-01T00:00:00.000Z",
    closed_at: "2021-05-01T00:00:00.000Z",
    closed_by: mockUser,
  },
];

// Mock the fetch function for testing
beforeEach(async () => {
  originalFetch = global.fetch;
  global.fetch = jest.fn().mockImplementation(mockFetch);
});

afterEach(() => {
  global.fetch = originalFetch;
});

it("Stats page renders correctly", async () => {
  const { asFragment } = render(
    <BrowserRouter>
      <RepoContext.Provider
        value={{
          repoData: {
            repoURI: "https://gitlab.test.com/api/v4/projects/test",
            repoToken: "test",
          },
          setRepoData: () => {},
        }}
      >
        <StatsPage />
      </RepoContext.Provider>
    </BrowserRouter>
  );

  await waitForElementToBeRemoved(screen.queryByTestId("statspage-loading"));
  expect(asFragment()).toMatchSnapshot();
});

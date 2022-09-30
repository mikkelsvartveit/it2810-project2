import React from "react";
import { render, screen } from "@testing-library/react";
import {
  LeaderboardGraph,
  LeaderboardGraphProps,
} from "./components/LeaderboardGraph";
import { unmountComponentAtNode } from "react-dom";
import BarChartComp, { BarData } from "./components/BarChartComp";

let container: any = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("Leaderboard graph is correct", () => {
  const dummyData: LeaderboardGraphProps = {
    winners: [
      {
        name: "test",
        value: 1,
      },
      {
        name: "test2",
        value: 2,
      },
      {
        name: "test3",
        value: 3,
      },
    ],
    category: "commits",
  };
  //send in dummy data and check if the graph is correct

  render(<LeaderboardGraph {...dummyData} />, container);
  const winner = screen.getByTestId(1);
  expect(winner).toHaveTextContent("test3");
  expect(winner).toContainElement(screen.getByText("3 commits"));
});

test("barchartcomponent renders", () => {
  const dummyData: BarData = [
    { name: "test", value: 1 },
    { name: "test2", value: 2 },
    { name: "test3", value: 3 },
  ];

  render(
    <BarChartComp data={dummyData} width={1000} height={1000} />,
    container
  );
  const tester = screen.getByTestId("barchart");

  expect(tester).toContainElement(screen.getByText("test"));
});

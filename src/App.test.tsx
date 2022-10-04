import React from "react";
import { render, screen } from "@testing-library/react";
import {
  LeaderboardGraph,
  LeaderboardGraphProps,
} from "./components/LeaderboardGraph";
import { unmountComponentAtNode } from "react-dom";
import BarChartComp, { BarData } from "./components/BarChartComp";
import { Dropdown, Option } from "./components/Dropdown";

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
describe("LeaderboardGraph", () => {
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
    for (let i = 0; i < dummyData.winners.length; i++) {
      const winner = screen.getByTestId(i);
      expect(winner).toHaveTextContent(dummyData.winners[i].name);
      expect(winner).toContainElement(
        screen.getByText(dummyData.winners[i].value + " " + dummyData.category)
      );
    }
  });
});

describe("BarChartComp", () => {
  test("barchartcomponent renders", () => {
    const dummyData: BarData = [
      { name: "test", value: 1 },
      { name: "test2", value: 2 },
      { name: "test3", value: 3 },
    ];

    render(
      <BarChartComp data={dummyData} width={1000} aggregateBy="author" />,
      container
    );
    const tester = screen.getByTestId("barchart");

    for (let i = 0; i < dummyData.length; i++) {
      expect(tester).toHaveTextContent(dummyData[i].name);
    }
  });
});

describe("Dropdown", () => {
  test("dropdown renders", () => {
    const dummyData: Option<string>[] = [
      { label: "1", value: "hi" },
      { label: "2", value: "new" },
      { label: "3", value: "value" },
    ];

    render(
      <Dropdown options={dummyData} onSelectedChange={() => {}} />,
      container
    );
    const tester = screen.getByTestId("dropdown");
    for (let i = 0; i < dummyData.length; i++) {
      expect(tester).toHaveTextContent(dummyData[i].label);
    }
  });
});

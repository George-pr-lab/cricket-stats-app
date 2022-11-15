import { Dashboard } from "../components/Dashboard";
// please add your test cases here
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import { SnackbarProvider } from "notistack";
// import { Router } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
// const { enqueueSnackbar } = useSnackbar();
const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

const mockEnqueue = jest.fn();

jest.mock("notistack", () => ({
  ...jest.requireActual("notistack"),
  useSnackbar: () => {
    return {
      enqueueSnackbar: mockEnqueue,
    };
  },
}));

describe("Testing Cards PlayerCard", () => {
  beforeEach(() => {
    // mock.resetHistory();
  });

  it("Should have Player Stats in Player", () => {
    render(
      <Router>
        <Dashboard />
      </Router>
    );
    expect(screen.getByText("Player Stats")).toBeInTheDocument();
    // const el = expect(screen.getByTestId("playergrid"));
    // console.log(el);
  });

  it("Should have Favourites in Player", () => {
    render(
      <Router>
        <Dashboard />
      </Router>
    );
    expect(screen.getByText("Favourites")).toBeInTheDocument();
  });
  // it("Should have ADD TO Favorite in Player", () => {
  //   render(
  //     <Router>
  //       <Dashboard />
  //     </Router>
  //   );
  //   expect(screen.getByText("ADD TO Favorite")).toBeInTheDocument();
  // });

  // it("Should have No players found in Player", () => {
  //   render(
  //     <Router>
  //       <Dashboard />
  //     </Router>
  //   );
  //   expect(screen.getByText("No players found")).toBeInTheDocument();
  // });
  // it("Should have Loading Players... in Player", () => {
  //   render(
  //     <Router>
  //       <Dashboard />
  //     </Router>
  //   );
  //   expect(screen.getByText("Loading Players...")).toBeInTheDocument();
  // });

  //  Loading Players...
});
export default Dashboard;

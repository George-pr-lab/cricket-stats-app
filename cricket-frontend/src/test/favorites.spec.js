import FavoriteBoard from "../components/Favorites/FavoriteBoard.js";
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

describe("Testing Cards StatsBoard", () => {
  beforeEach(() => {
    // mock.resetHistory();
  });

  it("Should have Players Board in FavoriteBoard", () => {
    render(
      <Router>
        <FavoriteBoard />
      </Router>
    );
    expect(screen.getByText("Players Board")).toBeInTheDocument();
    // const el = expect(screen.getByTestId("playergrid"));
    // console.log(el);
  });

  // it("Should have Delete in FavoriteBoard", () => {
  //   render(
  //     <Router>
  //       <FavoriteBoard />
  //     </Router>
  //   );
  //   expect(screen.getByText("Delete")).toBeInTheDocument();
  // });
  it("Should have Player Stats in FavoriteBoard", () => {
    render(
      <Router>
        <FavoriteBoard />
      </Router>
    );
    expect(screen.getByText("Player Stats")).toBeInTheDocument();
  });

  // it("Should have View Stats in FavoriteBoard", () => {
  //   render(
  //     <Router>
  //       <FavoriteBoard />
  //     </Router>
  //   );
  //   expect(screen.getByText("View Stats")).toBeInTheDocument();
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
export default FavoriteBoard;

import Header from "../components/Header";
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

describe("Testing Cards header", () => {
  beforeEach(() => {
    // mock.resetHistory();
  });

  it("Should have LOGIN in header", () => {
    render(
      <Router>
        <Header />
      </Router>
    );
    expect(screen.getByText("LOGIN")).toBeInTheDocument();
  });

  it("Should have REGISTER in header", () => {
    render(
      <Router>
        <Header />
      </Router>
    );
    expect(screen.getByText("REGISTER")).toBeInTheDocument();
  });
  // it("Should have Loading LOGOUT in header", () => {
  //   render(
  //     <Router>
  //       <Header />
  //     </Router>
  //   );
  //   expect(screen.getByText("LOGOUT")).toBeInTheDocument();
  // });

  //  Loading Players...
});
export default Header;

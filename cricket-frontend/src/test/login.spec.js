import Login from "../components/Login";
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

describe("Testing Cards Login", () => {
  beforeEach(() => {
    // mock.resetHistory();
  });
  it("Should have 1 Login To Cricket App in Login", () => {
    // render(<Footer/>);
    //   const { container } = render(<Register />);
    render(
      <Router>
        <Login />
      </Router>
    );
    expect(screen.getByText("Login To Cricket App")).toBeInTheDocument();
  });

  it("Should have Register Now in Login", () => {
    render(
      <Router>
        <Login />
      </Router>
    );
    expect(screen.getByText("Register now")).toBeInTheDocument();
  });

  it("Should have Username in Login", () => {
    render(
      <Router>
        <Login />
      </Router>
    );
    expect(screen.getByTestId("Username")).toBeInTheDocument();
  });

  it("Should have password in Login", () => {
    render(
      <Router>
        <Login />
      </Router>
    );
    expect(screen.getByTestId("password")).toBeInTheDocument();
  });
});
export default Login;

import Register from "../components/Register";
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

describe("Testing Cards Register", () => {
  beforeEach(() => {
    // mock.resetHistory();
  });
  it("Should have 1 Login here in Register", () => {
    // render(<Footer/>);
    //   const { container } = render(<Register />);
    render(
      <Router>
        <Register />
      </Router>
    );
    expect(screen.getByText("Login here")).toBeInTheDocument();
  });

  it("Should have Register Now in Register", () => {
    render(
      <Router>
        <Register />
      </Router>
    );
    expect(screen.getByText("Register Now")).toBeInTheDocument();
  });

  it("Should have lastname in Register", () => {
    render(
      <Router>
        <Register />
      </Router>
    );
    expect(screen.getByTestId("lastname")).toBeInTheDocument();
  });

  it("Should have password in Register", () => {
    render(
      <Router>
        <Register />
      </Router>
    );
    expect(screen.getByTestId("password")).toBeInTheDocument();
  });

  it("Should have confirmPassword in Register", () => {
    render(
      <Router>
        <Register />
      </Router>
    );
    expect(screen.getByTestId("confirmPassword")).toBeInTheDocument();
  });

  it("Should have firstname in Register", () => {
    render(
      <Router>
        <Register />
      </Router>
    );
    expect(screen.getByTestId("firstname")).toBeInTheDocument();
  });
});
export default Register;

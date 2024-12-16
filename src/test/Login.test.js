import { render, screen, fireEvent } from "@testing-library/react";
import Login from "../Component/Login";
import axios from "axios";
import {expect, jest, test} from '@jest/globals';
import React from "react";


jest.mock("axios");

test("renders the Login component", () => {
  render(<Login />);
  expect(screen.getByText(/Login/i)).toBeInTheDocument();
});

test("shows success alert on successful login", async () => {
  axios.post.mockResolvedValue({ data: { token: "sample-token" } });

  render(<Login/>);
  fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: "test@example.com" } });
  fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: "password" } });
  fireEvent.click(screen.getByText(/Login/i));

  expect(await screen.findByText(/Login successful!/i)).toBeInTheDocument();
});

test("shows error message on failed login", async () => {
  axios.post.mockRejectedValue({ response: { data: { message: "Invalid credentials" } } });

  render(<Login />);
  fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: "test@example.com" } });
  fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: "password" } });
  fireEvent.click(screen.getByText(/Login/i));

  expect(await screen.findByText(/Invalid credentials/i)).toBeInTheDocument();
});
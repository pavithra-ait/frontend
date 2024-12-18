import { render, screen } from "@testing-library/react";
import ItemTable from "../Component/ItemTable";
import { expect, test } from '@jest/globals';
import React from "react";

test("renders item table", () => {
  render(<ItemTable />);
  expect(screen.getByText(/Items List/i)).toBeInTheDocument();
});

import { render, screen, fireEvent } from '@testing-library/react';
import Register from '../Register'; // Adjust the import to match your component's location
import {expect, describe, test} from '@jest/globals';
import React from "react";


describe('Register Component', () => {
  test('should submit the form successfully', async () => {
    render(<Register />);
    
    // Fill out the form
    fireEvent.change(screen.getByLabelText(/Name:/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password' } });

    // Use `getByRole` to find the button explicitly
    fireEvent.click(screen.getByRole('button', { name: /Register/i }));

    // Verify success message
    expect(await screen.findByText(/Registration successful!/i)).toBeInTheDocument();
  });

  test('should show error message on failed registration', async () => {
    render(<Register />);
    
    // Fill out the form with existing user
    fireEvent.change(screen.getByLabelText(/Name:/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password' } });

    // Use `getByRole` to find the button explicitly
    fireEvent.click(screen.getByRole('button', { name: /Register/i }));

    // Verify error message
    expect(await screen.findByText(/User already exists/i)).toBeInTheDocument();
  });
});

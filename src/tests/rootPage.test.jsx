import { render, screen } from "@testing-library/react";
import RootPage from "../components/RootPage";
import { describe, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";

describe("Root page component", () => {
    it('renders header', () => {
        render(<MemoryRouter><RootPage /></MemoryRouter>);
        const header = screen.getByRole("navigation");
        expect(header.childNodes.length).toBe(3);
    })

    it('renders empty cart correctly', () => {
        render(<MemoryRouter><RootPage /></MemoryRouter>);
        const headerCart = screen.getByRole("navigation").lastChild;
        console.log(headerCart.getElementsByTagName('p'));
        expect(headerCart.getElementsByTagName('p')[0]).toBe(undefined);
    })
})
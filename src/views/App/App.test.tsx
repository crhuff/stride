import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App Component", () => {
  it("renders the App component without crashing", () => {
    render(<App />);
    const helloButton = screen.getByText(/Hello!/i); // Adjust text based on your App content
    expect(helloButton).toBeInTheDocument();
  });
});

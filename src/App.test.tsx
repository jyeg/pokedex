/* eslint-disable testing-library/render-result-naming-convention */
import React from "react";
import { act, render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";

describe("App Integration tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store.dispatch({ type: "RESET" });
  });

  test("renders App and results", async () => {
    const screen = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const sidebarTitle = screen.getByText("Pokedex");
    const sidebarSubTitle = screen.getByText("Search for a Pokémon by name");
    const searchComponent = screen.getByTestId("search-input");

    expect(sidebarTitle).toBeInTheDocument();
    expect(sidebarSubTitle).toBeInTheDocument();
    expect(searchComponent).toBeInTheDocument();

    const mainSection = await screen.findByTestId("results-container");

    expect(mainSection).toBeInTheDocument();
  });

  test("renders detail section when a Pokemon is selected", async () => {
    const screen = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const mainSection = await screen.findByTestId("results-container");

    expect(mainSection).toBeInTheDocument();

    const pikachu = await screen.findByText("Pikachu");

    expect(pikachu).toBeInTheDocument();

    act(() => {
      pikachu.click();
    });

    const detailSection = await screen.findByTestId("details-container");

    expect(detailSection).toBeInTheDocument();

    const backButton = await screen.findByTestId("back-button");

    expect(backButton).toBeInTheDocument();

    act(() => {
      backButton.click();
    });
  });

  test('renders "No Pokémon found" when no Pokemon is found', async () => {
    const screen = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const mainSection = await screen.findByTestId("results-container");

    expect(mainSection).toBeInTheDocument();

    const searchComponent = screen.getByTestId("search-input");

    expect(searchComponent).toBeInTheDocument();

    act(() => {
      fireEvent.change(searchComponent, { target: { value: "pikachuuuu" } });
    });

    const noPokemonFound = await screen.findByText("No Pokémon found :(");

    expect(noPokemonFound).toBeInTheDocument();
  });

  test("changes the text of the search input when a history item is clicked", async () => {
    const screen = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const mainSection = await screen.findByTestId("results-container");

    expect(mainSection).toBeInTheDocument();

    const searchComponent = screen.getByTestId("search-input");

    expect(searchComponent).toBeInTheDocument();

    act(() => {
      fireEvent.change(searchComponent, {
        target: { value: "pika" },
      });
    });

    const pika = await screen.findByTestId("history-pika");

    expect(pika).toBeInTheDocument();

    const pikachu = await screen.findByText("Pikachu");
    expect(pikachu).toBeInTheDocument();

    const noResultSearch = screen.getByTestId("history-pikachuuuu");

    act(() => {
      noResultSearch.click();
    });

    const noPokemonFound = await screen.findByText("No Pokémon found :(");

    expect(noPokemonFound).toBeInTheDocument();
  });
});

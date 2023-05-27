import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import { useGetPokemonAbilitiesQuery } from "../../app/services/pokemon";
import { Abilities } from "./Abilities";

jest.mock("../../app/services/pokemon");

describe("Abilities", () => {
  const mockedUseGetPokemonAbilitiesQuery =
    useGetPokemonAbilitiesQuery as jest.Mock;

  beforeEach(() => {
    mockedUseGetPokemonAbilitiesQuery.mockClear();
  });

  test("renders abilities correctly when data is available", async () => {
    const abilitiesData = {
      abilities: [
        {
          ability: {
            id: 1,
            name: "ability1",
            effects: [
              { id: 1, short_effect: "Effect 1" },
              { id: 2, short_effect: "Effect 2" },
            ],
          },
        },
        {
          ability: {
            id: 2,
            name: "ability2",
            effects: [{ id: 3, short_effect: "Effect 3" }],
          },
        },
      ],
    };

    mockedUseGetPokemonAbilitiesQuery.mockReturnValue({
      data: abilitiesData,
      isLoading: false,
      error: null,
    });

    render(<Abilities />);

    await waitFor(() => {
      const ability1Title = screen.getByText("Ability1");
      const ability2Title = screen.getByText("Ability2");

      expect(ability1Title).toBeInTheDocument();
      expect(ability2Title).toBeInTheDocument();

      const ability1Effect1 = screen.getByText("Effect 1");
      const ability1Effect2 = screen.getByText("Effect 2");
      const ability2Effect3 = screen.getByText("Effect 3");

      expect(ability1Effect1).toBeInTheDocument();
      expect(ability1Effect2).toBeInTheDocument();
      expect(ability2Effect3).toBeInTheDocument();
    });
  });

  test("renders loading state correctly while data is being fetched", async () => {
    mockedUseGetPokemonAbilitiesQuery.mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    render(<Abilities />);

    const loadingIndicator = screen.getByText("Loading abilities...");

    expect(loadingIndicator).toBeInTheDocument();
  });

  test("renders error message correctly when there is an error", async () => {
    const errorMessage = "Failed to fetch abilities.";

    mockedUseGetPokemonAbilitiesQuery.mockReturnValue({
      data: null,
      isLoading: false,
      error: errorMessage,
    });

    render(<Abilities />);

    const errorText = screen.getByText(errorMessage);

    expect(errorText).toBeInTheDocument();
  });
});

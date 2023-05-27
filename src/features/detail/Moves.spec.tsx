import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import { useGetPokemonMovesQuery } from "../../app/services/pokemon";
import { Moves } from "./Moves";

jest.mock("../../app/services/pokemon");

describe("Moves", () => {
  const mockedUseGetPokemonMovesQuery = useGetPokemonMovesQuery as jest.Mock;

  beforeEach(() => {
    mockedUseGetPokemonMovesQuery.mockClear();
  });

  test("renders moves correctly when data is available", async () => {
    const movesData = {
      moves: [
        { move: { name: "move1", power: 50, accuracy: 90 } },
        { move: { name: "move2", power: 70, accuracy: 100 } },
      ],
    };

    mockedUseGetPokemonMovesQuery.mockReturnValue({
      data: movesData,
      isLoading: false,
      error: null,
    });

    render(<Moves />);

    await waitFor(() => {
      const move1Title = screen.getByText("Move1");
      const move2Title = screen.getByText("Move2");

      expect(move1Title).toBeInTheDocument();
      expect(move2Title).toBeInTheDocument();

      const move1Power = screen.getByText("Power: 50");
      const move2Power = screen.getByText("Power: 70");

      expect(move1Power).toBeInTheDocument();
      expect(move2Power).toBeInTheDocument();

      const move1Accuracy = screen.getByText("Accuracy: 90");
      const move2Accuracy = screen.getByText("Accuracy: 100");

      expect(move1Accuracy).toBeInTheDocument();
      expect(move2Accuracy).toBeInTheDocument();
    });
  });

  test("renders loading state correctly while data is being fetched", async () => {
    mockedUseGetPokemonMovesQuery.mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    render(<Moves />);

    const loadingIndicator = screen.getByText("Loading moves...");

    expect(loadingIndicator).toBeInTheDocument();
  });

  test("renders error message correctly when there is an error", async () => {
    const errorMessage = "Failed to fetch moves.";

    mockedUseGetPokemonMovesQuery.mockReturnValue({
      data: null,
      isLoading: false,
      error: errorMessage,
    });

    render(<Moves />);

    const errorText = screen.getByText(errorMessage);

    expect(errorText).toBeInTheDocument();
  });
});

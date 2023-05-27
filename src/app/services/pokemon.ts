import { createApi } from "@reduxjs/toolkit/query/react";
import { gql } from "graphql-request";
import { graphqlRequestBaseQuery } from "@rtk-query/graphql-request-base-query";
import { capitalizeFirstLetter } from "../../utilities/text";

export interface Ability {
  ability: {
    id: number;
    name: string;
    effects: {
      short_effect: string;
      id: number;
    }[];
  };
}

export interface Move {
  move: {
    accuracy: number;
    name: string;
    power: number;
  };
}

export interface Type {
  id: number;
  pokemon_v2_type: {
    name: string;
  };
}

export interface Pokemon {
  id: number;
  name: string;
  image?: string;
  types?: Type[];
  abilities?: Ability[];
  moves?: Move[];
  species?: string;
  pokemon_v2_pokemonsprites: { sprites: string }[];
}

export interface SearchPokemonByNameResponse {
  pokemon: Pokemon[];
}

export const pokemonApi = createApi({
  baseQuery: graphqlRequestBaseQuery({
    url: "https://beta.pokeapi.co/graphql/v1beta",
  }),
  endpoints: (builder) => ({
    searchPokemonByName: builder.query<Pokemon[], string>({
      query: (searchTerm) => ({
        document: gql`
          query SearchPokemonByName($searchTerm: String) {
            pokemon: pokemon_v2_pokemon(
              where: { name: { _iregex: $searchTerm } }
              limit: 30
            ) {
              id
              name
              types: pokemon_v2_pokemontypes {
                id
                pokemon_id
                pokemon_v2_type {
                  name
                }
              }
              pokemon_v2_pokemonsprites {
                sprites
              }
            }
          }
        `,
        variables: {
          searchTerm: searchTerm,
        },
      }),
      transformResponse: (response: SearchPokemonByNameResponse) => {
        return response.pokemon.map((pokemon) => {
          const parsedSprite = JSON.parse(
            pokemon.pokemon_v2_pokemonsprites[0].sprites
          );
          const imageToUse =
            parsedSprite.other["official-artwork"]["front_default"] ||
            parsedSprite["front_default"];
          const removedString = (imageToUse ?? "").replace(
            "/media/",
            "/master/"
          );
          return {
            ...pokemon,
            name: capitalizeFirstLetter(pokemon.name),
            image: `https://raw.githubusercontent.com/PokeAPI/sprites${removedString}`,
          };
        });
      },
    }),
    getPokemon: builder.query<Pokemon, number>({
      query: (id) => ({
        document: gql`
          query GetPokemon($id: Int!) {
            pokemon: pokemon_v2_pokemon(where: { id: { _eq: $id } }) {
              id
              name
              pokemon_v2_pokemonsprites {
                sprites
              }
              types: pokemon_v2_pokemontypes {
                id
                pokemon_id
                pokemon_v2_type {
                  name
                }
              }
            }
          }
        `,
        variables: {
          id: id,
        },
      }),
      transformResponse: (response: SearchPokemonByNameResponse) => {
        return response.pokemon.map((pokemon) => {
          const parsedSprite = JSON.parse(
            pokemon.pokemon_v2_pokemonsprites[0].sprites
          );
          const removedString = parsedSprite.other["official-artwork"][
            "front_default"
          ].replace("/media/", "/master/");
          return {
            ...pokemon,
            name: capitalizeFirstLetter(pokemon.name),
            image: `https://raw.githubusercontent.com/PokeAPI/sprites${removedString}`,
          };
        })[0];
      },
    }),
    getPokemonAbilities: builder.query<Pokemon, number>({
      query: (id) => ({
        document: gql`
          query GetPokemon($id: Int!) {
            pokemon: pokemon_v2_pokemon(where: { id: { _eq: $id } }) {
              abilities: pokemon_v2_pokemonabilities {
                ability: pokemon_v2_ability {
                  name
                  id
                  effects: pokemon_v2_abilityeffecttexts(
                    where: { language_id: { _eq: 9 } }
                  ) {
                    short_effect
                    id
                  }
                }
              }
            }
          }
        `,
        variables: {
          id: id,
        },
      }),
      transformResponse: (response: SearchPokemonByNameResponse) =>
        response.pokemon[0],
    }),
    getPokemonMoves: builder.query<Pokemon, number>({
      query: (id) => ({
        document: gql`
          query GetPokemon($id: Int!) {
            pokemon: pokemon_v2_pokemon(where: { id: { _eq: $id } }) {
              moves: pokemon_v2_pokemonmoves(where: { id: { _eq: 1 } }) {
                move: pokemon_v2_move {
                  name
                  accuracy
                  power
                }
              }
            }
          }
        `,
        variables: {
          id: id,
        },
      }),
      transformResponse: (response: SearchPokemonByNameResponse) =>
        response.pokemon[0],
    }),
  }),
});

export const {
  useSearchPokemonByNameQuery,
  useGetPokemonQuery,
  useGetPokemonAbilitiesQuery,
  useGetPokemonMovesQuery,
} = pokemonApi;

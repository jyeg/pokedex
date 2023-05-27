# PrizePicks Pokedex

## Overview

This Pokedex is built with Typescript, CRA, Redux, Redux Toolkit, RTK Query, GraphQL.

I really enjoyed this project as there were tons of features I inititally wanted to build. It kinda felt like a game, where I learned a lot about Pokemon and the PokeApi structure at the same time as writing code.

I decided to use the Graphql endpoint of the pokeapi as it gave me more flexibility with the data I needed and prevented overfetching. This decision ended up costing me the most time as I was working on bolting it into RTK and fetching the correct data from the endpoint.

### Changes needed for a concurrent environment

If this application was run in a concurrent environment there would be a few concerns for which to account.
The chief concern being the freshness of the data. This would require the utilization of Websockets, webhooks or graphql subscriptions to keep data up to date.

## App Architecture

Components: contain shared generic components
Hooks: Reusable hooks
Services: API Layer using RTK Query and Graphql
Utilities: Reusable utils
Features: A grouping of related components, styles and tests around a specific piece of business logic/functionality.

## Requirements Not Met

I wasnt able to finish the detail tabs within time.
I intentionally chose to stop tweaking styling and building bonus features as I was spending too much time on it. Instead I spent more time thinking about the server state and state management.

- [] Able to see other evolutions of Pokemon and be able to navigate to specific Pokemon in the evolution chain.

## Requirements Met

Please attempt to implement the following business requirements:

- [x] Use the Pokemon API to make API requests for data https://pokeapi.co/docs/v2.
- [x] Able to search for any Pokemon.
- [x] Able to see a history of what has been searched and revisit at anytime.

### Technical Requirements

The following technical requirements must be met:

- [x] You are allowed to use scaffolding technology like “Create React App” or similar.
- [x] This project should be done with the latest React framework.
- [x] This project should be done with the latest Redux framework.
- [x] This project should be done using TypeScript.
- [x] This project should be done using version control, preferably git.
- [x] This project can be styled with SCSS/CSS or Styled Components if anything needs to be styled.
- [x] This project should include a README that addresses anything you may not have completed.

- It should also address what additional changes you might need to make if the application were intended to run in a concurrent environment. Any other comments or thoughts about the project are also welcome.

### Bonus Points

- [x] Able to see details about abilities, moves, species, sprites and types upon searching.

- [x] A sleek and intuitive layout that resembles a Pokedex.
- [x] Automated tests that ensure the business logic implemented is correct.

## Next Steps

- Enhance middlewares to write to redux state in RTK Query using a thunk.
- Add persistence of cache so data isnt lost on each reload.
- Mobile friendly
- E2E tests
- Add Routing
- Transitions
- Better styling/ux
- Remove modules in favor of tailwinds tokens or SCSS
- Relative paths
- Auto complete
- Remove unused CSS
- Utilize React Suspense
- Code splitting
- Ability to clear history

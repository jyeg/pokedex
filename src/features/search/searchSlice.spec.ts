import searchReducer, { SearchState } from "./searchSlice";

describe("counter reducer", () => {
  const initialState: SearchState = {
    history: [],
    searchTerm: "",
  };
  it("should handle initial state", () => {
    expect(searchReducer(undefined, { type: "unknown" })).toEqual({
      history: [],
      searchTerm: "",
    });

    expect(searchReducer(initialState, { type: "unknown" })).toEqual({
      history: [],
      searchTerm: "",
    });
  });

  it("should handle Searching on a term", () => {
    // const actual = searchReducer(initialState, searchByTerm("update"));
    // expect(actual.searchTerm).toEqual("update");
  });
});

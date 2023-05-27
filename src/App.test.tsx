/* eslint-disable testing-library/render-result-naming-convention */
import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";

test("renders learn react link", async () => {
  const screen = render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const loading = await screen.findByText(/loading/i);
  expect(loading).toBeInTheDocument();
});

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./presentations/Homepage";
import reportWebVitals from "./reportWebVitals";
import { QueryClient, QueryClientProvider } from "react-query";
import { store, persistor } from "./common/app/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      retry: 3,
      // 5 minutes
      staleTime: 5 * (60 * 1000),
      // 10 minutes
      cacheTime: 10 * (60 * 1000),
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ChakraProvider } from "@chakra-ui/react";
import queryClient from "./libs/query.ts";
import theme from "./theme/index.ts";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";
import i18n from "./locales/index.ts";
import { persistor, store } from "./store/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import "react-markdown-editor-lite/lib/index.css";

createRoot(document.getElementById("root")!).render(
    <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <ChakraProvider theme={theme}>
            <I18nextProvider i18n={i18n}>
                <Provider store={store}>
                    <PersistGate loading={null} persistor={persistor}>
                        <App />
                    </PersistGate>
                </Provider>
            </I18nextProvider>
        </ChakraProvider>
    </QueryClientProvider>
);

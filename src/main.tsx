// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ChakraProvider } from "@chakra-ui/react";
import queryClient from "./libs/query.ts";
import theme from "./theme/index.ts";

createRoot(document.getElementById("root")!).render(
    <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <ChakraProvider theme={theme}>
            <App />
        </ChakraProvider>
    </QueryClientProvider>
    // <React.StrictMode>
    // </React.StrictMode>,
);

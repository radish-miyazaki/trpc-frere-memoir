import { Suspense, useState } from "react";
import { useRoutes, BrowserRouter as Router } from "react-router-dom";
import routes from "~react-pages";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { trpc } from "./utils/trpc";
import { httpBatchLink } from "@trpc/client";
import { MantineProvider } from "@mantine/core";

function AppContents() {
  return <Suspense fallback={<p>Loading...</p>}>{useRoutes(routes)}</Suspense>;
}

function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "http://localhost:3000/trpc",
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}></QueryClientProvider>
      <MantineProvider>
        <Router>
          <AppContents />
        </Router>
      </MantineProvider>
    </trpc.Provider>
  );
}

export default App;

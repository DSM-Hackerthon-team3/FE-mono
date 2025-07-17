import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { StyledProvider } from './style/StyledProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const root = createRoot(
  document.getElementById("root") as HTMLElement
);

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5000,
      retry: 1,
    },
  },
});

root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <StyledProvider>
        <App />
      </StyledProvider>
    </QueryClientProvider>
  </StrictMode>,
)

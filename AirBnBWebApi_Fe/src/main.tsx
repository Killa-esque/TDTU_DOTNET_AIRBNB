import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import App from './App.tsx'
import './index.css'
import { store } from './redux/configureStore.tsx';
import { AuthProvider } from './contexts/AuthContext.tsx';
import { ThemeProvider } from './contexts/ThemeContext.tsx';
import { NotificationProvider } from './contexts/NotificationContext.tsx';
import { LoadingProvider } from './contexts/LoadingContext.tsx';

const queryClient = new QueryClient();

export const history: any = createBrowserHistory();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HistoryRouter history={history}>
      <Provider store={store}>
        <NotificationProvider>
          <AuthProvider>
            <ThemeProvider>
              <LoadingProvider>
                <QueryClientProvider client={queryClient}>
                  <App />
                  <ReactQueryDevtools initialIsOpen={false} />
                </QueryClientProvider>
              </LoadingProvider>
            </ThemeProvider>
          </AuthProvider>
        </NotificationProvider>
      </Provider>
    </HistoryRouter>
  </StrictMode>
)

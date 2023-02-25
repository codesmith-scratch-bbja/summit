import React from 'react';
import ReactDOM from 'react-dom/client';
import { Home, Discover, Profile, Auth } from './pages';
import { loader as profileLoader } from './pages/Profile';
import { Layout, SideBar } from './components/';
import {
  createBrowserRouter,
  RouterProvider,
  useRouteError
} from 'react-router-dom';
import './index.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/discover',
    element: (
      <Layout>
        <Discover />
      </Layout>
    )
  },
  {
    path: '/:username',
    element: (
      <Layout>
        <Profile />
      </Layout>
    ),
    loader: profileLoader(queryClient),
    errorElement: <ErrorBoundary />
  },
  {
    path: '/auth',
    element: <Auth />
  },
  {
    path: '/',
    element: (
      <Layout>
        <Home />
      </Layout>
    )
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  //<React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
  //</React.StrictMode>
);

function ErrorBoundary() {
  let error = useRouteError();
  console.error(error);
  // Uncaught ReferenceError: path is not defined
  return <div>Dang!</div>;
}

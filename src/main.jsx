import React from 'react';
import ReactDOM from 'react-dom/client';
import { Home, Discover, Profile, Auth } from './pages';
import { Layout, SideBar } from './components/';
import {
  createBrowserRouter,
  RouterProvider,
  useRouteError
} from 'react-router-dom';
import './index.css';
import { QueryClient, QueryClientProvider } from 'react-query';

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

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);

function ErrorBoundary() {
  let error = useRouteError();
  console.error(error);
  // Uncaught ReferenceError: path is not defined
  return <div>Dang!</div>;
}

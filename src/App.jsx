import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
// import components and pages
import { Navbar } from './components/navbar/Navbar';
import { Footer } from './components/footer/Footer';
import { Home } from './pages/home/Home';
import { Register } from './pages/register/Register';
import { Login } from './pages/login/Login';
import { Gigs } from './pages/gigs/Gigs';
import { Gig } from './pages/gig/Gig';
import { Orders } from './pages/orders/Orders';
import { MyGigs } from './pages/myGigs/MyGigs';
import { AddGig } from './pages/addGig/AddGig';
import { Messages } from './pages/messages/Messages';
import { Message } from './pages/message/Message';
import { Pay } from './pages/pay/Pay';
import { Success } from './pages/success/Success';

// React Query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import './App.scss';

function App() {
  const queryClient = new QueryClient();

  const Layout = () => {
    return (
      <div className="app">
        <QueryClientProvider client={queryClient}>
          <Navbar />
          <Outlet />
          <Footer />
        </QueryClientProvider>
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '/register',
          element: <Register />,
        },
        {
          path: '/login',
          element: <Login />,
        },
        {
          path: '/gigs',
          element: <Gigs />,
        },
        {
          path: '/gigs/:id',
          element: <Gig />,
        },
        {
          path: '/orders',
          element: <Orders />,
        },
        {
          path: '/myGigs',
          element: <MyGigs />,
        },
        {
          path: '/add',
          element: <AddGig />,
        },
        {
          path: '/messages',
          element: <Messages />,
        },
        {
          path: '/message/:id',
          element: <Message />,
        },
        {
          path: '/pay/:id',
          element: <Pay />,
        },
        {
          path: '/success',
          element: <Success />,
        },
      ],
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

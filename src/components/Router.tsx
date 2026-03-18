import React from 'react';
import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import HomePage from '@/components/pages/HomePage';
import ClassesPage from '@/components/pages/ClassesPage';
import AboutPage from '@/components/pages/AboutPage';
import ContactPage from '@/components/pages/ContactPage';
import BookAClassPage from '@/components/pages/BookAClassPage';
import PrivacyPolicyPage from '@/components/pages/PrivacyPolicyPage';
import CancellationPolicyPage from '@/components/pages/CancellationPolicyPage';
import TermsAndConditionsPage from '@/components/pages/TermsAndConditionsPage';

// Layout component that includes ScrollToTop
function Layout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
        routeMetadata: {
          pageIdentifier: 'home',
        },
      },
      {
        path: "classes",
        element: <ClassesPage />,
        routeMetadata: {
          pageIdentifier: 'classes',
        },
      },
      {
        path: "about",
        element: <AboutPage />,
        routeMetadata: {
          pageIdentifier: 'about',
        },
      },
      {
        path: "contact",
        element: <ContactPage />,
        routeMetadata: {
          pageIdentifier: 'contact',
        },
      },
      {
        path: "book-a-class",
        element: <BookAClassPage />,
        routeMetadata: {
          pageIdentifier: 'book-a-class',
        },
      },
      {
        path: "privacy-policy",
        element: <PrivacyPolicyPage />,
        routeMetadata: {
          pageIdentifier: 'privacy-policy',
        },
      },
      {
        path: "cancellation-policy",
        element: <CancellationPolicyPage />,
        routeMetadata: {
          pageIdentifier: 'cancellation-policy',
        },
      },
      {
        path: "terms-and-conditions",
        element: <TermsAndConditionsPage />,
        routeMetadata: {
          pageIdentifier: 'terms-and-conditions',
        },
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
], {
  basename: import.meta.env.BASE_NAME,
});

export default function AppRouter() {
  return (
    <MemberProvider>
      <RouterProvider router={router} />
    </MemberProvider>
  );
}

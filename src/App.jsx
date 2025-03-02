import React from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import HomePage from "./pages/Home/HomePage";
import AllCustomers from "./pages/Customers/AllCustomers";
import CustomerInfo from "./pages/Customers/CustomerInfo";
import { createBrowserRouter, RouterProvider } from "react-router";
import AddEntry from "./components/customer/AddEntry";
import EditEntry from "./components/customer/EditEntry";
import CustomerSettings from "./pages/Customers/CustomerSettings";
import LoginPage from "./pages/Login/LoginPage";
import User from "./pages/Login/User";

// Initialize Apollo Client
const client = new ApolloClient({
  uri: "https://byaaj-backend.onrender.com/graphql",
  // uri: "http://localhost:8080/graphql",
  cache: new InMemoryCache(),
  credentials: "include",
});

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage />,
    },
    {
      path: "/home",
      element: <HomePage />,
    },
    {
      path: "/user",
      element: <User />,
    },
    {
      path: "/customers",
      element: <AllCustomers />,
    },
    {
      path: "/customer-info/:customerID",
      element: <CustomerInfo />,
    },
    {
      path: "/customer-profile/:customerID",
      element: <CustomerSettings />,
    },
    {
      path: "/add-entries/:customerID",
      element: <AddEntry />,
    },
    {
      path: "/edit-entries/:customerID",
      element: <EditEntry />,
    },
  ]);
  return (
    <div className="lg:w-1/4">
      <ApolloProvider client={client}>
        <RouterProvider router={router} />
      </ApolloProvider>
    </div>
  );
};

export default App;

import React from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import HomePage from "./pages/Home/HomePage";
import AllCustomers from "./pages/Customers/AllCustomers";
import CustomerInfo from "./pages/Customers/CustomerInfo";
import { createBrowserRouter, RouterProvider } from "react-router";
import AddEntry from "./components/customer/AddEntry";
import EditEntry from "./components/customer/EditEntry";

// Initialize Apollo Client
const client = new ApolloClient({
  uri: "http://localhost:8080/graphql",
  cache: new InMemoryCache(),
  // credentials: "include",
});

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
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

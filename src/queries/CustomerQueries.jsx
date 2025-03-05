import { gql } from "@apollo/client";

const ALL_CUSTOMERS = gql`
  query AllCustomers {
    customers {
      id
      name
      phone
      interest
      entries {
        entries {
          type
          amount
          details
          date
        }
        balance {
          totalAmount
          type
        }
      }
      createdAt
      updatedAt
    }
  }
`;

const GET_CUSTOMER = gql`
  query GetCustomer($id: ID) {
    customer(customerID: $id) {
      id
      name
      phone
      interest
      entries {
        entries {
          type
          amount
          details
          date
        }
        balance {
          totalAmount
          type
        }
      }
      createdAt
      updatedAt
    }
  }
`;

const GET_ENTRIES = gql`
  query GetEntries($customerID: ID) {
    entries(customerID: $customerID) {
      customerID
      entries {
        id
        type
        amount
        details
        date
      }
      balance {
        totalAmount
        type
      }
    }
  }
`;

const GET_TRACKING = gql`
  query GetTracking($customerID: ID) {
    customerInterestTracking(customerID: $customerID) {
      totalInterestPaid
      tracking {
        year
        months {
          month
          interestAmt
          status
          paidDate
        }
      }
    }
  }
`;

const UPCOMING_PAYMENTS = gql`
  query UpcomingPayments {
    customersWithUpcomingInterest {
      id
      name
      phone
      interest
      entries {
        entries {
          type
          amount
          details
          date
        }
        balance {
          totalAmount
          type
        }
      }
      createdAt
      updatedAt
    }
  }
`;

export {
  ALL_CUSTOMERS,
  GET_CUSTOMER,
  GET_ENTRIES,
  GET_TRACKING,
  UPCOMING_PAYMENTS,
};

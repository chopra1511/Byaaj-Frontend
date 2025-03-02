import { gql } from "@apollo/client";

const ADD_CUSTOMER = gql`
  mutation AddCustomer(
    $name: String
    $phone: String
    $initialType: String
    $initialAmount: Float
    $interest: Float
    $date: String
  ) {
    createCustomer(
      name: $name
      phone: $phone
      initialType: $initialType
      initialAmount: $initialAmount
      interest: $interest
      date: $date
    ) {
      id
      name
      phone
    }
  }
`;

const DELETE_CUSTOMER = gql`
  mutation DeleteCustomer($customerID: ID) {
    deleteCustomer(customerID: $customerID)
  }
`;

const ADD_ENTRY = gql`
  mutation AddEntry(
    $customerID: ID
    $type: String
    $amount: Float
    $details: String
    $date: String
  ) {
    addEntry(
      customerID: $customerID
      type: $type
      amount: $amount
      details: $details
      date: $date
    ) {
      customerID
      entries {
        type
        amount
        date
      }
      balance {
        totalAmount
        type
      }
    }
  }
`;

const EDIT_ENTRY = gql`
  mutation EditEntry(
    $customerID: ID
    $entryID: ID
    $amount: Float
    $details: String
    $type: String
    $date: String
  ) {
    editEntry(
      customerID: $customerID
      entryID: $entryID
      amount: $amount
      type: $type
      details: $details
      date: $date
    ) {
      customerID
      entries {
        type
        amount
        details
        date
      }
    }
  }
`;

const DELETE_ENTRY = gql`
  mutation DeleteEntry($customerID: ID,$entryID: ID) {
    deleteEntry(customerID: $customerID,entryID: $entryID) 
}
`;

const INTEREST_TRACKING = gql`
  mutation UpdateInterestTracking(
    $customerID: ID
    $month: String
    $year: Int
    $interestAmt: Float
    $status: String
    $paidDate: String
  ) {
    updateInterestTracking(
      customerID: $customerID
      month: $month
      year: $year
      interestAmt: $interestAmt
      status: $status
      paidDate: $paidDate
    ) {
      customerID
      tracking {
        year
        months {
          month
          interestAmt
          status
          paidDate
        }
      }
      totalInterestPaid
    }
  }
`;

export {
  ADD_CUSTOMER,
  ADD_ENTRY,
  EDIT_ENTRY,
  INTEREST_TRACKING,
  DELETE_CUSTOMER,
  DELETE_ENTRY,
};

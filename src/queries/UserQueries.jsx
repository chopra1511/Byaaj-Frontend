import { gql } from "@apollo/client";

const CURRENT_USER = gql`
  query CurrentUser {
    currentUser {
      name
      phone
    }
  }
`;

export {CURRENT_USER}
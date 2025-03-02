import { gql } from "@apollo/client";

const REGISTER_USER = gql`
  mutation RegisterUser($name: String, $password: String, $phone: String) {
    registerUser(name: $name, password: $password, phone: $phone) {
      id
      name
      phone
    }
  }
`;

const LOGIN_USER = gql`
  mutation UserLogin($phone: String, $password: String) {
    userLogin(phone: $phone, password: $password) {
      id
      name
      phone
    }
  }
`;

const LOGOUT_USER = gql`
  mutation LogoutUser {
    logoutUser
  }
`;

export { REGISTER_USER, LOGIN_USER, LOGOUT_USER };

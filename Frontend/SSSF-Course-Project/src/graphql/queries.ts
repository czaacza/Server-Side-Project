const loginQuery = `
      mutation Login($credentials: Credentials!) {
        login(credentials: $credentials) {
          token
          message
          user {
            id
            username
            email
          }
        }
      }
    `;

const userByIdQuery = `
query UserById($userByIdId: ID!) {
  userById(id: $userByIdId) {
    id
    username
    email
    details {
      firstName
      lastName
      phone
    }
  }
}
`;

export { loginQuery, userByIdQuery };

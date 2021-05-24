import { buildSchema } from "graphql";

export const schema = buildSchema(`
    type User {
        id : ID
        name: String
        email: String  
        password: String  
        password2: String
        token: String
    }

    input UserRegisterInput {
        id : ID
        name: String
        email: String  
        password: String  
        password2: String  
    }
    input UserLoginInput {
        email: String
        password: Int
    }
 
    type Query{
        getAllUsers: [User]
    }
    type Mutation {
        registerUser(input: UserRegisterInput):User
        loginUser(input: UserLoginInput): User
    }
`);

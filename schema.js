import { buildSchema } from "graphql";

export const schema = buildSchema(`
    type User {
        id : ID
        name: String
        email: String  
        password: String  
        token: String
    }
    type Tweet {
        id: ID
        author: String
        tweetText: String
        createdAt: String
        pictureTweet: String
        countLikes: Int
        countRetweets: Int
        countComments: Int
    }
    input TweetCreateInput {
        id: ID
        author: String
        tweetText: String
        userId: String
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
        password: String  
    }
 
    type Query{
        getAllUsers: [User]
        getAllTweets: [Tweet]
    }
    type Mutation {
        registerUser(input: UserRegisterInput):User
        loginUser(input: UserLoginInput): User
        addTweet(input: TweetCreateInput): Tweet
    }
`);

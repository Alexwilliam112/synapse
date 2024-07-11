const { compare } = require("../utils/bcrypt");
const { signToken } = require("../utils/jwt");
const { GraphQLError } = require("graphql");
const User = require("../models/user");
const { EmailAddressResolver, JSONResolver } = require("graphql-scalars");
const Validation = require("../utils/validation");

module.exports = {
  userTypeDefs: `#graphql
        scalar EmailAddress
        scalar JSON

        input UserInput {
            name: String
            username: String!
            email: EmailAddress!
            password: String!
        }

        input LoginInput {
            username: String!
            password: String!
        }

        input nameOrUsername {
            nameOrUsername: String!
        }

        input UserIdInput {
            userId: ID
        }

        type UserDb {
            _id: ID!
            name: String
            username: String!
            email: String!
            password: String
        }

        type User {
            _id: ID
            name: String
            username: String
            email: String
        }

        type UserInfo {
            _id: ID
            name: String
            username: String
        }

        type GetAllUserResponse {
            statusCode: Int
            data: [UserDb]
        }

        type CreateUserResponse {
            statusCode: Int
            message: String,
            data: JSON
        }

        type LoginResponse {
            statusCode: Int
            access_token: String
            username: String
            userId: ID
        }

        type UserFoundResponse {
            statusCode: Int
            data: [User]
        }

        type UserById {
            _id: ID
            name: String
            username: String
            email: String
            followingCount: Int
            followerCount: Int
            followers: [followDb]
            followings: [followDb]
        }

        type GetUserByIdResponse {
            statusCode: Int
            data: UserById
        }

        type Query {
            GetAllUser: GetAllUserResponse
            FindUser(input: nameOrUsername): UserFoundResponse
            GetUserById(input: UserIdInput): GetUserByIdResponse
            GetCurrentUser: GetUserByIdResponse
        }

        type Mutation {
            CreateUser(input: UserInput): CreateUserResponse
            HandleLogin(input: LoginInput): LoginResponse
        }
	`,

  userResolvers: {
    EmailAddress: EmailAddressResolver,
    JSON: JSONResolver,

    Query: {
      GetCurrentUser: async (_, __, context) => {
        const user = await context.auth();
        const data = await User.JoinUserAndFollow(user._id)
        
        return {
          statusCode: 200,
          data
        }
      },

      GetAllUser: async (_, __, context) => {
        await context.auth();
        const data = await User.find({});
        return {
          statusCode: 200,
          data,
        };
      },

      GetUserById: async (_, args, context) => {
        await context.auth();
        const { input } = args;
        const { userId } = input;
        Validation.notEmpty(userId, "UserId");

        const data = await User.JoinUserAndFollow(userId);
        return {
          statusCode: 200,
          data,
        };
      },

      FindUser: async (_, args, context) => {
        await context.auth();
        const { input } = args;
        const { nameOrUsername } = input;

        let user = await User.find({
          nameOrUsername,
        });

        return {
          statusCode: 200,
          data: user,
        };
      },
    },

    Mutation: {
      CreateUser: async (_, args) => {
        const { input } = args;
        const { name, username, email, password } = input;

        Validation.notEmpty(username, "username");
        Validation.notEmpty(email, "email");
        Validation.notEmpty(password, "password");
        Validation.length(password, 5, "password");
        await Validation.unique(username, User.find, "username");
        await Validation.unique(email, User.find, "email");

        const user = await User.create(name, username, email, password);
        return {
          statusCode: 201,
          message: `success create new user`,
          data: user,
        };
      },

      HandleLogin: async (_, args) => {
        const { input } = args;
        const { username, password } = input;

        const loginError = {
          extensions: {
            http: {
              status: 401,
            },
          },
        };

        const user = await User.find({ username });
        if (!user)
          throw new GraphQLError("Invalid username or password", loginError);

        const isValid = compare(password, user.password);
        if (!isValid)
          throw new GraphQLError("Invalid username or password", loginError);

        const access_token = signToken({
          id: user._id,
          username: user.username,
          email: user.email,
        });

        return {
          statusCode: 200,
          access_token,
          username,
          userId: user._id
        };
      },
    },
  },
};

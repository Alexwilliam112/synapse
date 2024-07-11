const { GraphQLError } = require("graphql");
const { DateTimeResolver } = require("graphql-scalars");

module.exports = {
  followTypeDefs: `#graphql
        scalar DateTime

        input LoginInput {
            email: String!
            password: String!
        }

        type followDb {
            _id: ID!
            followingId: ID!
            followerId: ID!
            createdAt: DateTime
            updatedAt: DateTime
        }

        type FollowResponse {
            statusCode: Int
            message: String
        }

        type Mutation {
            Follow(input: FollowInput): FollowResponse
        }
    `,

  followResolvers: {
    DateTime: DateTimeResolver,

    Query: {},

    Mutation: {
      Follow: async (_, args, context) => {
        const loginInfo = await context.auth();
        const followerId = loginInfo._id;

        const { input } = args;
        const { followingId } = input;

        const targetUser = await User.find({ id: followingId });
        if (!targetUser) {
          throw new GraphQLError(`User not found`, {
            extensions: {
              http: {
                status: 404,
              },
            },
          });
        }

        await Follow.create({ followerId, followingId: targetUser._id });
        return {
          statusCode: 201,
          message: `Follow added`,
        };
      },
    },
  },
};

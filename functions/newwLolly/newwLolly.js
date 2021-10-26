const { ApolloServer, gql } = require("apollo-server-lambda")
const shortid = require("shortid")

const faunadb = require("faunadb"),
  q = faunadb.query

const typeDefs = gql`
  type Query {
    getLolly(lollyPath: String!): Lolly
  }
  
  type Lolly {
    id: ID!
    recipientName: String!
    message: String!
    senderName: String!
    flavourTop: String!
    flavourMiddle: String!
    flavourBottom: String!
    lollyPath: String!
  }

  type Mutation {
    createLolly (recipientName:String!, message: String!, senderName: String!,flavourTop: String!,flavourMiddle: String!,flavourBottom: String!): Lolly
  }
`

const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET_KEY,
  domain: "db.us.fauna.com",
  scheme: "https",
})

const resolvers = {
  Query: {
    getLolly: async (_, { lollyPath }) => {
      console.log("Lolly Path: ", lollyPath)

      const result = await client.query(
        q.Get(q.Match(q.Index("lolly_by_path"), lollyPath))
      )

      console.log(`Lolly result get = ${result.data}`)
      return result.data
    },
  },
  Mutation: {
    createLolly: async (_, lollyData) => {
      console.log(`createLolly: ${JSON.stringify(lollyData)}`)
      lollyData.lollyPath = shortid.generate()

      try {
        const result = await client.query(
          q.Create(q.Collection("lollies"), {
            data: lollyData,
          })
        )

        console.log(`Server results: ${result.data}`)
        return result.data
      } catch (e) {
        console.log(`createLolly server error: ${e}`)
        return {
          error: e.message,
        }
      }
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
})

const handler = server.createHandler()

module.exports = { handler }

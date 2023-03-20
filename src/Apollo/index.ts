import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'



export const client = new ApolloClient({
  uri: 'https://api.example.com/graphql',
  headers: {
    authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
  },

  cache: new InMemoryCache(),
})

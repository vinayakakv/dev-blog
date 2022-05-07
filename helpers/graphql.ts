import { ApolloClient, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  uri: process.env.GRAPHCMS_URL,
  cache: new InMemoryCache(),
  headers: {
    'gcms-stage':
      process.env.NODE_ENV === 'development' ? 'DRAFT' : 'PUBLISHED',
  },
})

export default client

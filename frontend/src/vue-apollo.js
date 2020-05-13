import Vue from 'vue'
import VueApollo from 'vue-apollo'
import {
  createApolloClient,
  restartWebsockets
} from 'vue-cli-plugin-apollo/graphql-client'
import {
  split
} from "apollo-link"
import {
  WebSocketLink
} from "apollo-link-ws";
import {
  getMainDefinition
} from "apollo-utilities";
import {
  HttpLink
} from "apollo-link-http";
import {
  InMemoryCache
} from "apollo-cache-inmemory";

// Install the vue plugin
Vue.use(VueApollo)

// Name of the localStorage item
const AUTH_TOKEN = 'apollo-token'

// Http endpoint
//const httpEndpoint = process.env.VUE_APP_FAV_HTTP

const httpLink = new HttpLink({
  uri: process.env.VUE_APP_FAV_HTTP
});
const wsLink = new WebSocketLink({
  uri: "ws://localhost:3000/graphql",
  options: {
    reconnect: true
  }
});

// Config
const defaultOptions = {
  //httpEndpoint,
  //wsEndpoint: 'ws://localhost:3000/graphql' /*process.env.VUE_APP_GRAPHQL_WS*/ ,
  // LocalStorage token
  tokenName: AUTH_TOKEN,
  // Enable Automatic Query persisting with Apollo Engine
  persisting: false,
  // Use websockets for everything (no HTTP)
  // You need to pass a `wsEndpoint` for this to work
  //websocketsOnly: true,
  // Is being rendered on the server?
  ssr: false,

  // Override default apollo link
  // note: don't override httpLink here, specify httpLink options in the
  // httpLinkOptions property of defaultOptions.
  // link: myLink

  // Override default cache
  // cache: myCache

  // Override the way the Authorization header is set
  /*
  getAuth: () => {
    //headerを返す
    const token = process.env.VUE_APP_GITHUB_GRAPHQL_AUTH_TOKEN;
    if (token) return `Bearer ${token}`;
    else return '';
  }*/

  // Additional ApolloClient options
  // apollo: { ... }

  // Client local data (see apollo-link-state)
  // clientState: { resolvers: { ... }, defaults: { ... } }
}

//subscriptionの場合はtrue
const link = split(
  ({
    query
  }) => {
    // クエリから種別を取得してsubscriptionの場合は、wsLink（websocket）を利用する。
    const definition = getMainDefinition(query);
    console.log(definition)
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

// Call this in the Vue app file
export function createProvider( /*options = {}*/ ) {
  const createFav = createApolloClient({
    link,
    ...defaultOptions,
    cache: new InMemoryCache(),
    connectToDevTools: true,
  })
  const clientFav = createFav.apolloClient;
  // Create vue apollo provider
  const apolloProvider = new VueApollo({
    defaultClient: clientFav,
    defaultOptions: {
      $query: {
        fetchPolicy: 'cache-and-network',
      },
    },
    errorHandler(error) {
      // eslint-disable-next-line no-console
      console.log('%cError', 'background: red; color: white; padding: 2px 4px; border-radius: 3px; font-weight: bold;', error.message)
    },
  })
  return apolloProvider
}

// Manually call this when user log in
export async function onLogin(apolloClient, token) {
  if (typeof localStorage !== 'undefined' && token) {
    localStorage.setItem(AUTH_TOKEN, token)
  }
  if (apolloClient.wsClient) restartWebsockets(apolloClient.wsClient)
  try {
    await apolloClient.resetStore()
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('%cError on cache reset (login)', 'color: orange;', e.message)
  }
}

// Manually call this when user log out
export async function onLogout(apolloClient) {
  if (typeof localStorage !== 'undefined') {
    localStorage.removeItem(AUTH_TOKEN)
  }
  if (apolloClient.wsClient) restartWebsockets(apolloClient.wsClient)
  try {
    await apolloClient.resetStore()
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('%cError on cache reset (logout)', 'color: orange;', e.message)
  }
}
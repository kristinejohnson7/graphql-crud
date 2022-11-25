import "./App.scss";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import DisplayData from "./components/DisplayData";
import { Container } from "@mui/material";
import { UserProvider } from "./context";

function App() {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "http://localhost:4000/graphql",
  });
  return (
    <ApolloProvider client={client}>
      <UserProvider>
        <Container className="App">
          <DisplayData />
        </Container>
      </UserProvider>
    </ApolloProvider>
  );
}

export default App;

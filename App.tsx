import { NavigationContainer } from '@react-navigation/native';
import {TailwindProvider} from 'tailwind-rn';
import utilities from './tailwind.json';
import CustomerScreen from './screens/CustomerScreen';
import RootNavigator from './navigator/RootNavigator';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';


const client = new ApolloClient({
  uri: 'https://kabinda.stepzen.net/api/dunking-sasquatch/__graphql',
  headers: {'Authorization':'apikey kabinda::stepzen.io+1000::0257eab4bb64a948359bbf05ba177956a26d5337439dd54e8fe9e5396e451d4f'},
  cache: new InMemoryCache()
});

export default function App() {

  return (
    //@ts-ignore
    <TailwindProvider utilities={utilities}>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <RootNavigator/>
        </NavigationContainer>
      </ApolloProvider>
    </TailwindProvider>
  );
}

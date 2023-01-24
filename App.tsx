import { NavigationContainer } from '@react-navigation/native';
import {TailwindProvider} from 'tailwind-rn';
import utilities from './tailwind.json';
import CustomerScreen from './screens/CustomerScreen';
import RootNavigator from './navigator/RootNavigator';

export default function App() {

  return (
    //@ts-ignore
    <TailwindProvider utilities={utilities}>
      <NavigationContainer>
        <RootNavigator/>
      </NavigationContainer>
    </TailwindProvider>
  );
}

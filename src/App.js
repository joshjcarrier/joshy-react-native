import { StackNavigator } from 'react-navigation';
import HomeScreen from './components/HomeScreen'
import Calculator from './components/Calculator';

export default StackNavigator({
  Home: { screen: HomeScreen },
  Calculator: { screen: Calculator }
}, {
  headerMode: 'none',
  // initialRouteName: 'Calculator'
});


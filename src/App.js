import { StackNavigator } from 'react-navigation';
import HomeScreen from './components/HomeScreen'
import Calculator from './components/Calculator';
import CVTally from './components/CVTally';

export default StackNavigator({
  Home: { screen: HomeScreen },
  Calculator: { screen: Calculator },
  CVTally: { screen: CVTally },
}, {
  headerMode: 'none',
  // initialRouteName: 'CVTally'
});


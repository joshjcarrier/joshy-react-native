import { StackNavigator } from 'react-navigation';
import HomeScreen from './components/HomeScreen'
import Calculator from './components/Calculator';
import ClickerGame from './components/ClickerGame';
import CVTally from './components/CVTally';
import MLGHorn from './components/MLGHorn';
import MultiTask from './components/MultiTask';

export default StackNavigator({
  Home: { screen: HomeScreen },
  Calculator: { screen: Calculator },
  CVTally: { screen: CVTally },
  MLGHorn: { screen: MLGHorn },
  ClickerGame: { screen: ClickerGame },
  MultiTask: { screen: MultiTask },
}, {
  headerMode: 'none',
  // initialRouteName: 'MultiTask'
});


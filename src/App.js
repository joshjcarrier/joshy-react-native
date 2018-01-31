import { StackNavigator } from 'react-navigation';
import HomeScreen from './components/HomeScreen'
import Calculator from './components/Calculator';
import ClickerGame from './components/ClickerGame';
import CVTally from './components/CVTally';
import MLGHorn from './components/MLGHorn';
import MultiTask from './components/MultiTask';
import iGraphiQL from './components/iGraphiQL';
import TwentyOneDayFix from './components/TwentyOneDayFix';
import TreasureMap from './components/TreasureMap';
import Smoothie from './components/Smoothie';

export default StackNavigator({
  Home: { screen: HomeScreen },
  Calculator: { screen: Calculator },
  CVTally: { screen: CVTally },
  MLGHorn: { screen: MLGHorn },
  ClickerGame: { screen: ClickerGame },
  MultiTask: { screen: MultiTask },
  iGraphiQL: { screen: iGraphiQL },
  TwentyOneDayFix: { screen: TwentyOneDayFix },
  TreasureMap: { screen: TreasureMap },
  Smoothie: { screen: Smoothie },
}, {
  headerMode: 'none',
  // initialRouteName: 'Smoothie'
});


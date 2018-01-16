import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  Button,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
  TouchableHighlight
} from 'react-native';
import { connect, Provider } from 'react-redux';
import { createStore } from 'redux';

Calculator = class Calculator extends Component<{}> {
  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 2, justifyContent: 'flex-end', padding: 8 }}>
          <Text selectable={true} numberOfLines={1} style={{ color: 'white', fontSize: 54, textAlign: 'right'}}>
            {this.props.text}
          </Text>
        </View>       
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity activeOpacity={1} style={styles.commandButton}
            onPress={() => this.props.onClearPress()}>
              <Text style={styles.digitText}>AC</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1} style={styles.commandButton}>
            <Text style={styles.digitText}>+/-</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1} style={styles.commandButton}>
            <Text style={styles.digitText}>%</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1} style={styles.operatorButton}>
            <Text style={styles.digitText}>⁒</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity activeOpacity={1} style={styles.digitButton}
            onPress={() => this.props.onDigitPress(7)}>
              <Text style={styles.digitText}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1} style={styles.digitButton}
            onPress={() => this.props.onDigitPress(8)}>
            <Text style={styles.digitText}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1} style={styles.digitButton}
            onPress={() => this.props.onDigitPress(9)}>
            <Text style={styles.digitText}>9</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1} style={styles.operatorButton}>
            <Text style={styles.digitText}>x</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity activeOpacity={1} style={styles.digitButton}
            onPress={() => this.props.onDigitPress(4)}>
              <Text style={styles.digitText}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1} style={styles.digitButton}
            onPress={() => this.props.onDigitPress(5)}>
            <Text style={styles.digitText}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1} style={styles.digitButton}
            onPress={() => this.props.onDigitPress(6)}>
            <Text style={styles.digitText}>6</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1} style={styles.operatorButton}>
            <Text style={styles.digitText}>-</Text>
          </TouchableOpacity>
        </View> 
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity activeOpacity={1} style={styles.digitButton}
            onPress={() => this.props.onDigitPress(1)}>
              <Text style={styles.digitText}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1} style={styles.digitButton}
            onPress={() => this.props.onDigitPress(2)}>
            <Text style={styles.digitText}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1} style={styles.digitButton}
            onPress={() => this.props.onDigitPress(3)}>
            <Text style={styles.digitText}>3</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1} style={styles.operatorButton}>
            <Text style={styles.digitText}>+</Text>
          </TouchableOpacity>
        </View>    
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity activeOpacity={1} style={styles.doubleDigitButton}
            onPress={() => this.props.onDigitPress(0)}>
              <Text style={styles.doubleDigitText}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1} style={styles.digitButton}>
            <Text style={styles.digitText}>.</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1} style={styles.operatorButton}>
            <Text style={styles.digitText}>=</Text>
          </TouchableOpacity>
        </View>     
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    backgroundColor: 'black',
    padding: 16,
  },
  commandButton: {
    flex: 1,
    justifyContent: 'center',
    borderRadius: 100,
    borderWidth: 4,
    opacity: 0.8, 
    backgroundColor: '#aaaaaa'
  },
  digitButton: {
    flex: 1,
    justifyContent: 'center',
    borderRadius: 100,
    borderWidth: 4,
    opacity: 0.9, 
    backgroundColor: '#333333'
  },
  doubleDigitButton: {
    flex: 2,
    justifyContent: 'center',
    borderRadius: 100,
    borderWidth: 4,
    opacity: 0.9, 
    backgroundColor: '#333333'
  },
  operatorButton: {
    flex: 1,
    justifyContent: 'center',
    borderRadius: 100,
    borderWidth: 4,
    opacity: 0.8, 
    backgroundColor: 'orange'
  },
  digitText: {
    color: 'white',
    fontSize: 36,
    textAlign: 'center',
    padding: 10,
  },
  doubleDigitText: {
    color: 'white',
    fontSize: 36,
    textAlign: 'left',
    padding: 10,
    paddingLeft: 30
  },
});



function appendDigit(digit) {
  return {
    type: 'APPEND_DIGIT',
    digit
  }
}

function clear() {
  return {
    type: 'CLEAR'
  }
}

// Things you should never do inside a reducer:
// * Mutate its arguments;
// * Perform side effects like API calls and routing transitions;
// * Call non-pure functions, e.g. Date.now() or Math.random().
calculatorReducer = function (state = { text: '0' }, action) {
  console.log(action);
  switch(action.type) {
    case 'APPEND_DIGIT':
      const d = action.digit;
      let val = parseInt(state.text.replace(/,/g, ''));
      val *= 10;
      val += d;

      if (val > 999999999) {
        return state;
      }

      return { text: val.toLocaleString() };
    break;
    case 'CLEAR':
     return { text: '0' };
  }
  return state
}

// redux store state to immutable component props
const mapStateToProps = state => {
  return {
    text: state.text
  }
}

// dependency inversion to trigger actions
const mapDispatchToProps = dispatch => {
  return {
    onDigitPress: digit => {
      dispatch(appendDigit(digit));
    },
    onClearPress: () => {
      dispatch(clear());
    }
  }
}

// prep Calculator for React-Redux rendering
store = createStore(calculatorReducer);
Calculator = connect(
  mapStateToProps,
  mapDispatchToProps
)(Calculator);

export default class CalculatorApp extends Component<{}> {
  render() {
    return (
    <Provider store={store}>
      <Calculator />
    </Provider>
    );
  }
};


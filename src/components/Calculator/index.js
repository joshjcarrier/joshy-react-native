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
            {this.props.display}
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
          <TouchableOpacity activeOpacity={1} style={styles.operatorButton}
            onPress={() => this.props.onMathOpPress('⁒')}>
            <Text style={styles.digitText}>⁒</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity activeOpacity={1} style={styles.digitButton}
            onPress={() => this.props.onNonZeroDigitPress(7)}>
              <Text style={styles.digitText}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1} style={styles.digitButton}
            onPress={() => this.props.onNonZeroDigitPress(8)}>
            <Text style={styles.digitText}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1} style={styles.digitButton}
            onPress={() => this.props.onNonZeroDigitPress(9)}>
            <Text style={styles.digitText}>9</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1} style={styles.operatorButton}
            onPress={() => this.props.onMathOpPress('x')}>
            <Text style={styles.digitText}>x</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity activeOpacity={1} style={styles.digitButton}
            onPress={() => this.props.onNonZeroDigitPress(4)}>
              <Text style={styles.digitText}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1} style={styles.digitButton}
            onPress={() => this.props.onNonZeroDigitPress(5)}>
            <Text style={styles.digitText}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1} style={styles.digitButton}
            onPress={() => this.props.onNonZeroDigitPress(6)}>
            <Text style={styles.digitText}>6</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1} style={styles.operatorButton}
            onPress={() => this.props.onMathOpPress('-')}>
            <Text style={styles.digitText}>-</Text>
          </TouchableOpacity>
        </View> 
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity activeOpacity={1} style={styles.digitButton}
            onPress={() => this.props.onNonZeroDigitPress(1)}>
              <Text style={styles.digitText}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1} style={styles.digitButton}
            onPress={() => this.props.onNonZeroDigitPress(2)}>
            <Text style={styles.digitText}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1} style={styles.digitButton}
            onPress={() => this.props.onNonZeroDigitPress(3)}>
            <Text style={styles.digitText}>3</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1} style={styles.operatorButton}
            onPress={() => this.props.onMathOpPress('+')}>
            <Text style={styles.digitText}>+</Text>
          </TouchableOpacity>
        </View>    
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity activeOpacity={1} style={styles.doubleDigitButton}
            onPress={() => this.props.onZeroDigitPress()}>
              <Text style={styles.doubleDigitText}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1} style={styles.digitButton}>
            <Text style={styles.digitText}>.</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1} style={styles.operatorButton}
            onPress={() => this.props.onEqualsOpPress()}>
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

function zeroDigit() {
  return {
    type: 'ZERO_DIGIT'
  }
}

function nonZeroDigit(digit) {
  return {
    type: 'NON_ZERO_DIGIT',
    digit
  }
}

function mathOp(operator) {
  return {
    type: 'MATH_OP',
    operator
  }
}

function equalsOp() {
  return {
    type: 'EQUALS_OP'
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
calculatorReducer = function (state = { state: 'ZERO', accumulator: 0, buffer: 0 }, action) {
  console.log(state);
  console.log(action);

  if (action.type == 'CLEAR') {
    return { state: 'ZERO', accumulator: 0, buffer: 0 }
  }

  switch(state.state) {
    case 'ZERO':
      switch (action.type) {
        case 'MATH_OP':
          return state;
        case 'NON_ZERO_DIGIT':
          return {
            ...state,
            state: 'ACCUMULATE_DIGITS',
            buffer: action.digit
          }
      }
    case 'ACCUMULATE_DIGITS':
      switch (action.type) {
        case 'EQUALS_OP':
          let val = state.accumulator;
          switch (state.pendingOp) {
            case '⁒':
              val /= state.buffer;
              break;
            case 'x':
              val *= state.buffer;
              break;
            case '-':
              val -= state.buffer;
              break;
            case '+':
              val += state.buffer;
              break;
          }
          return {
            ...state,
            state: 'COMPUTE',
            accumulator: val,
          }
        case 'MATH_OP':
          let val2 = state.accumulator;
          switch (state.pendingOp) {
            case '⁒':
              val2 /= state.buffer;
              break;
            case 'x':
              val2 *= state.buffer;
              break;
            case '-':
              val2 -= state.buffer;
              break;
            case '+':
              val2 += state.buffer;
              break;
            default:
              val2 = state.buffer;
              break;
          }
          return {
            ...state,
            state: 'COMPUTE',
            accumulator: val2,
            buffer: val2,
            pendingOp: action.operator,
          }
        case 'ZERO_DIGIT':
          return {
            ...state,
            state: 'ACCUMULATE_DIGITS',
            buffer: (state.buffer * 10)
          }
        case 'NON_ZERO_DIGIT':
          return {
            ...state,
            state: 'ACCUMULATE_DIGITS',
            buffer: (state.buffer * 10) + action.digit
          }
      }
    case 'COMPUTE':
      switch (action.type) {
        case 'EQUALS_OP':
          let val = state.accumulator;
          switch (state.pendingOp) {
            case '⁒':
              val /= state.buffer;
              break;
            case 'x':
              val *= state.buffer;
              break;
            case '-':
              val -= state.buffer;
              break;
            case '+':
              val += state.buffer;
              break;
          }
          return {
            ...state,
            state: 'COMPUTE',
            accumulator: val,
          }
        case 'MATH_OP':
          return {
            ...state,
            state: 'ZERO',
            pendingOp: action.operator,
          }
        case 'NON_ZERO_DIGIT':
          return {
            ...state,
            state: 'ACCUMULATE_DIGITS',
            accumulator: state.buffer,
            buffer: action.digit
          }
        case 'ZERO_DIGIT':
          return {
            ...state,
            state: 'ZERO',
            accumulator: state.buffer,
            buffer: 0
          }
      }
    case 'ERROR':
    return state;
  }
}

// redux store state to immutable component props
const mapStateToProps = state => {
  switch(state.state) {
    case 'ZERO':
    case 'ACCUMULATE_DIGITS':
    case 'ACCUMULATE_DIGITS_WITH_DECIMAL':    
      return {
        display: state.buffer.toLocaleString()
      }
    case 'COMPUTE':    
      return {
        display: state.accumulator.toLocaleString()
      }
    case 'ERROR':
      return {
        display: 'Error'
      }
  }
}

// dependency inversion to trigger actions
const mapDispatchToProps = dispatch => {
  return {
    onZeroDigitPress: () => {
      dispatch(zeroDigit());
    },
    onNonZeroDigitPress: digit => {
      dispatch(nonZeroDigit(digit));
    },
    onMathOpPress: operator => {
      dispatch(mathOp(operator));
    },
    onEqualsOpPress: () => {
      dispatch(equalsOp());
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


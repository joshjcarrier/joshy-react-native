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


export default class Calculator extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {text: '0'};
  }

  _appendDigit(d) {
    let val = parseInt(this.state.text.replace(/,/g, ''));
    val *= 10;
    val += d;

    if (val > 999999999) {
      return;
    }

    this.setState({ text: val.toLocaleString() })
  }

  _clearDigits() {
    this.setState({ text: '0' });
  }

  render() {

    return (
      <View style={styles.container}>
        <View style={{ flex: 2, justifyContent: 'flex-end', padding: 8 }}>
          <Text selectable={true} numberOfLines={1} style={{ color: 'white', fontSize: 54, textAlign: 'right'}}>
            {this.state.text}
          </Text>
        </View>       
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity activeOpacity={1} style={styles.commandButton}
            onPress={() => this._clearDigits()}>
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
            onPress={() => this._appendDigit(7)}>
              <Text style={styles.digitText}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1} style={styles.digitButton}
            onPress={() => this._appendDigit(7)}>
            <Text style={styles.digitText}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1} style={styles.digitButton}
            onPress={() => this._appendDigit(9)}>
            <Text style={styles.digitText}>9</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1} style={styles.operatorButton}>
            <Text style={styles.digitText}>x</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity activeOpacity={1} style={styles.digitButton}
            onPress={() => this._appendDigit(4)}>
              <Text style={styles.digitText}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1} style={styles.digitButton}
            onPress={() => this._appendDigit(5)}>
            <Text style={styles.digitText}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1} style={styles.digitButton}
            onPress={() => this._appendDigit(6)}>
            <Text style={styles.digitText}>6</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1} style={styles.operatorButton}>
            <Text style={styles.digitText}>-</Text>
          </TouchableOpacity>
        </View> 
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity activeOpacity={1} style={styles.digitButton}
            onPress={() => this._appendDigit(1)}>
              <Text style={styles.digitText}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1} style={styles.digitButton}
            onPress={() => this._appendDigit(2)}>
            <Text style={styles.digitText}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1} style={styles.digitButton}
            onPress={() => this._appendDigit(3)}>
            <Text style={styles.digitText}>3</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1} style={styles.operatorButton}>
            <Text style={styles.digitText}>+</Text>
          </TouchableOpacity>
        </View>    
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity activeOpacity={1} style={styles.doubleDigitButton}
            onPress={() => this._appendDigit(0)}>
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
  buttonTouch: {
    flex: 1,
    justifyContent: 'center',
    borderRadius: 100,
    borderWidth: 4,
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
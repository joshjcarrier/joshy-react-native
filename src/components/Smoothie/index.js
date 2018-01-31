import React, { Component } from 'react';
import { 
  Animated,
  Button,
  Picker,
  Text,
  Vibration,
  View 
} from 'react-native';

export default class Smoothie extends Component {
  LIQUIDS = [
    '1 cup soy milk',
    '1 cup yogurt',
    '1 cup fruit juice',
    '1 cup water'
  ]

  INGREDIENTS = [
    '1 apple',
    '1 cup strawberries',
    '1 cup blueberries',
    '1 cup grapes',
    '1 orange, peeled',
    '1 cup melon, peeled',
    '1 cup pineapple',
    '1 banana, peeled',
    '1 cup peaches',
    '1 cup mango, peeled',
    '½ cup papaya, peeled',
    '1 carrot',
    '2 stalks celery',
    '½ cup cucumber'
  ]

  GREENS = [
    'none',
    '2 cups spinach',
    '1 cup kale',
    '1 small head of Bibb or Boston lettuce',
    '1 romaine heart',
    '½ cup raw broccoli',
    '½ head of romaine'
  ]

  constructor (props) {
    super(props);
    this.state = { 
      liquid: null,
      ingredient1: null,
      ingredient2: null,
      green: null,
      rotateY: new Animated.Value(0),
    };
  }

  _randomize = function() {
    liquid = this.LIQUIDS[Math.floor((Math.random() * this.LIQUIDS.length))];
    ingredient1 = this.INGREDIENTS[Math.floor((Math.random() * this.INGREDIENTS.length))];
    do {
      ingredient2 = this.INGREDIENTS[Math.floor((Math.random() * this.INGREDIENTS.length))];
    } while(ingredient1 == ingredient2);
    green = this.GREENS[Math.floor((Math.random() * this.GREENS.length))];

    Vibration.vibrate(400);

    Animated.sequence([
      Animated.timing(
        this.state.rotateY,
        {
          toValue: 1,
          duration: 500,
          useNativeDriver: true
        }
      ),
      Animated.timing(
        this.state.rotateY,
        {
          toValue: 0,
          duration: 500,
          useNativeDriver: true
        }
      ),
    ]).start()

    this.setState({ 
      liquid,
      ingredient1,
      ingredient2,
      green
    });
  }

  componentWillMount() {
    this._randomize();
  }
  
  render() {
    const rotateY = this.state.rotateY.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg']
    })

    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <View>
          <Animated.Text style={{ padding: 16, color: 'darkorange', fontSize: 40, fontWeight: 'bold', fontStyle: 'italic', transform: [{ rotateY: rotateY}] }}>Smoothie Blender</Animated.Text>
        </View>

        <View>
          <Text style={{ padding: 16, fontSize: 20, fontWeight: 'bold', color: 'navy' }}>Choose 1 liquid:</Text>
          <Picker
            style={{ backgroundColor: 'white', height: 44 }}
            itemStyle={{ height: 44 }}
            selectedValue={this.state.liquid}
            onValueChange={(itemValue, itemIndex) => this.setState({liquid: itemValue})}>
            { this.LIQUIDS.map((l, i) => (<Picker.Item label={l} value={l} key={i} />)) }
          </Picker>
        </View>

        <View style={{ flexDirection: 'column', paddingTop: 32 }}>
          <Text style={{ padding: 16, fontSize: 20, fontWeight: 'bold', color: 'salmon' }}>Choose 2 fruits + vegetables:</Text>

          <Picker
            style={{ backgroundColor: 'white', height: 44 }}
            itemStyle={{ height: 44 }}
            selectedValue={this.state.ingredient1}
            onValueChange={(itemValue, itemIndex) => this.setState({ingredient1: itemValue})}>
            { this.INGREDIENTS.map((l, i) => (<Picker.Item label={l} value={l} key={i} />)) }
          </Picker>

          <Text style={{ padding: 8, fontSize: 20, textAlign: 'center' }}>and</Text>

          <Picker
            style={{ backgroundColor: 'white', height: 44 }}
            itemStyle={{ height: 44 }}
            selectedValue={this.state.ingredient2}
            onValueChange={(itemValue, itemIndex) => this.setState({ingredient2: itemValue})}>
            { this.INGREDIENTS.map((l, i) => (<Picker.Item label={l} value={l} key={i} />)) }
          </Picker>
        </View>
        
        <View style={{ paddingTop: 32 }}>
          <Text style={{ padding: 16, fontSize: 20, fontWeight: 'bold', color: 'green' }}>Choose 1 green: (optional)</Text>
          <Picker
            style={{ backgroundColor: 'white', height: 44 }}
            itemStyle={{ height: 44 }}
            selectedValue={this.state.green}
            onValueChange={(itemValue, itemIndex) => this.setState({green: itemValue})}>
            { this.GREENS.map((l, i) => (<Picker.Item label={l} value={l} key={i} />)) }
          </Picker>
        </View>

        <View style={{ paddingTop: 32 }}>
          <Button title="Blend again" 
            style={{ backgroundColor: 'white' }}
            onPress={() => this._randomize()} />
        </View>
      </View>
    );
  }
}
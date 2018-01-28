import React, { Component } from 'react';
import {
  Animated,
  AsyncStorage,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

export default class TwentyOneDayFix extends Component<{}> {
  constructor (props) {
    super(props);
    this.state = {
      lastWorkout: 0,
      streakCount: 0,
      workoutButtonEnabled: false,
      workoutTitleX: new Animated.Value(300),
    };
  }

  async componentWillMount() {
    var streakCount = await AsyncStorage.getItem('@TwentyOneDayFix:streakCount') || '0';
    var lastWorkout = await AsyncStorage.getItem('@TwentyOneDayFix:lastWorkout') || '0';

    streakCount = parseInt(streakCount);
    lastWorkout = parseInt(lastWorkout);

    this.setState({ streakCount, lastWorkout, workoutButtonEnabled: this._getWorkoutDate() > lastWorkout })
  }

  componentDidMount() {
    Animated.sequence([
      Animated.delay(400),
      Animated.spring(this.state.workoutTitleX, {
        toValue: 0,
      })
    ]).start();
  }

  WORKOUT_DAYS = [
    'Yoga Fix',
    'Total Body Cardio Fix',
    'Upper Fix',
    'Lower Fix',
    'Flat Abs Fix',
    'Cardio Fix',
    'Dirty 30'
  ]

  _getWorkoutTitle() {
    const date = new Date();
    const day = date.getDay();
    return this.WORKOUT_DAYS[day].toUpperCase();
  }

  _addWorkout = async function() {
    const lastWorkout = this._getWorkoutDate();
    const streakCount = (lastWorkout - this.state.lastWorkout) == 1 ? (this.state.streakCount + 1) : 1;
    
    await AsyncStorage.setItem('@TwentyOneDayFix:streakCount', ''+streakCount);
    await AsyncStorage.setItem('@TwentyOneDayFix:lastWorkout', ''+lastWorkout);

    this.setState({ lastWorkout, streakCount, workoutButtonEnabled: false })
  }

  _getWorkoutDate = function() {
    const date = new Date();
    // fullDaysSinceEpoch
    return Math.floor(date/8.64e7);
  }

  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', backgroundColor: 'black', paddingTop: 60 }}>
        <View>
          <Text style={{ fontSize: 80, color: 'white', fontStyle: 'italic', fontFamily: 'Times New Roman' }}>21 day</Text>
        </View>
        <View style={{ position: 'relative', bottom: 50, right: 6, zIndex: -1 }}>
          <Text style={{ fontSize: 140, color: 'rgba(132, 113, 170, 1.0)', fontWeight: '900' }}>FIX</Text>
        </View>

        <Text style={{ fontSize: 30, color: 'grey', fontStyle: 'italic' }}>today</Text>

        <Animated.Text style={{ fontSize: 30, color: 'white', fontWeight: 'bold', transform: [{ translateX: this.state.workoutTitleX }] }}>{this._getWorkoutTitle()}</Animated.Text>

        <View style={{ paddingTop: 80, alignItems: 'center' }}>
          <TouchableHighlight style={{ 
              backgroundColor: 'rgba(132, 113, 170, 1.0)',
              borderRadius: 4,
              marginBottom: 16,
              opacity: this.state.workoutButtonEnabled ? 1.0 : 0.5,
            }} 
            underlayColor='rgba(64, 53, 94, 1.0)' 
            disabled={!this.state.workoutButtonEnabled}
            onPress={() => this._addWorkout()}>
            <Text style={{ padding: 8, fontSize: 26, color: 'white' }}>WORKOUT COMPLETE</Text>
          </TouchableHighlight>

          <Text style={{ fontSize: 30, color: 'white', fontFamily: 'Times New Roman', fontStyle: 'italic' }}>{this.state.streakCount} day streak</Text>
        </View>
      </View>
    );
  }
}


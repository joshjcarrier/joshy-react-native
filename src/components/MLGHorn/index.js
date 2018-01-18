import React, { Component } from 'react';
import {
  Animated,
  Easing,
  Platform,
  Text,
  Image,
  ImageBackground,
} from 'react-native';
import Sound from 'react-native-sound';

Sound.setCategory('Playback');
const AIRHORN_SOUND = new Sound('mlg.mp3', Sound.MAIN_BUNDLE);

export default class MLGHorn extends Component<{}> {
  constructor (props) {
    super(props);
    this.state = { 
      spinValue: new Animated.Value(0),
      oh1: new Animated.Value(0),
      oh2: new Animated.Value(0),
      oh3: new Animated.Value(0),
    };
  }
  
  _startHorn = function () {
    Animated.loop(
      Animated.sequence([
        Animated.timing(this.state.spinValue, {
          toValue: -1, 
          duration: 30,
        }),
        Animated.timing(this.state.spinValue, {
          toValue: 1, 
          duration: 30,
        }),
        Animated.timing(this.state.spinValue, {
          toValue: 0, 
          duration: 30,
        }),
    ]), { iterations: 4 }).start();

    Animated.sequence([
      Animated.delay(100),
      Animated.timing(this.state.oh1, {
        toValue: 1,
        duration: 0
      }),
      Animated.delay(1000),
      Animated.timing(this.state.oh1, {
        toValue: 0,
        duration: 0
      }),
    ]).start();

    Animated.sequence([
      Animated.delay(400),
      Animated.timing(this.state.oh2, {
        toValue: 1,
        duration: 0
      }),
      Animated.delay(800),
      Animated.timing(this.state.oh2, {
        toValue: 0,
        duration: 0
      }),
    ]).start();

    Animated.sequence([
      Animated.delay(700),
      Animated.timing(this.state.oh3, {
        toValue: 1,
        duration: 0
      }),
      Animated.delay(1000),
      Animated.timing(this.state.oh3, {
        toValue: 0,
        duration: 0
      }),
    ]).start();

    AIRHORN_SOUND.play()
  }

  render() {
    const spin = this.state.spinValue.interpolate({
      inputRange: [-1, 1],
      outputRange: ['-40deg', '40deg']
    })
    return (
      <ImageBackground style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
        imageStyle={{resizeMode: 'repeat', opacity: 0.2}}
        source={require('./mlg.png')}    
        onTouchStart={() => { this._startHorn()}} onTouchEnd={() => { AIRHORN_SOUND.stop(); }}>
        <Animated.Image 
          pointerEvents='none'
          source={require('./airhorn.png')} style={{ transform: [{ rotate: spin }], height: '40%' }} />
        <Animated.Text style={{ position: 'absolute', top: 40, left: 80, fontSize: 70, transform: [{ rotate: '-20deg' }], opacity: this.state.oh1 }}>OH</Animated.Text>
        <Animated.Text style={{ position: 'absolute', top: 60, right: 80, fontSize: 80, transform: [{ rotate: '20deg' }], opacity: this.state.oh2 }}>OH</Animated.Text>
        <Animated.Text style={{ position: 'absolute', bottom: 60, left: 140, fontSize: 100, opacity: this.state.oh3 }}>OH</Animated.Text>

      </ImageBackground>
    );
  }
}


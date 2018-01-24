import React, { Component } from 'react';
import { 
  Button,
  Slider, 
  WebView, 
  View 
} from 'react-native';
import { NavigationActions } from 'react-navigation';

export default class MultiTask extends Component {
  constructor (props) {
    super(props);
    this.state = { flex: 5 }
  }
  
  render() {
    const { navigate } = this.props.navigation;
console.log(this.state.flex);
    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <View style={{ flexDirection: 'row' }}>
          <Button title='Close' onPress={() => this.props.navigation.dispatch(NavigationActions.back())} />
          <Slider style={{ flex: 1}}
            value={5} minimumValue={1} maximumValue={9} step={1} 
            onValueChange={(v) => this.setState({ flex: v })}/>
        </View>

        <View style={{ flex: this.state.flex }}>
          <WebView
            source={{uri: 'https://www.reddit.com/'}} />
        </View>

        <View style={{ flex: 10 - this.state.flex }}>
          <WebView
            source={{uri: 'https://news.ycombinator.com/'}} />
        </View>
      </View>
    );
  }
}
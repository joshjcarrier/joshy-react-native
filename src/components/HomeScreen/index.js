import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  Button,
  Image,
  ScrollView,
  TouchableOpacity,
  View
} from 'react-native';


export default class HomeScreen extends Component<{}> {
  render() {
    const { navigate } = this.props.navigation;
    const projects = [
      {
        'route': 'Calculator',
        'screenshot': require('../Calculator/screenshot.png')
      },
    ]

    return (
      <View style={{ flex: 1, flexDirection: 'column', alignItems: 'stretch' }}>
        <View style={{ flex: 2, flexDirection: 'row', alignItems: 'center', padding: 8, backgroundColor: 'silver' }}>
          <Image source={require('../Profile/me.jpg')}
            style={{ height: '100%', width: '30%', marginRight: 16}}/>
          <View style={{ flex: 1, flexDirection: 'column' }}>
            <Text style={{ fontSize: 32 }}>Josh Carrier</Text>
            <Text style={{ fontSize: 12 }}>SENIOR SOFTWARE ENGINEER</Text>
          </View>
        </View>
        <View style={{ flex: 10 }}>
          <ScrollView>
            <View  style={{ flex: 1, flexDirection: 'row', alignItems: 'stretch', justifyContent: 'space-between', flexWrap: 'wrap', padding: 8 }}>
              
              {projects.map((p, i) => {
                return (
                  <TouchableOpacity key={i}
                    activeOpacity={0.8}
                    style={{width: '49%', height: 160, padding: 6, marginBottom: 8, borderColor: 'gray', borderWidth: 1}}
                    onPress={() => navigate(p.route) }>
                    <View style={{ flex: 1, flexDirection: 'column', alignItems: 'stretch', justifyContent: 'center'}}>
                      <Image source={p.screenshot}
                        style={{ height: '80%', width: '100%', marginBottom: 4}}/>
                      <Text style={{textAlign: 'center'}}>Day {i+1} - {p.route}</Text>
                    </View>
                </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

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
      {
        'route': 'CVTally',
        'screenshot': require('../CVTally/screenshot.png')
      },
      {
        'route': 'MLGHorn',
        'screenshot': require('../MLGHorn/screenshot.png')
      },
      {
        'route': 'ClickerGame',
        'screenshot': require('../ClickerGame/screenshot.png')
      },
    ];
    
    return (
      <View style={{ flex: 1, flexDirection: 'column', alignItems: 'stretch' }}>
        <View style={{ flex: 2, flexDirection: 'row', alignItems: 'center', padding: 16, paddingTop: 24, paddingBottom: 24 }}>
          <Image source={require('../Profile/me.jpg')}
            style={{ height: '100%', width: '30%', marginRight: 16, borderRadius: 55 }}/>
          <View style={{ flex: 1, flexDirection: 'column' }}>
            <Text style={{ fontSize: 40 }}>Josh Carrier</Text>
            <Text style={{ fontSize: 12 }}>NOT REALLY A MOBILE DEVELOPER</Text>
          </View>
        </View>
        <View style={{ flex: 10 }}>
          <ScrollView>
            <View  style={{ flex: 1, flexDirection: 'row', alignItems: 'stretch', justifyContent: 'flex-start', flexWrap: 'wrap' }}>
              
              {projects.map((p, i) => {
                return (
                  <TouchableOpacity key={i}
                    activeOpacity={0.8}
                    style={{width: '47%', height: 160, borderColor: 'gray', borderWidth:0.3, margin: 4 }}
                    onPress={() => navigate(p.route) }>
                    <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 8 }}>
                      <Image source={p.screenshot}
                        style={{ height: '80%', width: '90%', marginBottom: 4}}/>
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
  }
});

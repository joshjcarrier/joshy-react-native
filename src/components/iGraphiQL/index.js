import React, { Component } from 'react';
import { 
  ActivityIndicator,
  Alert,
  Animated,
  SectionList,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View 
} from 'react-native';

export default class iGraphiQL extends Component {
  constructor (props) {
    super(props);
    this.state = { refreshing: true, sections: [], showCompactTitle: false };
    this._compactTitleOpacity = new Animated.Value(0);
  }

  _fetchIntrospection = function () {
    return fetch('https://www.yammer.com/graphql', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
        {
          __schema {
            types {
              name
              description
              kind
            }
          }
        }
        `
      }),
    })
    .then((response) => response.json())
    .then((responseJson) => {
      const nonBuiltInTypes = responseJson.data.__schema.types.filter(t => !t.name.startsWith("__"))

      const sections = [
        { title: "Root Objects", data: nonBuiltInTypes.filter(t => ["Query", "Mutation"].includes(t.name)) },
        { title: "Objects", data: nonBuiltInTypes.filter(t => t.kind == "OBJECT" && !["Query", "Mutation"].includes(t.name)) },
        { title: "Interfaces", data: nonBuiltInTypes.filter(t => t.kind == "INTERFACE") },
        { title: "Unions", data: nonBuiltInTypes.filter(t => t.kind == "UNION") },
        { title: "Input Objects", data: nonBuiltInTypes.filter(t => t.kind == "INPUT_OBJECT") },
      ];
      this.setState({
        refreshing: false,
        sections: sections,
      }, function() {
        // do something with new state
      });
    })
    .catch((error) => {
      console.error(error);
    });
  }

  componentDidMount() {
    return this._fetchIntrospection();
  }

  _renderItem = function (item) {
    return (
      <TouchableHighlight style={{
        paddingHorizontal: 16, 
      }}
        underlayColor='rgba(247,247,247,1.0)' 
        onPress={() => Alert.alert(item.name, item.description)}>
        <View style={{
          paddingVertical: 8,        
          borderBottomColor: 'rgba(247,247,247,1.0)',
          borderBottomWidth: 1,}}>
          <Text style={{ fontSize: 14 }}>{item.name}</Text>
        </View>
      </TouchableHighlight>
    )
  }

  _renderSectionHeader = function (section) {
    return (
      <Text style={{
        paddingVertical: 8,
        paddingHorizontal: 16,
        fontSize: 16,
        fontWeight: 'bold',
        color: 'rgba(224,52,143,1.0)',
        backgroundColor: 'rgba(247,247,247,1.0)',
      }}>{section.title}</Text>
    );
  }

  _renderListHeader = function() {
    return (
      <Text style={{
        fontSize: 32,
        paddingBottom: 24,
        paddingHorizontal: 16,
        fontWeight: '900', }}>GraphQL Docs</Text>
    );
  }

  _maybeSetState = function(event) {
    const shouldShowCompactTitle = event.nativeEvent.contentOffset.y > 40;
    if (this.state.showCompactTitle != shouldShowCompactTitle) {
      this.setState({ showCompactTitle: shouldShowCompactTitle });
      
      Animated.timing(this._compactTitleOpacity, {
        toValue: shouldShowCompactTitle ? 1.0 : 0,
        duration: 200,
        useNativeDriver: true
      }).start();
    }
  }

  render() {
    if (this.state.refreshing) {
      return (
        <View style={{flex: 1, paddingTop: 200}}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'white' }}>
          <Animated.Text 
            style={{
              opacity: this._compactTitleOpacity,
              paddingHorizontal: 16,
              paddingVertical: 8,
              height: 36,
              fontSize: 16,
              fontWeight: 'bold',
              textAlign: 'center',}}>
            GraphQL Docs
          </Animated.Text>
        <SectionList 
          ref='sectionList'
          onRefresh={() => this._fetchIntrospection()}
          refreshing={this.state.refreshing}
          renderItem={({item}) => this._renderItem(item)}
          renderSectionHeader={({section}) => this._renderSectionHeader(section)}
          sections={this.state.sections} 
          keyExtractor={(item, index) => index}
          ListHeaderComponent={this._renderListHeader}
          onScroll={(event) => this._maybeSetState(event)} />

        <View style={{
          position: 'absolute',
          right: 8,
          top: 250,
        }}>
          {
            !this.state.refreshing && ["RO", "O", "I", "U", "IO"].map((sectionShortcut, i) => { 
              return (
                <TouchableOpacity 
                  key={sectionShortcut}
                  hitSlop={{left: 16, right: 16 }}
                  onPressIn={() => this.refs.sectionList.scrollToLocation({sectionIndex: i, itemIndex: 0, viewOffset: 34 })}>
                  <Text style={{
                    color: 'rgba(224,52,143,1.0)',
                    fontSize: 18,
                    paddingVertical: 4,
                    textAlign: 'right',
                  }}>{sectionShortcut}</Text>
                </TouchableOpacity>
              );
          })
          }
        </View>
      </View>
    );
  }
}
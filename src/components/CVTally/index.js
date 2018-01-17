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
  Slider,
  View,
  TouchableHighlight
} from 'react-native';
import { connect, Provider } from 'react-redux';
import { createStore } from 'redux';

LifeEventSlider = class LifeEventSlider extends Component<> {
  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ flex: 2, fontSize: 32, textAlign: 'center' }}>{this.props.name}</Text>
        <Slider style={{ flex: 9 }}
          minimumValue={0} 
          maximumValue={this.props.maximumValue || 10} 
          step={1} 
          minimumTrackTintColor={this.props.color}
          onValueChange={v => this.props.onValueChange(v)}/>
        <Text style={{ flex: 2, fontSize: 32, textAlign: 'center', color: this.props.color }}>{this.props.value}</Text>
        <Text style={{ flex: 2, fontSize: 32, textAlign: 'center' }}>{this.props.score}</Text>
      </View>
    );
  }
}


Player = class Player extends Component<{}> {
  _geometricScore = function (value) {
    switch(value) {
      case 0:
        return 0;
      case 1:
        return 1;
      case 2:
        return 3;
      case 3:
        return 6;
      case 4:
        return 10;
      case 5:
        return 15;
      case 6:
        return 21;
      case 7:
        return 28;
      case 8:
        return 36;
      case 9:
        return 45;
      case 10:
        return 55;
    }
  }

  _withSum = function (player, state) {
    const healthScore = this._geometricScore(player.health);
    const knowledgeScore = this._geometricScore(player.knowledge);
    const relationshipScore = this._geometricScore(player.relationship);
    const moneyScore = player.money;
    const personalGoalScore = player.personalGoal;

    return {
      ...player,
      healthScore,
      knowledgeScore,
      relationshipScore,
      moneyScore,
      personalGoalScore,
    };
  }

  render() {
    return (
      <View style={{ paddingVertical: 16 }}>
        <TextInput defaultValue={this.props.player.name} style={{ fontSize: 28, padding: 8 }}/>
        <View style={{ backgroundColor: 'white', paddingVertical: 16 }}>
          <LifeEventSlider 
            name="➕"
            color='orange'
            value={this.props.player.health} 
            score={this.props.player.healthScore}
            onValueChange={v => { player = this._withSum({ ...this.props.player, health: v }, this.props.scores); this.props.onPlayerChange(player)}} />

          <LifeEventSlider 
            name="💡"
            color='green'
            value={this.props.player.knowledge} 
            score={this.props.player.knowledgeScore}
            onValueChange={v => { player = this._withSum({ ...this.props.player, knowledge: v }, this.props.scores); this.props.onPlayerChange(player)}} />

          <LifeEventSlider 
            name="👫"
            color='purple'
            value={this.props.player.relationship} 
            score={this.props.player.relationshipScore}
            onValueChange={v => { player = this._withSum({ ...this.props.player, relationship: v }, this.props.scores); this.props.onPlayerChange(player)}} />

          <LifeEventSlider 
            name="💰"
            color='goldenrod'
            value={this.props.player.money} 
            maximumValue={30}
            score={this.props.player.moneyScore}
            onValueChange={v => { player = this._withSum({ ...this.props.player, money: v }, this.props.scores); this.props.onPlayerChange(player)}} />

          <LifeEventSlider 
            name="🇯🇵"
            color='blue'
            value={this.props.player.personalGoal} 
            maximumValue={30}
            score={this.props.player.personalGoalScore}
            onValueChange={v => { player = this._withSum({ ...this.props.player, personalGoal: v }, this.props.scores); this.props.onPlayerChange(player)}} />

          <LifeEventSlider 
            name="🎌"
            color='blue'
            value={this.props.player.sharedGoal} 
            maximumValue={30}
            score={this.props.player.sharedGoalScore}
            onValueChange={v => { player = this._withSum({ ...this.props.player, sharedGoal: v }, this.props.scores); this.props.onPlayerChange(player)}} />

          <View style={{ flexDirection: 'row' }}>
            <Text style={{ flex: 13 }}></Text>
            <Text style={{ flex: 2, fontSize: 32, textAlign: 'center', fontWeight: 'bold' }}>{ 
              this.props.player.healthScore 
              + this.props.player.knowledgeScore 
              + this.props.player.relationshipScore 
              + this.props.player.moneyScore 
              + this.props.player.personalGoalScore 
              + this.props.player.sharedGoalScore  
            }</Text>
          </View>
        </View>
      </View>
    )
  }
}

CVTally = class CVTally extends Component<{}> {
  constructor (props) {
    super(props);
    this.state = { 
      player1: {
        name: 'Elvy',
        health: 0,
        healthScore: 0,
        knowledge: 0,
        knowledgeScore: 0,
        relationship: 0,
        relationshipScore: 0,
        money: 0,
        moneyScore: 0,
        personalGoal: 0,
        personalGoalScore: 0,
        sharedGoal: 0,
        sharedGoalScore: 0,
      },
      player2: {
        name: 'Josh',
        health: 0,
        healthScore: 0,
        knowledge: 0,
        knowledgeScore: 0,
        relationship: 0,
        relationshipScore: 0,
        money: 0,
        moneyScore: 0,
        personalGoal: 0,
        personalGoalScore: 0,
        sharedGoal: 0,
        sharedGoalScore: 0,
      },
      player3: {
        name: 'Player 3',
        health: 0,
        healthScore: 0,
        knowledge: 0,
        knowledgeScore: 0,
        relationship: 0,
        relationshipScore: 0,
        money: 0,
        moneyScore: 0,
        personalGoal: 0,
        personalGoalScore: 0,
        sharedGoal: 0,
        sharedGoalScore: 0,
      },
      player4: {
        name: 'Player 4',
        health: 0,
        healthScore: 0,
        knowledge: 0,
        knowledgeScore: 0,
        relationship: 0,
        relationshipScore: 0,
        money: 0,
        moneyScore: 0,
        personalGoal: 0,
        personalGoalScore: 0,
        sharedGoal: 0,
        sharedGoalScore: 0,
      },
    }
  }

  _withSharedGoal = function (scores) {
    const highSharedGoal = Math.max(...[scores.player1.sharedGoal, scores.player2.sharedGoal, scores.player3.sharedGoal, scores.player4.sharedGoal]);

   return {
     ...scores,
     player1: {
       ...scores.player1,
       sharedGoalScore: scores.player1.sharedGoal == highSharedGoal ? highSharedGoal : 0,
     },
     player2: {
      ...scores.player2,
      sharedGoalScore: scores.player2.sharedGoal == highSharedGoal ? highSharedGoal : 0,
     },
     player3: {
      ...scores.player3,
      sharedGoalScore: scores.player3.sharedGoal == highSharedGoal ? highSharedGoal : 0,
     },
     player4: {
      ...scores.player4,
      sharedGoalScore: scores.player4.sharedGoal == highSharedGoal ? highSharedGoal : 0,
     },
   }
  }

  render() { 
    return (
      <ScrollView>
        <Image source={require('./cv.jpg')} style={{ height: 100, resizeMode: 'cover' }} />
        <View style={styles.container}>
          <Player
            player={this.state.player1}
            scores={this.state}
            onPlayerChange={player => this.setState(this._withSharedGoal({ ...this.state, player1: player }))}/>

          <Player
            player={this.state.player2}
            scores={this.state}
            onPlayerChange={player => this.setState(this._withSharedGoal({ ...this.state, player2: player }))}/>

          <Player
            player={this.state.player3}
            scores={this.state}
            onPlayerChange={player => this.setState(this._withSharedGoal({ ...this.state, player3: player }))}/>

          <Player
            player={this.state.player4}
            scores={this.state}
            onPlayerChange={player => this.setState(this._withSharedGoal({ ...this.state, player4: player }))}/>
        </View>
      </ScrollView>
    )
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    backgroundColor: 'lightgrey',
  },
});

// Things you should never do inside a reducer:
// * Mutate its arguments;
// * Perform side effects like API calls and routing transitions;
// * Call non-pure functions, e.g. Date.now() or Math.random().
cvTallyReducer = function (state = { state: 'ZERO', accumulator: 0, buffer: 0 }, action) {
    return state;
}

// redux store state to immutable component props
const mapStateToProps = state => {
  return {};
}

// dependency inversion to trigger actions
const mapDispatchToProps = dispatch => {
  return {
  }
}

// prep for React-Redux rendering
store = createStore(cvTallyReducer);
CVTally = connect(
  mapStateToProps,
  mapDispatchToProps
)(CVTally);

export default class CVTallyApp extends Component<{}> {
  render() {
    return (
    <Provider store={store}>
      <CVTally />
    </Provider>
    );
  }
};


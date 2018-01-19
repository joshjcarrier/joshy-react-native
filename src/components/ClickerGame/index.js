import React, { Component } from 'react';
import {
  Animated,
  Text,
  Image,
  ScrollView,
  View,
  TouchableOpacity,
} from 'react-native';
import { connect, Provider } from 'react-redux';
import { createStore } from 'redux';
import Sound from 'react-native-sound';

Sound.setCategory('Playback');
const MICROSERVICES_SOUND = new Sound('mf.mp3', Sound.MAIN_BUNDLE);

Upgrade = class Upgrade extends Component<{}> {
  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', borderColor: 'green', borderWidth: 1, borderStyle: 'dashed', margin: 8, padding: 4, opacity: this.props.upgradeEnabled || this.props.level > 0 ? 1 : 0.5 }}>
        <View style={{ flex: 9, }}>
          <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
            <Text style={{ fontFamily: 'Courier', color: 'green', fontSize: 18 }}>{this.props.name}</Text>          
          </View>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <Text style={{ flex: 2, fontFamily: 'Courier', color: 'green', fontSize: 14 }}>Lv. {this.props.level || 0}</Text>
            <Text style={{ flex: 1, fontFamily: 'Courier', color: 'green', fontSize: 14 }}>DPS: {this.props.dps || 0}</Text>          
          </View>          
        </View>
        <TouchableOpacity style={{ flex: 3, borderColor: 'green', borderWidth: 1, borderStyle: 'solid', padding: 8, backgroundColor: this.props.upgradeEnabled ? 'green' : 'transparent' }} 
          onPress={this.props.onUpgrade}
          disabled={!this.props.upgradeEnabled}>
          <Text style={{ color: this.props.upgradeEnabled ? 'black' : 'green', textAlign: 'right' }}>{this.props.price} $LA</Text>
          <Text style={{ color: this.props.upgradeEnabled ? 'black' : 'green', textAlign: 'center' }}>Upgrade</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

ClickerGame = class ClickerGame extends Component<{}> {  
  constructor (props) {
    super(props);
    this.state = { mounted: true, faceScale: new Animated.Value(1) };
  }

  componentDidMount = function() {
    this.setState({ mounted: true });
    this._tick();
  }

  componentWillUnmount = function() {
    this.setState({ mounted: false });
  }

  _tick = function() {
    if (this.state.mounted) {
      this.props.onTick();
      setTimeout(() => { this._tick()}, 1000);
    }
  }

  _animateFace = function() {
    MICROSERVICES_SOUND.play();

    Animated.sequence([
      Animated.spring(this.state.faceScale, { toValue: 2, speed: 100 }),
      Animated.spring(this.state.faceScale, { toValue: 1, speed: 100 }),
    ]).start();
  }

  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <View style={{ flex: 1, flexDirection: 'column', alignItems: 'stretch', justifyContent: 'center', backgroundColor: 'white' }} >
          <Text style={{ textAlign: 'center', fontSize: 30, backgroundColor: 'black', color: 'green' }}>{this.props.sla} $LA</Text>
          <TouchableOpacity style={{ flex: 1, alignItems: 'center', backgroundColor: 'black' }} onPress={() => this.props.onDeployPress()}>
            <Animated.Image source={require('./mf.jpg')} style={{ flex: 1, width: 360, transform:[{ scale: this.state.faceScale }] }} onTouchStart={() => this._animateFace()}/>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'column', backgroundColor: 'black', paddingHorizontal: 8, paddingVertical: 8 }}>
            <Text style={{ fontFamily: 'Courier', color: 'green', fontSize: 20, borderColor: 'green', borderWidth: 1, padding: 20 }}>{this.props.dps} DPS (Deploys Per Second)</Text>          
          </View>
        <ScrollView style={{ backgroundColor: 'black' }}>
          <View style={{ flex: 1, flexDirection: 'column' }}>
            <Upgrade name='JS tree shaking' 
              level={this.props.oneLv} 
              dps={this.props.oneDps} 
              price={this.props.onePrice}
              upgradeEnabled={this.props.sla >= this.props.onePrice}
              onUpgrade={this.props.onUpgradeOne} />      

            <Upgrade name='Docker containers' 
              level={this.props.twoLv} 
              dps={this.props.twoDps} 
              price={this.props.twoPrice} 
              upgradeEnabled={this.props.sla >= this.props.twoPrice}
              onUpgrade={this.props.onUpgradeTwo}/>

            <Upgrade name='Deployment pipelines' 
              level={this.props.threeLv} 
              dps={this.props.threeDps} 
              price={this.props.threePrice} 
              upgradeEnabled={this.props.sla >= this.props.threePrice}
              onUpgrade={this.props.onUpgradeThree}/>         

            <Upgrade name='Active-active storage' 
              level={this.props.fourLv} 
              dps={this.props.fourDps} 
              price={this.props.fourPrice} 
              upgradeEnabled={this.props.sla >= this.props.fourPrice}
              onUpgrade={this.props.onUpgradeFour}/>      

            <Upgrade name='Serverless architecture' 
              level={this.props.fiveLv} 
              dps={this.props.fiveDps} 
              price={this.props.fivePrice} 
              upgradeEnabled={this.props.sla >= this.props.fivePrice}
              onUpgrade={this.props.onUpgradeFive}/>    

            <Upgrade name='Total rewrite' 
              level={this.props.sixLv}
              dps={this.props.rewritesDps} 
              price={this.props.sixPrice} 
              upgradeEnabled={this.props.sla >= this.props.sixPrice}
              onUpgrade={this.props.onUpgradeSix}/>    
          </View>
        </ScrollView>
      </View>
    );
  }
}


clickerGameReducer = function (state = {  
  oneLv: 0,
  twoLv: 0,
  threeLv: 0,
  fourLv: 0,
  fiveLv: 0,
  sixLv: 0,
  oneDps: 0,
  twoDps: 0,
  threeDps: 0,
  fourDps: 0,
  fiveDps: 0,
  rewritesDps: 0,
  onePrice: 1,
  twoPrice: 50,
  threePrice: 1000,
  fourPrice: 50000,
  fivePrice: 500000,
  sixPrice: 1000000,
  sla: 0,
  dps: 0,
}, action) {
  newState = state;
  switch(action.type) {
    case 'DEPLOY_PRESS':
      newState = {
        ...state,
        sla: state.sla + 1,
      }
      break;
    case 'TICK':
      newState = {
        ...state,
        sla: state.sla + state.oneDps,
      }
      break;
    case 'UPGRADE_ONE':
      newState = {
        ...state,
        sla: state.sla - state.onePrice,
        oneLv: state.oneLv + 1,
        oneDps: state.oneLv + 1,
      }
      break;
    case 'UPGRADE_TWO':
      newState = {
        ...state,
        sla: state.sla - state.twoPrice,
        twoLv: state.twoLv + 1,
        twoDps: (state.twoLv + 1) * 3,
      }
      break;
    case 'UPGRADE_THREE':
      newState = {
        ...state,
        sla: state.sla - state.threePrice,
        threeLv: state.threeLv + 1,
        threeDps: (state.threeLv + 1) * 50,
      }
      break;
    case 'UPGRADE_FOUR':
      newState = {
        ...state,
        sla: state.sla - state.fourPrice,
        fourLv: state.fourLv + 1,
        fourDps: (state.fourLv + 1) * 100,
      }
      break;
    case 'UPGRADE_FIVE':
      newState = {
        ...state,
        sla: state.sla - state.fivePrice,
        fiveLv: state.fiveLv + 1,
        fiveDps: (state.fiveLv + 1) * 150,
      }
      break;
    case 'UPGRADE_SIX':
      newState = {
        ...state,
        sla: state.sla - state.sixPrice,
        sixLv: state.sixLv + 1,
        rewritesDps: (state.sixLv + 1) * 250,
      }
      break;
  }

  return {
    ...newState,
    dps: newState.oneDps + newState.twoDps + newState.threeDps + newState.fourDps + newState.fiveDps + newState.rewritesDps,
  };
}

// redux store state to immutable component props
const mapClickerStateToProps = state => {
  return {
    ...state
  }
}

// dependency inversion to trigger actions
const mapClickerDispatchToProps = dispatch => {
  return {
    onDeployPress: () => {
      dispatch({
        type: 'DEPLOY_PRESS',
      });
    },
    onTick: () => {
      dispatch({
        type: 'TICK',
      });
    },
    onUpgradeOne: () => {
      dispatch({
        type: 'UPGRADE_ONE',
      });
    },
    onUpgradeTwo: () => {
      dispatch({
        type: 'UPGRADE_TWO',
      });
    },
    onUpgradeThree: () => {
      dispatch({
        type: 'UPGRADE_THREE',
      });
    },
    onUpgradeFour: () => {
      dispatch({
        type: 'UPGRADE_FOUR',
      });
    },
    onUpgradeFive: () => {
      dispatch({
        type: 'UPGRADE_FIVE',
      });
    },
    onUpgradeSix: () => {
      dispatch({
        type: 'UPGRADE_SIX',
      });
    },
  }
}

clickerGameStore = createStore(clickerGameReducer);
ClickerGame = connect(
  mapClickerStateToProps,
  mapClickerDispatchToProps,
)(ClickerGame);

export default class ClickerGameApp extends Component<{}> {
  render() {
    return (
    <Provider store={clickerGameStore}>
      <ClickerGame />
    </Provider>
    );
  }
};

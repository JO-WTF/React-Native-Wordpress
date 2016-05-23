'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity
} = ReactNative;

var Controllers = require('react-native-controllers');
var { Modal } = Controllers;

var badgeCounter = 1;

var SearchScreen = React.createClass({

  getInitialState: function() {
    return {
      tabBarHidden: false
    }
  },

  render: function() {
    return (
      <View style={styles.container}>

      </View>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  button: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 10,
    marginTop:10,
    color: 'blue'
  }
});

AppRegistry.registerComponent('SearchScreen', () => SearchScreen);

module.exports = SearchScreen;

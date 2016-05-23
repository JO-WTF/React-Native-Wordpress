'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  AlertIOS,
  NativeAppEventEmitter,
	StatusBar,
} = ReactNative;

var Controllers = require('react-native-controllers');

var FavoritesScreen = React.createClass({

  getInitialState: function() {
    return({
      isNavBarHidden : false
    });
  },

  render: function() {
			return (
      <ScrollView style={styles.container}>

      </ScrollView>
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

AppRegistry.registerComponent('FavoritesScreen', () => FavoritesScreen);

module.exports = FavoritesScreen;

'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
	ScrollView,
	WebView,
  TouchableOpacity
} = ReactNative;

var Controllers = require('react-native-controllers');


var PushedScreen = React.createClass({

  render: function() {
		 var html =  '<p>One of the many new features in <a title=\"WordPress 3.5\" href=\"http:\/\/codex.wordpress.org\/Version_3.5\">WordPress 3.5<\/a> is the Iris color picker. <a title=\"Replace Farbtastic color picker\" href=\"http:\/\/core.trac.wordpress.org\/ticket\/21206\">\u00a0Iris replaces the, now deprecated, Farbtastic<\/a> color picker script. \u00a0The new Iris color picker is shown off in the Theme Customizer for the Twenty-Twelve theme.<\/p>\n<p><img class=\"aligncenter size-full wp-image-1634\" src=\"http:\/\/rachelbaker.me\/wp-content\/uploads\/2012\/11\/WordPress-theme-customizer-color-picker2.png\" alt=\"\" \/><\/p>\n<p>As soon as I saw Iris, I fell in love. She is user-friendly, colorful and fun. I found that implementing the new color picker is <a title=\"Adding Farbtastic to WordPress Widgets\" href=\"http:\/\/pippinsplugins.com\/adding-the-farbtastic-color-picker-to-your-wordpress-widgets\/\">very similar to Farbtastic<\/a>.<\/p>\n<h3>Iris Color Picker Demo Plugin<\/h3>\n<p>To use the Iris color picker in a plugin requires:<\/p>\n<ol>\n<li>Running a version of WordPress that is 3.5 Beta or higher.<\/li>\n<li>Loading the &#8216;wp-color-picker&#8217; script and style into your plugin options page.<\/li>\n<li>Adding a text input for your color value to your plugin options page.<\/li>\n<li>Writing a custom jQuery script to call Iris&#8217;s wpColorPicker method on your color text input field(s).<\/li>\n<\/ol>\n<p><strong>How does the code look for implementing steps 2-4?<\/strong><br \/>\nI created a demonstration plugin to help answer that. The plugin doesn&#8217;t do anything itself, it is only intended as a guide for developers interested in using the new Iris color picker in a WordPress plugin.<\/p>\n<p><a class=\"button\" href=\"https:\/\/github.com\/rachelbaker\/iris-color-picker-demo\">View on Github<\/a><\/p>\n<p><img class=\"aligncenter size-full wp-image-1635\" src=\"http:\/\/rachelbaker.me\/wp-content\/uploads\/2012\/11\/screenshot-iris-color-picker-demo.jpeg\" alt=\"Iris Color Picker Demo Plugin\" \/><\/p>\n';
    return (
      <View style={styles.container}>

				<ScrollView>
					     <WebView style={{padding: 20,height:800}}
        automaticallyAdjustContentInsets={true}
        scrollEnabled={false}
				          javaScriptEnabled={true}
        html={html}>
      </WebView>

					     </ScrollView>
        <Text style={{fontSize: 20, textAlign: 'center', margin: 10, fontWeight: '500', marginTop: 50}}>
          Simple Pushed Screen
        </Text>

        <Text style={{fontSize: 16, textAlign: 'center', marginHorizontal: 30, marginBottom: 20}}>
          Notice how the push was 100% native. This screen doesn't have any special styles applied.
        </Text>

        <TouchableOpacity onPress={ this.onPushClick }>
          <Text style={styles.button}>Push Another</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={ this.onPopClick }>
          <Text style={styles.button}>Pop</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={ this.onPopToRootClick }>
          <Text style={styles.button}>PopToRoot</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={ this.onResetToClick }>
          <Text style={styles.button}>ResetTo</Text>
        </TouchableOpacity>

      </View>
    );
  },

  onPushClick: function() {
    Controllers.NavigationControllerIOS("favorites_nav").push({
      component: 'PushedScreen',
      title: 'Another'
    });
  },

  onPopClick: function() {
    Controllers.NavigationControllerIOS("favorites_nav").pop();
  },

  onPopToRootClick: function() {
    Controllers.NavigationControllerIOS("favorites_nav").popToRoot();
  },

  onResetToClick: function() {
    Controllers.NavigationControllerIOS("favorites_nav").resetTo({
      component: 'PushedScreen',
      title: 'New Root'
    });
  }

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
    marginTop: 10,
    color: 'blue'
  }
});

AppRegistry.registerComponent('PushedScreen', () => PushedScreen);

module.exports = PushedScreen;

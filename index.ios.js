'use strict';

var Controllers = require('react-native-controllers');

var React = Controllers.hijackReact();
var {
  ControllerRegistry,
  TabBarControllerIOS,
  NavigationControllerIOS,
  ViewControllerIOS,
  DrawerControllerIOS
} = React;

// require all top level react components you refer to in the layout
require('./View/SideMenu');
require('./View/PostListScreen');
require('./View/SearchScreen');
require('./View/FavoritesScreen');

var RNWordpress = Controllers.createClass({

  render: function() {
    return (
      <DrawerControllerIOS id="drawer"
                           componentLeft="SideMenu"
                           type="TheSideBar"
                           animationType="airbnb"
                           style={{contentOverlayColor:'#162D3D55'}}>
        <TabBarControllerIOS id="main">
          <TabBarControllerIOS.Item title="Recent Posts" icon={require('./img/home.png')} selectedIcon={require('./img/home_selected.png')}>
            <NavigationControllerIOS
              title="Recent Posts"
              component="PostListScreen"
              id="posts_nav"
              style={{statusBarTextColorScheme:'light',navBarBackgroundColor: '#0088CC',navBarTextColor: '#ffffff',navBarButtonColor:'#ffffff', drawUnderNavBar: false, drawUnderTabBar: true}}
            />
          </TabBarControllerIOS.Item>
          <TabBarControllerIOS.Item title="Favorites" icon={require('./img/star.png')} selectedIcon={require('./img/star_selected.png')}>
            <NavigationControllerIOS
              title="Favorites"
              component="FavoritesScreen"
              id="favorites_nav"
              passProps={{hidePop: true}}
              style={{drawUnderNavBar: true, navBarTranslucent: true}}
            />
          </TabBarControllerIOS.Item>
          <TabBarControllerIOS.Item title="Search" icon={require('./img/discover.png')} selectedIcon={require('./img/discover_selected.png')}>
            <ViewControllerIOS
              component="SearchScreen"
              style={{ drawUnderTabBar: true }}
            />
          </TabBarControllerIOS.Item>
        </TabBarControllerIOS>
      </DrawerControllerIOS>
    );
  }
});


ControllerRegistry.registerController('RNWordpress', () => RNWordpress);
// this line makes the app actually start and initialize
ControllerRegistry.setRootController('RNWordpress');

module.exports = RNWordpress;

'use strict';
require('./PushedScreen'); // help the react bundler understand we want this file included

var React = require('react');
var ReactNative = require('react-native');
var {
	AppRegistry,
	StyleSheet,
	Text,
	ScrollView,
	TouchableOpacity,
	TouchableHighlight,
	StatusBar,
	Image,
	View
} = ReactNative;
import Icon from 'react-native-vector-icons/FontAwesome';

require('./LightBox');

var Controllers = require('react-native-controllers');
var {
	Modal,
	ControllerRegistry,
	Constants
} = Controllers;
var RefreshableListView = require("./Components/RefreshableListView");
// var ActivityView = require("react-native-activity-view");


var api = require("./Network/api.js");


var MovieListScreen = React.createClass({
	getInitialState: function() {
		return({
			isNavBarHidden : true,
			topStoryIDs: null,
			lastIndex: 0,
			imageLoading: true
		});
	},
	componentDidMount: function() {
		Controllers.NavigationControllerIOS("movies_nav").setLeftButtons([{
			title: "Categories",
			onPress: function() {
				Controllers.DrawerControllerIOS("drawer").toggle({side:"left"});
			}
		}]);
	},



	onShowModalVcClick: async function() {
		// defaults: Modal.showController('ModalScreenTester');
		// this example shows animation type and passProps
		Modal.showController('ModalScreenTester', 'slide-up', { greeting: 'hi there!' });
	},

	onShowModalMoreDrawerOptionsVcClick: async function() {
		//Modal.showController('MoreDrawerScreenTester');
		ControllerRegistry.setRootController('MoreDrawerScreenTester', 'slide-down', { greeting: 'how you doin?' });
	},

	onToggleTabBarClick: async function() {
		this.setState({
			tabBarHidden: !this.state.tabBarHidden
		});
		Controllers.TabBarControllerIOS("main").setHidden({hidden: this.state.tabBarHidden, animated: true});
	},

	onReplaceRootAnimatedClick: function() {
		// this example shows animation type and passProps
		ControllerRegistry.setRootController('ModalScreenTester', 'slide-down', { greeting: 'how you doin?' });
	},
	renderListViewRow: function(row){
		return(
			<View >
				<TouchableHighlight underlayColor={'#f3f3f2'} onPress={()=>this.selectRow(row)}>
					<View style={styles.articleContainer}>
						<View style={styles.rowDetailsContainer}>
							<Image resizeMode="cover" style={styles.featuredImage}
								source={{uri: row.featured_image}}
								 onLoadStart={() =>{console.log('start loading')}}
								onLoadEnd={() => {console.log('loading finished')}}
								/>
							<Text style={styles.articleTitle}>
									{row.title.rendered}
								</Text>
								<Text style={styles.articleTime} >
									Posted by {row.author}, Category: {row.categories[0]}
								</Text>
								<Text style={styles.articleExcerpt}>
									{row.excerpt.rendered}
								</Text>

							</View>
						</View>
					</TouchableHighlight>
					<View style={styles.separator}/>
					<View style={styles.articleActions}>
						<Icon style={{flex:1}} name="share-alt" size={20} color="#0088CC" />
						<Icon style={{flex:1}} name="thumbs-o-up" size={20} color="#0088CC" />
						<Icon style={{flex:1}} name="star-o" size={20} color="#0088CC" />
						<View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}><Icon style={{flex:1}} name="external-link" size={20} color="#0088CC" /><Text style={{fontSize:15,color:'#0088CC'}}> Read More</Text></View>



					</View>
				</View>
			);
		},
		listViewOnRefresh: function(page, callback){
			var rowsData = [];
			var REQUEST_URL = 'http://jo.wtf/wp-json/wp/v2/posts?per_page=10&order=asc&page='+page;

			fetch(REQUEST_URL)
			.then((response) => response.json())
			.then((responseData) => {responseData.map((obj)=>{
				fetch('http://jo.wtf/wp-json/wp/v2/media/'+obj.featured_media)
				.then((responseMedia) => responseMedia.json())
				.then((responseDataMedia) => {
					obj.featured_image= responseDataMedia.guid.rendered;
				})
				rowsData.push(obj);
				console.log(rowsData);
			})
			callback(rowsData);
			return;
		})
		.done();
	},

	selectRow: function(row){
		var navigationController = Controllers.NavigationControllerIOS("movies_nav");
		navigationController.push({
			component: "PushedScreen", // the unique ID registered with AppRegistry.registerComponent (required)
			backButtonTitle: "", // override the nav bar back button title for the pushed screen (optional)
			backButtonHidden: false, // hide the nav bar back button for the pushed screen altogether (optional)
		});
	},

	render: function() {
		return (
			<RefreshableListView renderRow={(row)=>this.renderListViewRow(row)}
				onRefresh={(page, callback)=>this.listViewOnRefresh(page, callback)}
				backgroundColor={'#EFEFEF'}
				style={styles.listview}/>
		);
	},

});

var styles = StyleSheet.create({
	articleContainer:{
		backgroundColor:'#ffffff',

		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 5,
		marginHorizontal:5,

		borderTopLeftRadius:5,
		borderTopRightRadius:5

	},
	rowCount: {
		fontSize: 20,
		textAlign: 'right',
		color: 'gray',
		margin: 10,
		marginLeft: 15,
	},

	rowDetailsContainer: {
		flex: 1,
	},
	featuredImage: {
		flexDirection:'row',
		height:150,
		borderRadius:5
	},
	articleTitle: {
		flex: 1,
		fontSize: 18,
		textAlign: 'left',
		margin: 10,
		color: '#0088CC'
	},
	articleTime: {
		fontSize: 12,
		marginHorizontal:10,
		color: 'gray',
		flex: 1,
		textAlign:'left'
	},
	articleExcerpt: {
		margin:10,
		fontSize:14
	},
	articleActions: {
		backgroundColor: '#FFFFFF',
		flexDirection:'row',
		alignItems:'center',
		justifyContent:'space-between',
		marginHorizontal:5,
		marginBottom:10,
		paddingHorizontal:10,
		paddingVertical:5,
		borderBottomLeftRadius:5,
		borderBottomRightRadius:5,
	},
	listview: {
		marginBottom:49
	},
	separator: {
		height: 1,
		marginHorizontal:5,
		borderTopColor:'#cccccc',
		borderTopWidth:1
	}
});
console.disableYellowBox = true;

AppRegistry.registerComponent('MovieListScreen', () => MovieListScreen);

module.exports = MovieListScreen;

'use strict';
require('./PostScreen'); // help the react bundler understand we want this file included
var api = require("../config.js");
var React = require('react');
var ReactNative = require('react-native');
var {
	AppRegistry,
	StyleSheet,
	Text,
	TouchableOpacity,
	TouchableHighlight,
	StatusBar,
	Image,
	View
} = ReactNative;
import Icon from 'react-native-vector-icons/FontAwesome';
var HTMLView = require('react-native-htmlview')
var TimeAgo = require('react-native-timeago');


var Controllers = require('react-native-controllers');
var {
	Modal,
	ControllerRegistry,
	Constants
} = Controllers;
var RefreshableListView = require("../Components/RefreshableListView");
// var ActivityView = require("react-native-activity-view");



var PostListScreen = React.createClass({
	getInitialState: function(){
			return {
			};
	},

	componentDidMount: function() {
		Controllers.NavigationControllerIOS("posts_nav").setLeftButtons([{
			title: "Categories",
			onPress: function() {
				Controllers.DrawerControllerIOS("drawer").toggle({side:"left"});
			}
		}]);
	},


	renderListViewRow: function(row){
			return(
			<View >

					<View style={styles.articleContainer}>
						<View style={styles.rowDetailsContainer}>
								{row.featured_media>0? <TouchableOpacity underlayColor={'#f3f3f2'} onPress={()=>this.selectRow(row)}><Image resizeMode="cover" style={styles.featuredImage}
								source={{uri: row.featured_image_url}}
								/></TouchableOpacity> : null}


								<TouchableHighlight underlayColor={'#f3f3f2'} onPress={()=>this.selectRow(row)}>
								<Text style={styles.articleTitle}>
										{row.title.rendered}
									</Text>
								</TouchableHighlight>

								<Text style={styles.articleTime} >
									Posted by [{row.author_name}] 	in [{row.category_name[0].name}]	 <TimeAgo time={row.date} />
								</Text>
								<View style={styles.articleExcerpt}>
								<TouchableOpacity underlayColor={'#f3f3f2'} onPress={()=>this.selectRow(row)}>
								<HTMLView
									value =	{row.excerpt.rendered}
								/>
								</TouchableOpacity>
								</View>
						</View>
					</View>
					<View style={styles.separator}></View>
					<View style={styles.articleActions}>
								<TouchableHighlight underlayColor={'#f3f3f2'} onPress={()=>this.selectRow(row)}>
								<View style={styles.articleActionView}>
								<Icon name="share-alt" size={20} color="#0088CC" />
								</View>
								</TouchableHighlight>
								<TouchableHighlight underlayColor={'#f3f3f2'} onPress={()=>this.selectRow(row)}>
								<View style={styles.articleActionView}>
								<Icon name="heart-o" size={20} color="#0088CC" />
								</View>
								</TouchableHighlight>
								<TouchableHighlight underlayColor={'#f3f3f2'} onPress={()=>this.selectRow(row)}>
								<View style={styles.articleActionView}>
								<Icon name="comments-o" size={20} color="#0088CC" /><Text style={{fontSize:15,color:'#0088CC'}}> {row.number_comments.approved} </Text>
								</View>
								</TouchableHighlight>
								<TouchableHighlight underlayColor={'#f3f3f2'} onPress={()=>this.toggleLike(row.id)}>
								<View style={styles.articleActionView}>
								<Icon name="star-o" size={20} color="#0088CC" /><Text style={{fontSize:15,color:'#0088CC'}}> {row.number_likes} </Text>
								</View>
								</TouchableHighlight>

					</View>
				</View>
			);
		},
		toggleLike: (postID)=>{

		},
		listViewOnRefresh: function(page, callback){
			var rowsData = [];
			var numberOfRows=0;
			var REQUEST_URL = api.POST_URL+'&page='+page;

			fetch(REQUEST_URL)
			.then((response) => response.json())
			.then((responseData) => {responseData.map((obj)=>{
				rowsData.push(obj);
				numberOfRows+=1;
			});
			var responseLength;
			responseLength=responseData.length;
			if (responseLength<10) {
        callback(rowsData, {
          allLoaded: true, // the end of the list is reached
        });
      } else {
        callback(rowsData);
      }
			return;
		})
		.catch((error) => {
  		console.warn(error);
		});
	},

	selectRow: function(row){
		var navigationController = Controllers.NavigationControllerIOS("posts_nav");
		navigationController.push({
			component: "PostScreen", // the unique ID registered with AppRegistry.registerComponent (required)
			backButtonTitle: "", // override the nav bar back button title for the pushed screen (optional)
			backButtonHidden: false, // hide the nav bar back button for the pushed screen altogether (optional)
			style: {tabBarHidden:true,},
			passProps: {
				postID:row.id,
				content:row.content.rendered,
				title:row.title.rendered,
				author: row.author_name,
				date:row.date,
				category:row.category_name,
				featured_media:row.featured_media,
				featured_image_url:row.featured_image_url},
				number_comments:row.number_comments.approved,
				number_likes:row.number_likes
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
	},
	articleActions: {
		backgroundColor: '#FFFFFF',
		flexDirection:'row',
		alignItems:'center',
		justifyContent:'space-between',
		marginHorizontal:5,
		marginBottom:10,
		paddingHorizontal:20,
		paddingVertical:5,
		borderBottomLeftRadius:5,
		borderBottomRightRadius:5,
	},
	articleActionView:{
		flexDirection:'row',justifyContent:'center',alignItems:'center', flex:1
	},
	listview: {
		marginBottom:49
	},
	separator: {
		height: 0,
		marginHorizontal:5,
		borderTopColor:'#cccccc',
		borderTopWidth:1
	}
});
console.disableYellowBox = true;

AppRegistry.registerComponent('PostListScreen', () => PostListScreen);

module.exports = PostListScreen;

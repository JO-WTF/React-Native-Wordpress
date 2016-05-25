/**
* Sample React Native App
* https://github.com/facebook/react-native
*/
'use strict';

var React= require('react');
var {
	AppRegistry,
	StyleSheet,
	Text,
	TouchableOpacity,
	ActivityIndicatorIOS,
	View,
	TouchableHighlight,
	Image,
	TextInput,
	Dimensions,
} = require('react-native');
import Icon from 'react-native-vector-icons/FontAwesome';

import ParallaxScrollView from 'react-native-parallax-scroll-view';
var HTMLView = require('react-native-htmlview')
const window = Dimensions.get('window');
var KeyboardSpacer = require('react-native-keyboard-spacer');
import CommentList from './CommentList.js'
const PARALLAX_HEADER_HEIGHT = 150;



var PostScreen = React.createClass({
	getInitialState: function() {
		console.log('properties passed');
		console.log(this.props);
		return {
			commenting:false,
			curText: '<No Event>',
			prevText: '<No Event>',
			prev2Text: '<No Event>',
			prev3Text: '<No Event>',
		};
	},
	render: function () {
		var dateOptions = {
			year: 'numeric', month: 'numeric', day: 'numeric',
			hour: 'numeric', minute: 'numeric', second: 'numeric',
			hour12: false
		};
		var date=new Date(this.props.date);
		var postDate=date.toLocaleString('en-US', dateOptions);
		return (

			<View style={{ flex: 1 }}>
			<View style={{ flex: 1, flexDirection: 'row' }}>
			<ParallaxScrollView
			headerBackgroundColor="#333"
			parallaxHeaderHeight={ PARALLAX_HEADER_HEIGHT }
			backgroundSpeed={10}

			renderBackground={() => (
				<View key="background">
				<Image resizeMode='contain' source={{uri: this.props.featured_image_url,
						width: window.width,
						height: PARALLAX_HEADER_HEIGHT}}/>
					<View style={{position: 'absolute',
					top: 0,
					width: window.width,
					backgroundColor: 'rgba(0,0,0,.4)',
					height: PARALLAX_HEADER_HEIGHT}}/>
				</View>
			)}

			renderForeground={() => (
				<View key="parallax-header" style={ styles.parallaxHeader }>
				<Text style={ styles.postTitle }>
				{this.props.title}
				</Text>
				</View>
			)}


			>
			<View style={styles.postContainer}>
			<View style={styles.container}>
				<Text style={styles.postDate}>{postDate}</Text>
				<Text style={styles.postMeta}>{this.props.author} published in {this.props.category[0].name}</Text>
			</View>
			<HTMLView
			value={this.props.content}
			stylesheet={styles}
			onLinkPress={(url) => console.log('clicked link: ', url)}
			/>
			<View style={styles.commentList}>
			{console.log(this.props.number_comments)}
			<CommentList postID={this.props.postID} />
			</View>
		</View>
		</ParallaxScrollView>
		</View>
		<View style={{backgroundColor: '#0088cc',flexDirection:'row',alignItems:'center' }}>
		<TextInput ref="commentBox" style={this.state.commenting?styles.commentBoxOpen:styles.commentBox}
				onEndEditing={()=>this.setState({commenting:false})}
		    onChangeText={(text) => this.setState({input: text})}
				placeholder="What's your opinion?"
		  />


		{this.state.commenting?null:<TouchableHighlight style={{flex:1,alignItems:'center'}}><Icon name="share-alt" size={20} color="#ffffff" /></TouchableHighlight>}
		{this.state.commenting?null:<TouchableHighlight style={{flex:1,alignItems:'center'}}><Icon name="heart-o" size={20} color="#ffffff" /></TouchableHighlight>}
	<TouchableHighlight style={{flex:1,alignItems:'center'}} onPress={()=>{this.refs.commentBox.focus();this.setState({commenting:true});}}>{this.state.commenting?<TouchableHighlight  underlayColor={'#f3f3f2'} ><Text style={{color:'#ffffff'}}>Submit</Text></TouchableHighlight>:<Icon name="comments-o" size={20} color="#ffffff" />}</TouchableHighlight>
{this.state.commenting?null:<TouchableHighlight  style={{flex:1,alignItems:'center'}}><Icon name="star-o" size={20} color="#ffffff" /></TouchableHighlight>}

		</View>
			<KeyboardSpacer topSpacing={0}/>
	</View>

);
},
updateText: function(text) {
	 this.setState((state) => {
		 return {
			 curText: text,
			 prevText: state.curText,
			 prev2Text: state.prevText,
			 prev3Text: state.prev2Text,
		 };
	 });
 },
});

var styles = StyleSheet.create({
	background: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: window.width,
		height: PARALLAX_HEADER_HEIGHT
	},
	container:{
		backgroundColor:'#f8fcff'
	},
	parallaxHeader: {
		alignItems: 'flex-end',
		flex: 1,
		flexDirection: 'row',
	},
	postTitle: {
		color: 'white',
		fontSize: 18,
		paddingVertical: 5
	},
	postDate: {
		fontSize:13,
		textAlign:'center',
		color: '#333333',
		margin:5
	},
	postMeta: {
		fontSize:13,
		textAlign:'center',
		color: '#333333',
		marginBottom:20
	},
	postContainer: {
		paddingVertical: 10,
		paddingHorizontal:10,

	},

	a: {
		fontWeight: '300',
		color: 'red', // pink links
	},
	code: {
		backgroundColor:'#222222',
		color:'#eeeeee',
		marginHorizontal:5,
	},
	pre: {
		backgroundColor:'#222222',
		color:'#eeeeee',
		fontSize:12,
	},
	h1: {
		color:'green',
	},
	commentBox: {
		marginBottom:1,height: 35,flex:0,backgroundColor:'#ffffff',borderColor: '#0088CC', borderWidth: 2
	},
	commentBoxOpen: {
		marginBottom:1,height: 35,flex:4,backgroundColor:'#ffffff', padding:5,borderColor: '#0088CC', borderWidth: 2
	},
	actionButtonHidden:{
		flex:0,
	}


});



AppRegistry.registerComponent('PostScreen', () => PostScreen);

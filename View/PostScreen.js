'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
	AppRegistry,
	Image,
	ListView,
	TouchableHighlight,
	StyleSheet,
	RecyclerViewBackedScrollView,
	Text,
	ScrollView,
	View,
} = ReactNative;

var GiftedListView = require('react-native-gifted-listview');
var HTMLView = require('react-native-htmlview')


// var REQUEST_URL = 'http://jo.wtf/wp-json/wp/v2/posts?per_page=10&order=asc&page='+1;

//


// export async function getData() {
// 	var temp=[];
// 	var rows=[];
// 	try {
//   let response = await fetch(REQUEST_URL);
//   let data = await response.json();
// 	data.map((obj)=>{
// 		temp[0]=obj.id;
// 		temp[1]=obj.title.rendered;
// 		temp[2]=obj.author;
// 		temp[3]=obj.featured_media;
// 		rows.push([temp[0],temp[1],temp[2],temp[3]]);
// 	},
//
// 	rows.map((row)=>{
//
// 				try {
// 				  let response =  await fetch('http://jo.wtf/wp-json/wp/v2/media/'+row[3]);
// 				  let data = await response.json();
// 					row[4]=data.guid.rendered
// 				} catch(e) {
// 				  console.log("Oops, error", e);
// 				}
//
// 	})
//
// 	return rows;
// } catch(e) {
//   console.log("Oops, error", e);
// }
// }

var PostScreen = React.createClass({
  /**
   * Will be called when refreshing
   * Should be replaced by your own logic
   * @param {number} page Requested page to fetch
   * @param {function} callback Should pass the rows
   * @param {object} options Inform if first load
   */
  // _onFetch(page = 1, callback, options) {
	// 	let temp=[];
	// 	var rows = [];
	// 	fetch(REQUEST_URL)
	// 	.then((response) => response.json())
	// 	.then((responseData) => {responseData.map((obj)=>{
	// 		temp[0]=obj.id;
	// 		temp[1]=obj.title.rendered;
	// 		temp[2]=obj.author;
	// 		temp[3]=obj.featured_media;
	// 		rows.push([temp[0],temp[1],temp[2],temp[3]]);
	// 	});
	// 	rows.map((row)=>{
	// 		(fetch('http://jo.wtf/wp-json/wp/v2/media/'+row[3])
	// 		.then((responseMedia) => responseMedia.json())
	// 		.then((responseDataMedia) => {
	// 		row[4]=responseDataMedia.guid.rendered;
	// 		return row[4];
	// 	})
	// 	)
	// 	 })
	//
	// 	 console.log(rows);
	// 	callback(rows);
	// 	})
	// 	.done();
  // },
  /**
   * When a row is touched
   * @param {object} rowData Row data
   */



  render() {
    return (
      <View style={styles.container}>
				<ScrollView showsVerticalScrollIndicator={false}>
				<HTMLView
						value={this.props.content}
						stylesheet={styles}
						onLinkPress={(url) => console.log('clicked link: ', url)}
						/>
					</ScrollView>


      </View>
    );
  }
});



var styles = {
	a: {
    fontWeight: '300',
    color: 'red', // pink links
  },
	code: {
		backgroundColor:'#3F3F53',
		color:'#ffffff',
		marginHorizontal:5
	},
	pre: {
			backgroundColor:'#3F3F53',
			color:'#ffffff',
			fontSize:12,
	},
	h1: {
		color:'green',
	},
  container: {
    flex: 1,
    backgroundColor: '#FFF',
		paddingHorizontal:15
  },
  navBar: {
    height: 64,
    backgroundColor: '#CCC'
  },
  row: {
    padding: 10,
    height: 44,
  },
};

AppRegistry.registerComponent('PostScreen', () => PostScreen);

module.exports = PostScreen;

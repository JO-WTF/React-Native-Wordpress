var React=require('react');
var ReactNative = require('react-native');
var {
		Image,
	  ListView,
	  TouchableHighlight,
	  StyleSheet,
	  RecyclerViewBackedScrollView,
	  Text,
	  View,
} = ReactNative;

var commentData=[];
var HTMLView = require('react-native-htmlview');

var CommentRow=React.createClass({
	render(){
		return (
			<View>
				<Text>{this.props.author_name} says:</Text>
				<HTMLView
				value={this.props.content}
				/>
			</View>
		)
	}
});

var CommentList = React.createClass({
	propTypes: {
    postID: React.PropTypes.any.isRequired
  },

		getInitialState: function() {
		var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
				return {
					dataSource: ds.cloneWithRows(commentData),
					number_comments:0
				};
		},
	updateDS(responseData){
		var responseLength;
		responseLength=responseData.length;
		this.setState({number_comments:responseLength});
		for(i=0;i<responseLength;i++){
			commentData.push({
				id:responseData[i].id,
				author_name:responseData[i].author_name,
				author_avatar_url:responseData[i].author_avatar_urls,
				content:responseData[i].content.rendered
			});
		}
		console.log(commentData);
		this.setState({dataSource:this.state.dataSource.cloneWithRows(commentData)});
		console.log(this.state.dataSource)
},
	componentDidMount(){
	var REQUEST_URL='http://jo.wtf/wp-json/wp/v2/comments?post='+this.props.postID;
	fetch(REQUEST_URL)
    .then((response) =>{
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response.json();
    }).then((responseData)=> {
				this.updateDS(responseData);
    }).catch(function(error) {
        console.log(error);
    });
},

	renderRow(rowData){
		return <CommentRow {...rowData} />
	},
  render: function() {
    return (
      <View>


				{this.state.number_comments>0?
					<View>
				<ListView
				ref="listView"
				automaticallyAdjustContentInsets={false}
				dataSource={this.state.dataSource}
				renderRow={this.renderRow}
				/></View>:null}
      </View>
    );
  }
});
module.exports = CommentList;

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


var REQUEST_URL = 'http://jo.wtf/wp-json/wp/v2/posts?per_page=10&order=asc&page='+1;

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

var ListViewSimpleExample = React.createClass({
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
		var htmlContent = '<pre class="default prettyprint prettyprinted" style=""><code><span class="tag">&lt;html&gt;</span><span class="pln"></span><span class="tag">&lt;head&gt;</span><span class="pln"></span><span class="tag">&lt;title&gt;&lt;/title&gt;</span><span class="pln"></span><span class="tag">&lt;script</span><span class="pln"> </span><span class="atn">type</span><span class="pun">=</span><span class="atv">"text/javascript"</span><span class="pln"> </span><span class="atn">src</span><span class="pun">=</span><span class="atv">"jquery.min.js"</span><span class="tag">&gt;&lt;/script&gt;</span><span class="pln"></span><span class="tag">&lt;script</span><span class="pln"> </span><span class="atn">type</span><span class="pun">=</span><span class="atv">"text/javascript"</span><span class="tag">&gt;</span><span class="pln"></span><span class="kwd">var</span><span class="pln"> category</span><span class="pun">=</span><span class="lit">11111</span><span class="pun">;</span><span class="pln"></span><span class="tag">&lt;/script&gt;</span><span class="pln"></span><span class="tag">&lt;/head&gt;</span><span class="pln"></span><span class="tag">&lt;body&gt;</span><span class="pln"></span><span class="tag">&lt;input</span><span class="pln"> </span><span class="atn">type</span><span class="pun">=</span><span class="atv">"text"</span><span class="pln"> </span><span class="atn">id</span><span class="pun">=</span><span class="atv">"searchBoxLinkId"</span><span class="tag">/&gt;</span><span class="pln"></span><span class="tag">&lt;a</span><span class="pln"> </span><span class="atn">onclick</span><span class="pun">=</span><span class="atv">"</span><span class="kwd">var</span><span class="pln"> searchb </span><span class="pun">=</span><span class="pln"> jQuery</span><span class="pun">(</span><span class="str">searchBoxLinkId</span><span class="pun">).</span><span class="pln">val</span><span class="pun">();</span><span class="pln"> </span><span class="kwd">var</span><span class="pln"> searchlink</span><span class="pun">=</span><span class="pln"> window</span><span class="pun">.</span><span class="pln">location</span><span class="pun">.</span><span class="pln">protocol </span><span class="pun">+</span><span class="pln"> </span><span class="str">//</span><span class="pln"> </span><span class="pun">+</span><span class="pln"> window</span><span class="pun">.</span><span class="pln">location</span><span class="pun">.</span><span class="pln">hostname</span><span class="pun">+</span><span class="str">/Dave2/Pages/FAQSearch.aspx?category=</span><span class="pun">+</span><span class="pln">category</span><span class="pun">+</span><span class="str">&amp;k=</span><span class="pun">+</span><span class="pln">searchb</span><span class="pun">;</span><span class="pln">window</span><span class="pun">.</span><span class="pln">location</span><span class="pun">.</span><span class="pln">href </span><span class="pun">=</span><span class="pln"> searchlink</span><span class="pun">;</span><span class="atv">"</span><span class="pln"> </span><span class="atn">href</span><span class="pun">=</span><span class="atv">"#"</span><span class="tag">&gt;</span><span class="pln">eee</span><span class="tag">&lt;/a&gt;</span><span class="pln"></span><span class="tag">&lt;/body&gt;</span></code></pre><h1>Et ut voluptatem velit explicabo tempora animi<\/h1>\n<ul>\n<li>Qui sed in est dolorum consequuntur<\/li>\n<\/ul>\n<h1>Et et id modi qui saepe repellat provident. Velit odio consectetur iure id et vel. Officiis corrupti inventore voluptate non at voluptatum<\/h1>\n<ul>\n<li>Commodi et ipsam unde<\/li>\n<li>Eos autem corporis non animi est<\/li>\n<\/ul>\n<blockquote><p>Vitae ut aspernatur velit cumque. Ducimus laboriosam ullam iure Placeat amet cupiditate <a title=\"Culpa sint quo eum similique sit vel.\" href=\"http:\/\/www.Hauck.com\/aliquam-quo-et-quis-asperiores-et-labore-ipsa-qui.html\">assumenda praesentium. Magni ut laborum tempore<\/a> Aut <a title=\"Cumque error laborum rerum qui sequi iusto quia.\" href=\"http:\/\/www.Wehner.info\/\">sit alias culpa<\/a> unde. Nihil sequi laboriosam ratione. Iure sequi quas aut nulla. Non officia veritatis fuga laudantium. Enim recusandae voluptatum hic exercitationem aut. Aut itaque officia <a title=\"Quia repellendus ut quo eos.\" href=\"http:\/\/www.Schamberger.com\/et-illo-quis-similique-id.html\">necessitatibus<\/a> libero dolor. Excepturi asperiores id quo qui ab. Reiciendis ipsa incidunt corrupti commodi cum. Et omnis voluptas Assumenda quae nobis molestiae rerum. Omnis fuga tenetur praesentium. Adipisci doloribus ratione maxime <a title=\"Iusto magnam sit molestiae neque odio reiciendis deserunt.\" href=\"http:\/\/www.Jacobson.info\/enim-dicta-tempora-sed\">numquam<\/a> repellat. saepe ducimus itaque voluptatem fugiat incidunt. Architecto alias et tempora doloremque illum. omnis earum excepturi unde ipsa quidem. Nobis eos doloribus <a title=\"Sed vero.\" href=\"http:\/\/www.Dickens.org\/quis-excepturi-excepturi-aliquid-ex-asperiores\">cumque. Ut sed sed quis non<\/a> enim. amet ut expedita. Exercitationem id exercitationem est doloremque delectus. non odit et voluptatibus distinctio maiores. Porro sint ea quis quae quia voluptatem. Doloremque et odit cumque enim quis. Aperiam vel temporibus <a title=\"Harum enim vitae.\" href=\"https:\/\/www.McDermott.com\/magni-iusto-consequatur-nisi-sint-rem-totam\">beatae quod. Placeat incidunt<\/a> ducimus corporis a fugiat quas. Ex ut autem similique consequatur. Rerum sint explicabo sit. <a title=\"Facere repellat sequi reiciendis voluptatibus voluptatem aut distinctio impedit ducimus et.\" href=\"http:\/\/Frami.info\/ex-consequatur-minus-sint-eius-ad-dolores-molestiae.html\">voluptatem<\/a> accusamus At tenetur ex asperiores est ullam Aut quos rerum quasi laudantium nesciunt libero inventore. Libero quibusdam ut autem enim harum. Repudiandae mollitia quae quisquam. Quasi quas unde veniam Dolores tenetur ut tempore <a title=\"In quo.\" href=\"http:\/\/www.Halvorson.com\/nostrum-sunt-nostrum-sed-dolorum-qui-eum-fugit-placeat\">autem. Illo et amet fugiat consequuntur qui<\/a> Autem repudiandae voluptas.<\/p><\/blockquote>\n<h3>Qui rerum qui eius neque consequuntur<\/h3>\n<hr>\n<h5>Consequatur quasi consequatur suscipit asperiores. Nesciunt temporibus nostrum eos non temporibus dolor. Quisquam unde porro itaque perferendis hic ut. Harum nisi commodi sint distinctio<\/h5>\n<hr>\n<ul>\n<li>Ducimus<\/li>\n<li>Nam non corporis ducimus ratione quis rerum<\/li>\n<li>Et eum eum dolor qui<\/li>\n<li>Magni nam laudantium expedita et<\/li>\n<\/ul>\n<p><!--more--><br \/>\n<img alt=\"Itaque expedita autem modi.\" src=\"http:\/\/placehold.it\/544x435\/\"><\/p>\n<hr>\n<ol>\n<li>Et odio et quia ut assumenda enim<\/li>\n<li>Est vel reiciendis quis<\/li>\n<li>Sed ipsa vitae officia dolorem quis<\/li>\n<\/ol>\n<h1>Voluptas velit qui ut sunt et error enim<\/h1>\n<blockquote><p>Perferendis animi aut eligendi iure quis. Dolor quasi mollitia consequuntur veritatis quasi voluptatem. Dolorum laboriosam similique et facilis. Voluptates et officia quibusdam ipsa soluta ut vel. Expedita et consequatur facilis. Ut natus rerum quia quasi consequatur. Libero ut delectus nisi qui dolores voluptates adipisci. Ea incidunt officiis sint omnis. Velit blanditiis laborum fugiat et sint necessitatibus. Velit sapiente ipsam autem dolor deleniti voluptas fugiat. Autem consequuntur itaque cum dolores omnis vel. Eum dolores exercitationem molestiae nam ea mollitia. Consequuntur porro temporibus ducimus at dolor. Itaque quam impedit in dolores aut iusto voluptatem. Reprehenderit eius voluptates suscipit alias praesentium. Et sit est iure iure libero porro at. Dolores veritatis maiores velit amet nulla laborum. Exercitationem nesciunt aut voluptate expedita animi. Omnis rerum est sit est suscipit.<\/p><\/blockquote>\n<p>Exercitationem <a title=\"Aspernatur consequatur assumenda voluptates.\" href=\"http:\/\/www.Hamill.com\/rerum-facere-sit-magnam-minus-dolor-eum-voluptas\">repudiandae ea sint repellendus.<\/a> iure officiis optio dolor. Qui deleniti commodi dolorem in. Quas temporibus quia iste. Nesciunt non laborum beatae eaque. minima debitis est eum et. Nam fugit accusantium similique molestiae fuga et. est id in modi rerum impedit. Dicta <a title=\"Et et nemo atque ipsa soluta debitis ducimus quia.\" href=\"http:\/\/www.Sanford.org\/occaecati-et-impedit-dolor-quod\">tenetur<\/a> ea ex quidem Et aliquam ipsa. Ut qui id mollitia aut. Et harum exercitationem id velit itaque. Ut at qui Et dolores molestiae <a title=\"Rem autem fuga reprehenderit.\" href=\"https:\/\/www.Towne.biz\/et-omnis-unde-similique-debitis-porro\">sit tempore. Et molestiae consectetur<\/a> molestias ut ad. Rerum at natus similique dolor. rem <a title=\"Quam.\" href=\"https:\/\/Hackett.org\/maxime-hic-aliquam-reiciendis-eius-blanditiis-earum-minus.html\">error vel placeat nulla.<\/a> sed qui perferendis nobis optio. Qui quis nisi voluptate consectetur aut quas. assumenda est excepturi enim quia Maiores quaerat rerum impedit dicta Deleniti sed quisquam laborum itaque. Quia voluptas ut <a title=\"Rem inventore sequi rerum est.\" href=\"http:\/\/Yost.net\/omnis-sunt-totam-sapiente-deleniti-reprehenderit-qui-nesciunt-autem\">Illo aut<\/a> ex fugit quos nemo odio. Animi sed odio sit. Magnam repellendus commodi tempora dolor vel. Ea perspiciatis cumque dolor architecto delectus vero.<\/p>\n<ul>\n<li>Saepe<\/li>\n<li>Officia porro ea vitae aut quod totam<\/li>\n<li>Aut inventore sequi magni<\/li>\n<li>Consectetur eum rerum aut ut<\/li>\n<li>Soluta molestiae ipsum et<\/li>\n<\/ul>\n<hr>\n<hr>\n<ol>\n<li>Quia nostrum aut fuga et occaecati<\/li>\n<li>Et minima omnis<\/li>\n<li>Voluptates vel incidunt culpa<\/li>\n<li>Aperiam tempore id est aut distinctio<\/li>\n<li>Occaecati adipisci et hic cum sint<\/li>\n<li>Dolore voluptas<\/li>\n<li>Quia id minus quos eaque sed<\/li>\n<li>Rem necessitatibus sed corrupti rem id vel aliquam<\/li>\n<li>Corporis tempore quia aut<\/li>\n<li>Illo et eum velit voluptate a ipsa perspiciatis<\/li>\n<\/ol>\n<h2>Et possimus facere fugit aut accusantium corrupti<\/h2>\n<ul>\n<li>Nam qui ullam id eaque<\/li>\n<li>Facilis amet sed<\/li>\n<li>Et sit aliquid qui et<\/li>\n<li>Ut expedita<\/li>\n<\/ul>\n<ol>\n<li>In velit illum perferendis<\/li>\n<li>Hic non excepturi et nobis<\/li>\n<li>Sunt repellat<\/li>\n<li>Quo et omnis sed harum fuga<\/li>\n<li>Non aliquam vel natus magnam<\/li>\n<li>Qui dolore omnis enim tenetur<\/li>\n<\/ol>\n"},"excerpt":{"rendered":"<p>Et ut voluptatem velit explicabo tempora animi Qui sed in est dolorum consequuntur Et et id modi qui saepe repellat provident. Velit odio consectetur iure id et vel. Officiis corrupti inventore voluptate non at voluptatum Commodi et ipsam unde Eos autem corporis non animi est Vitae ut aspernatur velit cumque. Ducimus laboriosam ullam iure Placeat [&hellip;]<\/p>\n'

    return (
      <View style={styles.container}>
				<ScrollView showsVerticalScrollIndicator={false}>
				<HTMLView
						value={htmlContent}
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
	h1: {
		color:'green',
	},
  container: {
    flex: 1,
    backgroundColor: '#FFF',
		padding:15
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

AppRegistry.registerComponent('ListViewSimpleExample', () => ListViewSimpleExample);

module.exports = ListViewSimpleExample;

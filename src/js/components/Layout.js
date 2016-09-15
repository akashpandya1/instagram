import React from "react";

import Footer from "./Footer";
import Header from "./Header";

export default class Layout extends React.Component {
  constructor() {
    super();
    
  }

  componentDidMount() {
     this.getFollowerPosts();
  }

  submitPost() {
    var postPic = document.getElementById("postPicture").value;
    var postComment = document.getElementById("postComment").value;
    console.log("postPic:" + postPic + ",postComment:" + postComment);
    var xhttp = new XMLHttpRequest();
    var postUrl = "http://localhost:3000/createPost/" + postPic + "/" + postComment + "/1/";
    console.log('postUrl:' + postUrl);
    console.log(xhttp.responseText);
    xhttp.open("GET", postUrl, true);
    xhttp.send();
    document.getElementById("alertPost").innerHTML = 'Post Submitted!';
    document.getElementById("alertPost").style['color'] = 'green';
    // setTimeout(this.fadeout(), 3000);
  }

  getFollowerPosts() {
    var xhttp = new XMLHttpRequest();
    var postUrl = "http://localhost:3000/getFollowerPosts/1/";
    console.log('postUrl:' + postUrl);
    xhttp.onreadystatechange = function () {
      if (xhttp.readyState === 4 && xhttp.status === 200) {
        console.log("xhttp.responseText:" + xhttp.responseText);
        var jsontext = '[{"name":"Jesper","picture":"Aaberg","date":"555-0100"}]';
          //[{ "name": "Sam",    "picture": "test1.png",    "date": "09/15/2016 10:00 am" }]
        var obj = JSON.parse(jsontext);
        console.log("jsonObj:" + obj);
        for (var i = 0; i < obj.length; i++) {
		         console.log('test');
            console.log(i + " -> " + obj[i]['name'] + "," + obj[i]['picture'] + "," + obj[i]['date']);
          var cp = document.createElement('span');
          var userFollowing = obj[i]['name'] + '&nbsp;&nbsp;&nbsp;' + obj[i]['date'] +
            '<br/>' +
            '<img src="' + obj[i]['picture'] + '" alt="picture">';
          if (i % 2 != 0) {
            cp.style['background-color'] = '#d3d3d3';
          }
          document.getElementById("followeePosts").appendChild(cp);
        }
      }
    }
    xhttp.open("GET", postUrl, true);
    xhttp.send(); 
  }

  fadeout() {
    document.getElementById("alertPost").innerHTML = '';
  }

  render() {
    return (
      <div>
        <Header/>
        <br/>
        <br/>
        &nbsp; &nbsp; <b>Picture: </b>&nbsp; <input type="text" id="postPicture" size="50" maxLength="50" name="postPicture" value={this.props.postPicture} />
        <br/>
        <br/>
        &nbsp; &nbsp; <b>Comment: </b>&nbsp; <input type="text"  id="postComment"  size="75" maxLength="75" name="postComment" value={this.props.postComment} />
        <br/>
        <br/>
        <input type="button" id="postButton" name="postButton" value="Post" onClick={this.submitPost.bind(this) } />
        <div id="alertPost"></div>
        <br/>
        <br/>
        &nbsp; &nbsp; <b>The lastest post from the people you are following: </b>&nbsp;
        <div id="followeePosts"> </div>

      </div>

    );
  }
}

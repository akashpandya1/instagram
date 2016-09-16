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
        var obj = JSON.parse(xhttp.responseText);
        console.log("obj:" + obj);
       // var jsontext = '[{"name":"Jesper","picture":"./public/graphics/test1.png","date":"555-0100"}]';
       console.log("jsonObj:" + obj);
        for (var i = 0; i < obj.length; i++) {		        
            console.log(i + " -> " + obj[i]['Name'] + "," + obj[i]['PostPic'] + "," + obj[i]['Text'] +  "," + obj[i]['PostTime']);
          var cp = document.createElement('span');
           cp.innerHTML = obj[i]['Text'] + '&nbsp;&nbsp;&nbsp;' + obj[i]['PostTime'] +
            '<br/>' +
            '<img src="./public/graphics/' + obj[i]['PostPic'] + '" alt="picture">' +  '<br/>';
          if (i % 2 != 0) {
            cp.style['background-color'] = '#d3d3d3';
          }
          document.getElementById("followeePosts").appendChild(cp);
        }
      }
    }
    xhttp.open("GET", postUrl, false);
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

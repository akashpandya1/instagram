import React from "react";

import Footer from "./Footer";
import Header from "./Header";

export default class Layout extends React.Component {
  constructor() {
    super();
  }

  submitPost() {
    var postPic = document.getElementById("postPicture").value;
    var postComment = document.getElementById("postComment").value;
    console.log("postPic:" + postPic + ",postComment:" + postComment);
    var xhttp = new XMLHttpRequest();
    var postUrl = "http://localhost:8080/createtPost/" + postPic + "/" + postComment + "/";
    console.log('postUrl:' + postUrl);
    console.log(xhttp.responseText);
    xhttp.open("GET", postUrl, true);
    xhttp.send();
    document.getElementById("alertPost").innerHTML = 'Post Submitted!';
    document.getElementById("alertPost").style['color'] = 'green';
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
      </div>
    );
  }
}

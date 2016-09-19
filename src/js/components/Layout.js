import React from "react";

import Footer from "./Footer";
import Header from "./Header";

//variable to hide the picture upload div tag
var hideMe = true;
//id for the user; 0 is no user 
var id = 0;
export default class Layout extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "init",
    };    
  }

  componentDidMount() {
    if(hideMe){
      document.getElementById("hideMe").style.display = "none";
    }    
  }


  submitPost() {
    var postPic = document.getElementById("postPicture").value;    
    var postComment = document.getElementById("postComment").value;
    console.log(postPic.lastIndexOf("\\"));
    if (postPic.lastIndexOf("\\") != -1) {
     var ind = postPic.lastIndexOf("\\");      
     var postPic = postPic.substring(ind+1, postPic.length);
    
    console.log("postPic:" + postPic + ",postComment:" + postComment);
    var xhttp = new XMLHttpRequest();
    var postUrl = "http://localhost:3000/createPost/" + postPic + "/" + postComment + "/1/";
    console.log('postUrl:' + postUrl);
    console.log(xhttp.responseText);
    xhttp.onreadystatechange = function () {
      if (xhttp.readyState === 4 && xhttp.status === 200) {
            var getFollowUrl = "http://localhost:3000/getFollowerPosts/"+id+"/";
            console.log('getFollowUrl:' + getFollowUrl);          
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
                  cp.innerHTML = obj[i]['Name'] + '&nbsp;&nbsp;&nbsp;' + obj[i]['PostTime'] +
                    '<br/>' +
                    '<img src="./public/graphics/' + obj[i]['PostPic'] + '" alt="picture">' +  '<br/>' + obj[i]['Text'] +  '<br/><br/>';
                      if (i % 2 != 0) {
                    cp.style['background-color'] = '#d3d3d3';
                  }
                  document.getElementById("followeePosts").appendChild(cp);
                }
                document.getElementById("alertPost").innerHTML =  '';
              }
            }
            xhttp.open("GET", getFollowUrl, false);
            xhttp.send(); 
      }
    } 
   
    xhttp.open("GET", postUrl, true);
    xhttp.send();
    document.getElementById("alertPost").innerHTML = 'Post Submitted!';
    document.getElementById("alertPost").style['color'] = 'green';  
    } else {
      document.getElementById("alertPost").innerHTML = 'Invalid file! Select the browse button.' 
      document.getElementById("alertPost").style['color'] = 'red';  
    }
 
  }

  getFile(elemId) {
   var elem = document.getElementById(elemId);
   if(elem && document.createEvent) {
      var evt = document.createEvent("MouseEvents");
      evt.initEvent("click", true, false);
      elem.dispatchEvent(evt);
   }
}


  handleSubmit(e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    var xhttp = new XMLHttpRequest();
    var postUrl = "http://localhost:3000/AuthUser/" + username + "/" + password + "/";
    //console.log('address:' + postUrl);
    xhttp.onreadystatechange = function () {
      if (xhttp.readyState === 4 && xhttp.status === 200) {
        //console.log("getting this response =>" + xhttp.responseText + "<= value ");
        if(xhttp.responseText != null){
          if(xhttp.responseText != "failed!"){
            //console.log("xhttp.responseText:" + xhttp.responseText);
            id = xhttp.responseText;
            hideMe = false;
            document.getElementById("hideMe").style.display = "inline";
            document.getElementById("login").style.display = "none";
            console.log("user id : " + id);
            // Get the posted data
            postUrl = "http://localhost:3000/getFollowerPosts/"+id+"/";
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
                  cp.innerHTML = obj[i]['Name'] + '&nbsp;&nbsp;&nbsp;' + obj[i]['PostTime'] +
                    '<br/>' +
                    '<img src="./public/graphics/' + obj[i]['PostPic'] + '" alt="picture">' +  '<br/>' + obj[i]['Text'] +  '<br/><br/>';
                      if (i % 2 != 0) {
                    cp.style['background-color'] = '#d3d3d3';
                  }
                  document.getElementById("followeePosts").appendChild(cp);
                }
              }
            }
            xhttp.open("GET", postUrl, false);
            xhttp.send(); 
          }else{
            alert("Wrong Credentials, please try again!");
          }
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
         <form id= "login" onSubmit={ this.handleSubmit }>  
          <label>Username : <input id="username" placeholder="username" defaultValue="LindseyLow" /></label>
          <br/>
          <label>Password : <input id="password" placeholder="password" defaultValue="none" /></label>
          <br/>
          <button type="submit">Login</button>
        </form>
        <div id="hideMe">
          <br/>
          <br/>
          <b>Picture: </b>&nbsp;<input type="file" id="postPicture" name="postPicture" value={this.props.postPicture}  size="50" />
          <br/>
          <br/>
          <b>Comment: </b>&nbsp; <input type="text"  id="postComment"  size="75" maxLength="75" name="postComment" value={this.props.postComment} />
          <br/>
          <br/>
          <input type="button" id="postButton" name="postButton" value="Post" onClick={this.submitPost.bind(this) } />
          <div id="alertPost"></div>
          <br/>
          <br/>
          <b>Lastest Posts: </b> 
          <br/>
          <br/>
          <div id="followeePosts"> </div>
        </div>
      </div>

    );
  }
}

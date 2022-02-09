import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./user/SignIn";
import SignUp from "./user/SignUp";
import { Posts } from "./posts/Post";
import { SinglePost } from "./posts/SinglePost";
import { useState } from "react";
import { RecentComments } from "./comments/recentComments";
import { AllComments } from "./comments/AllComments";
import EditProfile from "./user/EditProfile";
import { UserComments } from "./user/UserComments";
import { UserPosts } from "./user/UserPosts";
import { UserHeader } from "./user/UserHeader";
function App() {
  const [comment, setComment] = useState("");
//DeleteComment
  const handleCommentDelete = (id) => {
    // console.log(com, "asasasas");

    fetch(`https://taskforum.herokuapp.com/api/comment/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json()) // or res.json()
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

 //Edit Comment
 const handleCommentEdit = (id) => {
  console.log("comment id :", id);
  //  fetch(`https://taskforum.herokuapp.com/api/comment/${id}`, {
  //    method: "PUT",
  //    headers: {
  //      "content-type": "application/json",
  //      Authorization: "Bearer " + localStorage.getItem("token"),
  //    },
  //  })
  //    .then((res) => res.json()) // or res.json()
  //    .then((res) => console.log(res))
  //    .catch((err) => console.log(err));
};
//Add Comment
  const postComment = (msg, post, user) => {
    if (!msg == "") {
      console.log("Comment = ", msg);

      let obj = {
        comment: msg,
        post: post,
        user: user,
      };

      console.log("user+comment+post = ", obj);
      fetch("https://taskforum.herokuapp.com/api/comment/", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },

        body: JSON.stringify(obj),
      })
        .then((response) => response.json())
        .then((res) => {
          console.log("Success:", res);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      console.log("Write some text");
    }
  };
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* USER */}
          <Route path="/" element={<SignIn />} />
          <Route path="signUp" element={<SignUp />} />
          <Route path="editProfile" element={<EditProfile />} />
          <Route path="userHeader" element={<UserHeader />} />

          {/* POSTS */}
          <Route
            exact
            path="AllPosts"
            element={
              <Posts
                postComment={postComment}
                comment={comment}
                setComment={setComment}
              />
            }
          />
          <Route
            exact
            path="/SinglePost/:id"
            element={
              <SinglePost
                postComment={postComment}
                comment={comment}
                setComment={setComment}
              />
            }
          />
          <Route
            exact
            path="/userPosts"
            element={
              <UserPosts
                postComment={postComment}
                comment={comment}
                setComment={setComment}
              />
            }
          />

          {/* COMMENTS */}
          <Route path="recentComments" element={<RecentComments />} />
          <Route path="/AllComments/:postId" element={<AllComments  handleCommentDelete={handleCommentDelete} handleCommentEdit={handleCommentEdit}/>} />
          <Route path="/userComments" element={<UserComments handleCommentDelete={handleCommentDelete} handleCommentEdit={handleCommentEdit}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

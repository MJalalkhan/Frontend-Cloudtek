import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./user/SignIn";
import SignUp from "./user/SignUp";
import { Posts } from "./posts/Post";
import { SinglePost } from "./posts/SinglePost";
import { useState } from "react";
import { RecentComments } from "./comments/recentComments";
import { AllComments } from "./comments/AllComments";
import Header from "./Comps/Header";
import EditProfile from "./user/EditProfile";
import { UserComments } from "./user/UserComments";
function App() {
  const [comment, setComment] = useState("");

  const postComment = (msg, post, user) => {
    if (!msg == "") {
      console.log("heererer", msg);
      // console.log(details, "asaas");
      console.log(user);
      console.log(post);
      let obj = {
        user: user,
        comment: msg,
        post: post,
      };

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
          {/* <Route path="/Header" element={<Header />} /> */}
          <Route path="/" element={<SignIn />} />
          <Route path="signUp" element={<SignUp />} />
          <Route path="editProfile" element={<EditProfile />} />
          <Route path="recentComments" element={<RecentComments />} />
          <Route path="/AllComments" element={<AllComments />} />
          <Route path="/userComments/:id" element={<UserComments />} />
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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

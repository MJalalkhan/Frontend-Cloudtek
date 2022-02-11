import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./user/SignIn";
import SignUp from "./user/SignUp";
import { Posts } from "./posts/Post";
import { SinglePost } from "./posts/SinglePost";
import { RecentComments } from "./comments/recentComments";
import { AllComments } from "./comments/AllComments";
import EditProfile from "./user/EditProfile";
import { UserComments } from "./user/UserComments";
import { UserPosts } from "./user/UserPosts";
import { UserHeader } from "./user/UserHeader";
import { useState } from "react";
function App() {
  const [data, setData] = useState([]);
  const [comments, setComments] = useState([]);

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
          <Route exact path="AllPosts" element={<Posts data={data} setData={setData} comments={comments} setComments={setComments}/>} />
          <Route exact path="/SinglePost/:id" element={<SinglePost />} />
          <Route exact path="/userPosts" element={<UserPosts data={data} setData={setData}/>} />

          {/* COMMENTS */}
          <Route path="recentComments" element={<RecentComments data={data} setData={setData}/>} />
          <Route path="/AllComments/:postId" element={<AllComments />} />
          <Route path="/userComments" element={<UserComments />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

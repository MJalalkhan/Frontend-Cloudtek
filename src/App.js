import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./user/SignIn";
import SignUp from "./user/SignUp";
import { AllComments } from "./comments/AllComments";
import { Posts } from "./posts/Post";
import { SinglePost } from "./posts/SinglePost";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="signUp" element={<SignUp />} />
          <Route path="AllComments" element={<AllComments />} />
          <Route path="AllPosts" element={<Posts />} />
          <Route path="SinglePost/:id" element={<SinglePost />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

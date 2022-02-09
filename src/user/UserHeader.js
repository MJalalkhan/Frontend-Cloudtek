
import Header from "../Comps/Header";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";


import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export const UserHeader = (props) => {

  let navigate = useNavigate();
 
  return (
    <div className="App">
      <Header />
      <AppBar position="static">
        <Toolbar>
          
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link
              to="/userPosts"
              style={{ textDecoration: "none", color: "white" }}
            >
              Posts
            </Link>
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link
              to="/userComments"
              style={{ textDecoration: "none", color: "white" }}
            >
              Comments
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
      
    </div>
  );
};

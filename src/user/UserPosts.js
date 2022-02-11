import {
  Divider,
  Avatar,
  Grid,
  Paper,
  Container,
  Button,
  Link,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { UserHeader } from "./UserHeader";

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
} from "@material-ui/core";
import CreateIcon from "@mui/icons-material/Create";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { RecentComments } from "../comments/recentComments";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "#fff",
  },
  Link: { textDecoration: "none", color: "black" },
  hero: {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1558981852-426c6c22a060?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80')`,
    height: "500px",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    fontSize: "4rem",
    [theme.breakpoints.down("sm")]: {
      height: 300,
      fontSize: "3em",
    },
  },
  blogsContainer: {
    paddingTop: theme.spacing(3),
  },
  blogTitle: {
    fontWeight: 800,
    paddingBottom: theme.spacing(3),
  },
  card: {
    maxWidth: "100%",
  },
  media: {
    height: 240,
  },
  cardActions: {
    display: "flex",
    margin: "0 10px",
    justifyContent: "space-between",
  },
  author: {
    display: "flex",
  },
  paginationContainer: {
    display: "flex",
    justifyContent: "center",
  },
}));

export const UserPosts = (props) => {
  const [userPosts, setUserPosts] = useState([]);
  const classes = useStyles();

  let userId = localStorage.getItem("userId");
  //   const [allPosts, setAllPosts] = useState([]);
  useEffect(() => {
    fetch(`https://taskforum.herokuapp.com/api/post/user/${userId}`, {
      method: "Get",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((res) => {
        console.log("All User Posts :", res);
        setUserPosts(res.data);
        if (res.token) {
          console.log("here");
        }
        return;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <div className="App">
      <UserHeader />
      {userPosts.length !== 0 ? (
        userPosts.map((post, index) => {
          var dt = new Date(post.user.created_at);
          return (
            <Grid item xs={12} key={index} style={{ margin: "10px" }}>
              {post.user === localStorage.getItem("userId") && (
                // return(
                <>
                  <Button
                    variant="outlined"
                    size="small"
                    //   onClick={() => handleEditPost(post)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    //   onClick={() => handleDeletePost(post)}
                  >
                    Delete{" "}
                  </Button>
                </>
              )}
              <Link className={classes.Link} to={`/SinglePost/${post._id}`}>
                <Card className={classes.card}>
                  <CardActionArea>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {post.title}
                      </Typography>
                      <Typography gutterBottom variant="h6" component="h6">
                        Category: {post.category}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {post.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>

                  <CardActions className={classes.cardActions}>
                    <Box className={classes.author}>
                      <Avatar src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
                      <Box ml={2}>
                        <Typography variant="subtitle2" component="p">
                          Author: <strong>{post.user.name}</strong>
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          color="textSecondary"
                          component="p"
                        >
                          {dt.toLocaleString()}
                        </Typography>
                      </Box>
                    </Box>
                  </CardActions>
                </Card>
              </Link>
              {/* {console.log(post._id, "post")} */}
              <RecentComments postId={post._id} />
              <Link
                to={`/AllComments/${post._id}`}
                className={classes.Link}
                underline="hover"
              >
                {"View more comments"}
              </Link>

              <TextField
                fullWidth
                label="Write Comment"
                id="fullWidth"
                onChange={(e) => {
                  props.setComment(e.target.value);
                  console.log(e.target.value);
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        color="primary"
                        onClick={() =>
                          props.postComment(
                            props.comment,
                            post._id,
                            localStorage.getItem("userId")
                          )
                        }
                      >
                        <ArrowForwardIosIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Divider variant="fullWidth" style={{ marginTop: "20px" }} />
            </Grid>
          );
        })
      ) : (
        <div>
          <h3>No Posts</h3>
        </div>
      )}
    </div>
  );
};

import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Box,
  Container,
  Grid,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Avatar,
  Divider,
} from "@material-ui/core";
import CreateIcon from "@mui/icons-material/Create";
import { IconButton, InputAdornment, TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { RecentComments } from "../comments/recentComments";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Header from "../Comps/Header";

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

export const Posts = (props) => {
  const classes = useStyles();
  const [data, setData] = useState([]);

  const handleAddPost = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let obj = {
      user: localStorage.getItem("userId"),
      title: data.get("title"),
      description: data.get("description"),
      category: data.get("category"),
    };
    console.log("data obj ", obj);
    fetch("https://taskforum.herokuapp.com/api/post/", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(obj),
    })
      .then((response) => response.json())
      .then((res) => {
        console.log("Post Added:", res);
        setData([...data, res.data]);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleDeletePost = (item) => {
    console.log(item);

    fetch(`https://taskforum.herokuapp.com/api/post/${item._id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json()) // or res.json()
      .then((res) => {
        console.log(res);
        let result = data.map((x, index) => {
          return x.id !== item._id;
        });
        setData(result);
      })
      .catch((err) => console.log(err));
  };
  const handleEditPost = (post) => {
    console.log("post Details :", post);
    //  fetch(`https://taskforum.herokuapp.com/api/post/${id}`, {
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
  useEffect(
    () => {
      fetch("https://taskforum.herokuapp.com/api/post/", {
        method: "Get",
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then((response) => response.json())
        .then((res) => {
          setData(res.data);
          console.log("All Posts:", res);

          return;
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    [],
    [data]
  );
  return (
    <div className="App">
      <Header />

      <Box className={classes.hero}>
        <Box>React Posts</Box>
      </Box>
      <Container maxWidth="lg" className={classes.blogsContainer}>
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <CreateIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Add new post
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleAddPost}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  autoComplete="given-name"
                  name="title"
                  required
                  fullWidth
                  id="title"
                  label="Title"
                  autoFocus
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  autoComplete="given-name"
                  name="category"
                  // required
                  fullWidth
                  id="category"
                  label="Category"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  // required
                  fullWidth
                  id="description"
                  label="Description"
                  name="description"
                  autoComplete="given-name"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Post
            </Button>
          </Box>
        </Box>
        <Typography variant="h4" className={classes.blogTitle}>
          Posts
        </Typography>
        <Grid container spacing={3}>
          {data.map((post, index) => {
            var dt = new Date(post.user.created_at);
            return (
              <Grid item xs={12} key={index} style={{ margin: "10px" }}>
                {post.user._id === localStorage.getItem("userId") && (
                  // return(
                  <>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleEditPost(post)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleDeletePost(post)}
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
          })}
        </Grid>
        <Box my={4} className={classes.paginationContainer}>
          {/* <Pagination count={10} /> */}
        </Box>
      </Container>
    </div>
  );
};

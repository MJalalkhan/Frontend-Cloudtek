import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
  Grid,
  Card,
  CardActionArea,
  CardActions,
  CardMedia,
  CardContent,
  Avatar,
  Divider,
} from "@material-ui/core";

import { IconButton, InputAdornment, Link, TextField } from "@mui/material";
import { AllComments } from "../comments/AllComments";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useParams } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "#fff",
  },
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

export const SinglePost = () => {
  const classes = useStyles();
  const { id } = useParams();
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(`https://taskforum.herokuapp.com/api/post/${id}`, {
      method: "Get",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((res) => {
        setData(res.data);
        console.log("Success:", res);
        if (res.token) {
          // localStorage.setItem("token", res.token);
          console.log("here");
          // navigate("/AllPosts", { replace: true });
        }
        return;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);
  return (
    <div className="App">
      <AppBar className={classes.appBar} position="static">
        <Toolbar>
          <Typography variant="h6" color="primary">
            Posts
          </Typography>
        </Toolbar>
      </AppBar>
      <Box className={classes.hero}>
        <Box>React Posts</Box>
      </Box>
      <Container maxWidth="lg" className={classes.blogsContainer}>
        <Typography variant="h4" className={classes.blogTitle}>
          Posts
        </Typography>
        <Grid container spacing={3}>
          {data.map((post, index) => {
            var dt = new Date(post.user.created_at);
            // console.log();
            return (
              <Grid item xs={12}>
                <Link to={``}>
                  <Card className={classes.card}>
                    <CardActionArea>
                      {/* <CardMedia
                      className={classes.media}
                      image="https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                      title="Contemplative Reptile"
                    /> */}
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          {post.title}
                        </Typography>
                        <Typography gutterBottom variant="p" component="p">
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
                            {post.user.name}
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
                    <Divider variant="fullWidth" style={{ margin: "5px 0" }} />

                    <AllComments />
                    <Link href="#" underline="hover">
                      {"View more comments"}
                    </Link>
                    <TextField
                      fullWidth
                      label="Write Comment"
                      id="fullWidth"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton edge="end" color="primary">
                              <ArrowForwardIosIcon />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Card>
                </Link>
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

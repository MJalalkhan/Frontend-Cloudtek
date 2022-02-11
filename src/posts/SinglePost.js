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

import { RecentComments } from "../comments/recentComments";
import { useParams } from "react-router-dom";
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

export const SinglePost = () => {
  const classes = useStyles();
  let { id } = useParams();
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
        console.log("Single Post :", res);
        if (res.token) {
          var dt = new Date(data.user.created_at);
        }
        return;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <div className="App">
      <Header />
      <Box className={classes.hero}>
        <Box>React Posts</Box>
      </Box>
      <Container maxWidth="lg" className={classes.blogsContainer}>
        <Typography variant="h4" className={classes.blogTitle}>
          Posts
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card className={classes.card}>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {data.title}
                  </Typography>
                  <Typography gutterBottom variant="h6" component="h6">
                    Category: {data.category}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {data.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions className={classes.cardActions}>
                {data.user && (
                  <Box className={classes.author}>
                    <Avatar src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
                    <Box ml={2}>
                      <Typography variant="subtitle2" component="p">
                        {data.user.name}
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        color="textSecondary"
                        component="p"
                      >
                        {/* {dt.toLocaleString()} */}
                      </Typography>
                    </Box>
                  </Box>
                )}
              </CardActions>
              <Divider variant="fullWidth" style={{ margin: "5px 0" }} />
              {data.length !== 0 ? <RecentComments postId={data._id}  data={data} setData={setData} /> : ""}
            </Card>
          </Grid>
        </Grid>
        <Box my={4} className={classes.paginationContainer}>
          {/* <Pagination count={10} /> */}
        </Box>
      </Container>
    </div>
  );
};

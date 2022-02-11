import {
  Divider,
  Avatar,
  Grid,
  Paper,
  Container,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  CardActions,
  Box,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { UserHeader } from "./UserHeader";

const imgLink =
  "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";

const useStyles = makeStyles((theme) => ({
  comments: {
    textAlign: "-webkit-left",
    margin: "10px 20px",
  },
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

export const UserComments = (props) => {
  const classes = useStyles();
  let userId = localStorage.getItem("userId");
  const [allComments, setAllComments] = useState([]);

  //Get User All Comments
  useEffect(() => {
    fetch(`https://taskforum.herokuapp.com/api/comment/user/${userId}`, {
      method: "Get",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((res) => {
        console.log("All comments :", res);
        setAllComments(res.data);
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

      <Container maxWidth="sm">
        <h3 className={classes.comments}>Comments</h3>
        <Paper style={{ padding: "10px 20px" }}>
          {allComments.length !== 0 ? (
            allComments.map((com, index) => {
              var dt = new Date(com.user.created_at);
              return (
                <div key={index}>
                  {com.user === localStorage.getItem("userId") && (
                    // return(
                    <>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={props.handleCommentEdit}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => props.handleDelete(com._id)}
                      >
                        Delete{" "}
                      </Button>
                    </>
                  )}
                  <Link
                    className={classes.Link}
                    to={`/SinglePost/${com.post._id}`}
                  >
                    <Card className={classes.card}>
                      <CardActionArea>
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="h2">
                            {com.post.title}
                          </Typography>
                          <Typography gutterBottom variant="h6" component="h6">
                            Category: {com.post.category}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                          >
                            {com.post.description}
                          </Typography>
                        </CardContent>
                      </CardActionArea>

                      <CardActions className={classes.cardActions}>
                        <Box className={classes.author}>
                          <Avatar src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
                          <Box ml={2}>
                            <Typography variant="subtitle2" component="p">
                              Author: <strong>{com.post.user.name}</strong>
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
                  <h3 className={classes.comments}>Comments</h3>

                  <Grid container wrap="nowrap" spacing={2} key={index}>
                    <Grid item>
                      <Avatar alt="Remy Sharp" src={imgLink} />
                    </Grid>
                    <Grid item xs zeroMinWidth>
                      <h4 style={{ margin: 0, textAlign: "left" }}>
                        {com.user.name}
                      </h4>
                      <p style={{ textAlign: "left" }}>{com.comment}</p>
                      <p style={{ textAlign: "left", color: "gray" }}>
                        {dt.toLocaleString()}
                      </p>
                    </Grid>
                  </Grid>
                  <Divider variant="fullWidth" style={{ margin: "10px 0" }} />
                </div>
              );
            })
          ) : (
            <div>
              <h3>No Comments</h3>
            </div>
          )}
        </Paper>
      </Container>
    </div>
  );
};

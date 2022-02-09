import { Divider, Avatar, Grid, Paper, Container, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect, useState } from "react";

import { UserHeader } from "./UserHeader";


const imgLink =
  "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";

const useStyles = makeStyles((theme) => ({
  comments: {
    textAlign: "-webkit-left",
    margin: "10px 20px",
  },
}));

export const UserComments = (props) => {

  const classes = useStyles();
  let userId=localStorage.getItem("userId");
  const [allComments, setAllComments] = useState([]);
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
          {
          allComments.map((com, index) => {
            var dt = new Date(com.user.created_at);
            return (
              <div key={index}>
              {com.user === localStorage.getItem("userId") && (
                    // return(
                    <>
                      <Button variant="outlined" size="small" onClick={props.handleCommentEdit}>
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
          })}
        </Paper>
      </Container>
    </div>
  );
};

import { Divider, Avatar, Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";

const imgLink =
  "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";

const useStyles = makeStyles((theme) => ({
  comments: {
    textAlign: "-webkit-left",
    margin: "10px 20px",
  },
  commentBox: {
    margin: "10px 20px",
  },
}));

export const RecentComments = ({ handleCommentEdit,handleCommentDelete,postId,data,setData }) => {
  const classes = useStyles();
  const [comments, setComments] = useState([]);


//Get Post Comments
  useEffect(() => {
    fetch(`https://taskforum.herokuapp.com/api/comment/post/${postId}`, {
      method: "Get",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((res) => {
        setComments(res.data);
        return;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  },[]);

  return (
    <div>
      <h3 className={classes.comments}>Comments</h3>
      <Grid container wrap="nowrap" spacing={2}>
        <div className={classes.commentBox}>
          {comments.length !== 0 ? (
            comments
              .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
              .slice(0, 3)
              .map((x, index) => {
                var dt = new Date(x.created_at);

                return (
                  <div key={index}>
                    {x.user && x.user._id === localStorage.getItem("userId") && (
                      <>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => handleCommentEdit(x._id)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => handleCommentDelete(x._id)}
                        >
                          Delete{" "}
                        </Button>
                      </>
                    )}
                    <Grid item>
                      <Avatar alt="Remy Sharp" src={imgLink} />
                    </Grid>
                    <Grid item xs zeroMinWidth>
                      <div style={{ margin: 0, textAlign: "left" }}>
                        {x.user ? 
                         <h4>{x.user.name}</h4>
                         :
                         
                        <h4>Michel</h4>
                        }
                      </div>
                      <p style={{ textAlign: "left" }}>{x.comment}. </p>
                      <p style={{ textAlign: "left", color: "gray" }}>
                        {dt.toLocaleString()}
                      </p>
                    </Grid>
                  </div>
                );
              })
          ) : (
            <h6>No comments found on this post</h6>
          )}
        </div>
      </Grid>
      {/* <Divider variant="fullWidth" style={{ margin: "10px 0" }} /> */}
    </div>
  );
};

import {
  Divider,
  Avatar,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Link } from "react-router-dom";

const imgLink =
  "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";

const useStyles = makeStyles((theme) => ({
  comments: {
    textAlign: "-webkit-left",
    margin: "10px 20px",
  },
  commentBox: {
    margin: "10px 20px",
    width: "-webkit-fill-available",
  },
  Link: { textDecoration: "none" },
}));

export const RecentComments = ({ postId, data, setData }) => {
  const classes = useStyles();
  const [commenting, setCommenting] = useState(""); //first comment on post
  const [editComment, setEditComment] = useState(null);

  const [comments, setComments] = useState([]);
  //Add Comment
  const postComment = (msg, post, user) => {
    if (!msg == "") {
      let obj = {
        comment: msg,
        post: post,
        user: user,
      };

      console.log("user+comment+post = ", obj);
      fetch("https://taskforum.herokuapp.com/api/comment/", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },

        body: JSON.stringify(obj),
      })
        .then((response) => response.json())
        .then((res) => {
          setComments([...comments, res.data]);
          setData([...data]);
          setCommenting("");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      console.log("Write some text");
    }
  };
  //DeleteComment
  const handleCommentDelete = (id) => {
    // console.log(com, "asasasas");

    fetch(`https://taskforum.herokuapp.com/api/comment/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json()) // or res.json()
      .then((res) => {
        console.log(res);
        setComments(
          comments.filter((comm) => {
            console.log(comm);
            if (comm._id === id) {
              return false;
            }
            return true;
          })
        );
      })
      .catch((err) => console.log(err));
  };

  //Edit Comment
  const handleCommentEdit = (id, updateComment) => {
    let obj = {
      comment: updateComment,
    };
    console.log("comment id :", id);
    console.log("Comment", updateComment);
    setEditComment(null);
    fetch(`https://taskforum.herokuapp.com/api/comment/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(obj),
    })
      .then((res) => res.json()) // or res.json()
      .then((res) => {
        let update = comments.map((update) => {
          if (update._id === id) {
            update.comment = updateComment;
          }
          return update;
        });
        setComments(update);
      })
      .catch((err) => console.log(err));
  };
  //Get Post Comments

  useEffect(() => {
    setTimeout(() => {
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
    }, 500);
  }, [postId]);

  return (
    <div>
      <h3 className={classes.comments}>Comments</h3>
      <Grid container wrap="nowrap" spacing={2}>
        <div className={classes.commentBox}>
          {/* {console.log(comments,'comsssssss')} */}
          {comments.length !== 0 ? (
            comments
              .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
              .slice(0, 3)
              .map((x, index) => {
                var dt = new Date(x.created_at);

                return (
                  <div key={index}>
                    {x.user && x.user._id === localStorage.getItem("userId") ? (
                      <>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => {
                            setEditComment(x._id);
                          }}
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
                    ) : (
                      ""
                    )}
                    {editComment === x._id ? (
                      <TextField
                        key={index}
                        fullWidth
                        label="Write Comment"
                        id="fullWidth"
                        value={commenting.length > 0 ? commenting : x.comment}
                        onChange={(e) => {
                          setCommenting(e.target.value);
                          console.log(e.target.value);
                        }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                edge="end"
                                color="primary"
                                onClick={() =>
                                  handleCommentEdit(x._id, commenting)
                                }
                              >
                                <ArrowForwardIosIcon />
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    ) : (
                      ""
                    )}
                    {editComment !== x._id && (
                      <>
                        <Grid item>
                          <Avatar alt="Remy Sharp" src={imgLink} />
                        </Grid>
                        <Grid item xs zeroMinWidth>
                          <div style={{ margin: 0, textAlign: "left" }}>
                            {x.user ? <h4>{x.user.name}</h4> : <h4>Michel</h4>}
                          </div>
                          <p style={{ textAlign: "left" }}>{x.comment}. </p>
                          <p style={{ textAlign: "left", color: "gray" }}>
                            {dt.toLocaleString()}
                          </p>
                        </Grid>
                        <Divider
                          variant="fullWidth"
                          style={{ margin: "10px 0" }}
                        />
                      </>
                    )}
                  </div>
                );
              })
          ) : (
            <h6>No comments found on this post</h6>
          )}
          <Link
            to={`/AllComments/${postId}`}
            className={classes.Link}
            underline="hover"
          >
            {`${
              comments.length <= 3
                ? "View All Comments"
                : `View ${
                    comments.length > 3 ? comments.length - 3 : ""
                  } more comments`
            }`}
          </Link>
          <div>
            {editComment===null &&
            <TextField
              fullWidth
              label="Write Comment"
              id="fullWidth"
              value={commenting}
              onChange={(e) => {
                setCommenting(e.target.value);
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      color="primary"
                      onClick={() =>
                        postComment(
                          commenting,
                          postId,
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
            }
          </div>
        </div>
        <Divider variant="fullWidth" style={{ marginTop: "20px" }} />
      </Grid>
      {/* <Divider variant="fullWidth" style={{ margin: "10px 0" }} /> */}
    </div>
  );
};

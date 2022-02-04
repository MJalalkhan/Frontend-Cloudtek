import { Divider, Avatar, Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const imgLink =
  "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";

const useStyles = makeStyles((theme) => ({
  comments: {
    textAlign: "-webkit-left",
    margin: "10px 20px",
  },
}));

export const RecentComments = () => {
  const classes = useStyles();

  return (
    <div className="App">
      <h3 className={classes.comments}>Comments</h3>
      {/* <Paper style={{ padding: "10px 20px" }}> */}
      <Grid container wrap="nowrap" spacing={2}>
        <Grid item>
          <Avatar alt="Remy Sharp" src={imgLink} />
        </Grid>
        <Grid item xs zeroMinWidth>
          <h4 style={{ margin: 0, textAlign: "left" }}>Michel Michel</h4>
          <p style={{ textAlign: "left" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
            luctus ut est sed faucibus.{" "}
          </p>
          <p style={{ textAlign: "left", color: "gray" }}>
            posted 1 minute ago
          </p>
        </Grid>
        <Link to="/AllComments" className={classes.Link} underline="hover">
          {"View more comments"}
        </Link>
      </Grid>
      {/* <Divider variant="fullWidth" style={{ margin: "10px 0" }} /> */}
      {/* </Paper> */}
    </div>
  );
};

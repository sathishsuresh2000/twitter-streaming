import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Skeleton from '@material-ui/lab/Skeleton';
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  messages: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    marginBottom: 25,
  },
  root: {
    width: "100%",
    marginTop: 25,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  empty: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(1),
    height: 400
  },
  loader: {
    display: 'flex',
    marginTop: 25,
    justifyContent: 'space-evenly'
  }
}));

function Messages(props) {
  const classes = useStyles();
  const getName = (value) => {
    let regex   = /(^|[^@\w])@(\w{1,15})\b/g
    let replace = '$1<a href="http://twitter.com/$2" target="_blank">@$2</a>'
    let output = value.replace( regex, replace )
    return output
  }
  const {
    messages: { list, loading },
  } = props;
  return (
    <section className={classes.messages}>
      { loading ? (
        <div>
          <div className={classes.loader}>
            <Skeleton animation="wave" variant="circle" width={60} height={60} />
            <Skeleton animation="wave" variant="rect" width="95%" height={60} />
          </div>
          
          <div className={classes.loader}>
            <Skeleton animation="wave" variant="circle" width={60} height={60} />
            <Skeleton animation="wave" variant="rect" width="95%" height={60} />
          </div>

          <div className={classes.loader}>
            <Skeleton animation="wave" variant="circle" width={60} height={60} />
            <Skeleton animation="wave" variant="rect" width="95%" height={60} />
          </div>

          <div className={classes.loader}>
            <Skeleton animation="wave" variant="circle" width={60} height={60} />
            <Skeleton animation="wave" variant="rect" width="95%" height={60} />
          </div>

          <div className={classes.loader}>
            <Skeleton animation="wave" variant="circle" width={60} height={60} />
            <Skeleton animation="wave" variant="rect" width="95%" height={60} />
          </div>
        </div>
      ) : list.length ? (
        list.map((value, key) => {
          return (
            <Card className={classes.root} key={key}>
            <CardHeader
              avatar={
                <Avatar alt="Remy Sharp" src={value.user.profile_background_image_url} />
              }
              title={value.user.name}
              subheader={moment(value.createdTime).format('MMMM Do YYYY, h:mm:ss a')}
            />
            <CardContent>
              <Typography color="textSecondary">
                <span dangerouslySetInnerHTML={{__html: getName(value.text)}}></span>
              </Typography>
            </CardContent>
          </Card>
          )})
      ) : (
        <div className={classes.empty}>
          <Typography variant="h6" color="textSecondary" >
            No message Found
          </Typography>
        </div>
      )}
      
    </section>
  );
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, null)(Messages);

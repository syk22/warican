import React from "react";
import CheckIcon from "@material-ui/icons/Check";
import ToggleButton from "@material-ui/lab/ToggleButton";
import "../styles/GroupList.css";

////////// S add start //////////
import { Typography, makeStyles, Box, Paper, createMuiTheme } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#F1F0F2',
        light: '#F2B705',
        dark: '#F20530',
      },
      secondary: {
        light: '#F23D6D',
        main: '#F20530',
        // dark: will be calculated from palette.secondary.main,
        contrastText: '#ffcc00',
      },
    },
      typography: {
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
    },
  });

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(5),
      margin: 'auto',
      maxWidth: 200,
    },
    paper: {
      padding: theme.spacing(2),
      marginLeft: 'auto',
      marginRight: 'auto',
      marginBottom: '2px',
      maxWidth: 200,
    },
  }));
  
  ////////// S add end //////////


  const element = React.createElement(
    'h1',
    {className: 'greeting'},
    'Hello React.'
  );
  const avatarImg = [
    "/static/images/avatar/eliot.png",
    "/static/images/avatar/naoto.png",
    "/static/images/avatar/misho.png",
    "/static/images/avatar/sayaka.png",
    "/static/images/avatar/kaisei.png"
  ];



export default function GroupList(props) {
  const classes = useStyles();
  // console.log(props.list);
  // const [ selected, setSelected ] = useState(false);
  return (
    <>
    <h1 className="setting" >Group Setting</h1>
    <div className={classes.paper}>
      {props.list.map((friend,i) => (
      <Paper className={classes.paper} key={i}>
        <Grid container spacing={2}>
          <Grid item>
              <Avatar alt={friend.user_name} src={avatarImg[i]} /> 
          </Grid>
          <Grid item xs>
            <Typography gutterBottom variant="subtitle1">
              {friend.user_name}
              {console.log(avatarImg[i])}
            </Typography>
          </Grid>
          <Grid>
            <Checkbox
              color="secondary"
              selected={friend.selected}
              onChange={()=>{
                console.log(friend.selected, i);
                let newList = props.list;
                newList[i].selected=!props.list[i].selected;
                props.setList(newList);
                props.setMember(props.list.filter(friend => friend.selected===true).length)
              }}
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
          </Grid>
        </Grid>
      </Paper>))}
    </div>

    <div>{`Number of members is ${props.member}`}</div> 
    <Button
      variant="contained"
      size="large"
      color="secondary"
      disabled={props.member === 0} 
        onClick={()=>{
            props.setView("Payment");
        }}
    >
        confirm
      </Button>
    {/* <Button type="button" 
        className="confirm" 
        disabled={props.member === 0} 
        onClick={()=>{
            props.setView("Payment");
        }}>confirm</Button> */}
        </>
  );
}

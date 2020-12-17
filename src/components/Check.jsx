import React from "react";
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

  const avatarImg = [
    "/static/images/avatar/eliot.png",
    "/static/images/avatar/naoto.png",
    "/static/images/avatar/misho.png",
    "/static/images/avatar/sayaka.png",
    "/static/images/avatar/kaisei.png"
  ];


export default function Check(props){
    const classes = useStyles();
    // const presentMembers = 
    //  props.list.filter(friend=>{ 
    // return friend.selected===true}).map(friend=>{
    // return <div>{friend.user_name}</div>})    
    const presentMembers = 
     props.list.filter(friend => {
        return friend.selected===true}).map(friend=>{
        return friend.user_name});    
    
    console.log(presentMembers);
    return (
        <>
        {presentMembers.map((friend,i) => (
      <Paper className={classes.paper} key={i}>
        <Grid container spacing={2}>
          <Grid item>
              <Avatar alt={friend} src={avatarImg[i]}  className={classes.small} /> 
          </Grid>
          <Grid item xs>
            <Typography gutterBottom variant="subtitle1">
              {friend}
            </Typography>
          </Grid>
        </Grid>
      </Paper>))}
        </>

    );
}

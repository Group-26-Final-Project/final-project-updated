import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardMedia, Typography, CardActions, makeStyles, alpha, CardContent } from '@material-ui/core';
import { CardActionArea, Grid, Button } from '@material-ui/core';
import { Favorite, FavoriteOutlined } from '@material-ui/icons';
import { voteIdea } from '../features/ideasSlice';


function IdeaDetails(props) {
    const dispatch = useDispatch()
    const authState = useSelector((state) => state.authState)
    const ideaState = useSelector((state) => state.ideaState)

    const classes = useStyles();
    
    const clickHandler = () => {
        if (!ideaState.closed){
            dispatch(voteIdea(props.id))
        }
    }
    
    return (
        <Grid item xs={12} data-cy="idea-card">
            <Grid container direction='column' alignContent='space-between' alignItems='center' spacing={3} >
                {/* <Grid item xs={12}> */}
                <Card className={classes.root} >
                    <CardActionArea >
                        <CardMedia
                            className={classes.media}
                            image="/static/images/cards/contemplative-reptile.jpg"
                            title="Contemplative Reptile"
                        />
                        <CardContent>
                            <Typography data-cy="idea-suggester" variant='subtitle1'>{props.userName}</Typography>
                            <Typography data-cy="idea-title" gutterBottom variant="h5" component="h2">
                                {props.title}
                            </Typography>
                            <Typography data-cy="idea-desc" variant="body2" color="textSecondary" component="p">
                                {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ligula platea euismod.
                                    Rutrum ut erat aenean faucibus orci posuere sed lectus. Massa urna nulla ornare vulputate ut dignissim.
                                Ornare sapien sit at porttitor adipiscing imperdiet sed integer semper. */}
                                {props.description}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Grid container justifyContent='flex-end'>
                            <Button
                                aria-label="reduce"
                                data-cy="idea-like"
                                onClick={async ()=>await clickHandler()}
                            >
                                {props.liked ? <Favorite data-cy="idea-like-filled" className={classes.selected} /> : <FavoriteOutlined data-cy="idea-like-outlined" className={classes.icons} />}
                            </Button>
                            <Typography data-cy="idea-count" variant='subtitle1' className={classes.voteCount}>{props.likeCount}</Typography>
                        </Grid>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>
    )
}

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 150,
        maxWidth: 300,
    },
    root: {
        flexGrow: 1,
        width: '50vw',
        [theme.breakpoints.down('md')]: {
            width: '70vw',

        },
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    body: {
        // padding: theme.spacing(4),
        // backgroundColor: "#2F313D",
        height: "100vh"
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },

    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
    icons: {
        alignItems: 'center',
        marginHorizontal: 15,
        fontSize: 28,
        color: 'rgba(35, 35, 35, 0.5)',
    },
    selected: {
        alignItems: 'center',
        marginHorizontal: 15,
        fontSize: 28,
        color: 'red',
    },
    voteCount: {
        fontSize: 16,
        // fontFamily: 'poppinsRegular', 
        color: 'rgba(35, 35, 35, 0.5)'
    }
}));

export default IdeaDetails
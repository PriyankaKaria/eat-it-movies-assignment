import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import { URL_IMAGE } from "../constants"

const useStyles = makeStyles({
    root: {
        display: "flex",
        height: 350,
        margin: 12
    },
    media: {
        width: "40%"
    },
});

const MovieCard = ({ movie }) => {
    const classes = useStyles();
    return (
        <Grid item xs={12} md={6}>
            <Link to={`/movie/${movie.id}`}>
                <Card className={classes.root}>
                    <img
                        className={classes.media}
                        src={`${URL_IMAGE}${movie.poster_path}`}
                        alt={movie.title}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {movie.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {movie.overview}
                        </Typography>
                    </CardContent>
                </Card>
            </Link>
        </Grid>
    )
};

export default MovieCard;
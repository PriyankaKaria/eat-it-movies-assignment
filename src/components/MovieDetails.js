import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { URL_DETAIL, API_KEY_PARAM, URL_IMAGE } from "../constants"
import { Grid } from "@material-ui/core";
import CircularProgress from '@material-ui/core/CircularProgress'
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import StarIcon from '@material-ui/icons/Star';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ScheduleRoundedIcon from '@material-ui/icons/ScheduleRounded';
import Modal from '@material-ui/core/Modal';

const styles = {
    label: {
        color: "teal"
    },
    container: {
        paddingTop: "1%"
    }
};

class MovieDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movieDetail: null
        };
    }
    componentDidMount() {
        const { id } = this.props.match.params;

        axios.get(`${URL_DETAIL}${id}${API_KEY_PARAM}&language=en-US&page=1`)
            .then(response => {
                console.log(response.data)
                this.setState({ movieDetail: response.data });
            });

    }

    render() {
        const { classes } = this.props;
        const { movieDetail, open } = this.state;
        if (!movieDetail) {
            return (
                <Grid container alignItems="center" justify="center" style={{ height: '100vh' }}>
                    <CircularProgress />
                </Grid>
            );
        }

        return (
            <Grid container className={classes.container}>
                <Grid item xs={12} sm={12} md={6}>
                    <img src={`${URL_IMAGE}${movieDetail.poster_path}`} />
                </Grid>
                <Grid item xs={12} sm={12} md={6} style={{ padding: "2%" }}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography gutterBottom variant="h3" component="h3">
                                {movieDetail.original_title}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container>
                                <Grid item xs={3}>
                                    <StarIcon className={classes.label} />
                                    <Typography variant="body1" component="span">
                                    <sup><big> <b>    {movieDetail.vote_average} </b></big></sup> 
                                    </Typography>
                                </Grid>
                                <Grid item xs={3} >
                                    <FavoriteIcon className={classes.label} />
                                    <Typography variant="body1" component="span">
                                    <sup><big> <b> {movieDetail.vote_count} </b></big></sup> 
                                    </Typography>
                                </Grid>
                                <Grid item xs={3}>
                                <ScheduleRoundedIcon className={classes.label} />
                                <Typography variant="span" component="span">
                                      <sup><big> <b>  {movieDetail.runtime} Mins </b></big></sup> 
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} style={{ marginTop: 15 }}>
                            <Typography gutterBottom variant="subtitle1" component="span">
                                {movieDetail.tagline}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} style={{ marginTop: 15 }}>
                            <Typography gutterBottom variant="subtitle1" component="span">
                                {movieDetail.overview}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} style={{ marginTop: 20 }}>
                            <Grid container>
                                <Grid item xs={6}>
                                    <Typography gutterBottom variant="body1" component="h4" className={classes.label}>
                                      <b>  Relesase Date: </b>
                                    </Typography>
                                    <Typography gutterBottom variant="p" component="p">
                                    <b> {movieDetail.release_date} </b> 
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography gutterBottom variant="body1" component="h4" className={classes.label}>
                                    <b>  Status: </b>
                                    </Typography>
                                    <Typography gutterBottom variant="p" component="p">
                                    <b>  {movieDetail.status} </b>
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography gutterBottom variant="body1" component="h4" className={classes.label}>
                                    <b>  Budget: </b>
                                    </Typography>
                                    <Typography gutterBottom variant="p" component="p" >
                                    <b>    {movieDetail.budget} </b>
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography gutterBottom variant="body1" component="h4" className={classes.label}>
                                    <b>  Revenue: </b>
                                    </Typography>
                                    <Typography gutterBottom variant="p" component="p">
                                    <b>   {movieDetail.revenue} </b>
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(styles)(withRouter(MovieDetails));
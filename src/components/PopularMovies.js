import React from "react";
import axios from "axios";
import { URL_DETAIL, API_KEY_PARAM } from "../constants"
import MovieCard from "./MovieCard";
import { Grid } from "@material-ui/core";

class PopularMovies extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            results: []
        };
    }
    componentDidMount() {
        axios.get(`${URL_DETAIL}popular${API_KEY_PARAM}&language=en-US&page=1`)
            .then((response) => {
                console.log(response.data.results)
                this.setState({ results: response.data.results });
            });
    }

    render() {
      const movies = this.state.results.map((movie) => {
        return <MovieCard key={movie.id} movie={movie} />
      });
      return (
        <Grid container>
          {movies}
        </Grid>
      );
    }
}

export default PopularMovies;
import React from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { Link } from 'react-router-dom';
import Autosuggest from 'react-autosuggest';
import axios from 'axios';
import { URL_SEARCH, IMG_SIZE_XSMALL, API_KEY } from "../constants"

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
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
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
})
);


const getSuggestionValue = suggestion => {
    const newsuggest = suggestion.title
    return newsuggest;
};

const renderSuggestion = (suggestion) => (
    <div>
        <Link to={`/movie/${suggestion.id}`}>
            <img className="searchResult-image" alt={`Poster Path ${suggestion.title}`} src={suggestion.poster_path === null ? null : (IMG_SIZE_XSMALL + suggestion.poster_path)} />
            <div className="searchResult-text">
                <div className="searchResult-name">
                    {suggestion.title}
                </div>
                <div className="searchResult-date">
                    {suggestion.release_date?.trim(0, 4)}
                </div>
            </div>
        </Link>
    </div>
);


const Header = () => {
    const classes = useStyles();
    const [suggestions, setSuggestions] = React.useState([]);
    const [searchValue, setSearchValue] = React.useState("");
    const onChange = (event, { newValue }) => {
        setSearchValue(newValue)
    }

    const inputProps = {
        placeholder: 'Type a programming language',
        value: searchValue,
        onChange
    };

    const onSuggestionsFetchRequested = ({ value }) => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;

        const url = URL_SEARCH + inputValue + "&" + API_KEY;

        /* eslint-disable no-console */

        return inputLength === 0 ? [] : axios.get(url).then(response => {
            setSuggestions(response.data.results)
        }).catch(error => { console.log(`Error Message ${error}`) });

    }

    const onSuggestionsClearRequested = () => {
        setSuggestions([])
    }

    const renderInputComponent = inputProps => (
        <div className={classes.search}>
            <div className={classes.searchIcon}>
                <SearchIcon />
            </div>
            <InputBase
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search', ...inputProps }}
            />
        </div>
    );

    return (
        <AppBar position="fixed">
            <Toolbar>
                <Link to="/" style={{ color: "white" }}>
                    <Typography variant="h6" className={classes.title}>
                        Filmopedia
                    </Typography>
                </Link>
                <Autosuggest
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={onSuggestionsClearRequested}
                    getSuggestionValue={getSuggestionValue}
                    renderSuggestion={renderSuggestion}
                    inputProps={inputProps}
                    renderInputComponent={renderInputComponent}
                    alwaysRenderSuggestions
                    theme={{
                        suggestionsContainer: {
                            position: "absolute",
                            background: "teal",
                            width: 300
                        },
                        suggestionsList: {
                            listStyle: "none",
                            margin: 0,
                            padding: 0
                        },
                        suggestion: {
                            cursor: "pointer",
                            padding: "10px 20px"
                        }
                    }}
                />
            </Toolbar>
        </AppBar>
    )
}

export default Header;
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import MovieDetails from "./components/MovieDetails";
import PopularMovies from './components/PopularMovies';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div style={{ padding: "0 5%" }}>
        <Header />
        <div style={{ marginTop: 85}}>
          <Switch>
            <Route path="/" exact>
              <PopularMovies />
            </Route>
            <Route path="/movie/:id">
              <MovieDetails />
            </Route>
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

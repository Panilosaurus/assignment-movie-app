import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MovieCard } from "./components/MovieCard";
import { Navbar } from "./components/Navbar";
import styles from "./App.module.css";

// NOTES: Dapatkan API_KEY kalian dari IMDP api dengan cara registrasi.
const API_KEY = "a07c32a5";

const API_RESPONSE_STATUSES = {
  TRUE: "true",
  FALSE: "false",
};

function App() {
  const [searchMoviesKeyword, setSearchMoviesKeyword] = useState("man");
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies);

  const fetchMovies = async () => {
    try {
      const apiURL = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchMoviesKeyword}`;
      const response = await fetch(apiURL);
      const respJSON = await response.json();

      if (
        !response.ok ||
        (respJSON.Response && respJSON.Response.toLowerCase() === API_RESPONSE_STATUSES.FALSE)

      ) {
        throw respJSON;
      }

      const result = [];

      respJSON.Search.forEach((movie) => {
        result.push({
          title: movie.Title,
          poster: movie.Poster
        })
      });
      // NOTES: Data yang didapatkan dari IMDB api, harus diolah terlebih dahulu, dan dimasukkan ke dalam variable constanta "result".
      // Setelah diolah, maka kita perlu memasukkan data olahan tersebut yang telah disimpan ke dalam "result", ke "movieReducer" melalui function "dispatch".
      // Temukan bagaimana caranya. Reducer telah disediakan di dalam folder /store/reducers.

      dispatch({
        type: "INSERT_MOVIES",
        movies: result
      })

    } catch (err) {
      console.error("[fetchMovies]:", err);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  // NOTES: Cari tahu bagaimana cara mengirimkan props-props yang diperlukan untuk Navbar dan Movie components.
  // Cari tahu juga cara menampilkan data-data movies yang telah didapatkan dari IMDB api.
  return (
    <main className={styles.main}>
      <Navbar
        onChange={(value) => {
          setSearchMoviesKeyword(value)
        }}

        onClick={() => {
          fetchMovies()
        }}
      />
      <h2 className={styles.title}>Show your favorite movies</h2>
      <section className={styles.container}>
        <section className={styles.movieListContainer}>
          {
            movies.map((movie, index) => {
              return (
                <MovieCard
                  key={`${movie.poster}-${index}`}
                  title={movie.title}
                  poster={movie.poster}
                />
              )
            })
          }
        </section>
      </section>
    </main>
  );
}

export default App;

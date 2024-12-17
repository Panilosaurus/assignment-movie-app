const moviesState = {
  movies: [],
};

const moviesReducer = (state = moviesState, action) => {
  switch (action.type) {
    case "INSERT_MOVIES":
      const movies = [...action.movies];
      return {
        ...state,
        movies: movies,
      };
    default:
      return state;
  }
};

export { moviesReducer };

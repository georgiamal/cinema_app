export function cleanMovieData(data) {
    return data.map((movie) => {
        const cleanedMovie = { ...movie };

        if (Array.isArray(movie.genres)) {
            cleanedMovie.genres = movie.genres.filter(
                (genre) => typeof genre === "object" && genre !== null,
            );
        } else {
            cleanedMovie.genres = null;
        }

        return cleanedMovie;
    });
}

import React, { Component } from "react";
import Movie from "../components/Movie";
export default function Movies(props) {
  const { movies } = props;
  return (
    <div className="Movies">
      {movies.map((movie) => (
        <Movie key={movie.imdbID} {...movie} />
      ))}
    </div>
  );
}

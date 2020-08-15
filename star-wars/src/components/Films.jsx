import React, { useEffect, useState } from "react";

const Films = () => {
  const [endP, setEndP] = useState("https://swapi.dev/api/films/");
  const [films, setFilms] = useState(null);
  const [characters, setCharacters] = useState(null);

  function fetchEndP(endP) {
    fetch(endP)
      .then((e) => e.json())
      .then((data) => setFilms(data.results));
  }
  useEffect(() => {
    fetchEndP(endP);
  }, [endP]);
  return <>{films && films.map((film) => <h1>{film.title}</h1>)}</>;
};

export default Films;

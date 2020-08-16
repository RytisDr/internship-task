import React, { useEffect, useState } from "react";
import { useParams, Link, Redirect } from "react-router-dom";
const CharacterPage = () => {
  const [character, setCharacter] = useState(null);
  const [films, setFilms] = useState(null);
  const { id } = useParams();
  const filmsArray = [];

  const fetchCharacterinfo = () => {
    /*     if (!id) {
      <Redirect to="/" />;
    } */
    fetch(`https://swapi.dev/api/people/${id}/`)
      .then((e) => e.json())
      .then((data) => {
        setCharacter(data);
        data.films.forEach((film) => {
          fetchFilm(film);
        });
      });
  };
  const fetchFilm = (endP) => {
    fetch(endP)
      .then((e) => e.json())
      .then((data) => {
        filmsArray.push(data);
      });
    setFilms(filmsArray);
  };
  useEffect(() => {
    fetchCharacterinfo();
  }, []);
  return (
    <>
      <Link to={"/"}>Back</Link>
      {character && (
        <div className="characterInfo">
          <h1>{character.name}</h1>
          <h2>Height: {character.height} cm</h2>
          <h2>Mass: {character.mass} kg</h2>
          <h2>Eye color: {character.eye_color}</h2>
          {films && console.log(films)}
        </div>
      )}
    </>
  );
};

export default CharacterPage;

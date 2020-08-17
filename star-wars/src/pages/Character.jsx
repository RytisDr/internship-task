import React, { useEffect, useState } from "react";
import { useParams, Link, Redirect } from "react-router-dom";
const CharacterPage = () => {
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const filmsArray = [];
  const fetchCharacterinfo = () => {
    setLoading(true);
    fetch(`https://swapi.dev/api/people/${id}/`)
      .then((e) => e.json())
      .then((character) => {
        fetchFilms(character);
      });

    const fetchFilms = (character) => {
      const promise = new Promise((resolve, reject) => {
        character.films.forEach((film, index, array) => {
          fetch(film)
            .then((e) => e.json())
            .then((film) => {
              filmsArray.push(film.title);
              if (index === array.length - 1) resolve();
            });
        });
      });
      promise.then(() => {
        character.films = filmsArray;
        setCharacter(character);
      });
    };
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
          {character.films.map((film) => (
            <h2>{film}</h2>
          ))}
        </div>
      )}
    </>
  );
};

export default CharacterPage;

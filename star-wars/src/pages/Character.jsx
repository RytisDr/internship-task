import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
const CharacterPage = () => {
  const [character, setCharacter] = useState(null);
  //id from url
  const { id } = useParams();
  const filmsArray = [];
  const fetchCharacterinfo = () => {
    fetch(`https://swapi.dev/api/people/${id}/`)
      .then((e) => e.json())
      .then((character) => {
        fetchFilms(character);
      });

    const fetchFilms = (character) => {
      // Promise to make sure that state is only changed when the array is finished in forEach, resolved.
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
      //As soon as promise is resolved (array filled), the films are applied and state is changed.
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
          <h2>Is in:</h2>
          {character.films.map((film) => (
            <p key={film}>{film}</p>
          ))}
        </div>
      )}
    </>
  );
};

export default CharacterPage;

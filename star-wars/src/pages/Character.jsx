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
      character.films.forEach((film) => {
        fetch(film)
          .then((e) => e.json())
          .then((film) => {
            filmsArray.push(film.title);
          })
          .then(() => {
            character.films = filmsArray;
            setTimeout(() => {
              setCharacter(character);
            }, 1000);
          });
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
          {character.films.map((e) => (
            <h2>{e}</h2>
          ))}
          <h2>{console.log(character.films)}</h2>
        </div>
      )}
    </>
  );
};

export default CharacterPage;

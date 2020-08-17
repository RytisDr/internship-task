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

      /*
        I just created a "fetchFilm2"

        The one you made with the promise has some issues if there is a slow loop first, and then a quicker loop.
        The problem is that they could run at the same time, wich would damage this part:
        if (index === array.length - 1) resolve();

        What i did instead was to have a simple for loop and then const a rest that uses "awaits" when fetching instead of
        the "promise" you used.

        This dosent really make it cleaner, but its a bit simpler and runs async that will fix most problems.

        Then also one quick note. In the example here i define the array insid the "fetchFilm2".

        It's kinda optional if you define those things at the beginning or when they are used.
        Sometimes in long scrips, it can be pretty hard to find the definition when its at the top
        and you are like 2.000 lines down.
      */

      const fetchFilms2 = async (character) => {
        const filmsArray = [];
        for(let film of character.films){
          const res = await fetch(film);
          const data = res.json();
          filmsArray.push(film.title);
        }
        character.films = filmsArray;
        setCharacter(character);

      }

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
      <Link id="back" to={"/"}>
        Back
      </Link>
      {character && (
        <div className="characterInfo">
          <h1>{character.name}</h1>
          <h2>Height: {character.height} cm</h2>
          <h2>Mass: {character.mass} kg</h2>
          <h2>Eye color: {character.eye_color}</h2>
          <h2>Is in:</h2>
          <ul>
            {character.films.map((film) => (
              <li key={film}>{film}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default CharacterPage;

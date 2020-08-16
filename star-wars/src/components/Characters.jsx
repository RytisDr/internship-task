import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Films = () => {
  const [endP, setEndP] = useState("https://swapi.dev/api/people/");
  const [characters, setCharacters] = useState(null);
  const [searchQ, setSearchQ] = useState(null);
  const [searchError, setSearchError] = useState(null);

  const fetchEndP = (endP) => {
    fetch(endP)
      .then((e) => e.json())
      .then((data) => {
        if (data.count) {
          setCharacters(data.results);
          setSearchError(null);
        } else {
          setCharacters(null);
          setSearchError("Not Found, Try Again.");
        }
      })
      .then();
  };
  const search = (e) => {
    e.preventDefault();
    setEndP(`https://swapi.dev/api/people/?search=${searchQ}`);
  };
  useEffect(() => {
    fetchEndP(endP);
  }, [endP]);
  return (
    <>
      <h1>Search for a Character</h1>
      <form action="">
        <input
          className="textInput"
          type="text"
          onChange={(e) => setSearchQ(e.target.value)}
        />
        <button type="submit" className="submitBtn" onClick={(e) => search(e)}>
          Search
        </button>
      </form>
      {characters &&
        characters.map((character) => (
          <Link
            key={character.name}
            to={`character/${character.url.replace(/^\D+/g, "")}`}
          >
            <div className="character">
              <h1>{character.name}</h1>
            </div>
          </Link>
        ))}

      {searchError && <h2>{searchError}</h2>}
    </>
  );
};

export default Films;

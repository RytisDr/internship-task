import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Films = () => {
  //Endpoint is in the state to re-use the fetch function.
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
      <h1 id="mainHeading">Character Handbook</h1>
      <h2 id="searchH2">Search for a Character</h2>
      <form action="">
        <input
          className="textInput"
          type="text"
          placeholder="..."
          onChange={(e) => setSearchQ(e.target.value)}
        />
        <button type="submit" className="submitBtn" onClick={(e) => search(e)}>
          Search
        </button>
      </form>
      <div className="results">
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
      </div>

      {searchError && <h2>{searchError}</h2>}
    </>
  );
};

export default Films;

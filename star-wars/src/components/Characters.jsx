import React, { useState } from "react";

const Films = () => {
  //const [endP, setEndP] = useState("https://swapi.dev/api/people/");
  const [films, setFilms] = useState(null);
  const [characters, setCharacters] = useState(null);
  const [searchQ, setSearchQ] = useState(null);
  const [searchError, setSearchError] = useState(null);

  const fetchEndP = (endP) => {
    fetch(endP)
      .then((e) => e.json())
      .then((data) => {
        if (data) {
          setCharacters(data.results);
          console.log(data.results);
          setSearchError(null);
        } else {
          ///Fix this
          setSearchError("Not Found, Try Again.");
        }
      });
  };
  const search = (e) => {
    e.preventDefault();
    fetchEndP(`https://swapi.dev/api/people/?search=${searchQ}`);
  };
  /*   useEffect(() => {
    fetchEndP(endP);
  }, []); */
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
          <div className="character" key={character.name}>
            <h1>{character.name}</h1>
          </div>
        ))}
      {searchError && <h2>{searchError}</h2>}
    </>
  );
};

export default Films;

import React, { useEffect } from "react";
import { useState } from "react";
import "./Home.css";
import Loader from "../../components/Loader/Loader";

const Home = () => {
  // state to store the user input for the prompt
  const [prompt, setPrompt] = useState<string>("");
  // state to store the user input for the sequence length
  const [seqLen, setSeqLen] = useState<number>(10);

  // state to store the error message
  const [error, setError] = useState("");
  // state to store the loading state
  const [loading, setLoading] = useState(false);
  // state to store the result
  const [result, setResult] = useState<string | null>(null);

  // Joins the array of strings with proper spacing
  const smartJoin = (arr: string[]) => {
    return arr.reduce((acc, word, index, array) => {
      if ([".", "!", "?", ";", ",", "(", ")"].includes(word)) {
        return acc + word; // No space before punctuation
      } else if (["'", '"'].includes(word)) {
        return acc + word; // No space before quotes
      } else if (index > 0 && ["'", '"'].includes(array[index - 1])) {
        return acc + word; // No space after quotes
      } else if (index === 0) {
        return word; // First word, no space needed
      } else {
        return acc + " " + word; // Normal word with space
      }
    }, "");
  };

  // Function validates input and fetch the data from the server and update the state
  const handleSearch = async () => {
    setError("");
    setResult(null);
    setLoading(true);

    if (prompt === "" || prompt === null) {
      setError("Please enter a query");
      setLoading(false);
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:5000/predict?prompt=${
          prompt.trim() + " "
        }&seqlen=${seqLen}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        const res = await response.json();
        if (res.error) {
          setError(res.error);
        } else {
          setResult(smartJoin(res.genText));
        }
      }
    } catch (error) {
      if (error) console.error("Error:", error);
      setError("Something went wrong. Please try again later.");
    }
    setLoading(false);
  };

  return (
    <>
      {loading && (
        <div
          className="home-loader"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
        >
          <Loader />
        </div>
      )}
      <div className="home">
        <h1 className="home-heading">Welcome to Textpectations! 📜</h1>
        <div className="home-search-container">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Insert phrase to generate succeeding text..."
            className="home-search-input"
            required
          />
          <input
            type="number"
            value={seqLen}
            onChange={(e) =>
              setSeqLen(
                e.target.value ? (e.target.value as unknown as number) : 0
              )
            }
            min="0"
            step="1"
            className="home-search-input-seqlen"
            required
          />
          <button className="button" onClick={handleSearch}>
            Search
          </button>
        </div>
        {error && <div className="home-search-error">* {error}</div>}
        {result && (
          <div className="home-results-container">
            <div className="home-search-results">
              <h2 style={{ textAlign: "left" }}>{result}</h2>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;

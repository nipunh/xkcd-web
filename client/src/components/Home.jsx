import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';


const Home = () => {
  const [comic, setComic] = useState(null);
  const [latestComicNum, setLatestComicNum] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComic = async () => {
      console.log("other useEffet")
      const comicId = 'latest';
      try {
        setLoading(true);
        let API = `/api/comic/${comicId}`;
        // Fetch the latest comic if not already stored
        const latestResponse = await axios.get(API);
        setLatestComicNum(latestResponse.data.num);
        setComic(latestResponse.data);// Set latest comic number
        setError(false);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchComic();
  }, [])

  useEffect(() => {
    const fetchComic = async () => {
      console.log("Id usefeect")
      const comicId = id;
      try {
        setLoading(true);
        let API = `/api/comic/${comicId}`;
        // Fetch the specific comic
        const response = await axios.get(API);
        setComic(response.data);
        setError(false);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    if(id !== null && id !== undefined){
      fetchComic();
    }
    
  }, [id]);

  // Navigate to the previous comic
  const handlePrevious = () => {
    if (comic && comic.num > 1) navigate(`/${comic.num - 1}`);
  };

  // Navigate to the next comic
  const handleNext = () => {
    if (comic && comic.num < latestComicNum) navigate(`/${comic.num + 1}`);
  };

  // Navigate to the first comic
  const handleJumpToFirst = () => {
    navigate(`/1`);
  };

  // Navigate to the latest comic
  const handleJumpToLast = () => {
    navigate(`/${latestComicNum}`);
  };

  // Generate a random comic number between 1 and the latest comic number
  const handleRandomComic = () => {
    if (latestComicNum) {
      const randomComicNum = Math.floor(Math.random() * latestComicNum) + 1;
      navigate(`/${randomComicNum}`);
    }
  };

  // Sanitize transcript
  const parseTranscript = (transcript) => {
    if (!transcript || transcript.trim() === "") {
      return "No transcript available";
    }
    const lines = transcript.split('\n');

    // Process each line to handle different formats
    const parsedTranscript = lines.map((line) => {

      // Remove all types of brackets but keep text inside
      line = line.replace(/[[\]{}()<>]/g, '').trim();

      // Handle lines with colons for dialogue or labels
      if (line.includes(':')) {
        const [speaker, rest] = line.split(':');
        return `${speaker.trim()}: ${rest.trim()}`;
      }

      return line;
    });

    return parsedTranscript.join('\n');
  };

  return <div className="comic-container">
    {
      loading ? (
        <div className="loader"></div>
      ) : error ? (
        <div className="error-message">
          {error.message}
          <p>Generate a random strip</p>
          <div className="button-container">
            <button onClick={handleRandomComic}>Random</button>
          </div>
        </div> // Display error message
      ) : comic && (<>
        <h1>{comic.title}</h1>
        <div className="comic-info">
          <p className="comic-tag">Date: {comic.year}/{comic.month}/{comic.day}</p>
          <p className="comic-tag">View Count: {comic.viewCount ?? 1}</p>
        </div>
        <img loading="lazy" src={comic.img} alt={comic.alt} />
        <div className="transcript expanded">
          {parseTranscript(comic.transcript).split('\n').map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
        <div className="button-container">
          <button onClick={handleJumpToFirst}> &lt;&lt;Jump to First</button>
          <button onClick={handlePrevious} disabled={comic.num === 1}> &lt; Previous</button>
          <button onClick={handleRandomComic}>Random</button>
          <button onClick={handleNext} disabled={comic.num === latestComicNum}>Next &gt;</button>
          <button onClick={handleJumpToLast}>Jump to Last &gt;&gt;</button>
        </div>
      </>
      )}

  </div>
}

export default Home
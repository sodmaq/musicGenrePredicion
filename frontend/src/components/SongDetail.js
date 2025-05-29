import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import AudioPlayer from "react-h5-audio-player";

function SongDetail() {
  const location = useLocation();
  const { item } = location.state;
  const [detail, setDetail] = useState("");

  useEffect(() => {
    async function fetchDetail() {
      try {
        const nodeServer = process.env.REACT_APP_BACKEND_SERVER_URL;
        // const port = process.env.PORT || 5000

        // const response = await fetch(`${nodeServer}:${port}/songName`,{
        const response = await fetch(`${nodeServer}/songName`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            artistId: item.artists[0].id,
            trackId: item.id,
          }),
        });

        const gotdata = await response.json();
        console.log("Received from backend:", gotdata);

        setDetail(gotdata);
      } catch (error) {
        console.log("some Error happened : ", error);
      }
    }

    if (item) {
      fetchDetail();
    }
  }, [item]);

  const trueGenres = detail.T_genre;
  const predictedGenres = detail.P_genre;

  console.log("predicted gene is", predictedGenres);
  // const songUrl = `${item.preview_url}`

  return (
    <div className="justify-center text-center mx-auto w-60 my-8">
      <img alt="albumCover" src={item.album.images[0].url} />
      <p className="font-medium text-lg text-left">{item.name}</p>
      <p className="font-normal text-sm text-gray-600 text-left">
        {item.artists[0].name}
      </p>

      <div className="text-left">
        <p className="font-medium text-lg text-left">Predicted Genre: </p>
        {trueGenres && trueGenres.length > 0 && <span>{trueGenres[0]}</span>}
      </div>
    </div>
  );
}

export default SongDetail;

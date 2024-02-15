import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../pages/api/musicsAPI';
import Header from '../components/Header';
import DetailAlbum from '../components/DetailAlbum';
import Loading from '../components/Loading';
// import { addSong, getFavoriteSongs, removeSong } from '../pages/api/favoriteSongsAPI';

const Album = ({ id } : any) => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [album, setAlbum] = useState('');
  const [data, setData] = useState<any[]>([]);
  const [fav, setFav] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getMusics(id);
        const resultSongs = result.slice(1);
        const { artistName, collectionCensoredName } = result[1];
        setName(artistName);
        setAlbum(collectionCensoredName);
        setData(resultSongs);
      } catch (error) {
        console.log(error);
      }
      // valChecked();
    };

    fetchData();
    console.log(data)
    // Cleanup function
    return () => {
      // Cleanup code here, if necessary
    };
  }, [data, id]);

  // const handleChange = async ({ target: { value, checked } }) => {
  //   const music = data.find((e) => e.trackId === parseInt(value, 10));
  //   setLoading(true);
  //   if (checked) {
  //     await addSong(music);
  //   } else {
  //     await removeSong(music);
  //   }
  //   const favorite = await getFavoriteSongs();
  //   setFav(favorite);
  //   setLoading(false);
  // };

  // const valChecked = async () => {
  //   const favorite = await getFavoriteSongs();
  //   setFav(favorite);
  // };

  return (
    <div>
      <Header />
      { loading ? <Loading /> : (
        <div data-testid="page-album">
          <p>Album!</p>
          <h3 data-testid="artist-name">
            Artist Name:
            {' '}
            { name }
          </h3>
          <h2 data-testid="album-name">
            Collection Name:
            {' '}
            { album }
          </h2>
          {data.map((element, index) => (
            <div key={ index }>
              <DetailAlbum
                trackName={ element.trackName }
                previewUrl={ element.previewUrl }
                trackId={ element.trackId }
                checked={ fav !== null && fav.some((e: any) => e.trackId === element.trackId) }
                // handleChange={ handleChange }
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Album;
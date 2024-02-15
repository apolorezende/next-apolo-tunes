import React, { useState } from "react";
import Header from "../components/Header";
import Loading from "../components/Loading";
import searchAlbumsAPI from "./api/searchAlbumsAPI";
import AlbumData from "../interfece/Interface";
import MusicCard from "@/components/MusicCard";

function Search() {
  const [searchBtnD, setSearchBtnD] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [usedTerm, setUsedTerm] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [data, setData] = useState<AlbumData[]>([]);

  const valInputSearch = ({ target: { value } }: any) => {
    setInputValue(value);
    valInput(value);
  };

  const valInput = (value: any) => {
    const minInput = 2;
    setSearchBtnD(value.length < minInput);
  };

  const searchAlbums = async () => {
    setLoading(true);
    const result = await searchAlbumsAPI(inputValue);
    setInputValue("");
    setUsedTerm(inputValue);
    setData(result);
    setShowResults(true);
    setLoading(false);
  };

  return (
    <div className="h-screen">
      <Header />
      {loading ? (
        <Loading />
      ) : (
        <div>
          <div className="flex bg-slate-400 justify-center py-4">
            <form className="flex flex-col">
              <input onChange={valInputSearch} type="text" name="inputValue" value={inputValue} />
              <button type="button" disabled={searchBtnD} onClick={searchAlbums}>
                Pesquisar
              </button>
            </form>
          </div>
          {showResults && (
            <div className="text-center">
              <p>{`Resultado de álbuns de: ${usedTerm}`}</p>
              <div className="grid grid-cols-2">
                {data[0] ? (
                  data.map((element) => (
                    <div key={element.collectionId}>
                      <MusicCard
                        collectionId={element.collectionId}
                        collectionName={element.collectionName}
                        artworkUrl100={element.artworkUrl100}
                      />
                    </div>
                  ))
                ) : (
                  <div>
                    <p>Nenhum álbum foi encontrado</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Search;

import React, { useState } from "react";
import Link from "next/link";
import Header from "../components/Header";
import Loading from "../components/Loading";
import searchAlbumsAPI from "./api/searchAlbumsAPI";
import AlbumData from "../interfece/Interface";
import Image from "next/image";

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
    setLoading(false);
    setUsedTerm(inputValue);
    setData(result);
    setShowResults(true);
  };

  return (
    <div className="h-screen">
      <Header />
      {loading ? (
        <Loading />
      ) : (
        <div>
          <form>
            <input
              onChange={valInputSearch}
              type="text"
              data-testid="search-artist-input"
              name="inputValue"
              value={inputValue}
            />
            <button data-testid="search-artist-button" type="button" disabled={searchBtnD} onClick={searchAlbums}>
              Pesquisar
            </button>
          </form>
          {showResults && (
            <div>
              <p>{`Resultado de álbuns de: ${usedTerm}`}</p>
              <div className="grid grid-cols-2">
                {data[0] ? (
                  data.map((element) => (
                    <div key={element.collectionId}>
                      <Link href={`/album/${element.collectionId}`}>
                        <p>{element.collectionName}</p>
                        <Image src={element.artworkUrl100} alt={element.collectionName} width={100} height={100} />
                      </Link>
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

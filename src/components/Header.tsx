import React, { useState, useEffect } from "react";
import { getUser } from "../pages/api/FakeApiUser"; // Suponha que UserData seja uma interface que representa os dados do usuário
import Loading from "./Loading";

function Header() {
  const [loadingHeader, setLoadingHeader] = useState(true);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    async function getUserData() {
      const result = await getUser();
      if (isValidUserData(result)) {
        const { name } = result;
        setUserName(name);
        setLoadingHeader(false);
      } else {
        console.error("Dados do usuário inválidos");
        setLoadingHeader(false); // Tratar o erro aqui de acordo com sua lógica
      }
    }

    getUserData();
  }, []);

  // Função para verificar se os dados do usuário são válidos
  function isValidUserData(data: any): data is any {
    return typeof data === "object" && "name" in data;
  }

  return loadingHeader ? (
    <Loading />
  ) : (
    <div className="text-white flex py-4 bg-slate-500">
      <div className="">
        <p>Olá {userName}!</p>
      </div>
      <nav className="ml-auto flex flex-row gap-4 pr-4">
        <a className="" href="/search">Busca</a>
        <a href="/favorites">Favoritos</a>
        <a href="/profile">Perfil</a>
      </nav>
    </div>
  );
}

export default Header;

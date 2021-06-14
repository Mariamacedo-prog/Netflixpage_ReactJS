import React, { useEffect, useState } from "react";
import MovieRoll from "./components/MovieRoll";
import FeaturedMovie from "./components/FeaturedMovie";
import Header from "./components/Header";
import Tmdb from "./Tmdb";

import "./App.css";

function App() {
  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(() => {
    const loadAll = async () => {
      // Pegando a lista TOTAL DA API.
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      // Pegando o featured;
      let originals = list.filter((i) => i.slug === "originals");
      // Gerando uma imagem aleatória;
      let randomShosen = Math.floor(
        Math.random() * (originals[0].items.results.length - 1)
      );
      let chosen = originals[0].items.results[randomShosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, "tv");

      setFeaturedData(chosenInfo);
    };

    loadAll();
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    };

    window.addEventListener("scroll", scrollListener);

    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  }, []);

  return (
    <div className="page">
      <Header black={blackHeader} />
      {featuredData && <FeaturedMovie item={featuredData} />}

      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRoll key={key} title={item.title} items={item.items} />
        ))}
      </section>

      <footer>
        Direitos de imagem para Netflix <br />
        Dados pegos no site: themoviedb.org <br />
        <span role="img" aria-label="coração">
          💖
        </span>
      </footer>
      {movieList.length <= 0 && (
        <div className="loading">
          <img
            src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif"
            alt="carregando"
            style={{ width: 700 }}
          />
        </div>
      )}
      {featuredData == null && (
        <div className="loading">
          <img
            src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif"
            alt="carregando"
            style={{ width: 700 }}
          />
        </div>
      )}
    </div>
  );
}

export default App;

import React from "react";
import "./style.css";

export default ({ item }) => {
  console.log(item);
  // foi transformado em data e returnou somente o ano usando o getFullYear();
  let firstDate = new Date(item.first_air_date);

  //está adicionado ao array genres todos os nomes que estão no array do item.genres da API;
  let genres = [];
  for (let i in item.genres) {
    genres.push(item.genres[i].name);
  }

  let description = item.overview;
  if (description.length > 220) {
    description = description.substring(0, 220) + "...";
  }

  return (
    <section
      className="featured"
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`,
      }}
    >
      <div className="featured--vertical">
        <div className="featured--horizontal">
          <div className="featured--name">{item.original_name}</div>
          <div className="featured--info">
            <div className="featured--points">{item.vote_average} pontos</div>
            <div className="featured--year">{firstDate.getFullYear()}</div>
            <div className="featured--seasons">
              {item.number_of_seasons} temporada
              {item.number_of_seasons !== 1 ? "s" : ""}
            </div>
          </div>
          <div className="featured--description">{description}</div>
          <div className="featured--buttons">
            <a href={`/watch/${item.id}`} className="featured--watchbutton">
              {" "}
              ► Assistir{" "}
            </a>
            <a href={`/list/add/${item.id}`} className="featured--myListbutton">
              {" "}
              + Minha lista
            </a>
          </div>
          <div className="featured--genres">
            <strong>Gêneros:</strong> {genres.join(", ")}...
          </div>
        </div>
      </div>
    </section>
  );
};

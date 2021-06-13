import React from "react";
import "./style.css";

export default ({ black }) => {
  return (
    // Verifica se o state da barra de rolagem está ativo, se estiver ele fica preto;
    <header className={black ? "black" : ""}>
      <div className="header--logo">
        <a href="/">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
            alt="Logo netflix"
          />
        </a>
      </div>
      <div className="header--user">
        <a href="/">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            alt="usuario"
          />
        </a>
      </div>
    </header>
  );
};

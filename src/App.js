import "./App.css";
import React, { useState } from "react";
import TablaJugadores from "./components/tablaJugadores"; // Cambié la importación para que coincida con el nombre del archivo
import ProximasFechas from "./components/proximasFechas";
import { Database } from "./database";
import { Analytics } from "@vercel/analytics/react";

function App() {
  const [showRecentOrders, setShowRecentOrders] = useState(true);
  const [showAnotherDiv, setShowAnotherDiv] = useState(false);

  const toggleVisibility = (tab) => {
    if (tab === "tabla-jugadores") {
      setShowRecentOrders(true);
      setShowAnotherDiv(false);
    } else if (tab === "proximos-partidos") {
      setShowRecentOrders(false);
      setShowAnotherDiv(true);
    }
  };

  return (
    <div className="container">
      <div className="navigation">
        <ul>
          <li>
            <a href="#">
              <span className="icon">
                <ion-icon name="logo-apple"></ion-icon>
              </span>
              <span className="title">Tenis Puente SUR</span>{" "}
            </a>
          </li>

          <li>
            <a href="#">
              <span className="icon">
                <ion-icon name="home-outline"></ion-icon>
              </span>
              <span className="title">Dashboard</span>{" "}
            </a>
          </li>

          <li>
            <a href="#">
              <span className="icon">
                <ion-icon name="people-outline"></ion-icon>
              </span>
              <span className="title">Proximos Partidos</span>{" "}
            </a>
          </li>

          <li>
            <a href="#">
              <span className="icon">
                <ion-icon name="chatbubble-outline"></ion-icon>
              </span>
              <span className="title">Ranking</span>{" "}
            </a>
          </li>
        </ul>
      </div>
      <div className="main">
        <div className="topbar">
          <div className="toggle">
            <ion-icon name="menu-outline"></ion-icon>
          </div>
          <div className="user">
            <img src="logo.jpg" alt="" />
          </div>
        </div>
        <div className="cardBox">
          <div
            className="card tabla-jugadores"
            onClick={() => toggleVisibility("tabla-jugadores")}>
            <div>
              <div className="numbers">{Database[0].partidos.length}</div>
              <div className="cardName">Partidos Jugados</div>
            </div>
            <div className="iconBx">
              <ion-icon name="eye-outline"></ion-icon>
            </div>
          </div>
          <div
            className="card proximos-partidos"
            onClick={() => toggleVisibility("proximos-partidos")}>
            <div>
              <div className="cardName">Calendario</div>
            </div>
            <div className="iconBx">
              <ion-icon name="eye-outline"></ion-icon>
            </div>
          </div>
        </div>
        <div className="details">
          <div
            className="recentOrders"
            style={{ display: showRecentOrders ? "block" : "none" }}>
            <TablaJugadores
              jugadores={Database[0].jugadores}
              partidos={Database[0].partidos}
              fechasLibres={Database[0].fechasLibres}
            />
          </div>
          <div
            className="nextMatch"
            style={{ display: showAnotherDiv ? "block" : "none" }}>
            <ProximasFechas
              calendario={Database[0].calendario}
              jugadores={Database[0].jugadores}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

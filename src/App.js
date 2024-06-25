import "./App.css";
import React, { useState } from "react";
import TablaJugadores from "./components/tablaJugadores"; // Cambié la importación para que coincida con el nombre del archivo
import ProximasFechas from "./components/proximasFechas";
import { Database } from "./database";
import { Analytics } from "@vercel/analytics/react";

function App() {
  const [showRecentOrders, setShowRecentOrders] = useState(true);
  const [showAnotherDiv, setShowAnotherDiv] = useState(false);

  const jugadoresActivos = Database[0].jugadores.filter(
    (jugador) => jugador.isActivo
  );

  const partidosActivos = Database[0].partidos.filter(
    (partido) =>
      jugadoresActivos.some((jugador) => jugador.id === partido.jugador1_id) &&
      jugadoresActivos.some((jugador) => jugador.id === partido.jugador2_id)
  );

  // Obtener todas las combinaciones posibles de jugadores activos
  const combinaciones = [];
  for (let i = 0; i < jugadoresActivos.length; i++) {
    for (let j = i + 1; j < jugadoresActivos.length; j++) {
      combinaciones.push([jugadoresActivos[i].id, jugadoresActivos[j].id]);
    }
  }

  // Encontrar las combinaciones que no se han enfrentado sin repeticiones
  const noSeHanEnfrentado = [];
  combinaciones.forEach(([jugador1, jugador2]) => {
    const enfrentados = partidosActivos.some(
      (partido) =>
        (partido.jugador1_id === jugador1 &&
          partido.jugador2_id === jugador2) ||
        (partido.jugador1_id === jugador2 && partido.jugador2_id === jugador1)
    );
    if (!enfrentados) {
      // Verificar si ya se ha registrado la combinación o su inversa
      const existeInversa = noSeHanEnfrentado.some(
        ([jug1, jug2]) =>
          (jug1 === jugador1 && jug2 === jugador2) ||
          (jug1 === jugador2 && jug2 === jugador1)
      );
      if (!existeInversa) {
        noSeHanEnfrentado.push([jugador1, jugador2]);
      }
    }
  });

  // Mostrar los resultados ordenados
  noSeHanEnfrentado.forEach(([jugador1, jugador2]) => {
    // Encontrar los nombres de los jugadores
    const nombreJugador1 = jugadoresActivos.find(
      (jugador) => jugador.id === jugador1
    ).nombre;
    const nombreJugador2 = jugadoresActivos.find(
      (jugador) => jugador.id === jugador2
    ).nombre;

    // Determinar el orden ascendente por IDs
    const idJugador1 = Math.min(jugador1, jugador2);
    const idJugador2 = Math.max(jugador1, jugador2);

    console.log(
      `${nombreJugador1} (ID: ${idJugador1}) y ${nombreJugador2} (ID: ${idJugador2}) no se han enfrentado.`
    );
  });
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
              <div className="numbers">{partidosActivos.length}</div>
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
          <Analytics />
          <div
            className="nextMatch"
            style={{ display: showAnotherDiv ? "block" : "none" }}>
            <ProximasFechas
              calendario={Database[0].calendario}
              jugadores={Database[0].jugadores}
              fechasLibres={Database[0].fechasLibres}
              partidos={Database[0].partidos}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

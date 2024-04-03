import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBaseball } from "@fortawesome/free-solid-svg-icons";

function TablaJugadores(props) {
  const { jugadores, partidos } = props;

  return (
    <table>
      <thead>
        <tr>
          <td>Puesto</td>
          <td>Nombre</td>
          <td>Partidos</td>
          <td>PJ-PG-PP</td>
          <td>Puntos</td>
        </tr>
      </thead>

      <tbody>
        {jugadores.map((jugador, index) => {
          // Contar partidos ganados por el jugador
          const partidosGanados = partidos.filter(
            (partido) => partido.id_jugador_ganador === jugador.id
          ).length;

          const partidosPerdidos = partidos.filter(
            (partido) =>
              (partido.jugador1_id === jugador.id &&
                partido.id_jugador_ganador !== jugador.id) ||
              (partido.jugador2_id === jugador.id &&
                partido.id_jugador_ganador !== jugador.id)
          ).length;

          const puntos = partidosGanados * 7 + partidosPerdidos * 3;

          return (
            <tr key={jugador.id}>
              <td>{index + 1}</td>
              <td>{jugador.nombre}</td>
              <td>
                <div style={{ display: "flex" }}>
                  {[...Array(partidosGanados)].map((_, i) => (
                    <FontAwesomeIcon
                      key={i}
                      icon={faBaseball}
                      style={{ color: "green", marginRight: "3px" }}
                      className="fa-lg"
                    />
                  ))}
                  {[...Array(partidosPerdidos)].map((_, i) => (
                    <FontAwesomeIcon
                      key={partidosGanados + i}
                      icon={faBaseball}
                      style={{ color: "red", marginRight: "3px" }}
                      className="fa-lg"
                    />
                  ))}
                </div>
              </td>
              <td>
                <span className="status delivered">En contruccion</span>
              </td>
              <td>{puntos}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default TablaJugadores;

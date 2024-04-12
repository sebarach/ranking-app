import React, { useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBaseball } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useDownloadExcel } from "react-export-table-to-excel";

function TablaJugadores(props) {
  const tableRef = useRef(null);
  const { jugadores, partidos, fechasLibres } = props;

  const jugadoresOrdenados = jugadores.sort((a, b) => {
    const puntosA = calcularPuntosJugador(a, partidos);
    const puntosB = calcularPuntosJugador(b, partidos);

    if (puntosB !== puntosA) {
      return puntosB - puntosA;
    }

    const setsGanadosA = contarSetsGanados(a.id, partidos);
    const setsGanadosB = contarSetsGanados(b.id, partidos);

    if (setsGanadosB !== setsGanadosA) {
      return setsGanadosB - setsGanadosA;
    }

    const gamesGanadosA = contarJuegosGanados(a.id, partidos);
    const gamesGanadosB = contarJuegosGanados(b.id, partidos);
    return gamesGanadosB - gamesGanadosA;
  });

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: "Ranking puente ser",
    sheet: "Ranking",
  });

  return (
    <div>
      <button onClick={onDownload} className="custom-btn">
        {" "}
        Export excel{" "}
      </button>
      <table ref={tableRef} className="miTabla">
        <thead>
          <tr>
            <td>Ranking</td>
            <td>Nombre</td>
            <td>Partidos</td>
            <td>PJ-PG-PP</td>
            <td>Sets-Games</td>
            <td>Puntos</td>
            <td>Historial</td>
          </tr>
        </thead>

        <tbody>
          {jugadoresOrdenados.map((jugador, index) => {
            const partidosJugados = partidos.filter(
              (partido) =>
                partido.jugador1_id === jugador.id ||
                partido.jugador2_id === jugador.id
            ).length;

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

            const puntos = calcularPuntosJugador(jugador, partidos);
            const gamesGanados = contarJuegosGanados(jugador.id, partidos);
            const setsGanados = contarSetsGanados(jugador.id, partidos);

            return (
              <tr key={jugador.id}>
                <td style={{ fontSize: "30px", color: "orange" }}>
                  {index + 1}
                </td>
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
                  {partidosJugados}/{partidosGanados}/{partidosPerdidos}
                </td>
                <td>
                  {setsGanados}/{gamesGanados}
                </td>
                <td>{puntos}</td>
                <td className="td-Historial">
                  <button
                    class="custom-btn"
                    onClick={() =>
                      buscarPartidosPorJugador(
                        jugador.id,
                        partidos,
                        jugadores,
                        fechasLibres
                      )
                    }>
                    Ver
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function calcularPuntosJugador(jugador, partidos) {
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

  return partidosGanados * 7 + partidosPerdidos * 3;
}

function contarJuegosGanados(jugadorId, partidos) {
  let juegosGanados = 0;

  partidos.forEach((partido) => {
    const [juegosGanadosJugador1, juegosGanadosJugador2] = [
      Number(partido.juegosGanadosJugador1),
      Number(partido.juegosGanadosJugador2),
    ];

    if (partido.jugador1_id === jugadorId) {
      juegosGanados += juegosGanadosJugador1;
    } else if (partido.jugador2_id === jugadorId) {
      juegosGanados += juegosGanadosJugador2;
    }
  });

  return juegosGanados;
}

function contarSetsGanados(jugadorId, partidos) {
  let setsGanados = 0;

  partidos.forEach((partido) => {
    const [setGanadosJugador1, setGanadosJugador2] = [
      Number(partido.setGanadosJugador1),
      Number(partido.setGanadosJugador2),
    ];

    if (partido.jugador1_id === jugadorId) {
      setsGanados += setGanadosJugador1;
    } else if (partido.jugador2_id === jugadorId) {
      setsGanados += setGanadosJugador2;
    }
  });

  return setsGanados;
}

const MySwal = withReactContent(Swal);
const buscarPartidosPorJugador = (
  jugadorId,
  partidos,
  jugadores,
  fechasLibres
) => {
  const nombresJugadores = {};
  jugadores.forEach((jugador) => {
    nombresJugadores[jugador.id] = jugador.nombre;
  });

  // Filtrar solo las fechas libres del jugador específico
  const fechasLibresJugador = fechasLibres.filter(
    (fechaLibre) => fechaLibre.idJugador === jugadorId
  );

  const modalContent = (
    <div className="head-to-head-modal">
      {partidos
        .filter(
          (partido) =>
            partido.jugador1_id === jugadorId ||
            partido.jugador2_id === jugadorId
        )
        .sort((a, b) => new Date(a.fecha) - new Date(b.fecha))
        .map((partido, index) => (
          <div key={index} className="match">
            <div className="players">
              {nombresJugadores[partido.jugador1_id]} vs{" "}
              {nombresJugadores[partido.jugador2_id]}
            </div>
            <div>Fecha: {partido.fecha}</div>
            <div>Resultado: {partido.resultado}</div>
            <div>
              Ganador:{" "}
              {partido.id_jugador_ganador
                ? nombresJugadores[partido.id_jugador_ganador]
                : "Sin definir"}
            </div>
          </div>
        ))}
      {fechasLibresJugador.map((fechaLibre, index) => (
        <div key={`libre-${index}`} className="match libre">
          <div className="players">Fecha Libre</div>
          <div>Fecha: {fechaLibre.fecha}</div>
        </div>
      ))}
    </div>
  );

  showSwal(modalContent);
};

const showSwal = (modalContent) => {
  MySwal.fire({
    title: "Historial de Partidos",
    html: modalContent,
  });
};

export default TablaJugadores;

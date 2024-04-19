import React, { useState, useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";

function ProximasFechas({ calendario, jugadores, fechasLibres, partidos }) {
  // Estado para almacenar la fecha seleccionada
  const [selectedDate, setSelectedDate] = useState(null);
  // Estado para almacenar las fechas libres para la fecha seleccionada
  const [freeDates, setFreeDates] = useState([]);

  // Función para manejar el cambio de fecha seleccionada
  const handleDateChange = (event) => {
    const selectedDate = parseInt(event.target.value);
    setSelectedDate(selectedDate);
  };

  // Seleccionar automáticamente la última fecha al cargar el componente y calcular las fechas libres
  useEffect(() => {
    if (calendario.length > 0) {
      const lastDate = calendario[calendario.length - 1].idFecha;
      setSelectedDate(lastDate);
      const freeDatesForSelected = fechasLibres.filter(
        (fecha) => fecha.fecha === lastDate
      );
      setFreeDates(freeDatesForSelected);
    }
  }, [calendario, fechasLibres]);

  // Filtrar las fechas libres cada vez que cambia la fecha seleccionada
  useEffect(() => {
    if (selectedDate !== null) {
      const freeDatesForSelected = fechasLibres.filter(
        (fecha) => fecha.fecha === selectedDate
      );
      setFreeDates(freeDatesForSelected);
    }
  }, [selectedDate, fechasLibres]);

  return (
    <div className="proximas-fechas-container">
      <Analytics />
      <div className="combobox-container">
        <select
          className="custom-select"
          value={selectedDate || ""}
          onChange={handleDateChange}>
          <option value="" disabled hidden>
            Selecciona una Fecha
          </option>
          {calendario.map((fecha) => (
            <option key={fecha.idFecha} value={fecha.idFecha}>
              Fecha {fecha.idFecha}
            </option>
          ))}
        </select>
      </div>
      <div className="free-dates">
        {freeDates.length > 0 && (
          <div className="list-group">
            {freeDates.map((fechaLibre, index) => (
              <div key={index} className="list-group-item disabled">
                Jugador Libre:
                <span
                  style={{ color: "white", margin: "10px", fontSize: "30px" }}>
                  {jugadores.find(
                    (jugador) => jugador.id === fechaLibre.idJugador
                  )?.nombre || "Jugador no encontrado"}
                </span>{" "}
                <br /> <span style={{ color: "red" }}>PARTIDO PENDIENTE</span>{" "}
                -----
                <span style={{ color: "green" }}>PARTIDO JUGADO</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="partidos">
        {selectedDate &&
          calendario
            .find((fecha) => fecha.idFecha === selectedDate)
            ?.partidos.map((partido, index) => {
              const partidoJugado = partidos.find(
                (p) =>
                  (p.jugador1_id === partido.jugador1_id &&
                    p.jugador2_id === partido.jugador2_id) ||
                  (p.jugador1_id === partido.jugador2_id &&
                    p.jugador2_id === partido.jugador1_id)
              );

              // Verificar si el partido se ha jugado
              const jugado = partidoJugado && partidoJugado.resultado;

              // Determinar el color de fondo
              const backgroundColor = jugado ? "green" : "red";

              return (
                <div
                  key={index}
                  className="versus"
                  style={{ backgroundColor: backgroundColor }}>
                  <div className="player">
                    <div className="name">
                      {jugadores.find(
                        (jugador) => jugador.id === partido.jugador1_id
                      )?.nombre || "Jugador no encontrado"}
                    </div>
                  </div>
                  <div className="separator">VS</div>
                  <div className="player">
                    <div className="name">
                      {jugadores.find(
                        (jugador) => jugador.id === partido.jugador2_id
                      )?.nombre || "Jugador no encontrado"}
                    </div>
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
}

export default ProximasFechas;

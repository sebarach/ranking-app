import React, { useState } from "react";

function ProximasFechas({ calendario, jugadores }) {
  const [selectedDate, setSelectedDate] = useState(1); // Estado para almacenar la fecha seleccionada

  // Función para manejar el cambio de fecha seleccionada
  const handleDateChange = (event) => {
    setSelectedDate(parseInt(event.target.value));
  };

  return (
    <div>
      {/* Selector de fechas */}
      <div className="custom-combobox">
        <select
          className="custom-select"
          value={selectedDate}
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

      {/* Renderizar partidos según la fecha seleccionada */}
      <div className="partidos">
        {calendario
          .find((fecha) => fecha.idFecha === selectedDate)
          ?.partidos.map((partido, index) => (
            <div key={index} className="versus">
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
          ))}
      </div>
    </div>
  );
}

export default ProximasFechas;

import React, { useState, useEffect } from "react";

function ProximasFechas({ calendario, jugadores }) {
  // Estado para almacenar la fecha seleccionada
  const [selectedDate, setSelectedDate] = useState(null);

  // Función para manejar el cambio de fecha seleccionada
  const handleDateChange = (event) => {
    setSelectedDate(parseInt(event.target.value));
  };

  // Seleccionar automáticamente la última fecha al cargar el componente
  useEffect(() => {
    if (calendario.length > 0) {
      setSelectedDate(calendario[calendario.length - 1].idFecha);
    }
  }, [calendario]);

  return (
    <div>
      <div className="custom-combobox">
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

      <div className="partidos">
        {selectedDate &&
          calendario
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

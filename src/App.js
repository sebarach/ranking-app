import "./App.css";
import TablaJugadores from "./components/tablaJugadores"; // Cambié la importación para que coincida con el nombre del archivo
import { Database } from "./database";

function App() {
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
          <div className="card">
            <div>
              <div className="numbers">{Database[0].partidos.length}</div>
              <div className="cardName">Partidos Jugados</div>
            </div>
            <div className="iconBx">
              <ion-icon name="eye-outline"></ion-icon>
            </div>
          </div>
        </div>
        <div className="details">
          <div className="recentOrders">
            <TablaJugadores
              jugadores={Database[0].jugadores}
              partidos={Database[0].partidos}
              fechasLibres={Database[0].fechasLibres}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

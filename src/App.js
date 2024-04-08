import "./App.css";
import TablaJugadores from "./components/tablaJugadores";
import { Database } from "./database";

function App() {
  return (
    <div class="container">
      <div class="navigation">
        <ul>
          <li>
            <a href="#">
              <span class="icon">
                <ion-icon name="logo-apple"></ion-icon>
              </span>
              <span class="title">Tenis Puente SUR</span>
            </a>
          </li>

          <li>
            <a href="#">
              <span class="icon">
                <ion-icon name="home-outline"></ion-icon>
              </span>
              <span class="title">Dashboard</span>
            </a>
          </li>

          <li>
            <a href="#">
              <span class="icon">
                <ion-icon name="people-outline"></ion-icon>
              </span>
              <span class="title">Proximos Partidos</span>
            </a>
          </li>

          <li>
            <a href="#">
              <span class="icon">
                <ion-icon name="chatbubble-outline"></ion-icon>
              </span>
              <span class="title">Ranking</span>
            </a>
          </li>
        </ul>
      </div>

      <div class="main">
        <div class="topbar">
          <div class="toggle">
            <ion-icon name="menu-outline"></ion-icon>
          </div>

          <div class="search">
            <label>
              <input type="text" placeholder="Search here" />
              <ion-icon name="search-outline"></ion-icon>
            </label>
          </div>

          <div class="user">
            <img src="assets/imgs/customer01.jpg" alt="" />
          </div>
        </div>

        <div class="cardBox">
          <div class="card">
            <div>
              <div class="numbers">42</div>
              <div class="cardName">Partidos Jugados</div>
            </div>

            <div class="iconBx">
              <ion-icon name="eye-outline"></ion-icon>
            </div>
          </div>

          <div class="card">
            <div>
              <div class="numbers">$100.000</div>
              <div class="cardName">Monto Invertido</div>
            </div>

            <div class="iconBx">
              <ion-icon name="cash-outline"></ion-icon>
            </div>
          </div>
        </div>

        <div class="details">
          <div class="recentOrders">
            <TablaJugadores
              jugadores={Database[0].jugadores}
              partidos={Database[0].partidos}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

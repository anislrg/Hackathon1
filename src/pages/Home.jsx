/* eslint-disable react/no-unescaped-entities */
import "../components/planete.css";
import "../components/background.scss";
import { useEffect } from "react";
import background from "@components/background";
import { Link } from "react-router-dom";
import "../components/button.css";

export default function Home() {
  useEffect(() => {
    background();
  }, []);
  return (
    <div>
      {/* animation planète start */}
      <canvas />
      <div className="planet">
        <div className="wrap">
          <div className="background" />
          <div className="clouds" />
        </div>
        <div className="mask" />
      </div>
      {/* animation planète end */}
      <div className="page-app">
        <div>
          <div className="logo">
            <img src="src/assets/Title_trajet-eco.png" alt="logo" />
          </div>
          <div className="sitation">
            <p className="alinea">
              "Il n'y a pas de passagers sur le vaisseau Terre.
            </p>

            <p>Nous sommes tous des membres de l'equipage"</p>

            <p className="marshall">Marshall Meluhan</p>
          </div>
          <div className="buttons">
            <Link to="/Map">
              <button type="button" className="btn-hover color-1">
                Entrer
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

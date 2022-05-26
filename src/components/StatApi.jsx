/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-restricted-syntax */
import axios from "axios";
import { useState, useEffect } from "react";

const StatApi = ({ distance }) => {
  const [apiData, setApiData] = useState([]);
  const getApi = () => {
    axios
      .get(
        `https://api.monimpacttransport.fr/beta/getEmissionsPerDistance?km=${distance}`
      )
      .then((response) => response.data)
      .then((data) => setApiData(data));
  };
  useEffect(() => {
    getApi();
  }, [distance]);

  return (
    apiData.length ? 
    <div className="stat-api-mobil">
      <h3 className="stat-alert">
        Pour ce trajet vous allez emettre un equivalent CO2 de kg :
      </h3>
      {apiData.length &&
        apiData.map((data) => (
          <h3 className="stat-alert">
            En {data.name}: {Math.round(data.emissions.kgco2e * 100) / 100} kg
          </h3>
        ))}
    </div> : <h3 className="stat-alert">Loading...</h3>
  ) ;
};

export default StatApi;

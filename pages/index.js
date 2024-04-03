// pages/index.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/styles.module.css';

function Home() {
  const [cryptoData, setCryptoData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/updateData');
        console.log(response.data); // Verifique os dados recebidos no console
        setCryptoData(response.data.cryptoData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Chama a função fetchData inicialmente

    const interval = setInterval(fetchData, 15000); // Define um intervalo para chamar a função fetchData a cada 15 segundos

    return () => clearInterval(interval); // Limpa o intervalo quando o componente é desmontado
  }, []);

  return (
    <div>
      <h1 className={styles.header}>Web Scraping do CoinMarketCap</h1>
      <h2>Novo scraping em:</h2>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>1h %</th>
              <th>24h %</th>
              <th>7d %</th>
              <th>Market Cap</th>
              <th>Volume(24h)</th>
              <th>Circulating Supply</th>
            </tr>
          </thead>
          <tbody>
            {cryptoData.map((crypto, index) => (
              <tr key={index} className={index % 2 === 0 ? styles.tableRowEven : ''}>
                <td>{crypto.name}</td>
                <td>{crypto.price}</td>
                <td>{crypto.hourChange}</td>
                <td>{crypto.dayChange}</td>
                <td>{crypto.weekChange}</td>
                <td>{crypto.marketCap}</td>
                <td>{crypto.volume}</td>
                <td>{crypto.circulatingSupply}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;

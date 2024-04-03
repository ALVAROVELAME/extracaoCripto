// pages/api/scrapeData.js

import axios from 'axios';
import cheerio from 'cheerio';

export default async (req, res) => {
  try {
    const url = 'https://coinmarketcap.com/';
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    const cryptoData = [];
    // Seletor para encontrar os elementos <tr> que contêm dados da criptomoeda
    const trElements = $('tr');

    // Iterar sobre os elementos <tr> para extrair os dados de cada criptomoeda
    trElements.each((index, element) => {
      const tdElements = $(element).find('td');
      if (tdElements.length > 0) {
        const name = $(tdElements[1]).text().trim();
        const price = $(tdElements[3]).text().trim();
        const hourChange = $(tdElements[4]).text().trim();
        const dayChange = $(tdElements[5]).text().trim();
        const weekChange = $(tdElements[6]).text().trim();
        const marketCap = $(tdElements[7]).text().trim();
        const volume = $(tdElements[8]).text().trim();
        const circulatingSupply = $(tdElements[9]).text().trim();

        const cryptoObj = {
          name,
          price,
          hourChange,
          dayChange,
          weekChange,
          marketCap,
          volume,
          circulatingSupply
        };
        cryptoData.push(cryptoObj);
      }
    });

    res.status(200).json({ cryptoData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://coinmarketcap.com/';

axios.get(url)
  .then(response => {
    const html = response.data;
    const $ = cheerio.load(html);

    // Seletor para encontrar os elementos <td>
    const tdElements = $('td');

    // Iterar sobre os elementos <td>
    tdElements.each((index, element) => {
      console.log($(element).text());
    });
  })
  .catch(error => {
    console.log(error);
  });

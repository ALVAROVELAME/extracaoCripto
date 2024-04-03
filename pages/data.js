// pages/data.js
import axios from 'axios';
import cheerio from 'cheerio';

export async function getStaticProps() {
  try {
    // Fazer uma solicitação HTTP para o site CoinMarketCap
    const response = await axios.get('https://coinmarketcap.com/');

    // Carregar o HTML retornado
    const html = response.data;

    // Carregar o HTML no cheerio para permitir manipulação fácil
    const $ = cheerio.load(html);

    // Extrair as tags <td> do HTML
    const tdElements = $('td');

    // Mapear as tags <td> para seus textos
    const tdTexts = tdElements.map((index, element) => $(element).text()).get();

    // Agrupar os itens em linhas de 9 colunas cada
    const rows = [];
    for (let i = 0; i < tdTexts.length; i += 9) {
      rows.push(tdTexts.slice(i, i + 9));
    }

    // Retornar as linhas como props
    return {
      props: {
        rows,
      },
    };
  } catch (error) {
    console.error('Erro ao extrair dados:', error);
    return {
      props: {
        rows: null,
      },
    };
  }
}

function DataPage({ rows }) {
  return (
    <div>
      {rows ? (
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Nome</th>
              <th>Símbolo</th>
              <th>Preço</th>
              <th>Variação de 24h</th>
              <th>Variação de 7d</th>
              <th>Capitalização de Mercado</th>
              <th>Volume de 24h</th>
              <th>Fornecimento Circulante</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Não foi possível extrair os dados.</p>
      )}
    </div>
  );
}

export default DataPage;

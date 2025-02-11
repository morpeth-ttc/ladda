import './style.css'
import { populateTable } from "./ranking/ranking.js";
import data from './data/junior.json'

document.querySelector('#app').innerHTML = `
  <div>
    <h1 class="text-3xl font-bold underline mb-10">
      Junior Ranking
    </h1>
    <table id="ranking_table">
        <thead>
            <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Format</th>
                <th>Last Match</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    </table>
  </div>
`

// Populate the table on page load
populateTable(data, "ranking_table");

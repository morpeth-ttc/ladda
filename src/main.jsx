import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Ranking from "./ranking/ranking.jsx";
import './style.css'
import data from '../data/junior.json'

createRoot(document.getElementById('app')).render(
  <StrictMode>
    <div>
      <h1 class="text-3xl font-bold underline mb-10">
        Junior Ranking
      </h1>
      <Ranking data={data} />
    </div>
  </StrictMode>,
);

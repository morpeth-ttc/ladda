import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import Ranking from "./ranking/ranking.jsx";
import './main.css'

function LaddaSelector({dbNames, onMash}) {
  const buttons = [];
  
  dbNames.forEach((dbName, i) => {
    buttons.push(
      <button key={i} className="bg-blue-500 hover:bg-blue-700 hover:cursor-pointer mr-1 text-white font-bold py-2 px-4 rounded" onClick={() => {
        onMash(dbName)
      }}>
        {dbName}
      </button>
    )
  });
  
  return (
    <div>
      {buttons}
    </div>
  );
}

function Ladda() {
  function paths2Names(obj) {
    const transformKeys = (obj, callback) => 
      Object.fromEntries(Object.entries(obj).map(([key, value]) => [callback(key), value]));
    
    return transformKeys(obj, (k) => {
      let t = k.slice(8, -5);
      return t.charAt(0).toUpperCase() + t.slice(1);
    });
  }
  
  const all_dbs = paths2Names(import.meta.glob('../data/*.json', {eager: true}));
  const [dbName, setDbName] = useState(DEFAULT_DB);
  const [data, setData] = useState(all_dbs[dbName]);
  
  function selectDb(dbName) {
    setDbName(dbName);
    setData(all_dbs[dbName]);
  }
  
  return (
    <>
    <LaddaSelector dbNames={Object.keys(all_dbs)} onMash={selectDb} />
    <Ranking ladderName={dbName} data={data} />
    </>
  );
}

document.getElementsByTagName('title').item(0).innerHTML = SITE_NAME;

createRoot(document.getElementById('ladda')).render(
  <StrictMode>
    <h1 className="text-3xl font-bold mb-10">
      {SITE_NAME}
    </h1>
    <Ladda />
  </StrictMode>,
);

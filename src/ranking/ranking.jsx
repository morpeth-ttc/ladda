function Match({match, i}) {
  let details = match[2] ? ['ladda-win bg-blue-950', 'W'] : ['ladda-loss', 'L'];
  let default_class = 'inline-block align-baseline size-[1.5em] text-center hover:cursor-help';
  return (
    <span title={`${match[1]} - ${match[0].slice(0,10)}`} className={`${default_class} ${details[0]}`}>{details[1]}</span>
  );
}

function PlayerForm({history}) {
  const matches = [];

  if (history.length == 0)
    return '';

  history.slice(0,5).forEach((match, i) => {
    matches.push(
      <Match match={match} key={i} />
    );
  });
  
  return matches;
}

function Player({rank, name, history}) {
  const lastMatchDate = history.length > 0 ? history[0][0].slice(0,10) : "No matches";
  return (
    <tr>
      <td>{rank}</td>
      <td>{name}</td>
      <td>
        <PlayerForm history={history} />
      </td>
      <td>{lastMatchDate}</td>
    </tr>
  );
}

function Rows({data}) {
  const rows = [];
  
  data.ranking.forEach((player, index) => {
    rows.push(
      <Player key={index} rank={index + 1} name={player} history={data.history[player]} />
    );
  });
  
  return (
    <tbody>{rows}</tbody>
  );
}

function Header({text, updated}) {
  return (
    <>
    <h2 className="text-3xl font-bold underline m-10">
      {text}
    </h2>
    <p className="text-left">Last updated: {updated}</p>
    </>
  )
}

export default function Ranking({ladderName, data}) {
  return (
    <>
    <Header text={ladderName} updated={data.updated} />
    <table id="ranking_table">
      <thead>
        <tr>
          <th>Rank</th>
          <th>Name</th>
          <th>Form</th>
          <th>Last Match</th>
        </tr>
      </thead>
      <Rows data={data} />
    </table>
    </>
  );
};
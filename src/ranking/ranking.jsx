function Match({match}) {
  let details = match[2] ? ['ladda-win', 'W'] : ['ladda-loss', 'L'];
  let default_class = 'inline-block align-middle';
  return (
    <span title={`${match[1]} - ${match[0]}`} class={`${default_class} ${details[0]}`}>{details[1]}</span>
  );
}

function PlayerForm({history}) {
  const matches = [];

  if (history.length == 0)
    return '';

  history.slice(0,5).forEach((match) => {
    matches.push(
      <Match match={match} />
    );
  });
  
  return matches;
}

function Player({rank, name, history}) {
  const lastMatchDate = history.length > 0 ? history[0][0] : "No matches";
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
      <Player rank={index + 1} name={player} history={data.history[player]} />
    );
  });
  
  return (
    <tbody>{rows}</tbody>
  );
}

export default function Ranking({data}) {
  return (
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
  );
};
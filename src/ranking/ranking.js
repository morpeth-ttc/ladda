export const populateTable = (data, tableId) => {

    const tableBody = document.querySelector(`#${tableId} tbody`);
    tableBody.innerHTML = ""; // Clear existing content

    data.ranking.forEach((player, index) => {
        const history = data.history[player] || [];
        const lastMatchDate = history.length > 0 ? history[history.length - 1][0] : "No matches";
        const winCount = history.filter(match => match[2] === true).length;
        const lossCount = history.filter(match => match[2] === false).length;

        // Create row
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${player}</td>
            <td>W: ${winCount} | L: ${lossCount}</td>
            <td>${lastMatchDate}</td>
        `;
        tableBody.appendChild(row);
    });
}
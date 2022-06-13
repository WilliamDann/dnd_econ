function makeTable(rows) {
    const table = document.createElement('table');

    for (let row of rows)
    {
        const tr = document.createElement('tr');
        for(let col of row) {
            const td = document.createElement('td');

            if (typeof col === 'string' || col instanceof String)
                td.innerHTML = col;
            else
                td.appendChild(col);

            tr.appendChild(td);
        }
        table.appendChild(tr);
    }

    return table;
}
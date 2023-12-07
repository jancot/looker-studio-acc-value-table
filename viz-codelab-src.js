function drawViz(data) {
    // Container setup.
    let container = document.getElementById('container');
    if (container) {
      container.textContent = '';
    } else {
      container = document.createElement('div')
      container.id = 'container'
      document.body.appendChild(container);
    }
  
    // Create the table.
    const table = document.createElement('table');
    const tableHeader = document.createElement('thead');
    const tableBody = document.createElement('tbody');
  
    // Add headers to the table.
    data.tables.DEFAULT.headers.forEach(function (column) {
      const tableColumn = document.createElement('th');
      tableColumn.textContent = column.name;
      tableHeader.appendChild(tableColumn);
    });
  
    // Add an additional header for the accumulated sum column.
    const sumHeader = document.createElement('th');
    sumHeader.textContent = 'Accumulated Sum';
    tableHeader.appendChild(sumHeader);
  
    // Initialize an array to store accumulated sum values.
    let accumulatedSumArray = Array(data.tables.DEFAULT.headers.length).fill(0);
  
    // Add rows to the table.
    data.tables.DEFAULT.rows.forEach(function (row) {
      const tableRow = document.createElement('tr');
  
      // Add cells to the row.
      row.forEach(function (cell, index) {
        const tableCell = document.createElement('td');
        if (typeof cell == 'number') {
          tableCell.textContent = new Intl.NumberFormat().format(cell);
          
          // Update accumulated sum for numeric cells.
          accumulatedSumArray[index] += cell;
        } else {
          tableCell.textContent = cell;
        }
        tableRow.appendChild(tableCell);
      });
  
      // Add a cell for the accumulated sum in each row.
      const sumCell = document.createElement('td');
      sumCell.textContent = new Intl.NumberFormat().format(accumulatedSumArray[row.length - 1]);
      tableRow.appendChild(sumCell);
  
      // Append the row to the table body.
      tableBody.appendChild(tableRow);
    });
  
    // Append the header and body to the table.
    table.appendChild(tableHeader);
    table.appendChild(tableBody);
  
    // Set header color based on style control.
    tableHeader.style.backgroundColor = data.style.headerBg.value.color;
  
    // Render the table.
    container.appendChild(table);
  }
  
  // Subscribe to data and style changes. Use the table format for data.
  dscc.subscribeToData(drawViz, { transform: dscc.tableTransform });
  
// use this when changes are made(terminal)

// del viz-codelab.js
// type nul > viz-codelab.js
// type dscc.min.js >> viz-codelab.js
// echo.>> viz-codelab.js
// type viz-codelab-src.js >> viz-codelab.js
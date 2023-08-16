let fields = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
];

let currentPlayer = 'circle'; // Start with 'circle'

function init() {
    render();
}

function render() {
    let table = '<table>';
    for (let i = 0; i < 3; i++) {
        table += '<tr>';
        for (let j = 0; j < 3; j++) {
            const index = i * 3 + j;
            const value = fields[index];
            const symbol = value === 'circle' ? generateCircleSVG() : (value === 'cross' ? generateCrossSVG() : '');
            table += `<td onclick="cellClicked(${index})">${symbol}</td>`;
        }
        table += '</tr>';
    }
    table += '</table>';

    document.getElementById('content').innerHTML = table;
}

function cellClicked(index) {
    if (fields[index] === null) {
        fields[index] = currentPlayer;
        const cell = document.getElementsByTagName('td')[index];
        cell.innerHTML = currentPlayer === 'circle' ? generateCircleSVG() : generateCrossSVG();
        cell.onclick = null; // Remove the click event
        currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle'; // Switch players

        checkGameStatus(); // Check if the game is over after the move
    }
}

function checkGameStatus() {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]            // Diagonals
    ];

    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
            drawWinningLine(a, c);
            return;
        }
    }
}

function drawWinningLine(startIndex, endIndex) {
    const startRect = document.getElementsByTagName('td')[startIndex].getBoundingClientRect();
    const endRect = document.getElementsByTagName('td')[endIndex].getBoundingClientRect();

    const lineLength = Math.sqrt(Math.pow(endRect.bottom - startRect.top, 2) + Math.pow(endRect.left - startRect.left, 2));
    const lineAngle = Math.atan((endRect.top - startRect.top) / (endRect.left - startRect.left));
    const lineColor = '#ffffff';
    const lineWidth = 5;

    const line = document.createElement('div');
    line.style.position = 'absolute';
    line.style.width = `${lineLength}px`;
    line.style.height = `${lineWidth}px`;
    line.style.backgroundColor = lineColor;
    line.style.top = `${startRect.top + startRect.height / 2 - lineWidth / 2}px`;
    line.style.left = `${startRect.left + startRect.width / 2}px`;
    line.style.transform = `rotate(${lineAngle}rad)`;
    line.style.transformOrigin = `top left`;
    document.getElementById('content').appendChild(line);
}

function restartGame() {
    fields = [
        null, null, null,
        null, null, null,
        null, null, null,
    ];
    currentPlayer = 'circle';
    render();
}

function generateCircleSVG() {
    const svgCode = `
        <svg width="50" height="50" viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
            <circle cx="35" cy="35" r="30" fill="none" stroke="#00B0EF" stroke-width="5">
                <animate attributeName="r" from="0" to="30" dur="0.25s" fill="freeze" />
                <animate attributeName="stroke-dasharray" from="0 188.5" to="188.5 0" dur="0.25s" fill="freeze" />
            </circle>
        </svg>
    `;
    return svgCode;
}

const circleSVG = generateCircleSVG();
document.getElementById('content').innerHTML = circleSVG;


function generateCrossSVG() {
    const svgCode = `
        <svg width="40" height="40" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
            <line x1="0" y1="0" x2="50" y2="50" stroke="#FFC000" stroke-width="5">
                <animate attributeName="x1" from="-50" to="0" dur="2s" fill="freeze" />
                <animate attributeName="y1" from="-50" to="0" dur="2s" fill="freeze" />
                <animate attributeName="x2" from="100" to="50" dur="2s" fill="freeze" />
                <animate attributeName="y2" from="100" to="50" dur="2s" fill="freeze" />
            </line>
            <line x1="50" y1="0" x2="0" y2="50" stroke="#FFC000" stroke-width="5">
                <animate attributeName="x1" from="100" to="50" dur="2s" fill="freeze" />
                <animate attributeName="y1" from="-50" to="0" dur="2s" fill="freeze" />
                <animate attributeName="x2" from="-50" to="0" dur="2s" fill="freeze" />
                <animate attributeName="y2" from="100" to="50" dur="2s" fill="freeze" />
            </line>
        </svg>
    `;
    return svgCode;
}

const crossSVG = generateCrossSVG();
document.getElementById('content').innerHTML = crossSVG;

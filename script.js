const grid = document.getElementById("grid");
const rows = 10;
const cols = 20;
const nodes = [];
const startNode = { row: 2, col: 2 };
const endNode = { row: 7, col: 17 };

function createGrid() {
  for (let row = 0; row < rows; row++) {
    const currentRow = [];
    for (let col = 0; col < cols; col++) {
      const node = document.createElement("div");
      node.className = "node";
      node.addEventListener("click", () => toggleWall(row, col));
      grid.appendChild(node);
      currentRow.push(node);
    }
    nodes.push(currentRow);
  }
  nodes[startNode.row][startNode.col].className = "node start";
  nodes[endNode.row][endNode.col].className = "node end";
}

function toggleWall(row, col) {
  if (nodes[row][col].classList.contains("wall")) {
    nodes[row][col].className = "node";
  } else {
    nodes[row][col].className = "node wall";
  }
}

function visualizeDijkstra() {
    const distances = Array.from({ length: rows }, () => Array(cols).fill(Infinity));
    distances[startNode.row][startNode.col] = 0;
    const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
    const previousNodes = Array.from({ length: rows }, () => Array(cols).fill(null));
    const queue = [{ row: startNode.row, col: startNode.col, distance: 0 }];
  
    while (queue.length > 0) {
      queue.sort((a, b) => a.distance - b.distance);
      const { row, col, distance } = queue.shift();
      if (visited[row][col]) continue;
      visited[row][col] = true;
      nodes[row][col].className = "node visited";
  
      if (row === endNode.row && col === endNode.col) {
        reconstructPath(previousNodes);
        return;
      }
  
      const neighbors = [
        [row - 1, col],
        [row + 1, col],
        [row, col - 1],
        [row, col + 1]
      ];
  
      for (const [neighborRow, neighborCol] of neighbors) {
        if (
          neighborRow >= 0 &&
          neighborRow < rows &&
          neighborCol >= 0 &&
          neighborCol < cols &&
          !visited[neighborRow][neighborCol] &&
          !nodes[neighborRow][neighborCol].classList.contains("wall")
        ) {
          const newDistance = distance + 1;
          if (newDistance < distances[neighborRow][neighborCol]) {
            distances[neighborRow][neighborCol] = newDistance;
            previousNodes[neighborRow][neighborCol] = { row, col };
            queue.push({ row: neighborRow, col: neighborCol, distance: newDistance });
          }
        }
      }
    }
  }
  
  function reconstructPath(previousNodes) {
    let current = endNode;
    while (current) {
      const { row, col } = current;
      const prevNode = previousNodes[row][col];
      if (prevNode) {
        nodes[row][col].className = "node path";
      }
      current = prevNode;
    }
}

function restart() {
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        nodes[row][col].className = "node";
      }
    }
    nodes[startNode.row][startNode.col].className = "node start";
    nodes[endNode.row][endNode.col].className = "node end";
  }
  
  
  

createGrid();

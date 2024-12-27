// Visualize differences using D3.js
function visualizeDifferences(differences) {
  const width = 800,
    height = 600;
  const treeData = { name: "root", children: [] };

  differences.forEach((diff) => {
    const parts = diff.path.split("/").slice(1); // Ignore root '/'
    let currentNode = treeData;

    parts.forEach((part, index) => {
      let childNode = currentNode.children.find((child) => child.name === part);
      if (!childNode) {
        childNode = {
          name: part,
          children: [],
          type: index === parts.length - 1 ? diff.type : null,
        };
        currentNode.children.push(childNode);
      }
      currentNode = childNode;
    });
  });

  d3.select("#chart").html(""); // Clear previous chart
  const svg = d3
    .select("#chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height);
  const g = svg.append("g").attr("transform", "translate(40, 40)");

  const tree = d3.tree().size([width - 100, height - 100]);
  const root = d3.hierarchy(treeData);
  tree(root);

  // Links
  g.selectAll(".link")
    .data(root.links())
    .enter()
    .append("path")
    .attr("class", "link")
    .attr(
      "d",
      d3
        .linkHorizontal()
        .x((d) => d.y)
        .y((d) => d.x)
    );

  // Nodes
  const node = g
    .selectAll(".node")
    .data(root.descendants())
    .enter()
    .append("g")
    .attr("class", "node")
    .attr("transform", (d) => `translate(${d.y},${d.x})`);

  node
    .append("circle")
    .attr("r", 5)
    .style("fill", (d) => {
      if (d.data.type === "added") return "blue";
      if (d.data.type === "removed") return "red";
      if (d.data.type === "modified") return "orange";
      return "lightgray";
    });

  node
    .append("text")
    .attr("dx", 10)
    .attr("dy", 3)
    .text((d) => d.data.name);
}

// Compare two JSONs recursively
function compareJSON(json1, json2, path = "") {
  const differences = [];
  const keys1 = new Set(Object.keys(json1));
  const keys2 = new Set(Object.keys(json2));

  for (const key of [...keys1].filter((k) => !keys2.has(k))) {
    differences.push({
      type: "removed",
      path: `${path}/${key}`,
      value: json1[key],
    });
  }
  for (const key of [...keys2].filter((k) => !keys1.has(k))) {
    differences.push({
      type: "added",
      path: `${path}/${key}`,
      value: json2[key],
    });
  }
  for (const key of [...keys1].filter((k) => keys2.has(k))) {
    if (typeof json1[key] === "object" && typeof json2[key] === "object") {
      differences.push(
        ...compareJSON(json1[key], json2[key], `${path}/${key}`)
      );
    } else if (json1[key] !== json2[key]) {
      differences.push({
        type: "modified",
        path: `${path}/${key}`,
        value: { from: json1[key], to: json2[key] },
      });
    }
  }

  return differences;
}

function renderTree(data) {
  const width = 800;
  const height = 600;
  const svg = d3
    .select("#chart")
    .html("")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  const root = d3.hierarchy(data);
  const treeLayout = d3.tree().size([height - 50, width - 50]);
  treeLayout(root);

  const g = svg.append("g").attr("transform", "translate(25,25)");

  // Draw links
  g.selectAll(".link")
    .data(root.links())
    .join("line")
    .classed("link", true)
    .attr("x1", (d) => d.source.y)
    .attr("y1", (d) => d.source.x)
    .attr("x2", (d) => d.target.y)
    .attr("y2", (d) => d.target.x);

  // Draw nodes
  const nodes = g
    .selectAll(".node")
    .data(root.descendants())
    .join("g")
    .classed("node", true)
    .attr("transform", (d) => `translate(${d.y},${d.x})`);

  nodes
    .append("circle")
    .attr("r", 5)
    .on("click", (d) => displayNodeDetails(d.data));

  nodes
    .append("text")
    .attr("dx", 10)
    .attr("dy", 5)
    .text((d) => d.data.name);
}

function displayNodeDetails(node) {
  const detailsDiv = document.getElementById("details");
  detailsDiv.textContent = JSON.stringify(
    node.value !== undefined ? node.value : node,
    null,
    2
  );
}

function createTree(data) {
  if (typeof data !== "object" || data === null) {
    return [];
  }

  return Object.keys(data).map((key) => ({
    name: key,
    children: createTree(data[key]),
    value: data[key], // Store value for display
  }));
}

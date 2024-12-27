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

// Hook up UI
document.getElementById("compareButton").addEventListener("click", () => {
  const json1 = JSON.parse(document.getElementById("json1").value);
  const json2 = JSON.parse(document.getElementById("json2").value);

  const differences = compareJSON(json1, json2);
  visualizeDifferences(differences);
});

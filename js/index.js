require.config({
  paths: {
    vs: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.39.0/min/vs",
  },
});

require(["vs/editor/editor.main"], function () {
  // Initialize Monaco Editors
  const editor1 = monaco.editor.create(document.getElementById("editor1"), {
    value: "{}",
    language: "json",
    theme: "vs-light",
    automaticLayout: true,
  });

  const editor2 = monaco.editor.create(document.getElementById("editor2"), {
    value: "{}",
    language: "json",
    theme: "vs-light",
    automaticLayout: true,
  });

  document.getElementById("compareButton").addEventListener("click", () => {
    try {
      const json1 = JSON.parse(editor1.getValue());
      const json2 = JSON.parse(editor2.getValue());

      const root = {
        name: "Root",
        children: [
          { name: "JSON 1", children: createTree(json1) },
          { name: "JSON 2", children: createTree(json2) },
        ],
      };

      renderTree(root);
    } catch (error) {
      alert("Invalid JSON format. Please correct and try again.");
    }
  });

  function createTree(data) {
    if (typeof data !== "object" || data === null) {
      return [];
    }

    return Object.keys(data).map((key) => ({
      name: key,
      children: createTree(data[key]),
      value: data[key],
      _collapsed: true, // Default state: collapsed
    }));
  }

  function renderTree(data) {
    const width = window.innerWidth; // Adjust width based on the window size
    const height = window.innerHeight; // Adjust height based on the window size
  
    const svg = d3
      .select("#chart")
      .html("") // Clear the previous chart
      .append("svg")
      .attr("width", width)
      .attr("height", height);
  
    // Zoom behavior for panning and zooming
    const zoom = d3.zoom().on("zoom", (event) => {
      g.attr("transform", event.transform);
    });
  
    svg.call(zoom); // Apply zoom behavior to the SVG
  
    // Set all nodes to expanded by default (collapsed = false)
    setCollapseState(data, false); // Ensure the tree is fully expanded by default
  
    const root = d3.hierarchy(data, (d) => (d._collapsed ? null : d.children)); // Check for collapse state
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
      .on("click", function (event, d) {
        toggleNode(d);
        renderTree(data); // Re-render the tree to update the collapse state
      });
  
    nodes
      .append("text")
      .attr("dx", 10)
      .attr("dy", 5)
      .text((d) => d.data.name);
  
    function toggleNode(node) {
      if (node.data.children) {
        node.data._collapsed = !node.data._collapsed;
      }
    }
  
    // Helper function to set collapse state for all nodes
    function setCollapseState(node, collapsed) {
      node._collapsed = collapsed;
      if (node.children) {
        node.children.forEach((child) => setCollapseState(child, collapsed));
      }
    }
  }  
});

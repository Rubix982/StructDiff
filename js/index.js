document.getElementById('compareButton').addEventListener('click', () => {
  const json1 = JSON.parse(document.getElementById('json1').value);
  const json2 = JSON.parse(document.getElementById('json2').value);

  const root = {
    name: "Root",
    children: [
      { name: "JSON 1", children: createTree(json1) },
      { name: "JSON 2", children: createTree(json2) }
    ]
  };

  renderTree(root);
});

# Struct Diff

This project provides a comprehensive tool for visually comparing and analyzing two JSON files. It allows users to clearly see the structural and data differences between JSONs, with a focus on improving readability and usability through interactive visualizations. The tool offers side-by-side comparison, inline diffing, tree structure views, and much more, making it an essential utility for anyone working with complex JSON data.

## Features

### Side-by-Side Comparison
	•	Compare two JSON files side by side with synchronized scrolling or independent scrolling.
	•	Color-coded changes (green for added, red for removed, yellow for modified).
	•	Interactive tooltips for differences and quick actions like merging and toggling views.

### Inline Diffing
	•	View JSON files in a single column with inline diffing for direct comparison.
	•	Highlight changes with color-coded inline diffs and allow accepting or rejecting changes.

### Tree Structure View
	•	Visualize JSON data in a collapsible tree structure.
	•	Expand and collapse nodes to navigate through large JSON files.
	•	Tooltip details and visual indicators for differences between JSONs.

### Diff Summary Panel
	•	A summary of the differences grouped by types (added, removed, modified).
	•	Filter differences and navigate quickly to the changed sections.

### JSON Schema Visualization
	•	Display JSON schema mappings and highlight deviations from the expected structure.
	•	Show mismatched types and missing required keys.

### Version Control Integration
	•	Track versions of JSON files and view detailed changelogs.
	•	Rollback options to revert to previous versions.

### Interactive JSON Editing
	•	Edit JSON files in real-time within the comparison interface.
	•	Merge changes interactively and undo/redo changes as needed.

### Contextual Information Panel
	•	Display additional insights and explanations for differences, including schema conflicts.

### Search and Navigation
	•	Search for specific keys or values in JSON files and highlight differences.
	•	Quick navigation between differences with “Next Difference” button.

### Download Options
	•	Export the changes as a patch or merged JSON.
	•	Download a detailed diff report in formats like HTML, CSV, or text.

### Tree Structure Visualization
	•	Visualize the hierarchy of JSON data with color-coded nodes for added, removed, and modified elements.
	•	Differentiate node types with distinct shapes for clarity.

### Expandable and Collapsible Nodes
	•	Expand and collapse nodes to reveal or hide data, making navigation easier.
	•	Automatically collapse unchanged sections for a cleaner view.

### Nesting Levels and Indentation
	•	Visualize the depth of JSON nesting with proper indentation and hierarchy lines.

### Interactive Differences Indicator
	•	Highlight edges between nodes to show structural changes and differences between JSON files.

### Customizable Visualization Options
	•	Toggle between views to show only differences or the full tree structure.
	•	Filter by change type (added, removed, modified).

### Node Data Display and Tooltip
	•	Hover over nodes to view detailed change information, including old and new values.

### Edge Styling for Structural Changes
	•	Different edge styles (solid, dashed, bold) to indicate the type of change in the structure.

### Navigation and Interaction
	•	Clickable nodes for zooming in on details.
	•	Breadcrumb navigation for deep nesting levels.

### Graphical Layout
	•	Hierarchical or circular layouts for visualizing JSON data.
	•	Interactive zoom and pan for large JSON files.

### Zoom and Pan
	•	Enable zoom and pan functionalities to focus on specific sections of the JSON data.

### Comparison Overview Panel
	•	A high-level summary of differences, including metrics for added, removed, and modified nodes.

### Merge Capabilities (Optional)
	•	Merge changes directly in the tree structure, allowing users to select changes from both JSON files.

## Getting Started

### Prerequisites

•	Node.js and `npm` (for running the development server and building the project).

### Installation

1.	Clone the repository

```sh
git clone https://github.com/Rubix982/StructDiff.git
cd StructDiff
```

2.	Start the development server,

```sh
npm run start
```

## Contributing

If you have suggestions, bug fixes, or improvements, feel free to fork the repository and submit a pull request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

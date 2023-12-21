# Auto Design Generator VS Code Extension

The Auto Design Generator VS Code extension provides a convenient way to generate code snippets based on your current HTML file. It also offers a feature to view statistics and visualizations of the code written so far.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Features](#features)
  - [Code Snippet Generation](#code-snippet-generation)
  - [Viewing Statistics](#viewing-statistics)
- [Usage](#usage)
  - [Generating Code Snippets](#generating-code-snippets)
  - [Viewing Statistics Dashboard](#viewing-statistics-dashboard)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

### Prerequisites

Before you can use this extension, ensure that you have the following prerequisites installed:

- [Visual Studio Code](https://code.visualstudio.com/)

### Installation

Follow these steps to install the Auto Design Generator extension:

1. Open Visual Studio Code.
2. Go to the Extensions view by clicking on the Extensions icon in the Activity Bar on the side of the window.
3. Search for "Auto Design Generator" in the Extensions view search box.
4. Click the Install button for the "Auto Design Generator" extension.

## Features

### Code Snippet Generation

The Auto Design Generator extension allows you to generate code snippets based on the tags in your HTML file. Here's how to use this feature:

1. Open an HTML file in Visual Studio Code.
2. Place the cursor at the location where you want to insert a code snippet.
3. Start typing a tag, e.g., `<div>`.
4. As you type the opening `<`, the extension will automatically suggest closing tags for you.
5. Select a closing tag from the suggestions, and it will insert both the opening and closing tags.

**Example:**

```html
<!-- Type '<div>' -->
<!-- Extension suggests '</div>' -->
<!-- Select the suggestion, and it inserts '<div></div>' -->

### Viewing Statistics
The extension also provides a feature to view statistics and visualizations of the code in your HTML file. This feature is accessible through a separate web dashboard. Follow these steps to view statistics:

1. Open the HTML file you want to analyze in Visual Studio Code.
2. Ensure that the file is saved with a .html extension.
3. Click on the "View Statistics" button in the VS Code status bar.

**Viewing Statistics Dashboard**

To view statistics and visualizations of your HTML code, use the following steps:

1. Ensure your HTML file is saved with a .html extension.
2. Click on the "View Statistics" button in the VS Code status bar.
3. The extension will open a web dashboard in your default browser.
4. The dashboard will display statistics such as tag frequency, word cloud, and more.

### Contributing
Contributions are welcome! If you'd like to contribute to this project, please follow these guidelines:

1. Fork the project.
2. Create a new branch for your feature or bug fix (git checkout -b feature/awesome-feature).
3. Make your changes and commit them (git commit -m 'Add some feature').
4. Push your changes to the branch (git push origin feature/awesome-feature).
5. Open a pull request.
 

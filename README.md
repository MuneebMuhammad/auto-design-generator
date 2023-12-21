# Auto Design Generator VS Code Extension

The Auto Design Generator VS Code extension is designed to assist web developers by providing advanced code snippet generation and code analytics features for HTML files. It leverages association rule mining to recommend HTML tags based on your coding patterns and offers a comprehensive code analytics dashboard.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Features](#features)
  - [Code Snippet Generation](#code-snippet-generation)
  - [Code Analytics Dashboard](#code-analytics-dashboard)
- [Usage](#usage)
  - [Generating Code Snippets](#generating-code-snippets)
  - [Viewing Code Analytics Dashboard](#viewing-code-analytics-dashboard)
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

The Code Snippet Generation feature utilizes association rule mining to enhance your coding experience. Here's how it works:

1. Open an HTML file in Visual Studio Code.
2. Whenever you type an opening `<` in your code, the extension analyzes your coding patterns.
3. Based on your coding history, it suggests the next HTML tag you might want to use.
4. Simply select the suggestion, and the extension inserts both the opening and closing tags for you.

### Code Analytics Dashboard

The Code Analytics Dashboard provides valuable insights into your HTML code. It offers the following visualizations:

- **HTML Tag Frequency**: This histogram displays the frequency of HTML tags used in your code, helping you understand your tag usage patterns.

- **HTML Attribute Frequency**: Explore the frequency of HTML attributes to gain insights into how attributes are used in your code.

- **Most Used Classes and IDs**: Discover the most frequently used classes and IDs in your code, which can be useful for CSS styling.

- **Link Analysis**: This section provides a detailed link analysis of your HTML content, offering insights into your document's structure and interconnections.

- **Word Cloud of HTML Content**: Visualize the most common words in your HTML content using a word cloud, giving you a quick overview of your document's textual content.

## Usage

### Generating Code Snippets

To generate code snippets, follow these steps:

1. Open an HTML file in Visual Studio Code.
2. As you type the opening tag `<`, the extension will automatically suggest the next HTML tag based on your coding history.
3. Select the suggestion to insert both the opening and closing tags effortlessly.

### Viewing Code Analytics Dashboard

To view the Code Analytics Dashboard, use the following steps:

1. Ensure your HTML file is saved with a `.html` extension.
2. Click on the "View Code Analytics" button in the VS Code status bar.
3. The extension will open a web dashboard in your default browser.
4. Explore various visualizations, such as tag frequency, attribute usage, classes and IDs, link analysis, and a word cloud of your HTML content, to gain deeper insights into your code.

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these guidelines:

1. Fork the project.
2. Create a new branch for your feature or bug fix (`git checkout -b feature/awesome-feature`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push your changes to the branch (`git push origin feature/awesome-feature`).
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

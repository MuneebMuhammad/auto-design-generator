// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const fs = require('fs');
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
const tagPairs = [
	['div', 'p'],
	['div', 'span'],
	['div', 'h1'],
	['ul', 'li'],
	['li', 'p'],
	['li', 'a'],
  ];

fs.readFile('../../data.json', 'utf8', (err, data) => {
if (err) {
	console.error(err);
	return;
}

// Parse the CSV data into a JavaScript object
const dataObject = JSON.parse(data);

// Display the data in the console
// console.log(dataObject);
});

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	console.log("muneeb")
	context.subscriptions.push(
		vscode.window.onDidChangeTextEditorSelection((event) => {
		  const editor = event.textEditor;
		  const document = editor.document;
		  const position = editor.selection.start;
		  console.log("text new", document.lineAt(position).text[(document.lineAt(position).text.length)-1]);
		  if (document.lineAt(position).text[(document.lineAt(position).text.length)-1] === '<') {
			console.log("recommend now")
			const currentLine = document.lineAt((position.line)-1).text;
			const tagRegex = /<(\w+)>/;
			const match = tagRegex.exec(currentLine);
			console.log("current line:", currentLine)

			if (match) {
			  const parentTag = match[1];
			  const suggestions = tagPairs.filter((pair) => pair[0] === parentTag).map((pair) => pair[1]);
			  if (suggestions.length>0){
				vscode.window.showQuickPick(suggestions).then((tag) => {
					if (tag) {
					  editor.insertSnippet(new vscode.SnippetString(`${tag}></${tag}>`), position);
					}
				  });
			  }
			  
			}
		  }
		})
	  );

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	// console.log('Congratulations, your extension "auto-design-generator" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	// let disposable = vscode.commands.registerCommand('auto-design-generator.helloWorld', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
	// 	vscode.window.showInformationMessage('Hello World from auto-design-generator!');
	// });

	// context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}

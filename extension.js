const vscode = require('vscode');
const fs = require('fs').promises;

const tagPairs = [
	['div', 'p'],
	['div', 'span'],
	['div', 'h1'],
	['ul', 'li'],
	['li', 'p'],
	['li', 'a'],
  ];


//   async function readData() {
// 	try {
// 	  const data = await fs.readFile('../../data.json', 'utf8');
// 	  const dataObject = JSON.parse(data);
// 	  // Use dataObject here
// 	  console.log(dataObject);
// 	} catch (err) {
// 	  console.error(err);
// 	}
//   }
//   readData()

/**
 * @param {vscode.ExtensionContext} context
 */
async function activate(context) {
	// const tagPairs = readData();
	let associationRules;
    try {
        const data = await fs.readFile('/Users/muneebmuhammad/Documents/Assignments/Data Warehousing/Project/design_generator/auto-design-generator/data.json', 'utf8');
        associationRules = JSON.parse(data);
    } catch (err) {
        console.error("Error reading data.json:", err);
        return; // Exit the activation function if there's an error
    }
	console.log("tag paris:", associationRules)
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
			  const newSuggestions = associationRules.filter((pair) => pair['antecedents'].includes(parentTag)).map((pair) => pair['consequents']);
				console.log("new suggestions:", newSuggestions)
			  if (suggestions.length>0){
				vscode.window.showQuickPick(suggestions).then((tag) => {
					if (tag) {
					//   newSuggestions.forEach(element => {
					// 	console.log()
					// 	editor.insertSnippet(new vscode.SnippetString(`${element}></${element}>`), position);
					//   });
					  editor.insertSnippet(new vscode.SnippetString(`${tag}></${tag}>`), position);
					}
				  });
			  }
			  
			}
		  }
		})
	  );
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}

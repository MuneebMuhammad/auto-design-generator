const vscode = require('vscode');
const fs = require('fs').promises;

/**
 * @param {vscode.ExtensionContext} context
 */
async function activate(context) {
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
			  const newSuggestions = new Set(associationRules.filter((pair) => pair['antecedents'].includes(parentTag)).map((pair) => pair['consequents']).map(subArray => subArray.join(',')));
			  const tagsSuggests = Array.from(newSuggestions)
			  console.log("set suggestions:", tagsSuggests)
			  if (tagsSuggests.length>0){
				vscode.window.showQuickPick(tagsSuggests).then((tag) => {
					if (tag) {
					console.log("tag is:", tag)
					let tagsString = tag.split(',')
					.map(tag => `<${tag}></${tag}>`)
					.join('\n');
					editor.insertSnippet(new vscode.SnippetString(tagsString.slice(1,tagsString.length)), position);
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

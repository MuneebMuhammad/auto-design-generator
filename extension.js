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



			// Array to store the last three tags
			let lastThreeTags = [];

			// Iterate through the lines in reverse, starting from the line before the current one
			for (let i = position.line - 1; i >= 0 && lastThreeTags.length < 3; i--) {
				const lineText = document.lineAt(i).text;
				let newMatch;
				console.log("lineText:", lineText)
				const tagRegex = /<(\w+)>/g;
				// Find all newMatches in the line
				while ((newMatch = tagRegex.exec(lineText)) !== null) {
					console.log("while loop:", newMatch)
					// Add the tag to the array
					lastThreeTags.push(newMatch[1]);

					// If we have found three tags, break out of the loop
					if (lastThreeTags.length === 3) {
						break;
					}
				}
			}

			// Reverse the order to maintain the original chronological order of the tags
			lastThreeTags = lastThreeTags.reverse();

			console.log("Last three tags:", lastThreeTags);




			// Create a set for the new suggestions
			let newSuggestions = new Set();

			// Function to check if all elements of 'subset' are in 'set'
			// const isSubset = (set, subset) => subset.every(element => set.includes(element));
			const isSubset = (set, subset) => {
				// Create Sets from arrays to eliminate duplicates and ignore order
				const setUnique = new Set(set);
				const subsetUnique = new Set(subset);
			
				// Check if both sets have the same size and every element of subset is in set
				return setUnique.size === subsetUnique.size && subset.every(element => setUnique.has(element));
			};

			// Iterate through the associationRules
			try{
			associationRules.forEach(rule => {
					// Check for last three, last two, and last tag in any order
					if (isSubset(rule['antecedents'], lastThreeTags) || 
						isSubset(rule['antecedents'], lastThreeTags.slice(-2)) ||
						rule['antecedents'] == lastThreeTags[lastThreeTags.length - 1]) {
						// Add the corresponding consequents to the newSuggestions set
						// newSuggestions.add(rule['consequents'].map(subArray => subArray.join(',')))
						newSuggestions.add(rule['consequents'].join(','))
						// rule['consequents'].forEach(consequent => {
						// 	console.log("consequent is:", consequent)
						// 	newSuggestions.add(consequent.join(','));
						// });
					}
			});
		}
		catch(e){
			console.log("error is:", e)
		}

			const tagsSuggests = Array.from(newSuggestions);
			console.log("set suggestions for last three tags:", tagsSuggests);



			
			// if (match) {
			//   const parentTag = match[1];
			//   const newSuggestions = new Set(associationRules.filter((pair) => pair['antecedents'].includes(parentTag)).map((pair) => pair['consequents']).map(subArray => subArray.join(',')));
			//   const tagsSuggests = Array.from(newSuggestions)
			//   console.log("one set suggestions:", tagsSuggests)
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
			  
			// }
		  }
		})
	  );
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}

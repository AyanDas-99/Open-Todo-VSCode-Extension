import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

export function activate(context: vscode.ExtensionContext) {
	// Function to open all .todo files
	const openTodoFiles = () => {
		const folder = vscode.workspace.workspaceFolders?.[0];
		if (folder) {
			const folderPath = folder.uri.fsPath;
			fs.readdir(folderPath, (err, files) => {
				if (err) {
					console.error(err);
					return;
				}
				files.filter(file => file.endsWith('.todo')).forEach(file => {
					const filePath = path.join(folderPath, file);
					vscode.workspace.openTextDocument(filePath).then(doc => {
						vscode.window.showTextDocument(doc);
					});
				});
			});
		}
	};

	// Open .todo files when the extension is activated
	openTodoFiles();

	// Optional: Open .todo files when a new folder is opened
	vscode.workspace.onDidChangeWorkspaceFolders(() => {
		openTodoFiles();
	});
}

export function deactivate() { }

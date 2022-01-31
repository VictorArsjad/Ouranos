import * as vsc from "vscode";
import * as vscode from "../helpers/code";

export const pry = () => {
	const editor = vscode.getFocusedEditor();
	if (!editor) {
		return;
	}

	const selection = editor.selection;
	const position = selection.active.line;
	const textLine = editor.document.lineAt(position);
	const indent = textLine.firstNonWhitespaceCharacterIndex;

	editor.insertSnippet(
		new vsc.SnippetString("require IEx; IEx.pry()\r\n"),
		new vsc.Position(position, indent)
	);
};

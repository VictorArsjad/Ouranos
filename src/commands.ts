import { FileChangeType, TextEditor, Uri, window, workspace } from "vscode";
import {
	changeDirectory,
	getAppName,
	getFileName,
	isElixirTestFile,
	isInTestFolder,
	print,
	show,
} from "./utils";

export enum EditorType {
	File,
	Test,
}

const ping = () => {
	window.showInformationMessage("Hello from Ouranos!");
};

const navigate = () => {
	const focusedEditor = getFocusedEditor();
	if (!focusedEditor) return;

	const focusedFilePath = getFilePath(focusedEditor);
	const focusedFileName = getFileName(focusedFilePath);

	switch (getCurrentFileType(focusedFilePath)) {
		case EditorType.File:
			const possibleTestFileName = getPossibleTestFileName(focusedFileName);
			workspace
				.findFiles(`**/test/**/${possibleTestFileName}`, "**/.elixir_ls/**")
				.then((result) => {
					if (result.length == 1) {
						openFile(result[0]);
					} else {
						const output = window.createOutputChannel("Ouranos");
						output.appendLine(result.toString());
					}
				});
			break;

		case EditorType.Test:
			const possibleFileName = getPossibleFileName(focusedFileName);
			workspace
				.findFiles(`**/${possibleFileName}`, "**/.elixir_ls/**, **/test/**")
				.then((result) => {
					if (result.length == 1) {
						openFile(result[0]);
					} else {
						const output = window.createOutputChannel("Ouranos");
						output.appendLine(result.toString());
					}
				});
			break;
	}
};

const getPossibleFileName = (fileName: string) => {
	return fileName.replace("_test.exs", ".ex");
};

const getPossibleTestFileName = (fileName: string) => {
	return fileName.replace(".ex", "_test.exs");
};

const getCurrentFileType = (filePath: string) => {
	if (isInTestFolder(filePath)) {
		return EditorType.Test;
	}
	return EditorType.File;
};

const openFile = (file: Uri) => {
	return workspace.openTextDocument(file).then(window.showTextDocument);
};

const runTestInCursor = () => {
	const focusedEditor = getFocusedEditor();
	if (!focusedEditor) return;

	const focusedFilePath = getFilePath(focusedEditor);
	if (!validateFilePath(focusedFilePath)) return;

	const cursorPosition = focusedEditor.selection.active.line + 1;
	const appName = getAppName(focusedFilePath);
	changeDirectory(appName);
	print(`mix test --no-start ${focusedFilePath}:${cursorPosition}`);
	show();
};

const runTestsInFile = () => {
	const focusedEditor = getFocusedEditor();
	if (!focusedEditor) return;

	const focusedFilePath = getFilePath(focusedEditor);
	if (!validateFilePath(focusedFilePath)) return;

	const appName = getAppName(focusedFilePath);
	changeDirectory(appName);
	print(`mix test --no-start ${focusedFilePath}`);
	show();
};

const getFocusedEditor = () => {
	return window.activeTextEditor;
};

const getFilePath = (editor: TextEditor) => {
	return editor.document.fileName;
};

function showErrorMessage(message: string) {
	window.showErrorMessage(`Ouranos: ${message}`);
}

const validateFilePath = (filePath: string) => {
	if (!isInTestFolder(filePath)) {
		showErrorMessage("Not a valid test file. Not in test folder.");
		return false;
	}
	if (!isElixirTestFile(filePath)) {
		showErrorMessage("Not an elixir test file.");
		return false;
	}
};

export const commands = [
	{
		command: "ouranos.ping",
		handler: ping,
	},
	{
		command: "ouranos.navigate",
		handler: navigate,
	},
	{
		command: "ouranos.runTestInCursor",
		handler: runTestInCursor,
	},
	{
		command: "ouranos.runTestsInFile",
		handler: runTestsInFile,
	},
];

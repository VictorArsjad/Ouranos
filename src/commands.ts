import { TextEditor, window } from "vscode";
import {
	changeDirectory,
	getAppName,
	isElixirTestFile,
	isInTestFolder,
	print,
	show,
} from "./utils";

const ping = () => {
	window.showInformationMessage("Hello from Ouranos!");
};

const navigate = () => {
	window.showInformationMessage("Hello from Ouranos!");
};

const runTestInCursor = () => {
	const focusedEditor = getFocusedEditor();
	if (!focusedEditor) return;

	const focusedFilename = focusedEditor.document.fileName;
	if (!validateFile(focusedFilename)) return;

	const cursorPosition = focusedEditor.selection.active.line + 1;
	const appName = getAppName(focusedFilename);
	changeDirectory(appName);
	print(`mix test --no-start ${focusedFilename}:${cursorPosition}`);
	show();
};

const runTestsInFile = () => {
	const focusedEditor = getFocusedEditor();
	if (!focusedEditor) return;

	const focusedFilename = getFilename(focusedEditor);
	if (!validateFile(focusedFilename)) return;

	const appName = getAppName(focusedFilename);
	changeDirectory(appName);
	print(`mix test --no-start ${focusedFilename}`);
	show();
};

const getFocusedEditor = () => {
	return window.activeTextEditor;
};

const getFilename = (editor: TextEditor) => {
	return editor.document.fileName;
};

function showErrorMessage(message: string) {
	window.showErrorMessage(`Ouranos: ${message}`);
}

const validateFile = (filename: string) => {
	let validation = true;
	if (!isInTestFolder(filename)) {
		showErrorMessage("Not a valid test file. Not in test folder.");
		validation = false;
	}
	if (!isElixirTestFile(filename)) {
		showErrorMessage("Not an elixir test file.");
		validation = false;
	}
	return validation;
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

import { window } from "vscode";
import { changeDirectory, getAppName, isElixirTestFile, isInTestFolder, print, show } from "./utils";

const ping = () => {
	window.showInformationMessage("Hello from Ouranos!");
};

const runTestInCursor = () => {
	const focusedEditor = window.activeTextEditor;
	if (!focusedEditor) {
		window.showErrorMessage(`Ouranos: Not a valid test file.`);
		return
	}

	const focusedFilename = focusedEditor.document.fileName;
	if (!isInTestFolder(focusedFilename)) {
		window.showErrorMessage(`Ouranos: Not a valid test file. Not in test folder.`)
		return
	}
	if(!isElixirTestFile(focusedFilename)) {
		window.showErrorMessage(`Not a valid test file.`)
		return
	}

	const cursorPosition = focusedEditor.selection.active.line  + 1
	const appName = getAppName(focusedFilename)
	changeDirectory(appName)
	print(`mix test --no-start ${focusedFilename}:${cursorPosition}`);
	show();
};

const runTestsInFile = () => {
	const focusedEditor = window.activeTextEditor;
	if (!focusedEditor) {
		window.showErrorMessage(`Ouranos: Not a valid test file.`);
		return
	}

	const focusedFilename = focusedEditor.document.fileName;
	if (!isInTestFolder(focusedFilename)) {
		window.showErrorMessage(`Ouranos: Not a valid test file. Not in test folder.`)
		return
	}
	if(!isElixirTestFile(focusedFilename)) {
		window.showErrorMessage(`Not a valid test file.`)
		return
	}

	const appName = getAppName(focusedFilename)
	changeDirectory(appName)
	print(`mix test --no-start ${focusedFilename}`);
	show();
}

export const commands = [
	{
		command: "ouranos.ping",
		handler: ping,
	},
	{
		command: "ouranos.navigate",
		handler: ping,
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

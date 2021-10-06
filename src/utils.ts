import { window } from "vscode";

export function isInTestFolder(filePath: string) {
	return filePath.includes("/test/");
}

export function isElixirTestFile(filePath: string) {
	return filePath.endsWith("_test.exs");
}

export function getAppName(filePath: string) {
	return filePath.replace(/test\/.*/, "");
}

export function getFileName(filePath: string) {
	return filePath.replace(/.*\//, "")
}

function getTerminal() {
	return window.activeTerminal || window.createTerminal();
}

export function changeDirectory(location: string) {
	const terminal = getTerminal();
	terminal.sendText(`cd ${location}`);
}

export function print(command: string) {
	const terminal = getTerminal();
	terminal.sendText(command);
}

export function show() {
	const terminal = getTerminal();
	terminal.show();
}

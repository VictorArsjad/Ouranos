import { window } from "vscode";

export function isInTestFolder(filename: string) {
	return filename.includes("/test/");
}

export function isElixirTestFile(filename: string) {
	return filename.endsWith("_test.exs");
}

export function getAppName(filename: string) {
	return filename.replace(/test\/.*/, "");
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

import {
	changeDirectory,
	getAppName,
	getFilePath,
	getFocusedEditor,
	print,
	show,
	validateFilePath,
} from "../utils";

export const runTestsInFile = () => {
	const focusedEditor = getFocusedEditor();
	if (!focusedEditor) return;

	const focusedFilePath = getFilePath(focusedEditor);
	if (!validateFilePath(focusedFilePath)) return;

	const appName = getAppName(focusedFilePath);
	changeDirectory(appName);
	print(`mix test --no-start ${focusedFilePath}`);
	show();
};
import {
	changeDirectory,
	getAppName,
	getFilePath,
	getFocusedEditor,
	print,
	show,
	validateFilePath,
} from "../utils";

export const runTestInCursor = () => {
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

import * as vscode from "../helpers/code";
import { getAppPath, runOnTerminal, validateFilePath } from "../helpers/utils";

export const runTestInCursor = () => {
	const focusedEditor = vscode.getFocusedEditor();
	if (!focusedEditor) {
		return;
	}

	const focusedFilePath = vscode.getFilePath(focusedEditor);
	if (!validateFilePath(focusedFilePath)) {
		return;
	}
	
	vscode.showProgressBar("Running unit test..");

	const cursorPosition = focusedEditor.selection.active.line + 1;
	const appPath = getAppPath(focusedFilePath);
	runOnTerminal(
		appPath,
		`mix test --no-start ${focusedFilePath}:${cursorPosition}`
	);
};

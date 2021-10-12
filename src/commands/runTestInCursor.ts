import { Vscode } from "../code";
import { getAppPath, runOnTerminal, validateFilePath } from "../utils";

const vscode = new Vscode();

export const runTestInCursor = () => {
	const focusedEditor = vscode.getFocusedEditor();
	if (!focusedEditor) {
		return;
	}

	const focusedFilePath = vscode.getFilePath(focusedEditor);
	if (!validateFilePath(focusedFilePath)) {
		return;
	}

	const cursorPosition = focusedEditor.selection.active.line + 1;
	const appPath = getAppPath(focusedFilePath);
	runOnTerminal(
		appPath,
		`mix test --no-start ${focusedFilePath}:${cursorPosition}`
	);
};

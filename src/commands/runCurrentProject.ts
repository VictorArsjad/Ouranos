import * as vscode from "../helpers/code";
import { getAppPath, getFileDetail, runOnTerminal } from "../helpers/utils";

export const runCurrentProject = () => {
	const focusedFilePath = vscode.getFocusedFilePath();
	if (!focusedFilePath) {
		return;
	}

    const {appName} = getFileDetail(focusedFilePath);
	vscode.showProgressBar(`Running ${appName} Service..`);

	const appPath = getAppPath(focusedFilePath);
	runOnTerminal(
		appPath,
		`mix run --no-halt`
	);
};

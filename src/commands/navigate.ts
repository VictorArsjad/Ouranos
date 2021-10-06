import { Uri, window, workspace } from "vscode";
import { EditorType } from "../enums";
import {
	getFileName,
	getFilePath,
	getFocusedEditor,
	isInTestFolder,
} from "../utils";

export const navigate = () => {
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

const getCurrentFileType = (filePath: string) => {
	if (isInTestFolder(filePath)) {
		return EditorType.Test;
	}
	return EditorType.File;
};

const getPossibleFileName = (fileName: string) => {
	return fileName.replace("_test.exs", ".ex");
};

const getPossibleTestFileName = (fileName: string) => {
	return fileName.replace(".ex", "_test.exs");
};

const openFile = (file: Uri) => {
	return workspace.openTextDocument(file).then(window.showTextDocument);
};

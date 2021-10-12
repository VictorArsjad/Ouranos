import { GlobPattern, Uri, window, workspace } from "vscode";
import { Vscode } from "../code";
import { EditorType } from "../enums";
import { getFileDetail, isInTestFolder } from "../utils";

const vscode = new Vscode();

export const navigate = () => {
	const focusedFilePath = vscode.getFocusedFilePath();
	if (!focusedFilePath) {
		return;
	}

	const {
		absolutePath: absolutePath,
		pathAfterAppName: pathAfterAppName,
		fileName: fileName,
	} = getFileDetail(focusedFilePath);

	switch (getCurrentFileType(absolutePath)) {
		case EditorType.file:
			const possibleTestFilePath = getPossibleTestFilePath(pathAfterAppName + fileName);
			findAndOpenFile(`**/test/**/${possibleTestFilePath}`);
			break;

		case EditorType.test:
			const possibleFilePath = getPossibleFilePath(pathAfterAppName + fileName);
			findAndOpenFile(`**/lib/**/${possibleFilePath}`);
			break;
	}
};

function findAndOpenFile(pattern: GlobPattern) {
	vscode.findFiles(pattern).then((result) => {
		if (isSingleResult(result)) {
			openFile(result[0]);
		} else {
			const output = window.createOutputChannel("Ouranos");
			output.appendLine(result.toString());
		}
	});
}

const isSingleResult = (result: Uri[]) => {
	return result.length === 1;
};

const getCurrentFileType = (filePath: string) => {
	if (isInTestFolder(filePath)) {
		return EditorType.test;
	}
	return EditorType.file;
};

const getPossibleFilePath = (filePath: string) => {
	return filePath.replace("_test.exs", ".ex").replace("test/", "");
};

const getPossibleTestFilePath = (filePath: string) => {
	return filePath.replace(".ex", "_test.exs").replace("lib/", "");
};

const openFile = (file: Uri) => {
	return workspace.openTextDocument(file).then(window.showTextDocument);
};

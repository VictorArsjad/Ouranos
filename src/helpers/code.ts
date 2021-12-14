import { GlobPattern, TextEditor, Uri, window, workspace, ProgressLocation } from "vscode";

export const getFocusedEditor = () => {
	return window.activeTextEditor;
};

export const getFilePath = (editor: TextEditor) => {
	return editor.document.fileName;
};

export const getFocusedFilePath = () => {
	const editor = getFocusedEditor();
	if (!editor) {
		return;
	}
	return getFilePath(editor!!);
};

export const getWorkspace = () => {
	return workspace.workspaceFolders!![0].uri.path;
};

export function getTerminal() {
	return window.activeTerminal || window.createTerminal();
}

export function showErrorMessage(message: string) {
	window.showErrorMessage(`Ouranos: ${message}`);
}

export function findFiles(include: GlobPattern): Thenable<Uri[]> {
	return workspace.findFiles(include, "**/.elixir_ls/**");
}

export function getConfiguration() {
	return workspace.getConfiguration("ouranos");
}

export function showProgressBar(description: string) {
	window.withProgress({
		location: ProgressLocation.Notification,
		title: "Ouranos",
		cancellable: false
	}, (progress) => {
		progress.report({ increment: 0, message: description });
		
		setTimeout(() => {
			progress.report({ increment: 20, message: description });
		}, 1000);

		setTimeout(() => {
			progress.report({ increment: 100, message: "Done!" });
		}, 3000);

		const p = new Promise<void>(resolve => {
			setTimeout(() => {
				resolve();
			}, 5000);
		});

		return p;
	});
}

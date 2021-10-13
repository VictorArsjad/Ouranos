import { GlobPattern, TextEditor, Uri, window, workspace } from "vscode";

export class Vscode {
	public getFocusedEditor = () => {
		return window.activeTextEditor;
	};

	public getFilePath = (editor: TextEditor) => {
		return editor.document.fileName;
	};

	public getFocusedFilePath = () => {
		const editor = this.getFocusedEditor();
		if (!editor) {
			return;
		}
		return this.getFilePath(editor!!);
	};

	public getWorkspace = () => {
		return workspace.workspaceFolders!![0].uri.path;
	};

	public getTerminal() {
		return window.activeTerminal || window.createTerminal();
	}

	public showErrorMessage(message: string) {
		window.showErrorMessage(`Ouranos: ${message}`);
	}

	public findFiles(include: GlobPattern): Thenable<Uri[]> {
		return workspace.findFiles(include, "**/.elixir_ls/**");
	}
}

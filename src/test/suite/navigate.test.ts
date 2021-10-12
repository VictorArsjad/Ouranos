import * as assert from "assert";
import * as vscode from "vscode";
import { navigate } from "../../commands/navigate";

suite("Navigate Test Suite", () => {
	test("selecting navigate in test file should redirect to working file when test file is deep in folders", async () => {
		const testPath =
			"/Users/moka/Projects/gaia-elixir/apps/pegasus/test/workers/hermes/onboarding_flow/onboarding_salesforce_fetch_entity_worker_test.exs";
		const expected =
			"/Users/moka/Projects/gaia-elixir/apps/pegasus/lib/workers/hermes/onboarding_flow/onboarding_salesforce_fetch_entity_worker.ex";

		setupFolder();
		await openFile(testPath);

		navigate();
		await new Promise((f) => setTimeout(f, 2000));

		const focusedEditor = vscode.window.activeTextEditor;
		assert.strictEqual(focusedEditor?.document?.fileName, expected);
	}).timeout(10000);

	test("selecting navigate in working file should redirect to test file when working file is deep in folders", async () => {
		const testPath =
			"/Users/moka/Projects/gaia-elixir/apps/pegasus/lib/workers/hermes/onboarding_flow/onboarding_salesforce_fetch_entity_worker.ex";
		const expected =
			"/Users/moka/Projects/gaia-elixir/apps/pegasus/test/workers/hermes/onboarding_flow/onboarding_salesforce_fetch_entity_worker_test.exs";

		setupFolder();
		await openFile(testPath);

		navigate();
		await new Promise((f) => setTimeout(f, 2000));

		const focusedEditor = vscode.window.activeTextEditor;
		assert.strictEqual(focusedEditor?.document?.fileName, expected);
	}).timeout(10000);
});

//
// "/Users/moka/Projects/gaia-elixir/apps/pegasus/lib/workers/hermes/onboarding_flow/onboarding_salesforce_lead_moderation_worker.ex"

// "/Users/moka/Projects/gaia-elixir/apps/hedwig/test/api/v2/onboardings_controller_test.exs"
// "/Users/moka/Projects/gaia-elixir/apps/hedwig/lib/hedwig/api/v2/onboardings_controller.ex"

// "/Users/moka/Projects/gaia-elixir/apps/herald/lib/herald/endpoint.ex"
// "/Users/moka/Projects/gaia-elixir/apps/herald/test/endpoint_test.exs"

// "/Users/moka/Projects/gaia-elixir/apps/hedwig/test/utils_test.exs"
// "/Users/moka/Projects/gaia-elixir/apps/hedwig/lib/hedwig/utils.ex"

function setupFolder() {
	const workspace = "/Users/moka/Projects/gaia-elixir";

	let folderUri = vscode.Uri.file(workspace);
	vscode.commands.executeCommand("vscode.openFolder", folderUri);
}

async function openFile(testPath: string) {
	let fileUri = vscode.Uri.file(testPath);
	const document = await vscode.workspace.openTextDocument(fileUri);
	await vscode.window.showTextDocument(document);
}

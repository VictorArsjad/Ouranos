import * as assert from "assert";
import * as vscode from "vscode";
import { navigate } from "../../commands/navigate";

const workspace = "/Users/moka/Projects/gaia-elixir";

suite("Navigate Test Suite", () => {
	const tests = [
		{
			path: `${workspace}/apps/pegasus/test/workers/hermes/onboarding_flow/onboarding_salesforce_fetch_entity_worker_test.exs`,
			expected: `${workspace}/apps/pegasus/lib/workers/hermes/onboarding_flow/onboarding_salesforce_fetch_entity_worker.ex`,
		},
		{
			path: `${workspace}/apps/pegasus/lib/workers/hermes/onboarding_flow/onboarding_salesforce_fetch_entity_worker.ex`,
			expected: `${workspace}/apps/pegasus/test/workers/hermes/onboarding_flow/onboarding_salesforce_fetch_entity_worker_test.exs`,
		},
		{
			path: `${workspace}/apps/hedwig/test/saga/serviceability_test.exs`,
			expected: `${workspace}/apps/hedwig/lib/hedwig/saga/serviceability.ex`,
		},
		{
			path: `${workspace}/apps/hedwig/lib/hedwig/saga/serviceability.ex`,
			expected: `${workspace}/apps/hedwig/test/saga/serviceability_test.exs`,
		},
		{
			path: `${workspace}/apps/consumer/test/consumer/passport/onboarding_product_activation_test.exs`,
			expected: `${workspace}/apps/consumer/lib/consumer/passport/onboarding_product_activation/processor.ex`,
		},
		{
			path: `${workspace}/apps/consumer/lib/consumer/passport/onboarding_product_activation/processor.ex`,
			expected: `${workspace}/apps/consumer/test/consumer/passport/onboarding_product_activation_test.exs`,
		},
		{
			path: `${workspace}/apps/hedwig/lib/hedwig/schema/v1/goresto_claim.schema.json`,
			expected: `${workspace}/apps/hedwig/test/schema/v1/goresto_claim_schema_test.exs`,
		},
		{
			path: `${workspace}/apps/hedwig/test/schema/v1/goresto_claim_schema_test.exs`,
			expected: `${workspace}/apps/hedwig/lib/hedwig/schema/v1/goresto_claim.schema.json`,
		}
	];

	for (var index in tests) {
		test(`should navigate correctly for case ${index}`, async () => {
			setupFolder();
			await openFile(tests[index].path);

			navigate();
			await new Promise((f) => setTimeout(f, 2000));

			const focusedEditor = vscode.window.activeTextEditor;
			assert.strictEqual(
				focusedEditor?.document?.fileName,
				tests[index].expected
			);
		}).timeout(10000);
	}
});

function setupFolder() {
	let folderUri = vscode.Uri.file(workspace);
	vscode.commands.executeCommand("vscode.openFolder", folderUri);
}

async function openFile(testPath: string) {
	let fileUri = vscode.Uri.file(testPath);
	const document = await vscode.workspace.openTextDocument(fileUri);
	await vscode.window.showTextDocument(document);
}

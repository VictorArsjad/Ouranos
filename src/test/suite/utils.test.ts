import * as assert from "assert";
import { window } from "vscode";
import { getFileDetail, isInTestFolder } from "../../helpers/utils";

suite("Utils Test Suite", () => {
	suite("getFileDetail for test file", () => {
		const path =
			"/project/gaia-elixir/apps/service_name/test/api/v2/sample_controller_test.exs";
		const expectedFileName = "sample_controller_test.exs";
		const expectedAppPath = "/project/gaia-elixir/apps/service_name/";
		const expectedAppName = "service_name";
		const expectedPathAfterAppName = "test/api/v2/";

		const actual = getFileDetail(path);
		test("should return correct absolutePath", () => {
			assert.strictEqual(actual.absolutePath, path);
		});

		test("should return correct fileName", () => {
			assert.strictEqual(actual.fileName, expectedFileName);
		});

		test("should return correct appPath", () => {
			assert.strictEqual(actual.appPath, expectedAppPath);
		});

		test("should return correct appName", () => {
			assert.strictEqual(actual.appName, expectedAppName);
		});

		test("should return correct pathAfterAppName", () => {
			assert.strictEqual(actual.pathAfterAppName, expectedPathAfterAppName);
		});
	});

	suite("getFileDetail for working file on root folder", () => {
		const path =
			"/project/gaia-elixir/apps/service_name2/lib/service_name2/endpoint.ex";
		const expectedFileName = "endpoint.ex";
		const expectedAppPath = "/project/gaia-elixir/apps/service_name2/";
		const expectedAppName = "service_name2";
		const expectedPathAfterAppName = "lib/service_name2/";

		const actual = getFileDetail(path);
		test("should return correct absolutePath", () => {
			assert.strictEqual(actual.absolutePath, path);
		});

		test("should return correct fileName", () => {
			assert.strictEqual(actual.fileName, expectedFileName);
		});

		test("should return correct appPath", () => {
			assert.strictEqual(actual.appPath, expectedAppPath);
		});

		test("should return correct appName", () => {
			assert.strictEqual(actual.appName, expectedAppName);
		});

		test("should return correct pathAfterAppName", () => {
			assert.strictEqual(actual.pathAfterAppName, expectedPathAfterAppName);
		});
	});

	suite("isInTestFolder", () => {
		const path =
		"/project/gaia-elixir/apps/service_name/test/api/v2/sample_controller_test.exs";

		const invalidPath =
		"/project/gaia-elixir/apps/service_name2/lib/service_name2/endpoint.ex";

		suite("is in test folder", () => {
			const actual = isInTestFolder(path);
			test("should return true when path is in valid test folder", () => {
				assert.strictEqual(actual, true);
			});
		});
		
		suite("is not in test folder", () => {
			const actual = isInTestFolder(invalidPath);
			test("should return false when path is not in test folder", () => {
				assert.strictEqual(actual, false);
			});
		});
	});

	suite("isElixirTestFile", () => {
		const path =
		"/project/gaia-elixir/apps/service_name/test/api/v2/sample_controller_test.exs";

		const invalidPath =
		"/project/gaia-elixir/apps/service_name2/lib/service_name2/endpoint.ex";

		suite("is an elixir test file", () => {
			const actual = isInTestFolder(path);
			test("should return true when file ends with test.exs", () => {
				assert.strictEqual(actual, true);
			});
		});
		
		suite("is an elixir working file", () => {
			const actual = isInTestFolder(invalidPath);
			test("should return false when file does not end with test.exs", () => {
				assert.strictEqual(actual, false);
			});
		});
	});
});

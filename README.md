# Ouranos

VS Code extension for Elixir Test.
## Features

### Ouranos: Ping

Say hello with Ouranos!

### Ouranos: Navigate

Navigate between working file and test file. Click on navigate when active editor is in working file, and Ouranos will automatically open the related test file. Vice versa.

### Ouranos: Run All Tests in Current File

Run all tests in test file, and Ouranos will run test script in the Terminal.

### Ouranos: Run Test in Current Cursor

Run tests in test file, according to the location of current cursor. Ouranos will run test script in the Terminal.

### Ouranos: Update Dependencies

Simple function to run update elixir project dependency on Terminal.

```
$ mix deps.get
```

### Ouranos: Check Lint

Simple function to check elixir project lint on Terminal.

```
$ mix format --check-formatted
```

> More functions coming soon! Stay tuned.

## Extension Settings

> Coming soon!

Include if your extension adds any VS Code settings through the `contributes.configuration` extension point.

Ouranos had several following settings:

* `ouranos.testOption`: change options to the run test command, default: `--no-start`
* `ouranos.showTerminalonRunTest`: enable/disable showing terminal after running tests.

## Known Issues
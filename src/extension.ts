// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import {
	LanguageClient,
	LanguageClientOptions,
	ServerOptions,
	TransportKind,
  } from "vscode-languageclient";

  import {
	SERVER_PATH,
	ServerInitializationOptions,
  } from "@ui5-language-assistant/language-server";

  let client: LanguageClient;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) : Promise<void> {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "xmltoolstest" is now active!');

	const channel = vscode.window.createOutputChannel("UI5Iconify");

	const initializationOptions: ServerInitializationOptions = {
		modelCachePath: context.globalStoragePath,
	  };

	const clientOptions: LanguageClientOptions = {
		documentSelector: [{ scheme: "file", pattern: "**/*.{view,fragment}.xml" }],
		synchronize: {
		  fileEvents: [vscode.workspace.createFileSystemWatcher("**/manifest.json")],
		},
		// Sending a channel we created instead of only giving it a name in outputChannelName so that if necessary we
		// can print to it before the client starts (in this method)
		outputChannel: channel,
		//initializationOptions: initializationOptions,
	  };
	  const debugOptions = { execArgv: ["--nolazy", "--inspect=6009"] };
	  const serverOptions: ServerOptions = {
		run: { module: './langu.ts', transport: TransportKind.ipc },
		debug: {
		  module: './langu.ts',
		  transport: TransportKind.ipc,
		  options: debugOptions,
		},
	  };
	  
	  client = new LanguageClient(
		"UI5Iconify",
		"UI5Iconify",
		serverOptions,
		clientOptions
	  );
	
	  client.start();

	// // The command has been defined in the package.json file
	// // Now provide the implementation of the command with registerCommand
	// // The commandId parameter must match the command field in package.json
	// let disposable = vscode.commands.registerCommand('xmltoolstest.helloWorld', () => {
	// 	// The code you place here will be executed every time your command is executed

	// 	// Display a message box to the user
	// 	vscode.window.showInformationMessage('Hello World from xmltoolstest!');
	// });

	//context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate(): Thenable<void> | undefined {
	if (!client) {
	  return undefined;
	}
	return client.stop();
  }

import path = require("path");

import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('remove-active-file.deleteFile', () => {
    const editor = vscode.window.activeTextEditor;

    if (!editor) { return; }

    const { document } = editor;

    vscode.window
      .showWarningMessage("Do you want to do this file?", { modal: true }, "Yes")
      .then(answer => {
        if (answer === "Yes") { return vscode.workspace.fs.delete(document.uri); }
      })
      .then(() => vscode.window.showInformationMessage(`File ${path.basename(document.fileName)} is deleted`));
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}

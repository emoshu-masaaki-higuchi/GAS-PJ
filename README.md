# Google Apps Script TypeScript Project

このプロジェクトは、Google Apps Script (GAS) を TypeScript で管理し、`clasp` を使ってデプロイするためのテンプレートです。

## 前提条件

- Node.js がインストールされていること
- npm または yarn が使用できること
- Google アカウントがあること

## インストール手順

1. **Node.js をインストール**

   Node.js がインストールされていない場合は、[Node.js 公式サイト](https://nodejs.org/)からダウンロードしてインストールしてください。

2. **プロジェクトのクローン**

   リポジトリをクローンします。

   ```bash
   git clone <リポジトリのURL>
   cd <プロジェクトディレクトリ>
   ```

3. clasp のインストール
   Google Apps Script 用のコマンドラインツール clasp をグローバルにインストール

   ```bash
   npm install -g @google/clasp
   ```

4. Google アカウントにログイン
   clasp を使って Google アカウントにログインします。
   ```bash
   clasp login
   ```
5. 依存パッケージのインストール
   プロジェクトの依存パッケージをインストール

   ```bash
   npm install
   ```

6. Google Apps Script プロジェクトのクローン
   Google Apps Script プロジェクトのスクリプト ID を指定してクローンします。

   ```bash
   clasp clone <スクリプトID>
   ```

7. TypeScript 用の型定義をインストール
   Google Apps Script 用の型定義をインストール
   ```
   npm install --save-dev @types/google-apps-script
   ```

## プロジェクトのディレクトリ構造

```
/your-project
├── dist                    # コンパイル後のJavaScriptファイルが格納される
├── src                     # TypeScriptファイル
│   └── code.ts
├── appsscript.json          # GAS用のプロジェクト設定ファイル
├── package.json             # npmプロジェクト管理ファイル
├── tsconfig.json            # TypeScriptコンパイラの設定ファイル
└── .clasp.json              # claspの設定ファイル
```

## 開発手順

1. TypeScript コードの作成
   src フォルダに TypeScript コードを記述

```js
// src/code.ts
function myFunction() {
  Logger.log("Hello, world!");
}
```

2. TypeScript のコンパイル
   TypeScript ファイルを JavaScript にコンパイル

```bash
npm run build
```

または、ファイルを保存するたびに自動でコンパイルするには以下を実行

```bash
npm run watch
```

3. Google Apps Script へのデプロイ
   clasp push を実行して、Google Apps Script にデプロイ

```bash
clasp push
```

## 設定ファイル

.clasp.json
このファイルでは、Google Apps Script プロジェクトに関する設定

```js
{
  "scriptId": "<スクリプトID>",
  "rootDir": "dist"
}

```

.gitignore

Git で管理しないファイルやフォルダを指定

```bash
node_modules/
dist/
src/*.js
.clasp.json
package-lock.json
```

その他のコマンド<br>
• npm run build: TypeScript を JavaScript にコンパイル<br>
• npm run watch: ファイルを保存するたびに自動コンパイル<br>
• clasp push: Google Apps Script にデプロイ<br>
• clasp pull: Google Apps Script からローカルにスクリプトをダウンロード<br>
<br>
注意点<br>
• clasp login でログインする際は、Google Apps Script にアクセス可能なアカウントを使用してください。<br>
• clasp push 時に複数のファイルがデプロイされる場合、.claspignore を適切に設定して、不要なファイルを無視するようにしてください。<br>
. claspをpushした時めちゃくちゃ時間かかる時はclasp.jsonの設定を変更<br>
```json
{
  "scriptId": "your-script-id",
  "rootDir": "dist"
}
```



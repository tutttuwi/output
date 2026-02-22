# GitHub Pages への自動デプロイ手順

このドキュメントでは、プロジェクトを更新した際に `https://tutttuwi.github.io/` に自動デプロイするための手順を説明します。

**注意**: このプロジェクトは `tutttuwi/output` リポジトリにありますが、デプロイ先は `tutttuwi/tutttuwi.github.io` リポジトリです。

## 前提条件

- GitHub アカウントを持っていること
- リポジトリ `https://github.com/tutttuwi/tutttuwi.github.io` への書き込み権限があること
- ローカルに Git がインストールされていること

## 手順

### 1. Astro 設定ファイルの更新

`astro.config.mjs` の `site` 設定を GitHub Pages の URL に変更します。

```javascript
export default defineConfig({
  site: "https://tutttuwi.github.io",
  base: "/",
  // ... その他の設定
});
```

### 2. Personal Access Token (PAT) の作成

別のリポジトリ（`tutttuwi/tutttuwi.github.io`）にデプロイするため、Personal Access Token を作成する必要があります。

1. GitHub にログインし、**Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)** に移動
2. **Generate new token** → **Generate new token (classic)** をクリック
3. 以下の設定を行います：
   - **Note**: `Deploy to tutttuwi.github.io` など、分かりやすい名前を入力
   - **Expiration**: 有効期限を設定（推奨: 90日または無期限）
   - **Select scopes**: 以下の権限にチェックを入れる
     - `repo` (Full control of private repositories)
4. **Generate token** をクリック
5. **生成されたトークンをコピー**（後で表示されないため、必ずコピーしてください）

### 3. GitHub シークレットの設定

1. `tutttuwi/output` リポジトリの **Settings** → **Secrets and variables** → **Actions** に移動
2. **New repository secret** をクリック
3. 以下の情報を入力：
   - **Name**: `DEPLOY_TOKEN`
   - **Secret**: 先ほど作成した Personal Access Token を貼り付け
4. **Add secret** をクリック

### 4. GitHub Actions ワークフローの確認

`.github/workflows/deploy.yml` ファイルが正しく設定されていることを確認します。このワークフローは以下の処理を行います：

- ビルド成果物を `dist` ディレクトリに生成
- ビルド成果物をアーティファクトとして保存
- `tutttuwi/tutttuwi.github.io` リポジトリにビルド成果物をプッシュ

**重要**: `url` は `https://tutttuwi.github.io` を直接指定しています。これは、`actions/deploy-pages@v4` の `page_url` 出力が現在のリポジトリ（`tutttuwi/output`）の URL を返すためです。

### 5. GitHub Pages の設定

1. GitHub リポジトリ（`https://github.com/tutttuwi/tutttuwi.github.io`）にアクセス
2. **Settings** → **Pages** に移動
3. **Source** セクションで以下を設定：
   - **Source**: `GitHub Actions` を選択
4. 設定を保存

### 6. 初回デプロイの実行

以下のいずれかの方法で初回デプロイを実行します：

#### 方法A: ワークフローを手動実行

1. GitHub リポジトリの **Actions** タブに移動
2. 左側のメニューから **Deploy to GitHub Pages** を選択
3. **Run workflow** ボタンをクリック
4. ブランチを選択して **Run workflow** を実行

#### 方法B: コードをプッシュ

```bash
git add .
git commit -m "Setup GitHub Pages deployment"
git push origin main  # または master
```

### 7. デプロイの確認

- デプロイが完了すると、`https://tutttuwi.github.io/` でサイトが公開されます
- GitHub リポジトリの **Actions** タブでデプロイの進行状況を確認できます
- デプロイが成功すると、リポジトリの **Settings** → **Pages** にデプロイされた URL が表示されます

## 今後の更新方法

プロジェクトを更新したら、以下のコマンドで変更をプッシュするだけで自動的にデプロイされます：

```bash
git add .
git commit -m "Update content"
git push origin main  # または master
```

プッシュ後、GitHub Actions が自動的にビルドとデプロイを実行します。通常、数分でデプロイが完了します。

## トラブルシューティング

### デプロイが失敗する場合

1. **Actions タブでエラーログを確認**
   - どのステップで失敗したかを確認
   - エラーメッセージを確認

2. **よくある問題**
   - `DEPLOY_TOKEN` シークレットが設定されていない、または無効
   - `tutttuwi/tutttuwi.github.io` リポジトリへのアクセス権限がない
   - `astro.config.mjs` の `site` 設定が正しくない
   - ビルドエラー（TypeScript エラーなど）
   - 依存関係のインストールエラー

3. **ローカルでビルドを確認**

   ```bash
   pnpm build
   ```

   ローカルでビルドが成功することを確認してからプッシュ

### サイトが表示されない場合

1. **GitHub Pages の設定を確認**
   - **Settings** → **Pages** で **Source** が `GitHub Actions` になっているか確認

2. **デプロイの完了を待つ**
   - 初回デプロイは数分かかる場合があります
   - **Actions** タブでデプロイが完了しているか確認

3. **ブラウザのキャッシュをクリア**
   - ブラウザのキャッシュをクリアして再読み込み

## 参考リンク

- [Astro の GitHub Pages デプロイガイド](https://docs.astro.build/en/guides/deploy/github/)
- [GitHub Actions ドキュメント](https://docs.github.com/ja/actions)
- [GitHub Pages ドキュメント](https://docs.github.com/ja/pages)

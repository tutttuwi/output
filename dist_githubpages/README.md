
# Portfolio

## デプロイ方法

- [アウトプット用リポジトリ](https://github.com/tutttuwi/output) に定義したワークフローでこのリポジトリを管理しています。

## デプロイフロー

```mermaid
graph TB
    A[tutttuwi/output<br/>リポジトリ] -->|mainブランチにpush| B[GitHub Actions<br/>ワークフロー実行]
    B --> C[ビルド実行]
    C --> D[dist ディレクトリ生成]
    C --> E[dist_githubpages ディレクトリ生成]
    C --> F[src/content/spec/about.md 読み込み]
    
    D --> G[tutttuwi/tutttuwi.github.io<br/>リポジトリ masterブランチ]
    E --> G
    G --> H[https://tutttuwi.github.io<br/>サイト公開]
    
    F --> I[tutttuwi/tutttuwi<br/>リポジトリ mainブランチ]
    I --> J[README.md として反映<br/>GitHubプロフィール表示]
    
    style A fill:#e1f5ff
    style G fill:#fff4e1
    style I fill:#ffe1f5
    style H fill:#e1ffe1
    style J fill:#e1ffe1
```

## リポジトリ間の関係

- **tutttuwi/output**: ソースコードリポジトリ（このリポジトリ）
  - 更新内容をmainブランチにpushすると自動デプロイが開始されます
  
- **tutttuwi/tutttuwi.github.io**: GitHub Pages公開用リポジトリ
  - `dist`と`dist_githubpages`の内容が自動的にデプロイされます
  - `https://tutttuwi.github.io`でサイトが公開されます
  
- **tutttuwi/tutttuwi**: GitHubプロフィール表示用リポジトリ
  - `src/content/spec/about.md`の内容が`README.md`として自動更新されます
  - GitHubプロフィールページに表示されます

---
title: ClaudeCodeで抑えておく機能
published: 2026-04-28
description: ""
image: ""
tags:
  - claudecode
  - AI
category: ブログ
draft: false
lang: ""
---

## 概要

Claude Code は Anthropic が提供する CLI ベースの AI コーディングエージェントです。単なる「コード補完ツール」ではなく、**ファイル操作・シェル実行・Web 検索・サブエージェント呼び出し**といった機能を組み合わせて、設計→実装→レビュー→コミットまで一連の開発ワークフローをこなせる点が特徴です。

ただし機能が豊富なため、「とりあえず使う」だけだと コンテキスト肥大・無限ループ・誤操作 などの落とし穴にハマりがちです。本記事では Claude Code を実務で使ううえで **押さえておくべき主要機能** と、それぞれの**ベストプラクティス／アンチパターン／活用事例**をまとめます。

## 目次
- [CLAUDE.md（プロジェクト記憶ファイル）](#claudemdプロジェクト記憶ファイル)
- [Skills（再利用可能な手順書）](#skills再利用可能な手順書)
- [自動承認モード（permission mode）](#自動承認モードpermission-mode)
- [コンテキストサイズと /compact](#コンテキストサイズとcompact)
- [マルチエージェント（Sub-agents）](#マルチエージェントsub-agents)
- [リモート Claude（Remote Agents / Sandbox）](#リモートclauderemote-agents--sandbox)
- [Hooks（イベントフック）](#hooksイベントフック)
- [Plugins](#plugins)
- [Chrome 拡張](#chrome拡張)
- [GitHub 連携](#github連携)
- [その他押さえておきたい機能](#その他押さえておきたい機能)
- [全体ベストプラクティスまとめ](#全体ベストプラクティスまとめ)

---

## CLAUDE.md（プロジェクト記憶ファイル）

### 機能概要

Claude Code は起動時にカレントディレクトリ及び親ディレクトリの `CLAUDE.md` を**自動的に読み込み**、システムプロンプトに追加します。プロジェクト固有のコーディング規約・ディレクトリ構造・ビルドコマンド・禁止事項などを記述することで、毎回指示し直す必要がなくなります。

階層は以下の優先順で読み込まれます：

| スコープ | パス | 用途 |
|---------|------|------|
| ユーザー | `~/.claude/CLAUDE.md` | 個人の好み（言語、口調、共通ルール） |
| プロジェクト | `<repo>/CLAUDE.md` | チーム共有のルール（Git にコミット） |
| ローカル | `<repo>/CLAUDE.local.md` | 個人用の上書き（`.gitignore` 推奨） |
| サブディレクトリ | `<repo>/path/to/CLAUDE.md` | 特定モジュール固有のルール |

### 使い方

`/init` コマンドを叩くと、Claude が**リポジトリを走査して CLAUDE.md の雛形を自動生成**してくれます。

```bash
# 起動して
claude

# プロジェクトのルートで
/init
```

記載すべき主要項目：

```markdown
# Project Overview
- 何のプロジェクトか / 主要技術スタック

# Build & Test Commands
- `pnpm install` / `pnpm test` / `pnpm lint` などよく使うコマンド

# Code Style
- 言語別のコーディング規約
- コメントは日本語、識別子は英語、など

# Architecture
- 主要ディレクトリの責務
- 依存関係の方向

# Do / Don't
- 直接編集禁止のファイル
- 触ってはいけない設定
```

### ベストプラクティス

- **「コマンド一覧」を必ず書く**：Claude は知らないとビルドコマンドを推測しがち。明示すれば確実にそれを使う。
- **Don't（禁止事項）を明確に**：「`migrations/` 配下のファイルは編集しない」など、人間が暗黙に守っているルールほど書く価値が高い。
- **長くなりすぎない**：CLAUDE.md は毎ターンのコンテキストに乗る。500 行を超えたら **Skills に切り出す**。

### アンチパターン

- ❌ README をそのままコピー → 不要な情報でコンテキストを汚染
- ❌ 「丁寧に説明してください」など曖昧な指示 → 守られない
- ❌ 全社共通ルールをプロジェクト CLAUDE.md に書く → ユーザースコープに置くべき

### 活用事例

- モノレポで各パッケージの README 代わりに `packages/*/CLAUDE.md` を配置し、Claude にそのパッケージ内の作業をさせる
- DB スキーマ規約を `db/CLAUDE.md` に書き、SQL マイグレーション生成を任せる

---

## Skills（再利用可能な手順書）

### 機能概要

**Skills** は「特定タスクの手順書」をディレクトリ単位で定義し、必要な時だけロードできる仕組みです。CLAUDE.md と違って**常時ロードされない**ため、コンテキストを節約しつつ、複雑な手順を再現性高く実行できます。

```
~/.claude/skills/
├── pr-review/
│   ├── SKILL.md           # 説明（先頭の YAML フロントマターでトリガー定義）
│   └── scripts/...        # 補助スクリプトも置ける
└── deploy-staging/
    └── SKILL.md
```

`SKILL.md` の冒頭に `description` を書くと、Claude がユーザーの要求と照らし合わせて**自動的に適切な Skill を起動**します。

### 使い方

```markdown
---
name: pr-review
description: |
  GitHub PR のレビューを実施する。差分取得・テスト確認・
  コメント投稿までを行う。「PR レビューして」と言われたら起動。
---

# PR Review Skill
1. `gh pr view` で対象 PR を取得
2. `gh pr diff` で差分取得
3. レビュー観点（セキュリティ、パフォーマンス、可読性）でチェック
4. `gh pr review --comment` でコメント投稿
```

明示的に呼び出すこともできます：

```
/pr-review 1234
```

### ベストプラクティス

- **「定型作業」を Skill 化**：リリース、コードレビュー、調査レポート生成など、毎回似た手順を踏むものは Skill にすると再現性が上がる。
- **description はトリガー条件を具体的に**：「いつ起動すべきか／すべきでないか」を書くと誤起動が減る。
- **Skill 内で別 Skill を呼ぶ**：合成して大きなワークフローを作れる。

### アンチパターン

- ❌ 1 回しか使わない処理を Skill 化 → 普通に依頼すれば良い
- ❌ description が曖昧 → 起動されない or 誤起動
- ❌ 巨大スクリプトを SKILL.md に直書き → `scripts/` に分割する

### 活用事例

- `security-review`：差分に対してセキュリティ観点のレビューを実施
- `init`：新規プロジェクトに `CLAUDE.md` を生成
- `simplify`：直近の差分をリファクタしてシンプル化

---

## 自動承認モード（permission mode）

### 機能概要

Claude Code は安全のため、ファイル書き込みやシェル実行のたびに**確認プロンプト**を出します。これを制御するのが permission mode です。

| モード | 挙動 |
|--------|------|
| `default` | 危険な操作のみ確認 |
| `acceptEdits` | ファイル編集のみ自動承認 |
| `plan` | 計画のみ立てて実行はしない（読み取り専用） |
| `bypassPermissions`（俗称：YOLO モード） | **すべて自動実行**（要注意） |

起動時オプションや実行中の `Shift+Tab` で切り替え可能。

```bash
# 起動時に指定
claude --permission-mode acceptEdits

# 完全自動（サンドボックス環境でのみ推奨）
claude --dangerously-skip-permissions
```

### ベストプラクティス

- **通常作業は `acceptEdits`**：編集の確認プロンプトが減るだけでも体感が大きく変わる。
- **読むだけなら `plan` モード**：調査や設計レビューはこれで十分。
- **完全自動は隔離環境で**：Docker / Devcontainer / `git worktree` 内で動かす。
- `.claude/settings.json` で **特定コマンドのみ allowlist** にしておけば、permission prompt の発生回数を減らせる。

```json
{
  "permissions": {
    "allow": [
      "Bash(pnpm test*)",
      "Bash(pnpm lint*)",
      "Bash(git status)",
      "Bash(git diff*)"
    ]
  }
}
```

### アンチパターン

- ❌ 本番リポジトリで最初から `--dangerously-skip-permissions` → `rm -rf` 系の事故が起きうる
- ❌ allowlist に `Bash(*)` を入れる → 自動承認の意味がない
- ❌ `git push --force` を allowlist に入れる → 取り返しがつかなくなる

### 活用事例

- 大量のリファクタを夜間に流すとき、サンドボックスで YOLO モード ＋ Hooks でテスト自動実行
- レビュー専用エイリアス：`alias claude-review='claude --permission-mode plan'`

---

## コンテキストサイズと /compact

### 機能概要

LLM には扱える**コンテキストウィンドウ**（Claude Sonnet 4.5/4.6 系で 200K〜1M トークン）があり、会話が長引くと制限に達します。Claude Code はこれを軽減するため：

- **`/compact`**：会話履歴を要約して圧縮（手動実行）
- **自動コンパクション**：上限近くで自動的に要約
- **`/clear`**：履歴を完全リセット

### 使い方

```
# 手動で要約
/compact

# 要約のヒントを指定
/compact 「現在のリファクタリングの進捗とTODOを残して圧縮して」

# 完全リセット（タスク切替時）
/clear
```

### ベストプラクティス

- **タスクが切り替わったら `/clear`**：前のタスクの記憶は新タスクのノイズになる。
- **長期タスクは `/compact` を意識的に**：自動コンパクションは予測しにくい。区切りで明示的に呼ぶと精度が安定する。
- **重要事項はファイルに書き出す**：TODO / 設計メモは `notes/` などに残せば、`/clear` してもファイル経由で復元可能。
- **キャッシュを温存する操作を選ぶ**：プロンプトキャッシュは 5 分 TTL。`/compact` 直後など、キャッシュが切れる操作の連発はコスト増につながる。

### アンチパターン

- ❌ 1 セッションで何時間も同じスレッドを使い続ける → コストも品質も悪化
- ❌ `/compact` を何度も連打 → 要約の要約で情報が劣化
- ❌ 大きなファイル全体を何度も Read → コンテキストを圧迫。Grep / 範囲指定 Read を使う

### 活用事例

- 長時間の調査タスクで「中間レポートを `report.md` に保存 → `/clear` → 続き」というワークフロー
- マルチタスクの並走時、`git worktree` ＋ 別セッションで分離

---

## マルチエージェント（Sub-agents）

### 機能概要

Claude Code には **Agent ツール**があり、メインのエージェントから**サブエージェント**を起動して、独立したコンテキストで作業させられます。

| エージェント種別 | 用途 |
|-----------------|------|
| `Explore` | 高速な調査専用（読み取りのみ） |
| `general-purpose` | 何でもこなす汎用エージェント |
| `Plan` | 設計・計画立案専用 |
| カスタム | `.claude/agents/*.md` で独自定義可能 |

### 使い方

メインエージェントが「広範な調査」「独立検証」「設計レビュー」を必要とした際に内部的に呼び出します。ユーザーが明示的にお願いすることも可能：

```
このコードベースで認証周りの実装をすべて洗い出して。Exploreエージェントを使って。
```

カスタムエージェント定義例 `.claude/agents/sql-reviewer.md`：

```markdown
---
name: sql-reviewer
description: SQLマイグレーションをレビューし、ロック・性能観点で問題を指摘
tools: [Read, Grep, Bash]
---
あなたはDB専門家です。以下を確認してください：
- NOT NULL 追加時のロック影響
- インデックスの妥当性
- 後方互換性
```

### ベストプラクティス

- **コンテキスト分離が目的**：メインエージェントの履歴を汚さずに済む大量の調査・検証はサブに任せる。
- **独立した「セカンドオピニオン」に使う**：レビュアーや設計レビューには別エージェントが効く。
- **並列実行できる場合は並列で**：複数の独立調査は 1 メッセージで並列スポーン。

### アンチパターン

- ❌ 些細な質問でも毎回サブエージェント → 起動コストの無駄
- ❌ サブにあいまいな指示「いい感じにして」 → 独立コンテキストなので余計に迷子になる
- ❌ サブの結果を鵜呑み → 「やったつもり」の幻覚に注意。実ファイルを確認する

### 活用事例

- 大規模リファクタの「事前調査 → 計画 → 実装 → レビュー」を 4 つのサブで分業
- セキュリティレビュー時に `general-purpose` ＋ `security-review` Skill を併用

---

## リモートClaude（Remote Agents / Sandbox）

### 機能概要

ローカルマシンを占有せずに、**Anthropic 側のサンドボックス（または GitHub Actions などのリモート実行環境）**で Claude Code を走らせる機能群です。代表的なものに：

- **Anthropic 公式の Cloud Agents / Routines**：cron スケジュールで自動実行
- **GitHub Actions 連携**：PR コメントで `@claude` メンションするとサンドボックス内で実行
- **Devcontainer / Docker 内実行**：自前のサンドボックス

### 使い方

cron 風のスケジュール実行（例）：

```
/schedule "毎日 9:00 に dependabot PR をレビューしてマージ可能なものは approve"
```

GitHub PR でのメンション：

```
@claude このPRをレビューして、テストの不足を指摘してください
```

### ベストプラクティス

- **「夜間バッチ」用途に最適**：定期的な依存更新・脆弱性スキャン・ドキュメント整備など。
- **権限を最小化**：リモート Claude が触れる範囲を GitHub App の権限で絞る（特定リポのみ、特定 Action のみ）。
- **シークレット管理**：API キーは Repo Secrets 経由。Claude のログに漏れないよう Hooks でマスク。

### アンチパターン

- ❌ 本番デプロイ権限まで渡す → 想定外コミットでロールアウトされる事故
- ❌ ログ未確認で長期間放置 → 暴走に気付けない
- ❌ コスト管理なしで cron 連打 → API 費用が膨らむ

### 活用事例

- 毎日 9:00 に「昨日マージされた PR を要約して Slack へ投稿」
- 毎週月曜に「ライブラリ更新 PR を作成」

---

## Hooks（イベントフック）

### 機能概要

Claude Code には **ライフサイクルイベント**があり、各イベントで任意のシェルコマンドを実行できます。設定は `.claude/settings.json` の `hooks` フィールド。

| イベント | タイミング |
|---------|------------|
| `PreToolUse` | ツール実行直前 |
| `PostToolUse` | ツール実行直後 |
| `UserPromptSubmit` | ユーザー入力送信時 |
| `Stop` | エージェント停止時 |
| `SubagentStop` | サブエージェント停止時 |
| `Notification` | 確認プロンプト発生時 |

### 使い方

`.claude/settings.json` 例：

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          { "type": "command", "command": "pnpm lint --fix" }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          { "type": "command", "command": "osascript -e 'display notification \"Claude finished\"'" }
        ]
      }
    ]
  }
}
```

### ベストプラクティス

- **編集後は自動 lint / format**：人間がレビューするときに無駄な指摘が減る。
- **ガードレールに使う**：`PreToolUse` で「特定ファイルへの編集を拒否」など。
- **完了通知**：長時間タスクの終了を macOS 通知 / Slack で受け取る。

### アンチパターン

- ❌ Hook で重い処理（フルテストなど）→ 体感が極端に遅くなる
- ❌ 失敗しても無視するスクリプト → 通った気になる落とし穴
- ❌ 無限ループを作るフック（編集→lint→ファイル書き換え→編集 …）

### 活用事例

- `PostToolUse` で `prettier --write` → 常にフォーマット済み
- `Stop` フックで `notify-send` ＋ ベル音
- `PreToolUse` で本番DBに接続しようとした場合に拒否

---

## Plugins

### 機能概要

**Plugin** は Skills / Hooks / Agents / Commands をパッケージ化して**配布可能にする仕組み**です。`marketplace` から追加でき、社内独自の Plugin を Git リポジトリで公開することも可能です。

### 使い方

```
# Plugin 一覧
/plugins

# 追加（マーケットプレイス）
/plugins install anthropic/code-review

# 自社プラグインを Git から
/plugins install git+ssh://git@github.com/myorg/claude-plugins.git
```

Plugin の中身（例）：

```
my-plugin/
├── plugin.json          # メタデータ
├── skills/
│   └── deploy/SKILL.md
├── agents/
│   └── reviewer.md
└── hooks/
    └── post-edit.sh
```

### ベストプラクティス

- **チーム共通の作法を Plugin 化**：CLAUDE.md だけでは表現しきれない複合的な機能（Skill ＋ Hook ＋ Agent）をひとまとめに配布。
- **バージョニング**：Plugin の更新で挙動が変わると事故になるのでセマンティックバージョニングを徹底。

### アンチパターン

- ❌ 信頼できないソースから入れる → Hook で任意コマンド実行されるリスクあり
- ❌ 1 機能だけの Plugin を乱立 → Skill 単体で十分

### 活用事例

- 社内デプロイフローをまるごと Plugin 化（Skill: deploy-staging / Hook: 自動 changelog 更新 / Agent: deploy-reviewer）

---

## Chrome拡張

### 機能概要

Claude Code 関連の Chrome 拡張は、**ブラウザの内容（選択テキスト、PR、Issue、Stack Overflow など）を Claude にワンクリックで渡す**ためのものです。代表的には：

- **Claude for Chrome**：ページの選択範囲・URL を取得して Claude のコンテキストに送る
- **Obsidian 連携拡張**：Web → Obsidian → Claude の動線

### 使い方

1. 拡張をインストール
2. ページ上で対象テキストを選択
3. 拡張のショートカットキーで Claude に送信
4. ローカルの Claude Code セッションがコンテキスト付きで起動

### ベストプラクティス

- **長文のドキュメントを丸ごと送らない**：必要部分のみ選択。
- **機密ページでは無効化**：社内 Wiki などで送信先を誤らないよう、ドメイン制限を設定。

### アンチパターン

- ❌ 「全ページ送信」→ コンテキスト浪費 ＋ 情報漏洩リスク
- ❌ 拡張を経由してログを残さない → 何を送ったか後から確認できない

### 活用事例

- LeetCode / AtCoder の問題ページから直接 Claude に解法を相談
- GitHub Issue を選択 → 関連する自分のコードベースを Claude に調査させる

---

## GitHub連携

### 機能概要

Claude Code には **GitHub 公式 App** があり、PR・Issue 上で `@claude` メンションすると、リモート Claude が起動して以下を実行できます：

- PR レビュー＋コメント投稿
- Issue から PR 自動作成（実装 → ブランチ作成 → PR）
- CI 失敗時の自動リトライ・修正提案

ローカル CLI からも `gh` コマンド経由で密接に連携できます。

### 使い方

```bash
# Claude Code 内から
gh pr create --title "feat: add X" --body "..."
gh pr review 123 --approve
gh issue list --label bug
```

PR コメントで：

```
@claude このコメントの指摘を反映してコミットしてください
```

### ベストプラクティス

- **GitHub App の権限は最小化**：必要なリポのみ、必要なスコープのみ。
- **`gh` を活用**：ローカル Claude Code は `gh` で十分強力。コードレビュー、PR 作成、リリースノート作成までこなせる。
- **CI と組み合わせる**：CI 失敗 → Claude にスタックトレースを渡して修正案、というループ。

### アンチパターン

- ❌ `main` への直接 push 権限を Claude に与える → ロールバック不能事故
- ❌ Issue の自動 PR 化を「全 Issue」に適用 → ノイズ PR が量産される
- ❌ レビュー結果を盲信して即マージ → 必ず人間のサインオフを残す

### 活用事例

- Issue ラベル `claude-task` が付いたものだけ自動で PR ドラフト化
- リリース前に過去 1 週間の PR を Claude が要約してリリースノート生成

---

## その他押さえておきたい機能

### Worktree / Isolation
`git worktree` を使った**分離実行**で、メインブランチに影響を与えずに並列タスクを走らせられる。エージェント呼び出し時に `isolation: "worktree"` を指定可能。

### Background tasks
`run_in_background` 付きで Bash 実行すると、長時間タスクをバックグラウンド化できる。`Monitor` でログのストリーミング監視。

### MCP（Model Context Protocol）
外部のツールサーバー（DB、Slack、Figma など）を MCP サーバーとして接続でき、Claude が直接呼び出せる。`.mcp.json` に定義。

### Slash Commands（カスタム）
`.claude/commands/*.md` でプロジェクト固有のコマンドを定義可能。Skill よりも軽量、テンプレート的な使い方に向く。

### Settings 階層
- `~/.claude/settings.json`（個人）
- `<repo>/.claude/settings.json`（プロジェクト共通、コミット）
- `<repo>/.claude/settings.local.json`（個人ローカル、`.gitignore`）

### キャッシュ最適化
プロンプトキャッシュは 5 分 TTL。短時間に繰り返し呼ぶワークロードは安く速くなる。逆に **5 分超え** での待機はコストが膨らむので注意。

---

## 全体ベストプラクティスまとめ

### 「効く順」で導入する
1. **CLAUDE.md** を整備（最大の費用対効果）
2. **`.claude/settings.json` の allowlist** で permission prompt を減らす
3. **Hooks** で lint / format / 完了通知を自動化
4. **Skills** で定型作業をパッケージ化
5. **マルチエージェント / Plugins / リモート** は必要になってから

### 安全運用の三原則
- 🔒 **権限は最小・段階的に**：`plan` → `default` → `acceptEdits` → `bypass` の順に上げる
- 🔒 **隔離環境で攻めた使い方**：Docker / worktree / リモートサンドボックス
- 🔒 **コミットは人間が確認**：`git commit` の自動化はしても、push 前のレビューは残す

### コスト・速度の三原則
- ⚡ **タスク切替で `/clear`**
- ⚡ **大きなファイルは Grep / 範囲 Read**
- ⚡ **5 分以内ならキャッシュ温存、長く待つなら一気に**

### 失敗パターンの早期発見
- エージェントが**同じツールを繰り返す**ようになったら無限ループの兆候 → 一度止める
- **「やりました」と言うが diff がない** → 必ず `git status` / `git diff` で確認
- **要約後に話が噛み合わない** → `/compact` の劣化、`/clear` ＋ 要点ファイル読み直しに切り替え

---

Claude Code はあくまで「優秀だが新人のチームメイト」です。**CLAUDE.md で文化を共有し、Hooks でガードレールを敷き、Skills と Plugins で標準作業を整備する**ことで、長期的に安定したパフォーマンスを引き出せます。逆に何も整備せず権限だけ広げると、便利さと裏腹に事故率が上がるので、上記のベストプラクティスを段階的に取り入れていくのがおすすめです。

---
title: rbenvの設定方法について
published: 2026-03-13
description: ''
image: ''
tags: ['markdown']
category: 'ブログ'
draft: false
lang: ''
---

## 概要

flutter開発していて、以下の構成で進めていたが、cocoapodsが不安定になってきたので、gemfileのバージョン固定に乗り換えるためにrbenvの設定方法についてまとめます。

- 元々の構成

| ツール    | 管理 |
| --------- | ---- |
| rbenv     | brew |
| ruby      | brew |
| cocoapods | brew |

- Gemfile構成

| ツール    | 管理          |
| --------- | ------------- |
| rbenv     | brew          |
| ruby      | rbenv/Gemfile |
| cocoapods | rbenv/Gemfile |

**fastlane**などを動かす場合は、同じくGemfileでバージョン固定するのが良さそう

## 1. Homebrewでrbenvをインストール

まずはパッケージマネージャーのHomebrewを使って、rbenvと、Rubyのビルドに必要な`ruby-build`をインストールします。

```bash
brew update
brew install rbenv ruby-build

```

## 2. シェルの設定（パスを通す）

インストールしただけではrbenvは動きません。お使いのシェル（多くの場合はZsh）の設定ファイルに、rbenvを初期化する記述を追加します。

```bash
echo 'eval "$(rbenv init -)" ' >> ~/.zshrc
source ~/.zshrc

```

> **Note:** Bashを使っている場合は `~/.zshrc` を `~/.bash_profile` に読み替えてください。

## 3. Ruby 4.0.1 のインストール

次に、目的のバージョンをインストールします。

```bash
# インストール可能なリストを更新
brew upgrade ruby-build

# 4.0.1 がリストにあるか確認
rbenv install -l | grep 4.0.1

# インストール実行
rbenv install 4.0.1

```

## 4. バージョンの切り替え

インストールが終わったら、PC全体（global）で使うバージョンを4.0.1に固定します。

```bash
rbenv global 4.0.1

# 反映を確認
ruby -v

```

---

### よくあるトラブルと解決策

- **「4.0.1が見つからない」と言われる場合**: `brew upgrade ruby-build` を実行して、rbenvが最新のRubyを知っている状態にしてください。
- **ビルドエラーが出る場合**: Xcode Command Line Toolsが必要です。`xcode-select --install` を実行してから再度試してみてください。

---

Ruby 4.0.1の準備が整いましたね！次に、プロジェクトでライブラリ（Gem）を管理するための **Gemfile** を作成しましょう。

最も一般的で「作法」に則った方法は、**Bundler** というツールを使う方法です。

---

**ここからはGemfileのセットアップ**

## 1. Bundlerをインストールする

Ruby 4.0系であれば標準で含まれていることが多いですが、念のため最新をインストールします。

```bash
gem install bundler

```

## 2. Gemfileを自動生成する

プロジェクトのルートディレクトリ（作業フォルダ）に移動して、以下のコマンドを叩きます。

```bash
bundle init

```

これだけで、カレントディレクトリに `Gemfile` という名前のファイルが作成されます。

## 3. Gemfileの中身を編集する

生成された `Gemfile` をテキストエディタで開き、必要なライブラリを記述します。

```ruby
# frozen_string_literal: true

source "https://rubygems.org"

# 使用するRubyのバージョンを指定（チーム開発で役立ちます）
ruby "4.0.1"

# インストールしたいGemをここに書く
gem "rails"
gem "sqlite3"

```

## 4. ライブラリをインストールする

記述が終わったら、ターミナルで以下のコマンドを実行します。

```bash
bundle install

```

これにより、Gemのインストールと同時に **`Gemfile.lock`** というファイルが生成されます。これは「どのバージョンのGemをインストールしたか」を正確に記録する重要なファイルです。

---

### Gemfile管理のイメージ

Gemfileは「注文書」、Gemfile.lockは「納品書（確定版）」のような関係です。

---

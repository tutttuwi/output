---
title: rbenvの設定方法について
published: 2026-02-25
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

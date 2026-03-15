---
title: flutter fvm 設定について
published: 2026-03-16
description: ''
image: ''
tags: ['markdown']
category: 'スクラップ'
draft: false
lang: ''
---

## 概要

fvmのセットアップ方法をまとめます。

```zsh
# インストール
brew tap leoafarias/fvm
brew install fvm

# flutter install
# インストールできるリストを確認
fvm releases

# インストール
fvm stable
fvm 3.41.4

# インストールされているリストを確認
fvm list

# 環境変数設定
echo -e "\n# FVM Global Flutter Path\nexport PATH=\"\$PATH\":\"\$HOME/fvm/default/bin\"" >> ~/.zshrc
source ~/.zshrc

# バージョン確認
flutter --version

```

- プロジェクトローカルで指定する方法

```zsh
# プロジェクトローカルで指定
fvm use <使用したいバージョン>
# 作成されるファイル) .fvm/fvm_config.json

# 他メンバが開いたときに指定されたバージョンのインストール
fvm install

```

That's all!

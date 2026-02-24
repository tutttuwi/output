---
title: 現場で使える Ruby on Rails 5速習実践ガイド
published: 2020-08-20
tags: ["教科書", "Ruby"]
category: 書籍
draft: false
---


# 現場で使える Ruby on Rails 5速習実践ガイド（ISBN978-4-8399-6222-7）

## 理解したこと

## 書籍サイト

<https://book.mynavi.jp/ec/products/detail/id=93905>

## サポートサイト

<https://book.mynavi.jp/supportsite/detail/9784839962227.html>

## 書籍情報

Railsアプリの基本から実践的なノウハウまでこの1冊で！本書は、Ruby on Rails（以下Rails）を使ってWebアプリケーションを開発するための解説書です。

RailsでどのようにWebアプリケーションを作るのかという基本的なところから、現場のニーズに合わせてどのように機能を追加していくのか、テストはどのように行うのか、複数人で開発していく場合の方法といった実践的なトピックまで、幅広くカバーしています。

本書を読んだ方が単にRailsでWebアプリケーションを作れるようになるだけでなく、「Railsらしいアプリケーションコード」を書けるようになり、そして開発チームの仲間とともに実現したいことを実現できるように、という視点で必要な情報をまとめた1冊です。


なお、本書の対応バージョンはRuby 2.5／Rails5.2です。Rails5.2から導入されたActive Storageやcredentials.yml.encについても解説しています。macOS／Windows 10（64ビット版）対応。


■読者対象について

Ruby以外の言語でのWebアプリケーションの開発や、オブジェクト指向プログラミングについては知識・経験があるものの、RubyやRailsについては初めて学ぶ方を主な対象にしています。

ただし、Webアプリケーションやオブジェクト指向が初めての方にも理解しやすいように説明するように努めています。


■構成と内容について

本書の構成は以下の通りです。

＜入門編＞
Chapter 1 RailsのためのRuby入門
Chapter 2 Railsアプリケーションをのぞいてみよう
Chapter 3 タスク管理アプリケーションを作ろう

＜レベルアップ編＞
Chapter 4 現実の複雑さに対応する
Chapter 5 テストをはじめよう
Chapter 6 Railsの全体像を理解する
Chapter 7 機能を追加してみよう

＜発展編＞
Chapter 8 RailsとJavaScript
Chapter 9 複数人でRailsアプリケーションを開発する
Chapter 10 Railsアプリケーションと長く付き合うために


章ごとの内容は以下の通りです。


Chapter1では、Railsのアプリケーションのコードを読み書きするために最低限必要となるようなRubyの基礎知識を解説していきます。

Chapter2では、RubyやRailsが動作する環境を構築するとともに、簡単なサンプルアプリケーションを作成し、中身の構成を解説していきます。

Chapter3では、シンプルなタスク管理アプリケーションの作成を通じて、CRUDと呼ばれるソフトウェアの基本的な機能をRailsで実装する方法について学んでいきます。

Chapter4では、Chapter3で作成したアプリケーションに、いくつかの機能を追加していきます。具体的には「データ内容の制限」「検証」「コールバック」「フィルタ」「ログイン機能の追加」「関連」「検索」について解説していきます。

Chapter5では、Railsにあらかじめ用意されている「自動テスト」という仕組みについて、利用方法や注意事項を解説します。

Chapter6では、Railsの備える機能や、Railsを取り巻く世界の全体像を改めて一望し、これまで取り上げる機会のなかったいくつかの重要な要素について解説していきます。

Chapter7では、Railsアプリケーションで比較的よくある具体的な機能を実現するやり方を、Chapter4までで作成したアプリケーションへの機能追加という形で紹介していきます。

Chapter8では、Railsを利用する際のJavaScriptの扱い方について解説していきます。モダンなJavaScriptについても扱っています。

Chapter9では、複数人で開発を行う場合に重要になってくる知識や、注意すべきポイントについて解説していきます。

Chapter10では、Railsアプリケーションと長く付き合っていくために特に重要なテーマとして、「バージョンアップに対してどのように取り組むべきか」「Railsアプリケーションコードが複雑になっていくことにどうに立ち向かい、メンテナンスしやすい状態の維持を図るのか」について扱います。

## ＜入門編＞

## Chapter 1 RailsのためのRuby入門

## 1-1 オブジェクトを理解しよう

### 1-1-1 万物がオブジェクト

- オブジェクトという存在になれましょう
  - ※詳細割愛

### 1-1-2 irb

- Rubyには、`irb(アイアールビー)`という、対話的な実行環境が付属している
- オブジェクトがどういうものかを体験していただくために操作しながら読みすすめる

- 以下から実行環境を取得しておいた
  - <https://rubyinstaller.org/>

### 1-1-3 文字列

- ダウブルクォーテーションかシングルクォーテーションで文字列を囲む
  - 違い：<https://qiita.com/ryosuketter/items/ddad508cb0124e4fe378>

### 1-1-4 数値

### 1-1-5 オブジェクトに、自分が何者かを聞いてみる

```ruby
irb(main):006:0> "氏名".class
=> String
irb(main):007:0> 1.class
=> Integer
irb(main):008:0> 1.1.class
=> Float
irb(main):009:0> true.class
=> TrueClass
irb(main):010:0> false.class
=> FalseClass
irb(main):013:0> "氏名".object_id
=> 300
irb(main):014:0> "氏名".object_id
=> 320
irb(main):015:0> "氏名".object_id
=> 340
irb(main):016:0> 1.object_id
=> 3
irb(main):017:0> 1.object_id
=> 3
// 数値は同じオブジェクトIDを取るが、文字列は異なるオブジェクトIDを取る
// この辺はJavaのプリミティブ型、参照型と同じ概念のよう
```

### 1-1-6 クラスとインスタンス

- 「オブジェクトXのクラスがAであるとき、XはAのインスタンス（オブジェクト）である」といいます。

### 1-1-7 オブジェクトの機能はクラスで決まる

- オブジェクトの種類により、プロパティなどが異なりますよという説明

### 1-1-8 変数

- ローカル変数の記載
  - スネークケースで先頭は小文字か`_(アンダースコア)`で記載されるのでこれに習おう
    - sample_message
    - part2
    - _user

- 定数は大文字で始まる名前にすること。

### 1-1-9 コメント

```ruby
# １行をコメントアウト
name = "氏名" # 途中からも可能
```

### 1-1-10 メソッド

```ruby
class cat
  def run(ネズミ)
    puts "一生懸命 #{ネズミ} を追いかけた..." # 画面にメッセージを出力します
  end
end

タマ = cat.new
```

- メソッドの基本的な説明
- メソッドを呼び出すときにかっこを省略できる

```ruby
irb(main):066:0> message1 = "こんにちは"
=> "こんにちは"
irb(main):067:0> message2 = "こんばんは"
=> "こんばんは"
irb(main):068:0* split = ^C
irb(main):068:0> split = "｜"
=> "｜"
irb(main):069:0> message3 = "あいさつ！"
=> "あいさつ！"
irb(main):070:0> message3.concat message1, message2
=> "あいさつ！こんにちはこんばんは"
```

## 1-2 自分でクラスを作ってみよう

### 1-2-1 クラスを作る

### 1-2-2 Userクラスを作る

### 1-2-3 Userクラスにメソッドを定義する

### 1-2-4 インスタンス変数

- インスタンス変数：オブジェクトが抱えている変数

```ruby
class User
  def name=(name)
    @name = name
  end

  def name
    @name
  end
end
```

### 1-2-5 ローカル変数とインスタンス変数の違い

### 1-2-6 属性

- 一般的にオブジェクトが抱えるデータのことを「属性（Attribute）」
- 属性とインスタンス変数はよく似た概念と言える

### 1-2-7 ゲッターやセッターを簡単に定義する

```ruby
class User
  #attr_accessor :name
  #attr_reader :name
  #attr_writer :name
end
```

### 1-2-8 住んでいる場所やEメールアドレスを持たせる

```ruby
class User
  attr_accessor :name, :address, :email
end
```

### 1-2-9 メソッドからメソッドを使う

### 1-2-10 まとめ - オブジェクトの振る舞いとデータ

## 1-3 Rubyプログラムの基礎知識

### 1-3-1 演算子

- 目新しい演算子はないので割愛

### 1-3-2 nil

```ruby
# nilにする
value = nil
# nilかどうか確かめる
value.nil?

```

### 1-3-3 真偽

- Rubyでは0も真になるので注意！

### 1-3-4 条件分岐

```ruby
number = 1
if number == 1
  puts '数値は1です'
elsif number == 2
  puts '数値は2です'
else
  puts '数値は1や2以外です'
end
```

```ruby
# ifは評価結果を返すことを抑えておく
number = 100
message = if number > 50
            "numberは50より大きいです"
          else
            "numberは50以下です"
          end
# elseがなくどのオブジェクトにも当てはまらない場合はnilオブジェクト
```

```ruby
# 当てはまらない場合に分岐する unless
# ifの裏返しを表現する方法
# これは使わなくても良さそう わかりにくくなる
age = 16
unless age >= 20
  puts "未成年者には酒類を提供できません！"
end
```

```ruby
# 後置if
puts 'おはようございます' if true
puts 'お疲れ様でした' if false
```

### 1-3-5 配列

```ruby
# eachメソッド
a = [1,2,3]
a.each do |element|
  puts element
end

# forでもかける
for element in a
  puts element
end
```

- Rubyに慣れている人は、**For文よりもeachを好んで使うとのこと**

```ruby
# 配列に要素を追加する場合は<<を使う
a = [1,2,3]
a << 4
```

<https://qiita.com/may88seiji/items/ce9396a4c267a3d449ae>

### 1-3-6 ハッシュ

- 内部的にデータをキーと対応づけて格納しておくデータ構造

```ruby
pref = { tokyo: 13636222, kanagawa: 9144572 }

irb(main):060:0> pref
=> {:tokyo=>13636222, :kanagawa=>9144572}
irb(main):061:0> pref[:tokyo]
=> 13636222

```

## 1-4 少し高度なテクニック

### 1-4-1 initialize

```ruby
class User
  attr_reader :name, :address, :email
  def initialize(name, address, email)
    @name = name
    @address = address
    @email = email
  end
end

user = User.new("田中太郎","東京都",nil)

```

### 1-4-2 メソッドの呼び出しに制限をかける

```ruby
class Person
  def initialize(money)
    @money = money
  end
  def billionaire?
    money >= 1000000000
  end

  # privateキーワード以降のメソッドはプライベートメソッドとなる
  # initializeメソッドはprivate指定しなくても自動的にプライベートになる
  private

  def money
    @money
  end
end

person = Person.new(1000000000)

# privateなのでエラーになる！
person.money

```

### 1-4-3 引数にデフォルト値を指定する

```ruby
# デフォルト値を指定することができる
def name(full = true, with_age = true)
  n = if full
        "#{given_name} #{family_name}"
      else
        given_name
      end
  n << "(#{age})" if with_age
end
```

### 1-4-4 キーワード引数

```ruby
# キーワード引数の定義
def name(full: true, with_age: true)
  n = if full
        "#{given_name} #{family_name}"
      else
        given_name
      end
  n << "(#{age})" if with_age
end

# デフォルト値の省略も可能
def name(full: true, with_age:)
end

# どんな順序で呼び出してもいい
person.name(full: true, with_age: false)
person.name(with_age: false, full: true)

```

## 1-5 似たところのあるクラスを作りたいとき

### 1-5-1 継承

```ruby
# < で継承ができる
class Book
  def title
    '本のタイトル'
  end
end

class Magazine < Book
  # オーバーライド
  def title
    '雑誌のタイトル'
  end
end
```

### 1-5-2 モジュールによる共通化（Mix-in）

- Rubyの基本単位のオブジェクトであり、オブジェクトの設計図としてクラスがある
- ある一連の振る舞いの設計図を一箇所にまとめた存在として「モジュール(Module)」という概念がある

```ruby
module Chatting
  def chat
    "hello"
  end
end

class Dog
  include Chatting
end
```

モジュールをクラスに取り込んで振る舞いを追加することをRubyでは、「Mix-in」(ミックスイン)と呼びます

## Column クラスメソッド

- クラスに対して呼び出せるクラスメソッドという概念が存在する

```ruby
class Tax
  def self.rate
    1.08
  end
end
```

## 1-6 プログラムの異常を検知しよう（例外捕捉）

- 独自例外を作成するときはStandardErrorを継承して作成する

```ruby
begin
rescue
ensure
end

# メソッド内の例外処理なら以下のようにかける
def method
  rescue
  # 例外に対応するコード
  ensure
  # 例外が発生してもしなくても必ず実行したいコード
end

begin
  do_something
rescue SomeSpecialError => e
  # エラーオブジェクトを変数として受け取る方法
  puts "#{e.class} (#{e.message})が発生しました。処理を続行します。"
end



```

## 1-7 読めると便利！Rubyっぽい書き方

### 1-7-1 nil ガード

```ruby
number ||= 10
number || (number = 10)

def children
  @children ||= []
end
# childrenがnilの状態であっても必ず配列で初期化されるので安心
```

### 1-7-2 ぼっち演算子 &.

```ruby
user = User.new
user.name

object = nil
object&.name
# => ここでエラーにならない

```

### 1-7-3 %記法

```ruby
# すべての要素が文字列である配列は、通常の配列記法の他に、「%w」というキーワードを使って書くことができる
ary1 = ['apple','banana','orange']
puts ary1
# irb(main):001:0> ary1 = ['apple','banana','orange']
# => ["apple", "banana", "orange"]
# irb(main):002:0> puts ary1
# apple
# banana
# orange
# => nil

irb(main):003:0> ary2 = %w(apple banana orange)
=> ["apple", "banana", "orange"]

# すべての要素がシンボルの場合は、「%i」というキーワードを使ってかける
irb(main):004:0> ary2 = %i(apple banana orange)
=> [:apple, :banana, :orange]

```

### 1-7-4 配列の各要素から特定の属性だけを取り出す

```ruby
class User
  attr_accessor :name
end

user1 = User.new
user1.name = 'テスト１'
user2 = User.new
user2.name = 'テスト２'
user3 = User.new
user3.name = 'テスト３'

users = [user1, user2, user3]

# ------ 名前だけが入った配列を求める方法１ --------

names = []
user.each do |user|
  names << user.name
end

p names

# ------ 名前だけが入った配列を求める方法２ --------

names = users.map do |user|
  user.name
end

# ------ 名前だけが入った配列を求める方法３ --------

names = users.map { |user| user.name }

# ------ 名前だけが入った配列を求める方４ -------- ※これが一番簡潔！

nemes = users.map(&:name)

```

- ※なれないとわからない書き方だと思った

## Chapter2 Railsアプリケーションをのぞいてみよう

## 2-1 コマンド実行環境を準備しよう

### 2-1-1 Windowsでコマンド実行環境を用意する

windows環境のWSLでubuntuを動かしてそこにRubyを入れる
`wsl -u root`
wslにログインしてupdate打つ際に管理者権限が必要なのだが、
Windowsユーザだとパスワード通らなかったのでrootではいって更新コマンド売った

```bash
sudo apt update

# Cドライブ直下
ls /mnt/c

```

## 2-2 rbenvをインストールしよう

### 2-2-1 macOSでrbnevをインストール

### 2-2-2 Windows（WSL）でrbenvをインストール

```bash
git clone https://github.com/rbenv.git ~/.rbenv

echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bashrc
echo 'eval "${rbenv init -}"' >> ~/.bashrc
exit

# 再度ログイン
wsl -u root

rbenv -v
# => バージョンが表示されること


# rbenvでのRubyのインストールを簡単にするプラグイン、ruby-buildをセットアップ
git clone https://github.com/rbenv/ruby-build.git "$(rbenv root)"/plugins/ruby-build

# こちらのコマンドはhttps://github.com/rbenv/ruby-build/wiki を参照
sudo apt-get install autoconf bison build-essential libssl-dev libyaml-dev libreadline-dev zlib1g-dev libncurses5-dev libffi-dev libgdbm-dev libdb-dev

# libgdbm6 このパッケージが見つからなかった
# sudo apt-get install autoconf bison build-essential libssl-dev libyaml-dev libreadline-dev # zlib1g-dev libncurses5-dev libffi-dev libgdbm libgdbm-dev libdb-dev
# Reading package lists... Done
# Building dependency tree
# Reading state information... Done
# E: Unable to locate package libgdbm

```

## 2-3 Rubyのインストール

```ruby
rbenv install 2.5.1
rbenv global 2.5.1

ruby -v
which ruby

# うまく行かなかったので以下を参照して設定した
# <https://qiita.com/yuma-ito-bd/items/00f89ca0c04909c7c467>
```

### 2-3-1 Rubyのパッケージ管理ツール「RubyGems」

- Rubyは本体だけでも動作するが、公開されているサードパーティのライブラリを利用することで素早く生産的にプログラミング可能
- これらのライブラリは「gem」という形式でパッケージ化されている
- 本書で取り扱っていくRailsもgemの１つ
- Rubygemsと呼ばれるパッケージ管理ツールがgemのインストールや管理を簡単にしてくれる

```ruby
gem update --system

gem -v

gem list

```

### 2-3-2 Bundlerのインストール

- Bundler：gemをどのバージョンで利用するのかを管理する仕組み
- プロジェクトのディレクトリに`Gemfile`という名前のファイルを作成し、gemの名前を記載しておくとそのとおりにインストールしたり、それらのgemをRubyから利用したりすることができるようになる

```ruby
gem install bundler
```

- `bundle install`: Gemfileに記述したgemをインストールする
- `bundle exec [コマンド]`: Bundlerが管理するgemを利用できる状態でコマンドを実行する
- `bundle init`
- `bundle update`

## 2-4 Railsのインストール

- `gem install rails -v 5.2.1`
- `rails -v`

### 2-4-1 Node.jsのインストール

Javascriptランタイムとしてnodejsをインストールする

`curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -`
sudo apt install nodejs

nodebrewインストール参考
`<https://www.kimoton.com/entry/20190215/1550166179>`

## 2-5 データベースのインストールとセットアップ

### 2-5-1 macOSの場合

### 2-5-2 Windows（WSL）の場合

```bash
sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt/${lsb_release -cs}-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
wget --quiet -P - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
sudo apt update
sudo apt install postgresql

# 資料に記載の手順でpostgresqlインストールできなさそうだったので以下の手順で実施
# 参考）<https://www.digitalocean.com/community/tutorials/how-to-install-postgresql-on-ubuntu-20-04-quickstart-ja>
sudo apt update
sudo apt install postgresql postgresql-contrib
# サービスが起動しているか確認し起動していなければ立ち上げる
service postgresql status
service postgresql start

```

### 2-5-3 トラブルシューティング：RailsでPG::ConnectionBadというエラーになるとき

## 2-6 Railsに触れてみよう

### 2-6-1 実際にアプリケーションを動かしてみよう

```bash
# 雛形生成
rails new scaffold_app -d postgresql
# 確認
cd scaffold_app
ls
# データベース作成
# railsコマンドではなく、bin/railsコマンドを利用する
# このスクリプトだと、bundle exec railsとして実行したときと同様に、Gemfile通りのgemを利用できる環境上でrailsコマンドを実行することができる
bin/rails db:create

# サーバー起動
bin/rails s


```

- うまくRails立ち上がらないので、書籍とは別のバージョンを入れる
- <https://qiita.com/Gushi_maru/items/f3b5cc43e135e678085f>
- `apt-get install libpq-dev`

```bash

# 問題：postgresqlが5432portで立ち上がらない問題
# 原因：Windows側でインストールしているPostgresqlがすでに5432ポートで立ち上がっていたため
# 対策：Windows側で立ち上がっていたサービスを停止した上で起動
root@DORAEMON:/etc/postgresql/10/main# service postgresql start
 * Starting PostgreSQL 10 database server                                                                                                                                                     * Removed stale pid file.
Error: /usr/lib/postgresql/10/bin/pg_ctl /usr/lib/postgresql/10/bin/pg_ctl start -D /var/lib/postgresql/10/main -l /var/log/postgresql/postgresql-10-main.log -s -o  -c config_file="/etc/postgresql/10/main/postgresql.conf"  exited with status 1:
2021-03-28 04:08:07.395 JST [210] LOG:  could not bind IPv4 address "127.0.0.1": Permission denied
2021-03-28 04:08:07.395 JST [210] HINT:  Is another postmaster already running on port 5432? If not, wait a few seconds and retry.
2021-03-28 04:08:07.395 JST [210] WARNING:  could not create listen socket for "localhost"
2021-03-28 04:08:07.395 JST [210] FATAL:  could not create any TCP/IP sockets
2021-03-28 04:08:07.396 JST [210] LOG:  database system is shut down
pg_ctl: could not start server
Examine the log output.


# 問題：DB作成ができない問題
root@DORAEMON:/mnt/c/users/Tomo/ruby-work/scaffold-app# bin/rails db:create
FATAL:  role "root" does not exist
Couldn't create 'scaffold_app_development' database. Please check your configuration.
rails aborted!
PG::ConnectionBad: FATAL:  role "root" does not exist
/mnt/c/users/Tomo/ruby-work/scaffold-app/bin/rails:9:in `<top (required)>'
/mnt/c/users/Tomo/ruby-work/scaffold-app/bin/spring:15:in `<top (required)>'
bin/rails:3:in `load'
bin/rails:3:in `<main>'
Tasks: TOP => db:create
(See full trace by running task with --trace)

```

- そもそもPostgresqlにユーザ作成しておく必要がありそうなので対応

- Postgresqlにユーザを作成する手順
  - <https://qiita.com/krtsato/items/4565051608a63f11b316>
- パスワードは環境変数に設定しておき読み込む
  - <https://www.techscore.com/blog/2012/10/26/how-to-manage-database-yml/>

- ユーザ作成
  - <https://qiita.com/sibakenY/items/407b721ad1bd0975bd00>

![](/hexo/source/img/2021-03-28-15-05-16.png)

- railsはHTTPサーバとしてpumaを使用している
- Pumaは広く使用されており、Railsの機能を利用する上で不足はありません。

#### 2-6-1-2 ユーザ管理画面の雛形を作る

```bash
# ユーザーに関するscaffoldを自動生成する
bin/rails generate scaffold user name:string address:string age:integer

# ユーザ管理機能に使うデータベースを作成する
bin/rails db:migrate

# 準備が整ったところで再度アプリケーションを起動する
bin/rails s


```

#### 2-6-1-4 コードの通り道

- Controllerからページテンプレート周りの簡単な説明

#### 2-6-1-5 ディレクトリ構成

- ディレクトリ構成（割愛）

- `database.yml`
  - データベースと接続するための設定ファイル
  - development,test,productionという環境用にそれぞれ作成

|項目名|説明|
|---|---|
|adapter|データベースの接続に使用するアダプタの名前を指定します。アダプタには各データベースに対応するsqlite3,postgresql,mysql2,oracle_enhancedなどがある|
|encoding|文字コード|
|pool|コネクション数の上限|
|database|データベース名|
|username|データベースに接続するユーザ名|
|password|データベースに接続するユーザのパスワード|
|host|データベースが動作しているホスト名またはipアドレス|

```yml
# PostgreSQL. Versions 9.3 and up are supported.
#
# Install the pg driver:
#   gem install pg
# On macOS with Homebrew:
#   gem install pg -- --with-pg-config=/usr/local/bin/pg_config
# On macOS with MacPorts:
#   gem install pg -- --with-pg-config=/opt/local/lib/postgresql84/bin/pg_config
# On Windows:
#   gem install pg
#       Choose the win32 build.
#       Install PostgreSQL and put its /bin directory on your path.
#
# Configure Using Gemfile
# gem 'pg'
#
default: &default
  adapter: postgresql
  encoding: unicode
  # For details on connection pooling, see Rails configuration guide
  # https://guides.rubyonrails.org/configuring.html#database-pooling
  pool: <%= ENV.fetch("RAILS_MAX_THREADS") { 5 } %>

development:
  <<: *default
  database: scaffold_app_development

  # The specified database role being used to connect to postgres.
  # To create additional roles in postgres see `$ createuser --help`.
  # When left blank, postgres will use the default role. This is
  # the same name as the operating system user that initialized the database.
  #username: scaffold_app

  # The password associated with the postgres role (username).
  #password:

  # Connect on a TCP socket. Omitted by default since the client uses a
  # domain socket that doesn't need configuration. Windows does not have
  # domain sockets, so uncomment these lines.
  #host: localhost

  # The TCP port the server listens on. Defaults to 5432.
  # If your server runs on a different port number, change accordingly.
  #port: 5432

  # Schema search path. The server defaults to $user,public
  #schema_search_path: myapp,sharedapp,public

  # Minimum log levels, in increasing order:
  #   debug5, debug4, debug3, debug2, debug1,
  #   log, notice, warning, error, fatal, and panic
  # Defaults to warning.
  #min_messages: notice

# Warning: The database defined as "test" will be erased and
# re-generated from your development database when you run "rake".
# Do not set this db to the same as development or production.
test:
  <<: *default
  database: scaffold_app_test

# As with config/credentials.yml, you never want to store sensitive information,
# like your database password, in your source code. If your source code is
# ever seen by anyone, they now have access to your database.
#
# Instead, provide the password as a unix environment variable when you boot
# the app. Read https://guides.rubyonrails.org/configuring.html#configuring-a-database
# for a full rundown on how to provide these environment variables in a
# production deployment.
#
# On Heroku and other platform providers, you may have a full connection URL
# available as an environment variable. For example:
#
#   DATABASE_URL="postgres://myuser:mypass@localhost/somedatabase"
#
# You can use this database configuration with:
#
#   production:
#     url: <%= ENV['DATABASE_URL'] %>
#
production:
  <<: *default
  database: scaffold_app_production
  username: scaffold_app
  password: <%= ENV['SCAFFOLD_APP_DATABASE_PASSWORD'] %>

```

## Column YAMLの基本

- エイリアスとアンカー問機能

```yml
animal: &animal
  cat: 'ネコ'
  dog: 'イヌ'

animal_shop_1:
  <<: *animal
  hamster: 'ハムスター'

animal_shop_2:
  <<: *animal
  parrot: 'オウム'

```

- `routes.rb`
  - アプリケーションのルーティングを定義するファイル
  - リクエストに対応するレスポンスを作るためにどの処理を実行するかを定義したもの

```bash
# すべてのルーティングを確認できる
bin/rails routes

```

### 2-6-2 RailsのMVC




## Chapter3 タスク管理アプリケーションを作ろう
## 3-1 アプリケーション作成の準備をしよう
### 3-1-1 作成するアプリケーションの内容を考える
### 3-1-2 アプリケーションの名前を決める
### 3-1-3 アプリケーションのひな形を作成する
### 3-1-4 データベースの環境ごとの使い分け
### 3-1-5 ビュー層を効率良く書くためにSlimを使えるようにする
### 3-1-6 アプリケーションの見栄えを良くするためにBootstrapを導入する
### 3-1-7 Railsのエラーメッセージなどを日本語で出せるようにする
## 3-2 タスクモデルを作成する
### 3-2-1 タスクモデルの属性を設計する
### 3-2-2 タスクモデルのひな形を作成する
### 3-2-3 マイグレーションでデータベースにテーブルを追加する
## 3-3 コントローラとビュー
### 3-3-1 新規登録機能を実装する
### 3-3-2 一覧表示機能を実装する
### 3-3-3 詳細表示機能を実装する
### 3-3-4 編集機能を実装する
### 3-3-5 削除機能を実装する
### 3-3-6 シンプルなCRUD機能の完成


## ＜レベルアップ編＞
## Chapter4 現実の複雑さに対応する
## 4-1 さまざまなマイグレーション操作を使いこなす
### 4-1-1 マイグレーションの適用を理解しよう
### 4-1-2 マイグレーションではバージョンの上げ下げ両方を意識しよう
### 4-1-3 マイグレーションの名前の付け方に注意する
### 4-1-4 schema.rb
### 4-1-5 マイグレーションに関する主なコマンド
### 4-1-6 マイグレーションの適用中にエラーが出たときは
## 4-2 データの内容を制限する
### 4-2-1 データ型
### 4-2-2 NOT NULL制約
### 4-2-3 文字列カラムの長さを指定する
### 4-2-4 ユニークインデックスを作成する
## 4-3 モデルの「検証」を使う
### 4-3-1 モデルの検証の仕組み
### 4-3-2 検証の書き方
### 4-3-3 必須かどうかの検証を追加する
### 4-3-4 コントローラとビューで検証エラーに対応する
### 4-3-5 文字列長の検証を追加する
### 4-3-6 オリジナルの検証コードを書く
### 4-3-7 検証が行われない登録・更新操作もある
## 4-4 モデルの状態を自動的に制御する―「コールバック」
### 4-4-1 コールバックの仕組み
### 4-4-2 コールバックの実装
### 4-4-3 トランザクション
## 4-5 ログイン機能を作る
### 4-5-1 セッションとCookie
### 4-5-2 User モデルを作る
### 4-5-3 パスワードを受け付けてdigestを保存する
### 4-5-4 ユーザー管理機能一式を追加する
### 4-5-5 ログイン機能を実装する
### 4-5-6 ログインのフォームを表示する
### 4-5-7 ログインの実行
### 4-5-8 ログイン状態の取得を簡単にする
### 4-5-9 ログアウト機能を実装する
### 4-5-10 ログインしていなければタスク管理を利用できなくする
### 4-5-11 ログインしているユーザーのデータだけを扱えるようにする
### 4-5-12 管理機能を管理者ユーザーだけに利用させるようにする
### 4-5-13 最初の管理者ユーザーを作る
## 4-6 データを絞り込む
### 4-6-1 絞り込みの起点
### 4-6-2 絞り込み条件
### 4-6-3 実行部分
## 4-7 タスク一覧を作成日時の新しい順に表示する
## 4-8 scopeを活用する
## 4-9 フィルタを使い重複を避ける
### 4-10 詳しい説明に含まれるURLをリンクとして表示する
### 4-10-1 まとめ

## Chapter5 テストをはじめよう
## 5-1 テストについて
## 5-2 テストを書くことのメリット
### 5-2-1 テスト全体にかかるコストの削減
### 5-2-2 変更をフットワーク軽く行えるようになる
### 5-2-3 環境のバージョンアップやリファクタリングの必須条件
### 5-2-4 仕様変更の影響の大きさを簡単に把握することができる
### 5-2-5 仕様を記述したドキュメントとしても機能する
### 5-2-6 仕様やインターフェイスを深く考えるきっかけとして役立つ
### 5-2-7 適切な粒度のコードになりやすい
### 5-2-8 確実性を高めることで開発効率を上げる
## 5-3 本章で利用するテスト用ライブラリ
### 5-3-1 RSpec
### 5-3-2 Capybara
### 5-3-3 FactoryBot
## 5-4 本章で記述するテストの種類
### 5-4-1 モデルのテスト
### 5-4-2 結合テスト
### 5-4-3 ルーティング、メーラー、ジョブのテスト
### 5-4-4 あまり利用しないテスト
## Column System Specとは？
## 5-5 System Specを書くための準備
### 5-5-1 RSpecのインストールと初期準備
### 5-5-2 Capybaraの初期準備
### 5-5-3 FactoryBotのインストール
## 5-6 RSpecの基本形
## 5-7 FactoryBotでテストデータを作成できるように準備する
## 5-8 タスクの一覧表示機能のSystem Spec
### 5-8-1 ユーザーAを作成しておく
### 5-8-2 作成者がユーザーAであるタスクを作成しておく
### 5-8-3 ユーザーAでログインする
### 5-8-4 作成済みのタスクの名称が画面上に表示されていることを確認
## 5-9 他のユーザーが作成したタスクが表示されないことの確認
### 5-10 beforeを利用した共通化
### 5-11 letを利用した共通化
## Column letとlet!
### 5-12 詳細表示機能のSpecを追加する
### 5-13 shared_examplesを利用する
### 5-14 新規作成機能のSystem Spec
### 5-15 letの上書き
### 5-16 Specが失敗したときの調査方法
### 5-16-1 Specが失敗するとき
### 5-16-2 Specが失敗したときに確認すべき情報
### 5-16-3 失敗場所とエラーメッセージを手がかりに原因を探す
### 5-16-4 コンソールを使って調査する
### 5-16-5 スクリーンショットを活用する

## Chapter6 Railsの全体像を理解する
## 6-1 Railsを取り巻く世界
## 6-2 ルーティング
### 6-2-1 「 ルート」を構成する5つの要素
### 6-2-2 1つのルートを定義する
## Column URLヘルパーメソッドは使わなくてはダメ？
### 6-2-3 「 RESTful」の概要をつかんでおこう
### 6-2-4 RESTfulにするための Railsの流儀
## Column RESTfulはどの程度追求すべき？
### 6-2-5 resourcesでCRUDのルート一式を定義する
### 6-2-6 routes.rbの構造化
## Column routes.rbの整理のコツ
## 6-3 国際化
### 6-3-1 ユーザーごとに言語を切り替える
### 6-3-2 翻訳ファイルの扱い方
## 6-4 日時の扱い方
### 6-4-1 日時の扱い方に関する設定
### 6-4-2 taskleafアプリケーションのデフォルトのタイムゾーンを日本時間にする
### 6-4-3 Time.currentやDate.currentを利用する
## 6-5 エラー処理のカスタマイズ
### 6-5-1 Railsのエラー処理の概要
### 6-5-2 デバッグ用/本番用のエラー画面の切り分け
### 6-5-3 Railsの本番用エラー画面のカスタマイズ
### 6-5-4 アプリケーション固有のエラー処理の追加
## 6-6 Railsのログ
### 6-6-1 ログの利用方法
### 6-6-2 ログ（ロガー）の設定
## 6-7 セキュリティを強化する
### 6-7-1 意図しないパラメータを弾く「Strong Parameters」
### 6-7-2 CSRF対策を利用する
### 6-7-3 インジェクションに注意する
### 6-7-4 Content Security Policy（CSP）を設定する
## 6-8 アセットパイプライン
### 6-8-1 環境による挙動の違い
### 6-8-2 ブラウザにアセットを読み込ませる
### 6-8-3 連結結果のファイルをどうやって生成するか
### 6-8-4 マニフェストファイルを記述する
### 6-8-5 アセットの探索パス
### 6-8-6 アセット関連の設定
## 6-9 production環境でアプリケーションを立ち上げる
### 6-9-1 アセットのプリコンパイル
### 6-9-2 静的ファイルの配信サーバを設定する
### 6-9-3 production環境用のデータベースを作成する
### 6-9-4 config/master.key が存在することを確認する
### 6-9-5 productionモードでサーバを起動する
### 6-9-6 production環境用の秘密情報の管理
### 6-9-7 秘密情報の暗号化・復号
## Column secret_key_base
## Column カスタム暗号化ファイル（Encrypted）

## Chapter7 機能を追加してみよう
## 7-1 登録や編集の実行前に確認画面をはさむ
### 7-1-1 確認画面を表示するアクションを追加する
### 7-1-2 新規登録画面からの遷移先を変える
### 7-1-3 登録アクションで「戻る」ボタンからの遷移に対応する
## Column 確認画面があるほうが良いとは限らない
## 7-2 一覧画面に検索機能を追加する
### 7-2-1 Ransackのインストール
### 7-2-2 名称による検索
### 7-2-3 検索時のSQLの確認と検索マッチャー
### 7-2-4 登録日時による検索
### 7-2-5 検索条件を絞る
## 7-3 一覧画面にソート機能を追加する
## 7-4 メールを送る
### 7-4-1 メイラーの実装
### 7-4-2 テンプレートの実装
### 7-4-3 メール送信処理
### 7-4-4 動作確認
### 7-4-5 メイラーのテスト
## 7-5 ファイルをアップロードしてモデルに添付する
### 7-5-1 タスクに画像ファイルを添付する
### 7-5-2 Active Storage
### 7-5-3 Active Storageの準備
### 7-5-4 タスクモデルに画像を添付できるようにする
## 7-6 CSV形式のファイルのインポート/エクスポート
### 7-6-1 タスクをCSV出力（エクスポート）する
### 7-6-2 CSVデータを入力（インポート）する
## 7-7 ページネーション
### 7-7-1 kaminariのインストール
### 7-7-2 ページ番号に対応する範囲のデータを検索するようにする
### 7-7-3 ビューにページネーションのための情報を表示する
### 7-7-4 動作確認
### 7-7-5 デザインの調整
### 7-7-6 表示件数を変更したいとき
## 7-8 非同期処理や定期実行を行う（Jobスケジューリング）
### 7-8-1 非同期処理ツールの導入
### 7-8-2 ジョブの作成、実行
### 7-8-3 実行日時指定
### 7-8-4 ７章の終わりに

## ＜発展編＞
## Chapter8 RailsとJavaScript
## 8-1 JavaScriptでページに変化をつける
## 8-2 AjaxでRailsサーバと通信する
### 8-2-1 Ajaxでタスクを削除する
### 8-2-2 rails-ujsの果たしている役割
### 8-2-3 コントローラからJavaScriptを返して実行する（SJR）
## Column CoffeeScriptは使わないことも検討する
## Column jQuery
## 8-3 Turbolinks
### 8-3-1 Turbolinksの発行するイベント
### 8-3-3 Turbolinksが有効な環境での注意点
### 8-3-4 Turbolinksを無効化するには
## 8-4 モダンなJavaScript管理を行う
### 8-4-1 Yarn
### 8-4-2 Webpacker
## 8-5 taskleafにReactを導入してみる
## Column Webpackerのメリット・デメリット

## Chapter9 複数人でRailsアプリケーションを開発する
## 9-1 チーム開発の風景（導入編）
### 9-1-1 ソースコードの変更を管理する
### 9-1-2 GitHubなどの開発プラットフォームを使う
### 9-1-3 GitHubを使うには？
### 9-1-4 Pull Requestベースの開発
### 9-1-5 Gitに入れるファイル、入れないファイル
## Column database.ymlとセキュリティ
### 9-1-6 Pull Requestの変更差分を最新状態との比較にする
### 9-1-7 Gitのpush -fに気をつける
### 9-1-8 GitHubとチャットツールを連携させる
## 9-2 チーム開発の風景（コードレビュー編）
### 9-2-1 コードレビューではどんな点を見て、何をコメントする？
### 9-2-2 コーディング規約
## Column コーディング規約との付き合い方
### 9-2-3 Lintツールの活用
## Column コードレビューは素晴らしい、だが万能ではない
### 9-2-4 CIツールとGitHubを連動させる
## 9-3 チーム開発の風景（分担編）
### 9-3-1 チームで開発するときの分担の仕方
## 9-4 開発環境の構築方法をわかりやすくしておく
### 9-4-1 誰でも簡単にセットアップできるようにする
### 9-4-2 仮想化環境を利用する
### 9-4-3 初期データ・テスト用データの共有
## 9-5 マイグレーションに注意する
### 9-5-1 ロールバックできることを確認しよう
### 9-5-2 「redo」を習慣にしよう
### 9-5-3 完全なロールバックができないとき
### 9-5-4 過去のマイグレーションファイルの変更には慎重になろう
## Column 「きれいなマイグレーション」を追求しない
### 9-5-5 マイグレーションファイルが多くなってきたら
### 9-5-6 直接DBを変更したら必ずマイグレーションファイルも追加しておこう
### 9-5-7 データメンテナンス
## Column Rakeタスクでのデータメンテナンス

## Chapter10 Railsアプリケーションと長く付き合うために
### 10-1 バージョンアップにどう取り組むか
### 10-2 小さなバージョンアップ
### 10-2-1 bundle updateとは
### 10-2-2 bundle updateの際に行うべきこと
### 10-3 bundle update はチーム全体で行う
### 10-4 bundle updateを自動化でサポートする
### 10-5 大きなバージョンアップを行う際に気をつけること
### 10-6 アプリケーションの複雑性に立ち向かう
### 10-7 第一の鍵─しかるべきところにコードを書く
### 10-7-1 コントローラに入り込む複雑さ
### 10-7-2 モデルに書くべきコードをモデルに寄せる
### 10-7-3 ビューに入り込んだビジネスロジックをモデルに寄せる
### 10-7-4 Decoratorパターンでモデル固有の表示ロジックを分離する
### 10-8 第二の鍵─上手に共通化する
### 10-9 モデルの共通化
### 10-9-1 共通機能のモジュールを複数のモデルクラスにMix-inする
### 10-9-2 STI（単一テーブル継承）で共通機能を基底クラスに持たせる
### 10-9-3 全モデルクラスに共通の処理をApplicationRecordに書く
### 10-9-3 ApplicationRecordとモデルクラスの間に抽象的なクラスを挟む
### 10-10 コントローラの共通化
### 10-10-1 共通機能のモジュールを複数のコントローラクラスにMix-inする
### 10-10-2 基底クラスを追加して共通機能を持たせる
### 10-10-3 ApplicationControllerに共通機能を記述する
### 10-10-4 第一の鍵を使わない状態で第二の鍵を使ってはいけない
### 10-11 ビュー（プレゼンテーション）の共通化
### 10-11-1 パーシャルテンプレートで画面の一部を共通化する
### 10-11-2 レイアウトで画面の大枠を共通化する
### 10-11-3 カスタムヘルパーに共通処理を記述する
### 10-11-4 カスタムヘルパーは小さく作る
### 10-11-5 特定のモデルに依存する処理をカスタムヘルパーに含めない
### 10-12 第三の鍵─新しい構造を追加して役割を分担する
### 10-12-1 ActiveModel
### 10-12-2 共通処理を担当するオブジェクトを別につくって連携させる
### 10-12-3 意味のあるパラメータの集合からクラスを生み出す
### 10-12-4 外部サービスのロジックを閉じ込める
### 10-12-5 複数のモデルが絡む特定処理の専門家を作る
### 10-12-6 サブリソース単位でコントローラを分割する
## Column 何でも屋のアクションを実装しない
### 10-13 モジュールを上手に利用するために
### 10-13-1 構造として分かりやすい意味を持たせる
### 10-13-2 利用元クラスの一部として違和感がないかを検討する
### 10-13-3 利用元クラスと内部データを共有していることを意識する
### 10-13-4 独立的にして利用条件を分かりやすくする
### 10-13-5 追加部品であるという節度を守る
### 10-14 おわりに
## Appendix
## Index

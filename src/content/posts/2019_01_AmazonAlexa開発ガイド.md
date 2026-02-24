---
title: AmazonAlexa開発ガイド
published: 2019-01-01
image: /img/cover/2019_01_alexa_handson.JPG
tags: ["教科書", "AI"]
category: 書籍
draft: false
---


# AmazonAlexa開発ガイド

<div style="text-align:center; margin-bottom: 40px">
<img src="/img/cover/2019_01_alexa_handson.JPG" alt="2019_01_alexa_handson" title="2019_01_alexa_handson" style="width:980px">
</div>

- 目次
  - Chapter 1 Amazon AlexaとAmazon Echo
  - Chapter 2 Amazon AlexaとAWSの準備
  - Chapter 3 スキル開発入門
  - Chapter 4 スキルのデバッグから公開
  - Chapter 5 Webサービス連携アプリの開発
  - Chapter 6 スマートホームスキルの開発
  - Chapter 7 AVSを利用したアプリケーションの構築方法
  - Appendix SSML/CLI

## 学んだこと

- AmazonAlexaSkillKitを利用したスキル開発方法
- AWS Lambda にサンプルをデプロイし実際に動作させる方法
- AlexaSkillKitについての基礎知識
  - インテント・スロットなど
  - SSML
- ※本書では、後半、AVSについても述べられているが、直近で必要な知識ではなかったため割愛

## 手に取った理由

- Alexaスキル開発の基礎知識を習得するため

## 学習メモ

```txt

# はじめに

□付属データ（amazon_alexa_sample.zip）の内容
付属データには、以下の内容が含まれています。

Chapter2～7、Appendixで紹介しているサンプルデータ
Chapter7の04節のコマンド入力用テキスト（一部修正用テキスト含む）
Chapter5の02節（P.137）：補足資料1「Twitter developer accountへのアプリ登録」（PDFファイル）
Chapter7の04節（P.210）：補足資料2「Raspberry Pi 3の初回起動時のセットアップ」（PDFファイル）
Chapter7の04節（P.248）：補足資料3「Lチカを行うための配線」（PDFファイル）
□付属データのテスト環境
OS：macOS 10.13.5
Node.js：8.11.1
npm：5.6.0
Alexa開発者コンソール
URL https://developer.amazon.com/alexa/console/
AWS
URL https://aws.amazon.com/jp/
ASK SDK for Node.js：2.0.5
Amazon Echoデバイス
Amazon Echo dot
URL https://www.amazon.co.jp/dp/B072B5BTLK
Homebrew: 1.6.7
AVS Device SDK：1.8.1
□Chapter7 04節で利用した機材
サンワサプライUSBマイクロホンMM-MCU02BK
URL https://direct.sanwa.co.jp/のサイトで「MM-MCU02BK」で検索
Raspberry Pi 3（Model B）
Raspberry Pi 3 Model Bケース+ヒートシンク
https://www.physical-computing.jpのサイトで「Raspberry Pi 3」で検索
ブレッドボード　マイコンボード用実験パーツセット　KP-PRTSET01
URL http://eleshop.jp/shop/g/g402534/
※補足1：上記の「ブレッドボード　マイコンボード用実験パーツセット」には、ジャンプワイヤ（オス・オス）しかありませんので、別途ジャンプワイヤ（オス・メス）をご購入ください。
ジャンプワイヤ（オス・メス）の購入先例
例：ELEGOO 50 PCS オスメスジャンパーワイヤ200mm (無料 170 タイポイント ブレッドボード)
URL https://www.amazon.co.jp/dp/B06ZZXH4XT/
□Chapter7 04節に関するコマンドやリンク先（著者提供サイト）
紙面コマンド & リンクまとめ
URL https://gist.github.com/ShinjiKobayashi/1383691df9d43edd60267e44f6e2e923

# Chapter 1 Amazon AlexaとAmazon Echo

##### Echo Show
2018/08時点では発売されていないがecho show という製品があったりする（画面がついている）

スマートフォンやブラウザ上で実行できるAlexaアプリへカードを表示する機能はあるが、別のデバイスに取り出す必要があり、シームレスな体験でない

##### Echo Look
360度の3Dスキャンが可能な衣装のコーディネートの良し悪しを判断してくれる機能をもつ製品

##### 車載Alexa
BMWやToyotaがプレスリリース

手がふさがっていてもVUIであれば操作可能

##### Alexa Mobile Accessory Kit
スマートフォンのAlexaアプリを介してAlexaの機能を利用できるようにするアプリ

##### Amazon Lex
AWSサービス

Alexaに採用されている深層学習の技術と同等の技術を利用できるサービス

### Alexaスキルキット（ASK）
開発者がAlexaを通じて公開できるアプリケーションのような機能

### Alexaの特色

- スキルの種類
    * カスタムスキル
        + 料理レシピやしりとりゲームな一般的なAlexaスキル
        + Alexaを通じて商品の購入ができるようになったりする
    * スマートホームスキル
        + カメラや証明、鍵等のスマートホームデバイスを制御するスキル
    * フラッシュブリーフィングスキル
        + ※言及なし

## 02カスタムスキルの開発事例
### Alexaスキルの動きを確認する
##### インテント
音声入力の内容を解釈して、キーワードに合わせたタグ付けのようなことを行い、対話モデルを作成

##### スロット
対話モデルをより柔軟に活用することができる（プログラミングにおける変数に近い役割）

「*東京タワー*の天気を教えて」という発話があった場合、*東京タワー*がPlaceスロットに格納されて、インテントと同じくタグ付けされる

この要素を参照すれば、ユーザがどこの天気を知りたいのか把握できる

##### マルチターン会話とダイアログ

まるで本当に会話している様に実装できる

### Alexaスキルの開発事例

##### 人気のあるスキルについて
スキル順位を記載している

##### ユーザーストーリーの作成

##### スキルの目的を決める
##### 明確なユーザ操作をイメージする


## チャプターまとめ
- Alexaを取り巻く世界観やスキルを用いて実現できること
- Alexaの機能や大まかな挙動
- スキル開発をするときに気をつけておくとよいこと

# Chapter 2 Amazon AlexaとAWSの準備

## 01Alexaの開発環境の準備
※割愛
### 全体の構成
### Amazon開発者コンソールの登録方法
### AWSの登録方法

## 02Amazon Echo を使って Hello World

### カスタムスキルの開発工程
- Amazon開発者コンソールの設定
- Lambdaの実装及び設定
- 動作確認

### Amazon 開発者コンソールの設定およびLambdaの実装
1. スキルの基本情報設定
2. Alexaデバイスの応答設定
3. Lambdaの設定及び実装
4. LambdaとAlexaデバイスの応答設定と紐付け

～実際に操作してハローワールドを表示～

# Chapter 3 スキル開発入門

## 01カスタムスキルの開発方法

### カスタムスキルの開発環境構築
### カスタムスキル開発の基本
- Amazon開発者コンソールの設定
- Lambdaの実装

### Amazon開発者コンソールの設定方法

命令文をインテントと呼ばれるものに変換して該当のスキルにわたす

アニマルブックスという架空のスキルを作成する例

### Lambdaの実装方法

npm install --loglevel=error ask-sdk-core ask-sdk-model

##### 実装について見ていく

### 対話型のカスタムスキル開発

repromptを使用して「本のおすすめでよろしいですか？」と聞き返す実装

### 会話内容の一部を扱うスキル開発

##### スロットの実装

## 02Alexaアプリにカードを表示させる
### カードの表示
Alexaではスキルでの発話と同時に発話内容の保管情報としてカードをAlexaアプリに表示することができます。

- カードの種類
    * シンプルカード
    * スタンダードカード

## 03AudioPlayerでスキルを開発する
### AudioPlayerとは
- MP3などのオーディオファイルをストリーミング再生するAlexaの仕組み
- 一時停止やシャッフル再生、ループ再生、キューイングなどもサポートしている
- 再生状態をモニタリングするための仕組みもある
- SSMLを用いることでオーディオファイルの再生をすることも可能だが、90秒の制限がある

### AudioPlayerを使ったスキルを作成する

# Chapter 4 スキルのデバッグから公開

## 01Alexaスキルのデバッグ方法
### Alexaスキルのデバッグ方法
- Alexa Skill Testing Toolについての説明

### Lambdaのデバッグ方法
- Cloud Watchで設定する
- 

## Alexaスキルの公開方法

## 多言語対応

# Chapter 5 Webサービス連携アプリの開発

## 01フラッシュブリーフィングの作り方
### フラッシュブリーフィングスキルとは
- 最新のニュースフィードを提供する機能
- インストールされているフラッシュブリーフィングスキルから提供される最新のニュースフィードをすべて収集し、ユーザに対して収集したニュースを提供する
- 作成手順について
    * フィード提供環境構築
    * フィードの登録

### フィード提供環境構築

amzon api gatewayの設定で躓いた！！

問いかけても「フラッシュニュースです」という内容しか返さない


## 02外部サービス連携アプリの作り方(Twitter連携)
※一旦とばす！

# Chapter 6 スマートホームスキルの開発
※一旦とばす！

# Chapter 7 AVSを利用したアプリケーションの構築方法
※一旦とばす！
端末メーカー様のコネクテット製品に、 簡単にAlexaを実装するためのSDK

# Appendix SSML/CLI


```

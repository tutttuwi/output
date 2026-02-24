---
title: Web製作者のためのSassの教科書
published: 2020-04-09
tags: ["教科書", "CSS"]
category: 書籍
draft: false
---


# Web製作者のためのSassの教科書

```txt
・Sassって聞いたことはあるけど、導入が面倒そう
・Sassをはじめたいけど、あと一歩が踏み出せない
・勉強コストとの天秤にかけて、Sassのメリットが見えない
・周りでSassを使いはじめた人がいて、焦りを感じている
・CSSを今よりも効率的に書きたいと思っている

こうした方がSassを導入するきっかけとなり、
ひと通りSassの機能を使いこなせるようになるのが本書の目標です。

本書では、HTML+CSSの基本的な知識は必須ですが、
Sassにまったく触れたことがない方も対象としています。

CSSをHTMLの構造に合わせて入れ子で書いていく「ネスト」や
便利な「変数」や「演算」などのSassの基本機能はもちろん、

筆者が実際に仕事の現場で使っている実践的なテクニックから
新機能もカバーした全機能リファレンスまで、この一冊で網羅しています。
```

- 発売日：2017/9/15
- ページ数：296
- サイズ：B5変形判
- 著者：平澤 隆（Latele）　著/森田 壮　著
- ISBN：9784295002352

- URL: <https://book.impress.co.jp/books/1117101020>

- 目次
  - 第1章 Sassのキホン
  - 第2章 Sassの利用環境を整えよう
  - 第3章 これだけはマスターしたいSassの基本機能
  - 第4章 高度な機能を覚えてSassを使いこなそう
  - 第5章 現場で使える実践Sassコーディング
  - 第6章 もっとSassを便利にするフレームワークやツール
  - 第7章 Sass全機能リファレンス

- 公式サポートサイト：<https://book2.scss.jp/>

## 第1章 Sassのキホン

### 1-1 まずはSassって何なのかを知ろう

- Sassは学習コストもあるけれど、CSSを覚え始めた頃のワクワク感や楽しさを思い出させてくれるよっている説明

- Sass＝CSSを拡張したメタ言語

- Sass(Syntactically Awesome Strylesheets)

- Sassには２つの記法がある
  - SASS記法：CSSと互換性が無い。インデントの深さで分ける
  - SCSS記法：CSSと互換性がある。ネストで記載

- SCSSファイルはコンパイルが必要だよという説明
- 魅力的な機能
  - 記述の簡略化（**ネスト**）
  - コメントに、`//`が使える！
  - **変数定義**で同じ値を使い回すことができる
  - １度使ったセレクタを使い回せる（**エクステンド**）
  - コードの再利用が可能
    - スタイルをまとめてテンプレートやモジュールのように定義し、簡単に読み込んで使うことができる
    - **ミックスイン**と呼ばれており、Sassの中でも最も強力な機能の１つ
  - １つのCSSファイルにまとめることができる（**パーシャル**）
  - 条件分岐などの**プログラム的な処理**ができる
  - **関数で様々な処理を実行**できる
    - Sassにはかなり多くの関数が用意されている
  - CSSファイルを圧縮できる
  - 他にも魅力が沢山

- Sassの歴史について説明（割愛）

### 1-2 Sassを導入する前の疑問や不安

- 環境構築に黒い画面を操作することに対しての不安説明
- 運用時にSassは導入ハードルが高いのではという不安説明
  - expandedというフォーマットがあり、これを指定してコンパイルすると、普通にCSS書いたみたいになる
  - `//`コメントは削除されてしまう
  - なので納品後はCSS編集という運用でも問題ない

### 1-3 何はともあれSassを触ってみよう

- 使ってみる
  - 「SassMeister」で検索
  - <https://www.sassmeister.com>

- meister = 師匠

Sassを入力するとCSSが出力されるプレイグラウンド

- Sassに対応しているソースコード共有サービス
  - CodePen
  - Create a new Fiddle - jsFiddle
  - jsdo.it Share Javascript, HTML5 and CSS
  - HTML5, CSS3, JS Demos, Creations and Experiments | CSSDeck

## 第2章 Sassの利用環境を整えよう

### 2-1 本書で使用する環境について

- 本書では、node-sasssを使用する

- Sassは大きく分けて２つのSassが存在する
  - Ruby Sass：Rubyで開発されたもの
  - LibSass：C/C++で開発されたもの

- node-sass
  - LibSassをNode.jsで動作できるようにしたライブラリ

- Node.jsについて：Javascriptで作られたサーバーサイド環境
- Gulp: タスクランナー

### 2-2 Node.jsをインストールする

- Webからインストールする手順を記載
- バージョン管理ツールの説明
  - Windowsならnodist
  - Macならndenv

### 2-3 黒い画面を使ってみよう

- コマンドプロンプトを開く手順を記載しているだけ（割愛）

### 2-4 セットアップ済みの環境をインストールする

- サンプルファイルコピー
  - <https://book2.scss.jp/dl/c2/>

- gulp-cliをインストール
  - `npm install --global gulp-cli`

- モジュールをインストールする
  - `npm install`

### 2-5 Sass をコンパイルする

- `gulpfile.js`に記載された処理を実行
  - `gulp sass`

- アウトプットスタイルを指定
  - Nested
  - Expanded
  - Compact
  - Compressed

- ファイルの更新を監視する
  - `gulp.watch('./sass/**/*.scss',['sass']);`

### 2-6 セットアップ済みの環境を作成する方法

- npm と gulp の説明(割愛)

- gulpfile.jsのジェネレータについて
  - <https://steelydylan.github.io/gulp-generator/>

### 2-7 GUIコンパイラ（Prepros）でSassを使う

- <https://prepros.io/>
- 割愛する

### 2-8 DreamweaverでSassを使う

- 割愛する

## 第3章 これだけはマスターしたいSassの基本機能

### 3-1 ルールのネスト（Nested Rules）

- ネストでCSS定義ができる
- セレクタも使える
- 使いすぎるとインデントが深くなり可読性が悪くなる
- `@media`のネストもできる

### 3-2 親セレクタの参照&（アンパサンド）

- `&`を使えば親セレクタを参照できる
- BEMやMindBEMingなどBEMの設計思想に近いCSS設計を行っている場合、記述量が大幅に削減される

### 3-3 プロパティのネスト（Nested Properties）

- プロパティもネストさせてかけるよっていう説明
- ショートハンドでかけるところをネストさせる
- 慣れないうちは可読性が下がる原因にもなるので、普通に書いたほうが無難
- Column: -(ハイフン)があるプロパティはすべてネストできる

### 3-4 Sassで使えるコメント

- javascriptのコメント`//`が使える
- 通常のCSSコメント `/* */` だとコンパイルされても残る
- スタイルが「compressed」だとコメントは残らない
  - 「compressed」でも残るコメント
    - `/*! */` `!`を追加すれば残るらしい

### 3-5 変数（Variables）

- 変数宣言ができる

```scss
// 赤色の変数を宣言
$red: #cf2d3a;
```

- 変数名で使える文字と使えない文字

```scss
$width10: 10px;
$w-10: 10px;
$w_10: 10px;
$Ｗｉｄｔｈ１０: 10px;
$横幅10px: 10px;
$１０px: 10px;
$___w10___: 10px;
$-_-______----w:10px;
$変数はSassの便利な機能の１つです:black;

// 使えない文字
$10width: 10px; // 数字から始まっている
$@width10: 10px; // @など使えない記号
$--width: 10px; // 連続したハイフンから始まっている

```

- ルールセット内で変数を宣言することもできる

- 変数を参照できる場所
  - セレクタから参照したり、他の文字列と結合してパスを作成したい場合などに気をつける必要あり

```scss
$セレクタ名: '.pickupContentsArea, section.main';
$IMG_PATH: '../img/bg/';

#{$セレクタ名} {
  background-color: url(#{$IMG_PATH}pickup.png);
}
```

### 3-6 演算

- `+ - * %`などの演算子が使える
- コンパイル後は、演算結果が出力される

```scss
// paddingの値が変わった時に変数として持っておくとwidthに反映できる
article {
  $padding: 7px;
  width: $main_width - $padding * 2;
}
```

- 色の演算も算術演算子でできるが将来的には廃止予定らしい
  - `rgba()`を使おうとのこと

### 3-7 Sassの@import

- SassではCSSで使える`@import`の他に、Sass独自の`@import`機能がある

- CSSファイルを生成しないパーシャル
  - importしたSassファイルなど、特定のSassファイルをCSSファイルとして生成したくない場合、
  - Sassファイルのファイル名の最初に`_`アンダースコアをつけることで、コンパイルしてもCSSファイルが生成されなくなる
  - この機能のことをパーシャル(partial)という

## 第4章 高度な機能を覚えてSassを使いこなそう

### 4-1 スタイルの継承ができるエクステンド（@extend）

- エクステンド＝指定したセレクタのスタイルを継承することができる機能

- あまり継承しすぎると、プロパティがバッティングしてしまう可能性が高くなる

- エクステンドの連鎖
  - 継承を連鎖して記載可能

- エクステンドが使えないセレクタの紹介
  - `.item p` 子孫セレクタ
  - `#main > article` 子セレクタ
  - `h2 + h3` 隣接セレクタ
  - `h3 ~ h3` 間接セレクタ

```scss
// 子孫セレクタ
.item p { ... }

// 子セレクタ
#main > article { ... }

// 隣接セレクタ
h2 + h3 { ... }

// 間接セレクタ
h3 ~ h3 { ... }
```

- エクステンド専用のプレースホルダーセレクタ

```scss
// エクステンド専用のプレースホルダーセレクタ
%boxBase {
    padding: 15px;
    border: 1px solid #999;
}

// プレースホルダーセレクタを継承
.item {
    @extend %boxBase;
    margin-bottom: 20px;
}
section {
    @extend %boxBase;
    margin-bottom: 60px;
}
```

- `@media`内ではエクステンドは使用できない

```scss
// これはコンパイルエラーになってしまう
%btnBase {
    display: inline-block;
    padding: 5px 10px;
    background: #eee;
}

@media all and (orientation:landscape) {
    a {
        @extend %btnBase;
    }
}

// こちらに書き直すとうまくいく
@media all and (orientation:landscape) {
    %btnBase {
        display: inline-block;
        padding: 5px 10px;
        background: #eee;
    }
    a {
        @extend %btnBase;
    }
}

```

- 警告を抑止する `!optional`フラグ

```scss
.btn {
    @extend %btnBase !optional;
}
```

### 4-2 柔軟なスタイルの定義が可能なミックスイン（@mixin）

- スタイルの集まりを定義しておき、それを他の場所で呼び出して使うことができる
- また、引数を指定することで、定義したミックスインの値を一部変更して使うといった、非常に柔軟で強力な処理が可能

```scss
// ミックスインを定義
@mixin boxSet {
    padding: 15px;
    background: #999;
    color: white;
}
// 定義したミックスインを呼び出し
.relatedArea {
    @include boxSet;
}
```

- エクステンドと違ってコンパイル後に、展開されて出力されることを確認

```scss
// 定義したミックスインを呼び出し
.relatedArea {
    @include boxSet;
}
// 別のルールセットでも呼び出し
.pickupArea {
    @include boxSet;
}
```

```css
.relatedArea {
  padding: 15px;
  background: #999;
  color: white;
}
.pickupArea {
  padding: 15px;
  background: #999;
  color: white;
}
```

- 引数を使ったミックスイン

```scss
// 引数を使ったミックスインを定義
@mixin kadomaru($value) {
    -moz-border-radius: $value;
    -webkit-border-radius: $value;
    border-radius: $value;
}
.box {
    @include kadomaru(3px);
    background: #eee;
}
.item {
    border: 1px solid #999;
    @include kadomaru(5px 10px);
}
// 可変でプロパティを定義できる
```

- 引数に初期値を設定することもできる

```scss
@mixin kadomaru($value: 3px) {
    -moz-border-radius: $value;
    -webkit-border-radius: $value;
    border-radius: $value;
}
.boxA {
    @include kadomaru;
    background: #eee;
}
.boxB {
    @include kadomaru();
    background: #f1f1f1;
}
```

```css
.boxA {
  -moz-border-radius: 3px;
  -webkit-border-radius: 3px;
  border-radius: 3px;
  background: #eee;
}
.boxB {
  -moz-border-radius: 3px;
  -webkit-border-radius: 3px;
  border-radius: 3px;
  background: #f1f1f1;
}
```

- 引数を複数指定することもできる

```scss
@mixin boxBase($margin: 30px 0, $padding: 10px) {
    margin: $margin;
    padding: $padding;
}

.boxA {
    @include boxBase;
    background: #eee;
}
.boxB {
    @include boxBase(0 0 50px, 20px);
    background: #f1f1f1;
}

```

- ,(カンマ)を使うプロパティには可変長引数を利用する

```scss
@mixin shadow($value...) {
    text-shadow: $value;
}

h2 {
    @include shadow(8px 8px 0 #999, 15px -10px 0 #eee);
}
```

- 複数の引数があるミックスインを読み込む際に可変長引数を使う

```scss
@mixin boxBase($w: 250px, $pd: 15px, $bg_c: #fff, $bd_c: #ccc) {
    width: $w;
    padding: $pd;
    background-color: $bg_c;
    border: 1px solid $bd_c;
}

$values: 300px, 20px; // こういう変数定義もできるんだと知った

.item {
    float: left;
    @include boxBase($values...);
}
```

- ミックスインのスコープ（利用できる範囲）を制限する

```scss
.main {
    @mixin margin {
        margin: 50px 0;
    }
    .item {
        @include margin;
    }
}
// あまりスコープを制限する例は無いが一応覚えておく
```

- ミックスインにコンテントブロックを渡す `@content`
  - →これは便利！

```scss
@mixin media($width-media: 768px) {
    @media only screen and (max-width: $width-media) {
        @content;
    }
}
 
.item {
    .image {
        float: left;
        @include media {
            float: none;
        }
    }
    .text {
        overflow: hidden;
        margin-left: 15px;
        @include media {
            margin-left: 0;
        }
    }
}
```

```css
.item .image {
  float: left;
}

@media only screen and (max-width: 768px) {
  .item .image {
    float: none;
  }
}

.item .text {
  overflow: hidden;
  margin-left: 15px;
}

@media only screen and (max-width: 768px) {
  .item .text {
    margin-left: 0;
  }
}
```

- ミックスイン名で使える文字と使えない文字

```scss
@mixin shadow1 { ～ }
@mixin shadow-1 { ～ }
@mixin shadow_1 { ～ }
@mixin 影 { ～ }
@mixin ｓｈａｄｏw { ～ }
@mixin _shadow { ～ }
@mixin -shadow { ～ }

// 使えない文字
@mixin 01shadow { ～ } // 数字から始まっている
@mixin shadow@2 { ～ } // @など使えない記号
@mixin --shadow { ～ } // 連続したハイフンから始まっている
```

### 4-3 ネストしているセレクタをルートに戻せる @at-root

- あまり使い所が無いと感じたが、使える場面があるらしい

```scss
.block {
    .element-A {
        width: 80%;
    }
    @at-root .element-B {
        width: 100%;
    }
}
```

```css
.block .element-A {
  width: 80%;
}

.element-B {
  width: 100%;
}
```

- 使い所は５章で確認する

### 4-4 Sassのデータタイプについて

- Sassのデータ・タイプについて

```scss
.DataTypes {
    /* Number型 */
    property: type-of(10%);
    /* Color型 */
    property: type-of(red);
    /* String型 */
    property: type-of(sans-serif);
    /* Boolean型 */
    property: type-of(true);
    /* Null型 */
    property: type-of(null);
    /* List型 */
    property: type-of(1.5em 1em 0 2em);
    /* Map型 */
    $map:(key1: value1, key2: value2);
    property: type-of($map);
    /* Function型 */
    property: type-of(get-function("lighten"));
}
```

```css
.DataTypes {
  /* Number型 */
  property: number;
  /* Color型 */
  property: color;
  /* String型 */
  property: string;
  /* Boolean型 */
  property: bool;
  /* Null型 */
  property: null;
  /* List型 */
  property: list;
  /* Map型 */
  property: map;
  /* Function型 */
  property: function;
}
```

```scss
@function example($value) {
    @if type-of($value) == number {
        処理
    }
}
// typeで判断して関数を作れますよという説明
```

### 4-5 制御構文で条件分岐や繰り返し処理を行う

- `@if`,`@for`,`@while`,`@each`を使って表現

### 4-6 関数を使ってさまざまな処理を実行する

- Sassには予め用意された関数がある
- 使用頻度の高いものをピックアップして紹介

- 参照 <https://book2.scss.jp/code/c4/06.html>

### 4-7 自作関数を定義する@function

- 自作関数の定義方法 そんなに変わったことはしていない

```scss
$width: 105px;
@function halfSize($value:$width) {
    @return round($value / 2);
}
.boxA {
    width: halfSize();
}
.boxB {
    width: halfSize(200px);
}
```

### 4-8 テストやデバックで使える@debug、@warn、@error

- 変数のデバッグに使用できる機能もある

```scss
@debug 10em + 12em;

```

```txt
test.scss:1 DEBUG: 22em
```

```scss
// WARNで警告
$value: 1000px;
@function warnTest(){
    @if unitless($value) {
        $value: $value + px;
    }
    @else {
    @warn "#{$value}は駄目！$valueに単位は入れないで！";
    }
    @return $value;
}
.box {
    width: warnTest();
}

// ERROR で処理を中断
$value: 1000px;
@function errorTest(){
    @if unitless($value) {
        $value: $value + px;
    }
    @else {
    @error "#{$value}は駄目！$valueに単位は入れないで！";
    }
    @return $value;
}
.box {
    width: errorTest();
}
```

### 4-9 使いどころに合わせて補完（インターポレーション）してくれる#{}

- インターポレーションとは
  - 変数が参照できない場所でも使うことができるようにする機能
  - `#{}`←これ

- 演算しないようにする
  - `font: #{$font-size}/#{$line-height}`

- 演算できない場所で演算する
  - `.mt#{$i * 5} {`

### 4-10 変数の振る舞いをコントロールする !default と !global

- `!default`フラグ
  - デフォルト値とは上書きされることを前提にした変数の初期値
  - このフラグを使用していると、先に宣言されている変数が優先される
    - →ライブラリで使用しているの確認済み。よく使われる

- `!global`フラグ
  - ローカル変数をグローバル変数にするフラグ
  - グローバル変数とはドキュメントルートで宣言した、どこからでも参照できる変数のこと
  - ネスト内からグローバル変数を上書きしたい場合や、ローカル変数をスコープ外から参照したい場合などに使用する

## 第5章 現場で使える実践Sassテクニック

### 5-1 管理／運用・設計で使えるテクニック

- ネストが深すぎると生じる問題を把握して、バランスを見ながら利用する

- ネストが深すぎて可読性が落ちてしまう
- セレクタが長くなってしまうことの弊害
  - CSSが肥大化する

- Column: ネストは何階層までがよいか
  - 2～3階層程度にするのがよい
  - HTMLのツリー構造に沿った形でCSSを指定するストラクチャタイプの設計の場合は、
  - ある程度ネストを深くしたほうがよい

- CSSとは違うパーシャルによるSassファイルの分割
  - `_mixin.scss`など分けて作成して、`@import`でまとめる

- サイトの基本設定を変数にして一元管理する

- 複数人で制作する場合は各自のSassファイルを用意する
  - Gitなどが汚れるのではとも感じる...

- コメントを活用してソースをわかりやすくする

- 大規模サイトで活用できる`@import`のネスト

- &(アンパサンド)を活用してBEM的な設計を快適に

```scss
.navigation {
    width: 100%;
    &__item {
        color: #666;
        &_state_active {
            color: #000;
        }
    }
}
```

- `@keyframes`をルールセット内に書いて関係性をわかりやすくする

```scss
.example {
    @keyframes anima-example {
        0% {
            transform: translate(0%, -100%);
        }
        100% {
            transform: translate(0%, 0%);
        }
    }
    animation: anima-example 0.9s linear 500ms 1;
}
```

`@keyframes`はルートに書き出してくれる

```css
.example {
  animation: anima-example 0.9s linear 500ms 1;
}
@keyframes anima-example {
  0% {
    transform: translate(0%, -100%);
  }
  100% {
    transform: translate(0%, 0%);
  }
}
```

- EditorConfigとStylelintでコーディングルールを統一する
  - EditorConfig：拡張機能を入れて、`.editorconfig`ファイルを作成
  - Stylelint：拡張機能を入れる
    - `npm install --global stylelint`
    - `.stylelintrc`という設定ファイルをおけばOK

- Column: 他の人を思いやってSass設計をしよう
  - 本書のシリーズ「Web製作者のためのCSS設計の教科書」はFLOCSS（フロックス）を提唱しているらしい

### 5-2 レイアウト・パーツで使えるテクニック

- clearfixをミックスインで活用する

```scss
@mixin clearfix {
    &::after {
        content: "";
        display: block;
        clear: both;
    }
}
// include
.item {
  @include .clearfix;
  background: #eee;
  .image {
    float: left;
    width: 100px;
  }
  .text {
    float: left;
  }
}

```

- 変数を使って、サイドバーの幅を自動的に計算する

```scss
// 全体の幅
$wrap-width: 960px;
// メインエリアの幅
$main-width: 640px;
// サイドバーの幅
$side_width: $wrap_width - $main_width - 20;
#contents {
    width: $wrap_width;
}
#main {
    width: $main_width;
}
#side {
    width: $side_width;
}
```

- nullで簡単に条件分岐してレイアウトする
  - nullを指定するとコンパイルした時にプロパティごと生成されない

- calc と Sass を組み合わせて四則演算を便利に使う
  - calcと組み合わせる際の注意点について

- `@for`を使って余白調整用のclassを生成する

```scss
$spaceClass: true !default;
$spacePadding: false !default;
$endValue: 10 !default;

@if $spaceClass {
    @for $i from 0 through $space_endValue {
        .mt#{$i * 5} {
            margin-top: 5px * $i !important;
        }
        .mb#{$i * 5} {
            margin-bottom: 5px * $i !important;
        }
        @if $spacePadding {
            .pt#{$i * 5} {
                padding-top: 5px * $i !important;
            }
            .pb#{$i * 5} {
                padding-bottom: 5px * $i !important;
            }
        }
    }
}
```

```css
.mt0 {
  margin-top: 0px !important;
}
.mb0 {
  margin-bottom: 0px !important;
}
.mt5 {
  margin-top: 5px !important;
}
.mb5 {
  margin-bottom: 5px !important;
}
...（略）...
.mt50 {
  margin-top: 50px !important;
}
.mb50 {
  margin-bottom: 50px !important;
}
// あまり作成しすぎるとCSSコード量も増えるので程々に
```

- リストマーカー用の連番を使った class名 を作成する
- 連番を使ったclass名のゼロパディング（0埋め）をする

- 文字リンクカラーのミックスインを作る

```scss
@mixin link-color2($n) {
    color: $n;
    &:hover {
        color: lighten($n, 30%);
        text-decoration: none;
    }
}
a {
  @include link-color2(#f00);
}
```

- 複数の値を`@each`でループし、ページによって背景を変更する
- シンプルなグラデーションのミックスインを作る
- Map型と`@each`を使ってSNSアイコンを管理する

- 値が比較しづらい `z-index` をMap型で一括管理する

- メディアクエリ用のミックスインを作成して楽々レスポンシブ対応

```scss
$breakpoints: (
    xs: "only screen and (max-width: 320px)",
    s: "only screen and (max-width: 575px)",
    m: "only screen and (max-width: 767px)",
    l: "only screen and (max-width: 991px)",
    xl: "only screen and (max-width: 1199px)",
);
@mixin media($breakpoint) {
    @media #{map-get($breakpoints, $breakpoint)} {
        @content;
    }
}
body {
    background-color: white;
    @include media(l) {
        background-color: blue;
    }
    @include media(m) {
        background-color: green;
    }
    @include media(xs) {
        background-color: red;
    }
}

```

### 5-3 スマホ・マルチデバイス、ブラウザで使えるテクニック

### 5-4 gulpのタスクを追加してもっと便利な環境にする

- パーシャルファイルを一括で読み込む
- ソースマップでコンパイル前のソース場所を知る
- エラー時にWatchを停止させずに、自動コンパイルを継続させる
- エラーに気づきやすくするために通知を出す

### 5-5 PostCSSでSassをさらに便利にする

- PostCSSとは
  - Node.js製のCSSの変換ツール

- ベンダープレフィックスを自動付与する
  - 対象ブラウザを確認するには
    - <https://browserl.ist/>

- 画像名だけで画像のパスやサイズを取得する

- CSSプロパティの記述順を自動でソートする
  - 並び替えオーダーの種類
    - alphabetically
    - smacss
    - concentric-css

- バラバラになったメディアクエリをまとめてコード量を削減してスッキリさせる


## 第6章 もっとSassを便利にするフレームワークやツール
### 6-1 Sassのフレームワーク紹介
### 6-2 SassのGUIコンパイラ
## 第7章 Sass全機能リファレンス
### 7-1 Sassの基本と高度な機能
### 7-2 Sassの関数一覧
### 7-3 Sassの拡張
## 付録
## コマンド一覧
## 用語集

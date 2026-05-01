---
title: Oracle Cloud 関連資格の整理（2026年時点・OCI 2025 ラインアップ）
published: 2026-05-01
description: Oracle Cloud Infrastructure（OCI）周りの認定資格を、レベル感と用途で整理した一覧と、受験の進め方・注意点のまとめ。受験料や形式は公式の最新情報で要確認。
image: ""
tags:
  - Oracle
  - OCI
  - 資格
  - クラウド
category: ブログ
draft: false
lang: ""
---

## 概要

Oracle Cloud（特に OCI）はサービスと認定試験のバリエーションが多く、名称に年度が付くため「どれから取ればよいか」「自分の役割に近いのはどれか」が分かりにくいです。本記事では **2026 年時点で Oracle が提供している OCI 2025 Certification 系の主な試験**を、ジャンル・ざっくり難易度・学習期間の目安とあわせて一覧にし、あわせて受験の考え方の補足をまとめます。

個々の試験の**出題範囲の細部や問題傾向の深掘り**は扱いません。受験を決めたら、必ず [Oracle の認定ポータル](https://www.oracle.com/education/certification) と各試験ページのシラバスで確定してください。

## 目次

- [この記事の対象と範囲](#この記事の対象と範囲)
- [Oracle Cloud 認定資格一覧](#oracle-cloud-認定資格一覧oci-2025-ラインアップ2026-年時点)
- [補足（重要ポイント）](#補足重要ポイント)
- [まとめ](#まとめ)

## この記事の対象と範囲

- **向いている読者**: OCI をこれから触る／触り始めた人、社内で資格取得を検討している人、なんとなく名前だけ聞いて地図が欲しい人。
- **分かること**: 主要な OCI 系認定のおおよその位置づけ、Fundamentals と Associate／Professional の違いのイメージ、学習の出発点の考え方。
- **分からないこと・しないこと**: 各試験の詳細シラバス解説、合格のための対策本の比較、正確な当日の受験料（地域・キャンペーンで変わるため）。

以下の表は **受験料・期間・受験方法は一般的な目安**です。特に Foundations 系の無料化やプロモーションは時期によって変わります。

---

## Oracle Cloud 認定資格一覧（OCI 2025 ラインアップ、2026 年時点）

表は列数が多いため、**狭い画面では横スクロール**になります。試験の正式名称・試験番号・当日の料金・利用可能な受験モードは、[Oracle Certification](https://www.oracle.com/education/certification) および [Oracle University の試験一覧](https://education.oracle.com/oracle-certification-exams-list) の各試験ページを優先してください。

**出典・確認日の目安**: 試験名は [Oracle Certification（Oracle Cloud Infrastructure 欄）](https://www.oracle.com/education/certification) の掲載（2026 年 5 月時点）と照合しています。HPE（Hands-on Performance Exam）など試験形式の説明は [Oracle University の OCI 2025 認定向け告知](https://blogs.oracle.com/oracleuniversity/oci-2025-certification-learning-paths-and-exams-now-available) も参考にしました。

| 資格名                                                                | ジャンル         | 概要                                   | 難易度 | 受験料（目安） | 学習期間（目安） | 受験方法（目安）            | 学習の手がかり                          |
| --------------------------------------------------------------------- | ---------------- | -------------------------------------- | ------ | -------------- | ---------------- | --------------------------- | --------------------------------------- |
| Oracle Cloud Infrastructure 2025 Foundations Associate                | OCI 基礎         | OCI の基本概念（Compute, Storage, IAM） | ★      | 無料〜（要確認） | 1〜2 週間       | オンラインが一般的          | Oracle University の Foundations 教材   |
| Oracle Data Platform 2025 Foundations Associate                       | データ基礎       | データ基盤・分析の基礎                 | ★      | 無料〜（要確認） | 1〜2 週間       | オンラインが一般的          | Oracle University                       |
| Oracle Cloud Infrastructure 2025 AI Foundations Associate             | AI 基礎          | AI/ML・生成 AI の基本                  | ★      | 無料〜（要確認） | 1〜2 週間       | オンラインが一般的          | Oracle AI Foundations 系教材            |
| Oracle Cloud Infrastructure 2025 Architect Associate                  | アーキテクト     | OCI 設計の基礎                         | ★★     | 約 $150        | 1〜2 ヶ月       | オンライン／会場（地域による） | ラボ＋公式模擬・Learning Path           |
| Oracle Redwood Application 2025 Developer Associate                   | アプリ開発       | Redwood UI ベースの開発                | ★★     | 約 $150        | 1〜2 ヶ月       | オンラインが一般的          | Redwood 公式ドキュメント                |
| Oracle Cloud Infrastructure 2025 Architect Professional               | 上級設計         | 高可用性・大規模設計（HPE 形式）       | ★★★    | 約 $245        | 2〜3 ヶ月       | 試験により指定あり          | 実務＋公式 Hands-on 系準備              |
| Oracle AI Vector Search Professional                                  | AI/DB            | ベクトル検索（AI 検索）                | ★★     | 約 $150        | 約 1 ヶ月       | オンラインが一般的          | DB・AI 関連 Learning Path               |
| Oracle Cloud Infrastructure 2025 Multicloud Architect Professional    | マルチクラウド   | 他クラウド等との連携設計               | ★★★    | 約 $245        | 2〜3 ヶ月       | 試験により指定あり          | マルチクラウド設計の公式教材            |
| Oracle Cloud Infrastructure 2025 Networking Professional              | ネットワーク     | OCI ネットワーク設計                   | ★★★    | 約 $245        | 2〜3 ヶ月       | 試験により指定あり          | VCN・接続の公式コース                   |
| Oracle Cloud Infrastructure 2025 Developer Professional               | 開発             | OCI でのアプリ開発                     | ★★★    | 約 $245        | 2〜3 ヶ月       | 試験により指定あり          | SDK/CLI・公式ラボ                       |
| Oracle Cloud Infrastructure 2025 DevOps Professional                | DevOps           | CI/CD・自動化                          | ★★★    | 約 $245        | 2〜3 ヶ月       | 試験により指定あり          | DevOps 系 Learning Path                 |
| Oracle Analytics Cloud 2025 Professional                              | 分析             | BI/ダッシュボード                      | ★★★    | 約 $245        | 約 2 ヶ月       | オンラインが一般的          | OAC 公式教材                            |
| Oracle APEX Cloud Developer Professional                              | ローコード       | APEX 開発                              | ★★★    | 約 $245        | 約 2 ヶ月       | オンラインが一般的          | APEX ハンズオン                         |
| Oracle Cloud Infrastructure 2025 Security Professional              | セキュリティ     | IAM・セキュリティスタック（HPE あり）  | ★★★    | 約 $245        | 2〜3 ヶ月       | 試験により指定あり          | セキュリティ公式シナリオ                |
| Oracle Cloud Infrastructure 2025 Cloud Operations Professional      | 運用             | 監視・運用設計                         | ★★★    | 約 $245        | 約 2 ヶ月       | 試験により指定あり          | 運用・管理系コース                      |
| Oracle Cloud Infrastructure 2025 Observability Professional         | 可観測性         | ログ/メトリクス分析                    | ★★★    | 約 $245        | 約 2 ヶ月       | 試験により指定あり          | Monitoring / Logging 公式教材           |
| Oracle Cloud Infrastructure 2025 Migration Architect Professional    | 移行             | クラウド移行戦略                       | ★★★    | 約 $245        | 2〜3 ヶ月       | 試験により指定あり          | 移行ツール・ベストプラクティス          |
| Oracle Cloud Infrastructure 2025 Generative AI Professional         | 生成 AI          | LLM 活用・設計                         | ★★★    | 約 $245        | 約 2 ヶ月       | オンラインが一般的          | GenAI 公式 Learning Path                |
| Oracle Cloud Infrastructure 2025 Data Science Professional          | データサイエンス | ML/分析実装                            | ★★★    | 約 $245        | 2〜3 ヶ月       | 試験により指定あり          | Data Science / OAC 関連                 |
| Oracle Cloud Infrastructure 2025 Application Integration Professional | 統合             | API/連携（OIC 等）                     | ★★★    | 約 $245        | 約 2 ヶ月       | オンラインが一般的          | Integration Cloud 公式コース            |
| Oracle AI Cloud Database Services 2025 Professional                   | DB×AI            | AI 対応 DB サービス                    | ★★★    | 約 $245        | 約 2 ヶ月       | 試験により指定あり          | Autonomous DB 関連                      |
| Oracle AI Autonomous Database 2025 Professional                     | 自律 DB          | 自動運用 DB                            | ★★★    | 約 $245        | 約 2 ヶ月       | 試験により指定あり          | Autonomous Database 公式教材            |
| Oracle Database@AWS Architect Professional                            | DB/マルチ        | AWS 上の Oracle 設計                   | ★★★    | 約 $245        | 2〜3 ヶ月       | 試験により指定あり          | Database@AWS 公式資料                   |
| Oracle Cloud Infrastructure for Sunbird ED Specialty                 | 教育             | 教育プラットフォーム（Sunbird ED）     | ★★     | 約 $150        | 約 1 ヶ月       | オンラインが一般的          | Sunbird ED 向け公式ガイド               |

**免責（再掲）**: 受験料の通貨単位、割引・無料キャンペーン、Proctor 形式、試験の廃止・追加は告知どおり変わります。**申し込み前に必ず各試験の公式ページで確認**してください。

---

## 補足（重要ポイント）

### 1. レベル感のざっくり整理

難易度の星はあくまでこの記事内での目安であり、公式の区分名とは一致しません。

- **★（Fundamentals 相当）**  
  OCI やデータ、AI の「入口」。多くはアソシエイトより前段の位置づけで、**無料で受けられるプロモーションが出やすい**区分です（常に無料とは限らない）。
- **★★（Associate 相当）**  
  特定ロールにフォーカスした**実務入り口**。 Architect Associate のように汎用設計から、Redwood／Vector Search のように専門トピックに絞ったものまで含みます。
- **★★★（Professional 相当）**  
  **設計判断・運用実務が前提**になることが多いです。[Oracle University の OCI 2025 認定向け告知](https://blogs.oracle.com/oracleuniversity/oci-2025-certification-learning-paths-and-exams-now-available) によれば、Architect Professional や Security Professional などは **Hands-on Performance Exam（HPE）** のように、実機に近い課題で評価される形式もあります。

### 2. Foundations（無料枠）の位置づけ

OCI / Data Platform / AI の Foundations は、**チーム全体の共通言語づくり**や、自らの学習マップの確認に向きます。ここで終わらず、役割に応じて Associate 以降を組み合わせると「設計・実装」につながりやすいです。料金が無料ないし割引になるキャンペーンは期間限定のことがあるため、申込画面で確認してください。

### 3. おすすめの受験順の一例

**一例にすぎません**（担当がデータ基盤のみ、なら Data Platform Foundations → DB 系、などルートは人によって変わります）。

1. **Oracle Cloud Infrastructure 2025 Foundations Associate**（OCI の全体像）
2. 興味に応じて **Oracle Data Platform 2025 Foundations Associate** または **Oracle Cloud Infrastructure 2025 AI Foundations Associate**
3. インフラ寄りなら **Oracle Cloud Infrastructure 2025 Architect Associate**
4. 役割に合わせて **Professional**（例: セキュリティ担当なら Security Professional、ネットワーク専任なら Networking Professional）

Professional は未受験でも受けられるものと、実務経験が推奨されるものがあります。**前提条件は試験ごとの公式説明を参照**してください。

### 4. 受験方法・試験形式について

表の「オンライン／テストセンター」は**大まかな例**です。実際には **オンライン監督付き（プロクタ）／会場試験／HPE（パフォーマンス系）** など試験ごとに異なり、アカウントの地域や提携プロクタ会社の事情でも変わります。「すべての Professional が会場のみ」などと決めつけず、**申込時の選択肢**で確定してください。

### 5. 試験名の「2025」と更新サイクル

試験名に付く **2025 は「その年度版のカリキュラム・シラバスに対応」**という意味に近く、「2026 年に受けても意味がない」わけではありません。一方で Oracle はサービス更新に合わせて試験内容を更新するため、**受験直前にシラバスと Learning Path の更新履歴を見る**習慣があると安全です。古い教材だけでなく、公式の最新コースやブログ（例: Oracle University の OCI 2025 認定向け告知）をあわせて確認してください。

### 学習リソースについて

表の「学習の手がかり」列は、記事の保守をしやすくするために**大分類だけ**に留めています。具体的なコース名・モジュールは変わりやすいので、各試験ページから **Oracle University の対応 Learning Path / Exam Prep** に進むのが確実です。

あわせて、以下の公式ドキュメント・比較資料・FAQ を参照すると、資格学習と実務の橋渡しがしやすくなります。

- [Oracle Cloud Infrastructure Documentation](https://docs.oracle.com/en-us/iaas/Content/home.htm)
- [Oracle Cloud Infrastracture 活用資料集](https://oracle-japan.github.io/ocidocs/)
- [Oracle Cloud Infrastructure チュートリアル](https://oracle-japan.github.io/ocitutorials/)
- [Compare OCI with AWS, Azure, and Google Cloud](https://www.oracle.com/cloud/service-comparison/)
- [よくある質問とその回答](https://docs.oracle.com/ja-jp/iaas/Content/GSG/Reference/faq.htm)
- [Oracle Cloud Free Tier](https://www.oracle.com/jp/cloud/free/)

---

## まとめ

本記事では、**2026 年時点の Oracle 公式リストに沿った OCI 2025 ラインアップ中心の認定**を、ジャンルとレベル感で俯瞰できるように整理しました。次のステップは次の 3 点です。

1. [Oracle Certification](https://www.oracle.com/education/certification) で自分の関心に近い試験名を開き、**シラバスと前提条件**を読む。  
2. 受験料・スケジュール・利用可能な受験方式を **申込フロー** で確定する。  
3. **公式 Learning Path** で学習し、必要ならコミュニティや社内勉強会と組み合わせる。

資格は学習の道しるべであり、実務の代替ではありませんが、OCI の幅広いサービスを把握するうえで、**地図としての一覧**には役立つはずです。

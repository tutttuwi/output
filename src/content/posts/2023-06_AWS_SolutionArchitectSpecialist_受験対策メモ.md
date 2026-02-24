---
title: AWS_SolutionArchitectSpecialist_受験対策まとめ
published: 2023-06-24
tags: ["受験対策まとめ", "AWS"]
category: 書籍
draft: false
---



# AWS SysOps Administrator Associate Exam preparation

## 基本情報

- 試験時間：試験完了までに 180 分
- スコア：100-1000点
- 最低合格スコア：720点
- 受験料：300 USD
- フォーマット: 75 問

## WEB情報

<https://aws.amazon.com/jp/certification/certified-solutions-architect-professional/?ch=sec&sec=rmg&d=1>

### 認定によって検証される能力

- 複雑な組織に対応する設計
- 新しいソリューションのための設計
- 既存ソリューションの継続的な改善
- ワークロードの移行とモダナイゼーションの加速

### 内容の概要

| 分野                                                   | 出題の比率 |
| ------------------------------------------------------ | ---------- |
| 第 1 分野 複雑な組織に対応するソリューションの設計     | 26%        |
| 第 2 分野 新しいソリューションのための設計             | 29%        |
| 第 3 分野 既存のソリューションの継続的な改善           | 25%        |
| 第 4 分野 ワークロードの移行とモダナイゼーションの加速 | 20%        |
| 合計                                                   | 100%       |

## タスク

### 第１分野: 複雑な組織に対応するソリューションの設計

タスクステートメント 1: ネットワーク接続戦略を設計する。

対象知識:

- AWS のグローバルインフラストラクチャ
- AWS ネットワークの概念 (Amazon VPC、AWS Direct Connect、AWS VPN、推移的ルーティング、AWS コンテナサービスなど)
- ハイブリッド DNS の概念 (Amazon Route 53 Resolver、オンプレミス DNS 統合など)
- ネットワークセグメンテーション (サブネット、IP アドレス指定、VPC 間の接続など)
- ネットワークトラフィックモニタリング

対象スキル:
- 複数の VPC の接続オプションを評価する
- オンプレミス、コロケーション、クラウド統合の接続オプションを評価する
- ネットワークとレイテンシーの要件に基づいて AWS リージョンとアベイラビリティーゾーンを選択する
- AWS ツールを使用してトラフィックフローの問題を解決する
- サービス統合のサービスエンドポイントを活用する


タスクステートメント 2: セキュリティコントロールを規定する。

対象知識:
- AWS Identity and Access Management (IAM) と AWS Single Sign-On
- ルートテーブル、セキュリティグループ、ネットワーク ACL
- 暗号化キーと証明書管理 (AWS Key Management Service [AWS KMS]、AWS CertificateManager [ACM] など)
- AWS のセキュリティ、アイデンティティ、コンプライアンスのツール (AWS CloudTrail、AWS Identity and Access Management Access Analyzer、AWS Security Hub、Amazon Inspector など)

対象スキル:
- クロスアカウントアクセス管理を評価する
- サードパーティー ID プロバイダーと統合する
- 保存中のデータと転送中のデータに対する暗号化戦略を導入する
- セキュリティイベントの通知と監査を一元化するための戦略を策定する


タスクステートメント 3: 信頼性と耐障害性に優れたアーキテクチャを設計する。

対象知識:
- 目標復旧時間 (RTO) と目標復旧時点 (RPO)
- 災害対策戦略 (AWS Elastic Disaster Recovery [CloudEndure Disaster Recovery]、パイロットライト、ウォームスタンバイ、マルチサイトの使用など)
- データのバックアップと復元

対象スキル:
- RTO および RPO 要件に基づいて災害対策ソリューションを設計する
- 障害から自動的に復旧するアーキテクチャを実装する
- スケールアップとスケールアウトのオプションを考慮し、最適なアーキテクチャを策定する
- 効果的なバックアップ/復元の戦略を設計する

タスクステートメント 4: マルチアカウント AWS 環境を設計する。

対象知識:
- AWS Organizations と AWS Control Tower
- マルチアカウントイベント通知
- 環境間の AWS リソース共有

対象スキル:
- 組織の要件に最も適したアカウント構造を評価する
- 一元的なログ記録とイベント通知の戦略を推奨する
- マルチアカウントガバナンスモデルを開発する


タスクステートメント 5: コスト最適化と可視化の戦略を決定する。

対象知識:
- AWS のコストおよび使用状況のモニタリングツール (AWS Trusted Advisor、AWS Pricing Calculator、AWS Cost Explorer、AWS Budgets など)
- AWS 購入オプション (リザーブドインスタンス、Savings Plans、スポットインスタンスなど)
- サイズ適正化のための AWS 可視化ツール (AWS Compute Optimizer、Amazon S3 StorageLens など)

対象スキル:
- AWS ツールでコストと使用量をモニタリングする
- コストを事業単位にマッピングする効果的なタグ付け戦略を策定する
- 購入オプションがコストとパフォーマンスに与える影響を理解する






第 2 分野: 新しいソリューションのための設計

タスクステートメント 1: ビジネス要件を満たす導入戦略を設計する。

対象知識:
- Infrastructure as Code (IaC) (AWS CloudFormation など)
- 継続的インテグレーション/継続的デリバリー (CI/CD)
- 変更管理プロセス
- 構成管理ツール (AWS Systems Manager など)

対象スキル:
- 新しいサービスや機能のためのアプリケーションまたはアップグレードパスを決定する
- デプロイ戦略を策定し、適切なロールバックメカニズムを実装するためのサービスを選定する
- 必要に応じてマネージドサービスを採用し、インフラストラクチャのプロビジョニングやパッチ適用のオーバーヘッドを削減する
- 複雑な開発タスクとデプロイタスクを AWS にまかせ、高度なテクノロジーを利用できるようにする


タスクステートメント 2: 事業継続性を確保するソリューションを設計する。

対象知識:
- AWS のグローバルインフラストラクチャ
- AWS ネットワークの概念 (Route 53、ルーティングメソッドなど)
- RTO と RPO
- 災害対策シナリオ (バックアップと復元、パイロットライト、ウォームスタンバイ、マルチサイトなど)
- AWS の災害対策ソリューション

対象スキル:
- 災害対策ソリューションを構成する
- データとデータベースのレプリケーションを構成する
- 災害対策テストを実行する
- 自動化され、費用対効果が高く、複数のアベイラビリティーゾーンおよび/またはAWS リージョンをまたいで事業継続性をサポートするバックアップソリューションのアーキテクチャを設計する
- 障害時もアプリケーションとインフラストラクチャの可用性を維持するアーキテクチャを設計する
- プロセスとコンポーネントを活用して一元的なモニタリングを行い、システム障害からプロアクティブに復旧する


タスクステートメント 3: 要件に基づいてセキュリティコントロールを決定する。

対象知識:
- IAM
- ルートテーブル、セキュリティグループ、ネットワーク ACL
- 保管中のデータと転送中のデータの暗号化オプション
- AWS サービスエンドポイント
- 認証情報管理サービス
- AWS マネージドセキュリティサービス (AWS Shield、AWS WAF、Amazon GuardDuty、AWS Security Hub など)

対象スキル:
- 最小権限アクセスの原則に従った IAM ユーザーと IAM ロールを指定する
- セキュリティグループルールとネットワーク ACL ルールを使用したインバウンドおよびアウトバウンドのネットワークフローを指定する
- 大規模なウェブアプリケーションの攻撃対策戦略を策定する
- 保管中のデータと転送中のデータの暗号化戦略を策定する
- サービス統合のサービスエンドポイントを指定する
- 組織の規格への準拠を維持するためのパッチ管理戦略を策定する


タスクステートメント 4: 信頼性の要件を満たす戦略を策定する。

対象知識:
- AWS のグローバルインフラストラクチャ
- AWS ストレージサービスとレプリケーション戦略 (Amazon S3、Amazon RDS、AmazonElastiCache など)
- マルチ AZ およびマルチリージョンアーキテクチャ
- オートスケーリングのポリシーとイベント
- アプリケーション統合 (Amazon Simple Notification Service [Amazon SNS]、AmazonSimple Queue Service [Amazon SQS]、AWS Step Functions など)
- サービスクォータと上限

対象スキル:
- ビジネス要件に基づいて可用性の高いアプリケーション環境を設計する
- 高度な技術を活用して障害に備えて設計し、シームレスなシステム回復性を確保する
- 疎結合依存関係を実装する
- 高可用性アーキテクチャを運用、保守する (アプリケーションのフェイルオーバー、データベースのフェイルオーバーなど)
- AWS マネージドサービスを活用して高可用性を実現する
- DNS ルーティングポリシーを実装する (Route 53 のレイテンシールーティングポリシー、位置情報ルーティング、シンプルルーティングなど)


タスクステートメント 5: パフォーマンス目標を満たすソリューションを設計する。

対象知識:
- パフォーマンスモニタリングテクノロジー
- AWS のストレージオプション
- インスタンスファミリーとユースケース
- 目的別データベース

対象スキル:
- さまざまなアクセスパターンに対応した大規模アプリケーションアーキテクチャを設計する
- ビジネス目標に合わせて伸縮自在なアーキテクチャを設計する
- キャッシュ、バッファリング、レプリカでパフォーマンス目標を達成するための設計パターンを適用する
- 必要なタスクに特化したサービスを選択するためのプロセス方法論を策定する
- サイズ適正化戦略を設計する

タスクステートメント 6: ソリューションの目標と目的を達成するためのコスト最適化戦略を決定する。

対象知識:
- AWS のコストおよび使用状況のモニタリングツール (Cost Explorer、Trusted Advisor、AWS Pricing Calculator など)
- 料金モデル (リザーブドインスタンス、Savings Plans など)
- ストレージ階層化
- データ転送コスト
- AWS が提供するマネージドサービス

対象スキル:
- インフラストラクチャを選択し、適切なサイズにする機会を特定し、リソースの費用対効果を上げる
- 適切な価格モデルを特定する
- データ転送のモデル化とサービスの選択を行い、データ転送コストを削減する
- 経費支出と使用状況を認識するための戦略を策定し、制御を実装する



第 3 分野: 既存のソリューションの継続的な改善

タスクステートメント 1: 全体的な運用上の優秀性を高めるための戦略を作成する。

対象知識:
- アラートと自動修復の戦略
- 災害対策計画
- モニタリングとログ記録のソリューション (Amazon CloudWatch など)
- CI/CD パイプラインとデプロイ戦略 (ブルー/グリーン、オールアットワンス、ローリングなど)
- 構成管理ツール (Systems Manager など)

対象スキル:
- 最も適したログ記録とモニタリング戦略を決定する
- 改善の機会を特定する目的で現在のデプロイプロセスを評価する
- ソリューションスタック内の自動化の機会に優先順位を付ける
- 構成管理を自動化を可能にするために適切な AWS ソリューションを提案する
- 復旧アクションの理解をサポートし、演習するための障害シナリオアクティビティを設計する

タスクステートメント 2: セキュリティを向上させるための戦略を決定する。

対象知識:
- データ保持、データ機密性、データ規制要件
- モニタリングと修正の自動化戦略 (AWS Config ルールなど)
- シークレット管理 (Systems Manager、AWS Secrets Manager など)
- 最小権限アクセスの原則
- セキュリティ固有の AWS ソリューション
- パッチ適用のプラクティス
- バックアップのプラクティスと方法

対象スキル:
- シークレットと認証情報を安全に管理するための戦略を評価する
- 最小権限アクセスについて環境を監査する
- 実装されたソリューションを見直し、すべてのレイヤーでセキュリティを確保する
- ユーザーとサービスの包括的なトレーサビリティを見直す
- 脆弱性の検出に対する自動対応に優先順位を付ける
- パッチと更新のプロセスを設計し、実装する
- バックアッププロセスを設計し、実装する
- 修復手法を採用する


タスクステートメント 3: パフォーマンスを改善するための戦略を決定する。

対象知識:
- 高パフォーマンスのシステムアーキテクチャ (オートスケーリング、インスタンスフリート、プレイスメントグループなど)
- グローバルサービス (AWS Global Accelerator、Amazon CloudFront、エッジコンピューティングサービスなど)
- モニタリングツールのセットとサービス (CloudWatch など)
- サービスレベルアグリーメント (SLA) と重要業績評価指標 (KPI)

対象スキル:
- ビジネス要件を測定可能な指標に変換する
- 修復ソリューション候補をテストし、提案を行う
- 新しいテクノロジーとマネージドサービスを導入する機会を提案する
- ソリューションを評価し、要件に基づいてサイズの適正化を行う
- パフォーマンスのボトルネックを特定し、調査する

タスクステートメント 4: 信頼性を向上させるための戦略を決定する。

対象知識:
- AWS のグローバルインフラストラクチャ
- データレプリケーション方法
- スケーリング方法論 (ロードバランシング、オートスケーリングなど)
- 高可用性と回復力
- 災害対策の方法とツール
- サービスクォータと上限


対象スキル:
- アプリケーションの利用増加と使用傾向を把握する
- 既存のアーキテクチャを評価し、信頼性が不十分な領域を特定する
- 単一障害点を修正する
- データレプリケーション、自己修復、伸縮自在な機能とサービスを実現する


タスクステートメント 5: コスト最適化の機会を特定する。

対象知識:
- コスト意識の高いアーキテクチャを選択する (スポットインスタンスの利用、スケーリングポリシー、リソースのサイズ適正化など)
- 価格モデルの採用 (リザーブドインスタンス、Savings Plans など)
- ネットワークとデータ転送のコスト
- コスト管理、アラート、レポート作成

対象スキル:
- 使用状況レポートを分析し、使用率の低いリソースと使用率の高いリソースを特定する
- AWS ソリューションを活用して使用されていないリソースを特定する
- 予想される使用パターンに基づいて課金アラームを設計する
- AWS Cost and Usage Report をきめ細かく調査する
- コスト配分とレポート作成にタグ付けを活用する

第 4 分野: ワークロードの移行とモダナイゼーションの加速

タスクステートメント 1: 移行が可能な既存のワークロードとプロセスを選択する。

対象知識:
- 移行アセスメントおよび追跡ツール (AWS Migration Hub など)
- ポートフォリオアセスメント
- アセットプランニング
- ワークロードの優先順位付けと移行 (ウェーブプランニングなど)

対象スキル:
- アプリケーション移行アセスメントを実施する
- 7 つの一般的な移行戦略 (7R) に従ってアプリケーションを評価する
- 総保有コスト (TCO) を評価するタスクステートメント 2: 既存ワークロードの最適な移行アプローチを決定する。

対象知識:
- データ移行のオプションとツール (AWS DataSync、AWS Transfer Family、AWS SnowFamily、S3 Transfer Acceleration など)
- アプリケーション移行ツール (AWS Application Discovery Service、AWS ApplicationMigration Service [CloudEndure Migration]、AWS Server Migration Service[AWS SMS] など)
- AWS ネットワークサービスと DNS (Direct Connect、AWS Site-to-Site VPN、Route 53 など)
- アイデンティティサービス (AWS SSO、AWS Directory Service など)
- データベース移行ツール (AWS Database Migration Service [AWS DMS]、AWS SchemaConversion Tool [AWS SCT] など)
- ガバナンスツール (AWS Control Tower、Organizations など)

対象スキル:
- 適切なデータベース転送メカニズムを選択する
- 適切なアプリケーション転送メカニズムを選択する
- 適切なデータ転送サービスと移行戦略を選択する
- 移行ツールに適したセキュリティ方法を適用する
- 適切なガバナンスモデルを選択する

タスクステートメント 3: 既存ワークロードの新しいアーキテクチャを決定する。

対象知識:
- コンピューティングサービス (Amazon EC2、AWS Elastic Beanstalk など)
- コンテナ (Amazon Elastic Container Service [Amazon ECS]、Amazon Elastic KubernetesService [Amazon EKS]、AWS Fargate, Amazon Elastic Container Registry[Amazon ECR] など)
- AWS ストレージサービス (Amazon Elastic Block Store [Amazon EBS]、Amazon Elastic FileSystem [Amazon EFS]、Amazon FSx、Amazon S3、Volume Gateway など)
- データベース (Amazon DynamoDB、Amazon OpenSearch Service [Amazon ElasticsearchService]、Amazon RDS、Amazon EC2 のセルフマネージド型データベースなど)

対象スキル:
- 適切なコンピューティングプラットフォームを選択する
- 適切なコンテナホスティングプラットフォームを選択する
- 適切なストレージサービスを選択する
- 適切なデータベースプラットフォームを選択する

タスクステートメント 4: モダナイゼーションと機能強化の機会を決定する。
対象知識:
- サーバーレスコンピューティングサービス (AWS Lambda など)
- コンテナ (Amazon ECS、Amazon EKS、AWS Fargate など)
- AWS ストレージサービス (Amazon S3、Amazon EFS など)
- 目的別データベース (DynamoDB, Amazon Aurora Serverless、ElastiCache など)
- 統合サービス (Amazon SQS、Amazon SNS、Amazon EventBridge [Amazon CloudWatchEvents]、Step Functions など)

対象スキル:
- アプリケーションコンポーネントを切り離す機会を特定する
- サーバーレスソリューションの機会を特定する
- コンテナに適したサービスを選択する
- 目的別データベースの機会を特定する
- 適切なアプリケーション統合サービスを選択する




## 試験の対象となる主要なツール、テクノロジー、概念

- コンピューティング
- コスト管理
- データベース
- 災害対策
- 高可用性
- マネジメントとガバナンス
- マイクロサービスとコンポーネントのデカップリング
- 移行とデータの転送
- ネットワーク、接続、コンテンツ配信
- セキュリティ
- サーバーレスの設計原則
- ストレージ




範囲内の AWS のサービスと機能
分析:
- Amazon Athena
- AWS Data Exchange
- AWS Data Pipeline
- Amazon EMR
- AWS Glue
- Amazon Kinesis Data Analytics
- Amazon Kinesis Data Firehose
- Amazon Kinesis Data Streams
- AWS Lake Formation


- Amazon Managed Streaming for Apache Kafka (Amazon MSK)
- Amazon OpenSearch Service
- Amazon QuickSight
アプリケーション統合:
- Amazon AppFlow
- AWS AppSync
- Amazon EventBridge (Amazon CloudWatch Events)
- Amazon MQ
- Amazon Simple Notification Service (Amazon SNS)
- Amazon Simple Queue Service (Amazon SQS)
- AWS Step Functions
ビジネスアプリケーション:
- Alexa for Business
- Amazon Simple Email Service (Amazon SES)
ブロックチェーン:
- Amazon Managed Blockchain
クラウド財務管理:
- AWS Budgets
- AWS Cost and Usage Report
- AWS Cost Explorer
- Savings Plans
コンピューティング:
- AWS App Runner
- AWS Auto Scaling
- AWS Batch
- Amazon EC2
- Amazon EC2 Auto Scaling
- AWS Elastic Beanstalk
- Amazon Elastic Kubernetes Service (Amazon EKS)
- Elastic Load Balancing
- AWS Fargate
- AWS Lambda
- Amazon Lightsail
- AWS Outposts
- AWS Wavelength
コンテナ:
- Amazon Elastic Container Registry (Amazon ECR)
- Amazon Elastic Container Service (Amazon ECS)
- Amazon ECS Anywhere
- Amazon Elastic Kubernetes Service (Amazon EKS)
- Amazon EKS Anywhere
- Amazon EKS Distro
データベース:
- Amazon Aurora
- Amazon Aurora Serverless
- Amazon DocumentDB (MongoDB 互換)
- Amazon DynamoDB
- Amazon ElastiCache
- Amazon Keyspaces (for Apache Cassandra)
- Amazon Neptune
- Amazon RDS
- Amazon Redshift
- Amazon Timestream
デベロッパーツール:
- AWS Cloud9
- AWS CodeArtifact
- AWS CodeBuild
- AWS CodeCommit
- AWS CodeDeploy
- Amazon CodeGuru
- AWS CodePipeline
- AWS CodeStar
- AWS X-Ray
エンドユーザーコンピューティング:
- Amazon AppStream 2.0
- Amazon WorkSpaces
フロントエンドのウェブとモバイル:
- AWS Amplify
- Amazon API Gateway
- AWS Device Farm
- Amazon Pinpoint
IoT:
- AWS IoT Analytics
- AWS IoT Core
- AWS IoT Device Defender
- AWS IoT Device Management
- AWS IoT Events
- AWS IoT Greengrass
- AWS IoT SiteWise
- AWS IoT Things Graph
- AWS IoT 1-Click


機械学習:
- Amazon Comprehend
- Amazon Forecast
- Amazon Fraud Detector
- Amazon Kendra
- Amazon Lex
- Amazon Personalize
- Amazon Polly
- Amazon Rekognition
- Amazon SageMaker
- Amazon Textract
- Amazon Transcribe
- Amazon Translate
マネジメントとガバナンス:
- AWS CloudFormation
- AWS CloudTrail
- Amazon CloudWatch
- Amazon CloudWatch Logs
- AWS Command Line Interface (AWS CLI)
- AWS Compute Optimizer
- AWS Config
- AWS Control Tower
- AWS License Manager
- Amazon Managed Grafana
- Amazon Managed Service for Prometheus
- AWS Management Console
- AWS Organizations
- AWS Personal Health Dashboard
- AWS Proton
- AWS Service Catalog
- Service Quotas
- AWS Systems Manager
- AWS Trusted Advisor
- AWS Well-Architected Tool
メディアサービス:
- Amazon Elastic Transcoder
- Amazon Kinesis Video Streams
移行と転送:
- AWS Application Discovery Service
- AWS Application Migration Service (CloudEndure Migration)
- AWS Database Migration Service (AWS DMS)
- AWS DataSync
- AWS Migration Hub
- AWS Schema Conversion Tool (AWS SCT)


 AWS Snow ファミリー
- AWS Transfer Family
ネットワークとコンテンツ配信:
- Amazon CloudFront
- AWS Direct Connect
- Elastic Load Balancing (ELB)
- AWS Global Accelerator
- AWS PrivateLink
- Amazon Route 53
- AWS Transit Gateway
- Amazon VPC
- AWS VPN
セキュリティ、アイデンティティ、コンプライアンス:
- AWS Artifact
- AWS Audit Manager
- AWS Certificate Manager (ACM)
- AWS CloudHSM
- Amazon Cognito
- Amazon Detective
- AWS Directory Service
- AWS Firewall Manager
- Amazon GuardDuty
- AWS Identity and Access Management (IAM)
- Amazon Inspector
- AWS Key Management Service (AWS KMS)
- Amazon Macie
- AWS Network Firewall
- AWS Resource Access Manager (AWS RAM)
- AWS Secrets Manager
- AWS Security Hub
- AWS Security Token Service (AWS STS)
- AWS Shield
- AWS Single Sign-On
- AWS WAF
ストレージ:
- AWS Backup
- Amazon Elastic Block Store (Amazon EBS)
- AWS Elastic Disaster Recovery (CloudEndure Disaster Recovery)
- Amazon Elastic File System (Amazon EFS)
- Amazon FSx (すべてのタイプに対応)
- Amazon S3
- Amazon S3 Glacier
- AWS Storage Gateway


## Web参考記事

- AWS セキュリティベストプラクティス
  - <https://d1.awsstatic.com/whitepapers/ja_JP/Security/AWS_Security_Best_Practices.pdf>
- Trusted Advisor ベストプラクティス
  - <https://aws.amazon.com/jp/premiumsupport/trustedadvisor/best-practices/>
- ホワイトペーパー
  - <https://aws.amazon.com/jp/whitepapers>

- 受験録系
  - <https://www.sky365.co.jp/blog/certification/aws-certified-solutions-architect---professional.html>
  - <https://engineerblog.mynavi.jp/technology/sap-gokaku-repo/>


## 書籍

- AWS認定ソリューションアーキテクト-プロフェッショナル ~試験特性から導き出した演習問題と詳細解説 
  - <https://www.amazon.co.jp/AWS%E8%AA%8D%E5%AE%9A%E3%82%BD%E3%83%AA%E3%83%A5%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E3%82%A2%E3%83%BC%E3%82%AD%E3%83%86%E3%82%AF%E3%83%88-%E3%83%97%E3%83%AD%E3%83%95%E3%82%A7%E3%83%83%E3%82%B7%E3%83%A7%E3%83%8A%E3%83%AB-%E8%A9%A6%E9%A8%93%E7%89%B9%E6%80%A7%E3%81%8B%E3%82%89%E5%B0%8E%E3%81%8D%E5%87%BA%E3%81%97%E3%81%9F%E6%BC%94%E7%BF%92%E5%95%8F%E9%A1%8C%E3%81%A8%E8%A9%B3%E7%B4%B0%E8%A7%A3%E8%AA%AC-%E5%B9%B3%E5%B1%B1-%E6%AF%85/dp/4865942483>

- AWS認定資格試験テキスト＆問題集　AWS認定ソリューションアーキテクト - プロフェッショナル　改訂第2版 (ＡＷＳ認定資格試験テキスト)
  - <https://www.amazon.co.jp/AWS%E8%AA%8D%E5%AE%9A%E8%B3%87%E6%A0%BC%E8%A9%A6%E9%A8%93%E3%83%86%E3%82%AD%E3%82%B9%E3%83%88%EF%BC%86%E5%95%8F%E9%A1%8C%E9%9B%86-AWS%E8%AA%8D%E5%AE%9A%E3%82%BD%E3%83%AA%E3%83%A5%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E3%82%A2%E3%83%BC%E3%82%AD%E3%83%86%E3%82%AF%E3%83%88-%E3%83%97%E3%83%AD%E3%83%95%E3%82%A7%E3%83%83%E3%82%B7%E3%83%A7%E3%83%8A%E3%83%AB-%E6%94%B9%E8%A8%82%E7%AC%AC2%E7%89%88-%EF%BC%A1%EF%BC%B7%EF%BC%B3%E8%AA%8D%E5%AE%9A%E8%B3%87%E6%A0%BC%E8%A9%A6%E9%A8%93%E3%83%86%E3%82%AD%E3%82%B9%E3%83%88-%E5%B1%B1%E4%B8%8B%E5%85%89%E6%B4%8B/dp/4815617929/ref=d_pd_sbs_sccl_2_2/357-9098591-2099520?pd_rd_w=oeQXV&content-id=amzn1.sym.0658137e-f5cd-4a01-8903-013eee01b385&pf_rd_p=0658137e-f5cd-4a01-8903-013eee01b385&pf_rd_r=49DM6XEHKNBQ4H26W830&pd_rd_wg=IDn7j&pd_rd_r=33121b2a-c7fb-49da-89aa-32c23c0a7b8e&pd_rd_i=4815617929&psc=1>


## 問題集

- Whizlabx
  - <https://www.whizlabs.com/learn/course/aws-solutions-architect-professional/168>



## 抑えておくサービス

- Lambda
- APIGateway
- DynamoDB
- Codeシリーズ
- X-ray
- CloudFormation
- Cognito
- SQS
- S3
- ElasticBeanstalk
- CloudFront
- KMS
- Kinesis








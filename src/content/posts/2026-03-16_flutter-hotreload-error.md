---
title: flutter JIT エラーで実機デバッグができなくなったことについて
published: 2026-03-16
description: ''
image: ''
tags: ['flutter']
category: 'ブログ'
draft: false
lang: ''
---

## 概要

flutter開発をしていて、突然実機デバッグビルドができなくなったのでエラーを調査したことについて記載

## 💻 環境

- Flutter: 3.29.0 (fvm)
- OS: macOS Tahoe
- IDE: Cursor
- 実機iPhone: 26.3.1
- xCode: 26.3

## ❌ エラー内容

```log
Launching lib/main.dart on iPhone in debug mode...
Automatically signing iOS for device deployment using specified development team in Xcode project: xxxxxxxx
Xcode build done.                                           83.3s
You may be prompted to give access to control Xcode. Flutter uses Xcode to run your app. If access is not allowed, you can change this through your Settings > Privacy & Security > Automation.
version=3.7.2 (stable) (Tue Mar 11 04:27:50 2025 -0700) on "ios_arm64"
pid=81547, thread=259, isolate_group=vm-isolate(0x1056e1400), isolate=vm-isolate(0x105ccd000)
os=ios, arch=arm64, comp=no, sim=no
isolate_instructions=1071d75a0, vm_instructions=1071d75a0
fp=16d2a9050, sp=16d2a9030, pc=107c2f624
  pc 0x0000000107c2f624 fp 0x000000016d2a9050 Dart_DumpNativeStackTrace+0x18
  pc 0x00000001077ddbc8 fp 0x000000016d2a9070 dart::Assert::Fail(char const*, ...) const+0x30
  pc 0x00000001078d8adc fp 0x000000016d2a9520 dart::Code::FinalizeCode(dart::FlowGraphCompiler*, dart::compiler::Assembler*, dart::Code::PoolAttachment, bool, dart::CodeStatistics*)+0x82c
  pc 0x0000000107966450 fp 0x000000016d2a9b30 dart::StubCode::Init()+0x320
  pc 0x0000000107828c94 fp 0x000000016d2aa5e0 dart::Dart::DartInit(Dart_InitializeParams const*)+0x2b18
  pc 0x0000000107c15ef4 fp 0x000000016d2aaa60 Dart_Initialize+0x60
  pc 0x000000010779e5c4 fp 0x000000016d2ab030 flutter::DartVM::Create(flutter::Settings const&, fml::RefPtr<flutter::DartSnapshot const>, fml::RefPtr<flutter::DartSnapshot const>, std::_fl::shared_ptr<flutter::IsolateNameServer>)+0x1d64
  pc 0x00000001076fa73c fp 0x000000016d2ab790 flutter::Shell::Create(flutter::PlatformData const&, flutter::TaskRunners const&, flutter::Settings, std::_fl::function<std::_fl::unique_ptr<flutter::PlatformView, std::_fl::default_delete<flutter::PlatformView>> (flutter::Shell&)> const&, std::_fl::function<std::_fl::unique_ptr<flutter::Rasterizer, std::_fl::default_delete<flutter::Rasterizer>> (flutter::Shell&)> const&, bool)+0x310
  pc 0x00000001071e6564 fp 0x000000016d2ac520 -[FlutterEngine createShell:libraryURI:initialRoute:]+0xa8c
  pc 0x0000000107218e64 fp 0x000000016d2ac580 -[FlutterViewController sharedSetupWithProject:initialRoute:]+0x198
  pc 0x0000000107218ca4 fp 0x000000016d2ac5b0 -[FlutterViewController awakeFromNib]+0x6c
  pc 0x000000019c255374 fp 0x000000016d2aca80 <redacted>+0x6dc
  pc 0x000000019c82b61c fp 0x000000016d2acaf0 <redacted>+0xec
  pc 0x000000019c82b4f4 fp 0x000000016d2acb20 <redacted>+0x50
  pc 0x000000019c6893e4 fp 0x000000016d2acb80 <redacted>+0x8c
  pc 0x000000019b3f8a68 fp 0x000000016d2acbc0 <redacted>+0xa8
  pc 0x000000019c688908 fp 0x000000016d2acdb0 <redacted>+0x280
  pc 0x000000019bc91ea4 fp 0x000000016d2acde0 <redacted>+0x74
  pc 0x000000019b33de94 fp 0x000000016d2ace30 _UIScenePerformActionsWithLifecycleActionMask+0x70
  pc 0x000000019bc92720 fp 0x000000016d2acef0 <redacted>+0xfc
  pc 0x000000019bc9222c fp 0x000000016d2acf60 <redacted>+0xd4
  pc 0x000000019bc92538 fp 0x000000016d2ad070 <redacted>+0x260
  pc 0x000000019bc91fc4 fp 0x000000016d2ad0e0 <redacted>+0xf4
  pc 0x000000019bc9d444 fp 0x000000016d2ad120 <redacted>+0x94
  pc 0x000000019c10fcec fp 0x000000016d2ad220 <redacted>+0x2e0
  pc 0x000000019b33ecac fp 0x000000016d2ad290 _UISceneSettingsDiffActionPerformChangesWithTransitionContextAndCompletion+0xe0
  pc 0x000000019bc9d140 fp 0x000000016d2ad390 <redacted>+0x13c
  pc 0x000000019badc3b4 fp 0x000000016d2ad4e0 <redacted>+0x268
  pc 0x000000019badb448 fp 0x000000016d2ad650 <redacted>+0xd0
  pc 0x000000019badc020 fp 0x000000016d2ad710 <redacted>+0xf4
  pc 0x000000019c687968 fp 0x000000016d2ad7d0 <redacted>+0x1dc
  pc 0x000000019c138adc fp 0x000000016d2ad860 <redacted>+0x120
  pc 0x00000001b5a00388 fp 0x000000016d2ada10 <redacted>+0x16c
  pc 0x00000001b5a00840 fp 0x000000016d2ada50 <redacted>+0x80
  pc 0x00000001b5a001a0 fp 0x000000016d2adb20 <redacted>+0x1b4
  pc 0x00000001b5a6eb34 fp 0x000000016d2adbe0 <redacted>+0x120
  pc 0x00000001b5a0df00 fp 0x000000016d2adc20 <redacted>+0xa8
  pc 0x00000001b5a2ad98 fp 0x000000016d2add70 <redacted>+0x1e0
  pc 0x00000001b5a2c6fc fp 0x000000016d2ade00 <redacted>+0x10c
  pc 0x00000001b5a0df00 fp 0x000000016d2ade40 <redacted>+0xa8
  pc 0x00000001041c62e0 fp 0x000000016d2ade50 _dispatch_client_callout+0x10
  pc 0x00000001041b0998 fp 0x000000016d2adea0 _dispatch_block_invoke_direct+0x128
  pc 0x00000001ad0f41d4 fp 0x000000016d2aded0 <redacted>+0x34
  pc 0x00000001ad0f4054 fp 0x000000016d2adf50 <redacted>+0xe0
  pc 0x0000000195973f10 fp 0x000000016d2adf60 <redacted>+0x1c
  pc 0x0000000195973e84 fp 0x000000016d2adf90 <redacted>+0xac
  pc 0x0000000195951b30 fp 0x000000016d2adff0 <redacted>+0x14c
  pc 0x00000001959286d8 fp 0x000000016d2aed50 <redacted>+0x334
  pc 0x0000000195927a6c fp 0x000000016d2aede0 <redacted>+0x214
  pc 0x000000023753c498 fp 0x000000016d2aee30 GSEventRunModal+0x78
  pc 0x000000019b302df8 fp 0x000000016d2aeeb0 <redacted>+0x318
  pc 0x000000019b2abe54 fp 0x000000016d2aef40 UIApplicationMain+0x150
  pc 0x000000019b3d7820 fp 0x000000016d2aef80 <redacted>+0x24c
  pc 0x0000000103a6882c fp 0x000000016d2aefd0 $sSo21UIApplicationDelegateP5UIKitE4mainyyFZ+0x78
  pc 0x0000000103a687a4 fp 0x000000016d2af000 $s6Runner11AppDelegateC5$mainyyFZ+0x2c
  pc 0x0000000103a688a8 fp 0x000000016d2af020 __debug_main_executable_dylib_entry_point+0x1c
  pc 0x000000019293ae28 fp 0x000000016d2af690 <redacted>+0x1bcc
-- End of DumpStackTrace
=== Crash occurred when compiling unknown function in unoptimized JIT mode in unknown pass
════════════════════════════════════════════════════════════════════════════════
A change to iOS has caused a temporary break in Flutter's debug mode on
physical devices.
See https://github.com/flutter/flutter/issues/163984 for details.

In the meantime, we recommend these temporary workarounds:

* When developing with a physical device, use one running iOS 18.3 or lower.
* Use a simulator for development rather than a physical device.
* If you must use a device updated to iOS 26.2.1 23C71, use Flutter's release or
  profile mode via --release or --profile flags.
════════════════════════════════════════════════════════════════════════════════
=== Flow Graph not available

Exited (1).
```

## 🛠 解決方法

### flutterバージョンアップ

```zsh
# こちらにアップ
flutter --version
# Flutter 3.41.4 • channel stable • https://github.com/flutter/flutter.git
# Framework • revision ff37bef603 (12 days ago) • 2026-03-03 16:03:22 -0800
# Engine • hash 99578ad0355da00edb26301c874a3c250a5716f5 (revision e4b8dca3f1) (11 days ago) • 2026-03-03 18:24:54.000Z
# Tools • Dart 3.11.1 • DevTools 2.54.1

```

### 環境初期化

- 端末内のアプリを削除しておく
- プロジェクトは`flutter clean`、`flutter pub get`からやり直す

### IDE(vscode/launch.json)経由ではうまく行かない

- IDEでいつも起動しているところからProfileモードで起動してもうまく行かなかった
- コマンドラインから立ち上げることでうまく立ち上がることを確認

```zsh
flutter run --profile -d <device-id>
```

## あとがき

セキュリティ上の理由とのことだが少し不便

デバッグはSimulatorで実施するべしとのこと

## 参考

- <https://github.com/flutter/flutter/issues/163984>
- <https://speakerdeck.com/chigichan24/a-day-hot-reload-was-not-working>

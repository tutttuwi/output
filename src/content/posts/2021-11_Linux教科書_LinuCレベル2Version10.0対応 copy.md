---
title: Linux教科書_LinuCレベル2Version10.0対応
published: 2021-11-20
tags: ["教科書", "Linux"]
category: 書籍
draft: false
---


# Linux教科書_LinuCレベル2Version10.0対応

## 理解したこと

## 書籍サイト

<https://www.shoeisha.co.jp/book/detail/9784798167961>

## ダウンロード

<https://www.shoeisha.co.jp/book/download/9784798167961/detail>

## 書籍情報

支持率No.1「Linux教科書」シリーズのノウハウを注いだ『LinuCレベル2』が登場！
クラウド時代のLinuxエンジニアの技術力を証明する資格として
LPI-Japanにより新たに開発された認定試験が「LinuC（リナック）」です。

この試験が、2020年4月よりVersion 10.0にバージョンアップ。
本書は「レベル2 Version 10.0」に対応したLPI-Japan認定テキストです。
「あずき本」で有名な、支持率No.1「Linux教科書」シリーズのノウハウを
すべて注ぎ込み、LinuCレベル2最新バージョンの出題範囲を完全網羅した新しい定番書です。

●「201試験」「202試験」の2試験に対応。出題範囲を完全網羅
●学習したことを確認できる練習問題を、各章末に豊富に掲載しています
●巻末には1回分の模擬試験を収録。本試験に向けて実力を試せます
●Linux実習環境（CentOS）を翔泳社Webサイトからダウンロード可。
　実際にコマンドを入力しながら学習できます

【LinuCレベル2】 「仮想マシン・コンテナを含むLinuxシステム、ネットワークの設定・構築」
ができるエンジニアとして認定されます。

## メモ

- ローカル環境にDockerでCentOS7環境を作ってSSHで接続して演習する
  - <https://pocketcode.net/docker-centos7-ssh-connect>

## 序章　LinuCの概要

## LinuCとは

## LinuCの概要

## 受験の申し込み手続き

## 受験の実際

## 試験問題の形式

## 学習の進め方

## 受験のテクニック

## ■第1部　201試験（LinuC Level2 Exam 201）

## 第1章　システムの起動とLinuxカーネル

### 1.1　ブートプロセス

- BIOS
  - MBR:マスターブートレコード
    - ブートローダ：OSを起動するプログラム
    - パーティションテーブル
- UEFI
  - GPT:GUID Partition Table
  - ブートローダ：UEFIシステムパーティション(ESP)に格納される

```bash
# ブロックデバイスを一覧表示する
lsblk

```

- ブートローダ：OSを起動するプログラム
  - Linuxでもっともよく利用されるブートローダはGRUB(Grand Unified Bootloader)

- カーネル
  - OSの中でハードウェアとソフトウェアの仲立ちをしてくれるプログラム
  - <https://qiita.com/uguis410/items/17ec1e447e9716bfdca7>
  - 起動処理
    - 組み込まれているハードウェアの検出と初期化
    - システムクロックの設定
    - ルートパーティションのチェックとマウント
    - systemdの開始

```bash
journalctl -b
dmesg

```

- 初期RAMディスク
  - カーネルが起動すると、初期RAMディスクをルートパーティションとしてマウントする
- RAMディスク：メモリ上にファイルシステムを作成
- ループバックマウント：ファイルをファイルシステムとしてマウントする

- TODO: 初期RAMディスクの作成などについては復習が必要

### 1.2　ブートローダ

- ブートローダとは：
  - カーネルをストレージから読み込み、システムを起動するためのプログラム
  - Linuxの代表的なブートローダはGRUB

### 1.3　システム起動のカスタマイズ

```bash
# メンテナンスモード
systemctl isolate rescue.target
systemctl rescue
# 緊急モード
systemctl isolate emergency.target
systemclt emergency

```

- Unit設定ファイル
  - `/etc/systemd/system`ディレクトリに配置される
```bash
[tomo@localhost system]$ cat multi-user.target.wants/postfix.service
[Unit]
Description=Postfix Mail Transport Agent
After=syslog.target network.target
Conflicts=sendmail.service exim.service

[Service]
Type=forking
PIDFile=/var/spool/postfix/pid/master.pid
EnvironmentFile=-/etc/sysconfig/network
ExecStartPre=-/usr/libexec/postfix/aliasesdb
ExecStartPre=-/usr/libexec/postfix/chroot-update
ExecStart=/usr/sbin/postfix start
ExecReload=/usr/sbin/postfix reload
ExecStop=/usr/sbin/postfix stop

[Install]
WantedBy=multi-user.target

# systemd-deltaコマンド 設定ファイルの差分を出力
[tomo@localhost system]$ systemd-delta
[EXTENDED]   /run/systemd/system/user-0.slice → /run/systemd/system/user-0.slice.d/50-After-systemd-logind\x2eservice.conf
[EXTENDED]   /run/systemd/system/user-0.slice → /run/systemd/system/user-0.slice.d/50-TasksMax.conf
[EXTENDED]   /run/systemd/system/user-0.slice → /run/systemd/system/user-0.slice.d/50-Description.conf
[EXTENDED]   /run/systemd/system/user-0.slice → /run/systemd/system/user-0.slice.d/50-After-systemd-user-sessions\x2eservice.conf
[EXTENDED]   /run/systemd/system/session-2.scope → /run/systemd/system/session-2.scope.d/50-After-systemd-user-sessions\x2eservice.conf
[EXTENDED]   /run/systemd/system/session-2.scope → /run/systemd/system/session-2.scope.d/50-After-systemd-logind\x2eservice.conf
[EXTENDED]   /run/systemd/system/session-2.scope → /run/systemd/system/session-2.scope.d/50-Description.conf
[EXTENDED]   /run/systemd/system/session-2.scope → /run/systemd/system/session-2.scope.d/50-Slice.conf
[EXTENDED]   /run/systemd/system/session-2.scope → /run/systemd/system/session-2.scope.d/50-SendSIGHUP.conf
[EXTENDED]   /run/systemd/system/session-2.scope → /run/systemd/system/session-2.scope.d/50-TasksMax.conf
[EXTENDED]   /run/systemd/system/session-6.scope → /run/systemd/system/session-6.scope.d/50-Slice.conf
[EXTENDED]   /run/systemd/system/session-6.scope → /run/systemd/system/session-6.scope.d/50-TasksMax.conf
[EXTENDED]   /run/systemd/system/session-6.scope → /run/systemd/system/session-6.scope.d/50-After-systemd-user-sessions\x2eservice.conf
[EXTENDED]   /run/systemd/system/session-6.scope → /run/systemd/system/session-6.scope.d/50-After-systemd-logind\x2eservice.conf
[EXTENDED]   /run/systemd/system/session-6.scope → /run/systemd/system/session-6.scope.d/50-Description.conf
[EXTENDED]   /run/systemd/system/session-6.scope → /run/systemd/system/session-6.scope.d/50-SendSIGHUP.conf
[EQUIVALENT] /etc/systemd/system/default.target → /usr/lib/systemd/system/default.target
[EXTENDED]   /run/systemd/system/session-3.scope → /run/systemd/system/session-3.scope.d/50-After-systemd-logind\x2eservice.conf
[EXTENDED]   /run/systemd/system/session-3.scope → /run/systemd/system/session-3.scope.d/50-SendSIGHUP.conf
[EXTENDED]   /run/systemd/system/session-3.scope → /run/systemd/system/session-3.scope.d/50-TasksMax.conf
[EXTENDED]   /run/systemd/system/session-3.scope → /run/systemd/system/session-3.scope.d/50-Description.conf
[EXTENDED]   /run/systemd/system/session-3.scope → /run/systemd/system/session-3.scope.d/50-Slice.conf
[EXTENDED]   /run/systemd/system/session-3.scope → /run/systemd/system/session-3.scope.d/50-After-systemd-user-sessions\x2eservice.conf
[EXTENDED]   /run/systemd/system/user-1000.slice → /run/systemd/system/user-1000.slice.d/50-After-systemd-logind\x2eservice.conf
[EXTENDED]   /run/systemd/system/user-1000.slice → /run/systemd/system/user-1000.slice.d/50-Description.conf
[EXTENDED]   /run/systemd/system/user-1000.slice → /run/systemd/system/user-1000.slice.d/50-TasksMax.conf
[EXTENDED]   /run/systemd/system/user-1000.slice → /run/systemd/system/user-1000.slice.d/50-After-systemd-user-sessions\x2eservice.conf

27 overridden configuration files found.

```

- systemdのログ

```bash
journalctl -b
journalctl -f
journalctl -n 10
journalctl -p err
-p, --priority=
           Filter output by message priorities or priority ranges. Takes either a single numeric or textual log level (i.e. between 0/"emerg" and 7/"debug"), or a range of numeric/text log levels in the
           form FROM..TO. The log levels are the usual syslog log levels as documented in syslog(3), i.e.  "emerg" (0), "alert" (1), "crit" (2), "err" (3), "warning" (4), "notice" (5), "info" (6),
           "debug" (7). If a single log level is specified, all messages with this log level or a lower (hence more important) log level are shown. If a range is specified, all messages within the range are
           shown, including both the start and the end value of the range. This will add "PRIORITY=" matches for the specified priorities.

journalctl -r
# よく使うことになるのはこれだけと思う
journalctl -u postfix.service

```

- ログの保存場所
  - `/var/run/log/journal`ディレクトリ配下にバイナリファイルが存在する。このファイルはシステム再起動で失われるため永続化するなら
  - `/var/log/journal`ディレクトリを作成して、`/etc/systemd/journalId.conf`ファイルで次の設定

```conf:/etc/sytemd/journalId.conf
Storage=persistent
SystemMaxUse=200M

```


### 1.4　カーネルの構成要素

- カーネルバージョン
  - `uname`コマンドでバージョンがわかる
  - `cat /proc/version`でもわかる

- カーネルイメージ
  - `ls /boot`でvmlinuz-xxxの名前でファイルが存在する

- lsmodコマンド
  - 現在ロードされているすべてのモジュール一覧を表示
  - `cat /proc/modules`でも同様の情報が取得できる

- modinfoコマンド
  - モジュールの情報を表示
- insmodコマンド
  - ローダブルモジュールをロード
- rmmodコマンド
  - ロードされているモジュールをアンロード

- modproveコマンド
  - モジュールのロードやアンロードを行います。
  - insmodやrmmodだと依存関係を気にしなければ行けないが、
  - このコマンドであれば必要なモジュールをロードできるから楽
  - modproveコマンドが参照する依存関係はmodles.depファイルに記述されている

### 1.5　カーネルのコンパイル

- カーネルソースの格納ディレクトリ：`/usr/src/linux`
- TODO: ディレクトリ内構造把握しておいたほうがいい

### 1.6　カーネルパラメータの変更
### 1.7　カーネルの管理と問題解決

### 練習問題

- 1.1 GRUBの設定ファイルgrub.cfgを生成するコマンド：grub2-mkconfig -o /boot/grub2/grub.cfg
- 1.2 システム起動→GRUBメニュー画面→カーネルが見つからないエラー：メニュー画面で`[c]`を押下してGRUBシェルを起動し、原因を探って修復
- 1.3 GRUBを再インストールするコマンド：`grub-install`or`grub2-install`コマンド
- 1.4 systemdを採用したシステムでログを確認するコマンド：`journalctl`コマンド
- 1.5 systemdを採用したシステムでnginxサーバが自動起動しないようにするコマンド：`systemctl disabled nginx.service`
- 1.6 rescueモードで起動：一般ユーザはログインできない、ネットワーク接続されない
- 1.7 mobproveコマンドが利用するファイルで、モジュールの依存関係情報が格納されているファイル：`/lib/modules/4.19.132/modules.dep`
- 1.8 xxx
- 1.9 カーネルソースツリーを初期化するコマンド：make mrproper
- 1.10 ロードされているカーネルモジュールを確認する方法：`lsmod`or`cat /proc/modules`
- 1.11 初期RAMディスクに関する問題：システム起動に必要なデバイスドライバがカーネル本体に含まれていれば初期RAMディスクは必須ではない
- 1.12 
- 1.13
- 1.14
- 1.15

## 第2章　ファイルシステムとストレージ管理

### 2.1　ファイルシステムの設定とマウント

- ファイルシステム：SSDやHDDなどのストレージにファイルを保存して管理する仕組み
- システムで利用するファイルシステム情報は`/etc/fstab`ファイルに記述されている

```bash
[root@localhost etc]# cat /etc/fstab

#
# /etc/fstab
# Created by anaconda on Sat Nov 20 22:26:51 2021
#
# Accessible filesystems, by reference, are maintained under '/dev/disk'
# See man pages fstab(5), findfs(8), mount(8) and/or blkid(8) for more info
#
/dev/mapper/centos-root /                       xfs     defaults        0 0
UUID=165774f9-21d1-4f11-ac52-75928012626b /boot                   xfs     defaults        0 0
/dev/mapper/centos-swap swap                    swap    defaults        0 0

# 書式：
# 1.デバイスファイル名・ラベル・UID
# 2.マウントポイント
# 3.ファイルシステムの種類
# 4.マウントオプション
# 5.dumpコマンドの対象
# 6.ブート時にfsckがチェックする順序


# UUIDを確認するコマンド
[root@localhost etc]# blkid
/dev/mapper/centos-root: UUID="947b91d3-28fe-493a-b8e9-522e5c598fb6" TYPE="xfs"
/dev/sda2: UUID="Rl5syf-IFgI-7shw-aKvy-Y4cH-ZrIM-lVVpOU" TYPE="LVM2_member"
/dev/sda1: UUID="165774f9-21d1-4f11-ac52-75928012626b" TYPE="xfs"
/dev/mapper/centos-swap: UUID="4fab2c94-5288-45ee-8a62-1acd401bb752" TYPE="swap"

[root@localhost etc]# ls -l /dev/disk/by-uuid/
合計 0
lrwxrwxrwx. 1 root root 10 11月 21 17:49 165774f9-21d1-4f11-ac52-75928012626b -> ../../sda1
lrwxrwxrwx. 1 root root 10 11月 21 17:49 4fab2c94-5288-45ee-8a62-1acd401bb752 -> ../../dm-1
lrwxrwxrwx. 1 root root 10 11月 21 17:49 947b91d3-28fe-493a-b8e9-522e5c598fb6 -> ../../dm-0

# UUIDを変更するコマンド
tune2fs -U `uuidgen` /dev/sdb1




[root@localhost etc]# cat /usr/lib/systemd/system/tmp.mount
#  This file is part of systemd.
#
#  systemd is free software; you can redistribute it and/or modify it
#  under the terms of the GNU Lesser General Public License as published by
#  the Free Software Foundation; either version 2.1 of the License, or
#  (at your option) any later version.

[Unit]
Description=Temporary Directory
Documentation=man:hier(7)
Documentation=http://www.freedesktop.org/wiki/Software/systemd/APIFileSystems
ConditionPathIsSymbolicLink=!/tmp
DefaultDependencies=no
Conflicts=umount.target
Before=local-fs.target umount.target

[Mount]
What=tmpfs
Where=/tmp
Type=tmpfs
Options=mode=1777,strictatime

# Make 'systemctl enable tmp.mount' work:
[Install]
WantedBy=local-fs.target


# カーネルがサポートしているファイルシステム
[root@localhost etc]# cat /proc/filesystems
nodev   sysfs
nodev   rootfs
nodev   ramfs
nodev   bdev
nodev   proc
nodev   cgroup
nodev   cpuset
nodev   tmpfs
nodev   devtmpfs
nodev   debugfs
nodev   securityfs
nodev   sockfs
nodev   dax
nodev   bpf
nodev   pipefs
nodev   configfs
nodev   devpts
nodev   hugetlbfs
nodev   autofs
nodev   pstore
nodev   mqueue
nodev   selinuxfs
        fuseblk
nodev   fuse
nodev   fusectl
        xfs
nodev   rpc_pipefs


# 現在どのようなファイルシステムがマウントされているか
[root@localhost etc]# cat /etc/mtab
sysfs /sys sysfs rw,seclabel,nosuid,nodev,noexec,relatime 0 0
proc /proc proc rw,nosuid,nodev,noexec,relatime 0 0
devtmpfs /dev devtmpfs rw,seclabel,nosuid,size=4515168k,nr_inodes=1128792,mode=755 0 0
securityfs /sys/kernel/security securityfs rw,nosuid,nodev,noexec,relatime 0 0
tmpfs /dev/shm tmpfs rw,seclabel,nosuid,nodev 0 0
devpts /dev/pts devpts rw,seclabel,nosuid,noexec,relatime,gid=5,mode=620,ptmxmode=000 0 0
tmpfs /run tmpfs rw,seclabel,nosuid,nodev,mode=755 0 0
tmpfs /sys/fs/cgroup tmpfs ro,seclabel,nosuid,nodev,noexec,mode=755 0 0
cgroup /sys/fs/cgroup/systemd cgroup rw,seclabel,nosuid,nodev,noexec,relatime,xattr,release_agent=/usr/lib/systemd/systemd-cgroups-agent,name=systemd 0 0
pstore /sys/fs/pstore pstore rw,nosuid,nodev,noexec,relatime 0 0
cgroup /sys/fs/cgroup/devices cgroup rw,seclabel,nosuid,nodev,noexec,relatime,devices 0 0
cgroup /sys/fs/cgroup/net_cls,net_prio cgroup rw,seclabel,nosuid,nodev,noexec,relatime,net_prio,net_cls 0 0
cgroup /sys/fs/cgroup/hugetlb cgroup rw,seclabel,nosuid,nodev,noexec,relatime,hugetlb 0 0
cgroup /sys/fs/cgroup/cpuset cgroup rw,seclabel,nosuid,nodev,noexec,relatime,cpuset 0 0
cgroup /sys/fs/cgroup/cpu,cpuacct cgroup rw,seclabel,nosuid,nodev,noexec,relatime,cpuacct,cpu 0 0
cgroup /sys/fs/cgroup/memory cgroup rw,seclabel,nosuid,nodev,noexec,relatime,memory 0 0
cgroup /sys/fs/cgroup/perf_event cgroup rw,seclabel,nosuid,nodev,noexec,relatime,perf_event 0 0
cgroup /sys/fs/cgroup/pids cgroup rw,seclabel,nosuid,nodev,noexec,relatime,pids 0 0
cgroup /sys/fs/cgroup/blkio cgroup rw,seclabel,nosuid,nodev,noexec,relatime,blkio 0 0
cgroup /sys/fs/cgroup/freezer cgroup rw,seclabel,nosuid,nodev,noexec,relatime,freezer 0 0
configfs /sys/kernel/config configfs rw,relatime 0 0
/dev/mapper/centos-root / xfs rw,seclabel,relatime,attr2,inode64,noquota 0 0
selinuxfs /sys/fs/selinux selinuxfs rw,relatime 0 0
systemd-1 /proc/sys/fs/binfmt_misc autofs rw,relatime,fd=22,pgrp=1,timeout=0,minproto=5,maxproto=5,direct,pipe_ino=10915 0 0
debugfs /sys/kernel/debug debugfs rw,relatime 0 0
mqueue /dev/mqueue mqueue rw,seclabel,relatime 0 0
fusectl /sys/fs/fuse/connections fusectl rw,relatime 0 0
hugetlbfs /dev/hugepages hugetlbfs rw,seclabel,relatime 0 0
/dev/sda1 /boot xfs rw,seclabel,relatime,attr2,inode64,noquota 0 0
sunrpc /var/lib/nfs/rpc_pipefs rpc_pipefs rw,relatime 0 0
tmpfs /run/user/1000 tmpfs rw,seclabel,nosuid,nodev,relatime,size=906448k,mode=700,uid=1000,gid=1000 0 0
gvfsd-fuse /run/user/1000/gvfs fuse.gvfsd-fuse rw,nosuid,nodev,relatime,user_id=1000,group_id=1000 0 0
tmpfs /run/user/0 tmpfs rw,seclabel,nosuid,nodev,relatime,size=906448k,mode=700 0 0

# こちらにもほぼ同じ情報（どのようなファイルシステムがマウントされているか）
[root@localhost etc]# cat /proc/mounts
sysfs /sys sysfs rw,seclabel,nosuid,nodev,noexec,relatime 0 0
proc /proc proc rw,nosuid,nodev,noexec,relatime 0 0
devtmpfs /dev devtmpfs rw,seclabel,nosuid,size=4515168k,nr_inodes=1128792,mode=755 0 0
securityfs /sys/kernel/security securityfs rw,nosuid,nodev,noexec,relatime 0 0
tmpfs /dev/shm tmpfs rw,seclabel,nosuid,nodev 0 0
devpts /dev/pts devpts rw,seclabel,nosuid,noexec,relatime,gid=5,mode=620,ptmxmode=000 0 0
tmpfs /run tmpfs rw,seclabel,nosuid,nodev,mode=755 0 0
tmpfs /sys/fs/cgroup tmpfs ro,seclabel,nosuid,nodev,noexec,mode=755 0 0
cgroup /sys/fs/cgroup/systemd cgroup rw,seclabel,nosuid,nodev,noexec,relatime,xattr,release_agent=/usr/lib/systemd/systemd-cgroups-agent,name=systemd 0 0
pstore /sys/fs/pstore pstore rw,nosuid,nodev,noexec,relatime 0 0
cgroup /sys/fs/cgroup/devices cgroup rw,seclabel,nosuid,nodev,noexec,relatime,devices 0 0
cgroup /sys/fs/cgroup/net_cls,net_prio cgroup rw,seclabel,nosuid,nodev,noexec,relatime,net_prio,net_cls 0 0
cgroup /sys/fs/cgroup/hugetlb cgroup rw,seclabel,nosuid,nodev,noexec,relatime,hugetlb 0 0
cgroup /sys/fs/cgroup/cpuset cgroup rw,seclabel,nosuid,nodev,noexec,relatime,cpuset 0 0
cgroup /sys/fs/cgroup/cpu,cpuacct cgroup rw,seclabel,nosuid,nodev,noexec,relatime,cpuacct,cpu 0 0
cgroup /sys/fs/cgroup/memory cgroup rw,seclabel,nosuid,nodev,noexec,relatime,memory 0 0
cgroup /sys/fs/cgroup/perf_event cgroup rw,seclabel,nosuid,nodev,noexec,relatime,perf_event 0 0
cgroup /sys/fs/cgroup/pids cgroup rw,seclabel,nosuid,nodev,noexec,relatime,pids 0 0
cgroup /sys/fs/cgroup/blkio cgroup rw,seclabel,nosuid,nodev,noexec,relatime,blkio 0 0
cgroup /sys/fs/cgroup/freezer cgroup rw,seclabel,nosuid,nodev,noexec,relatime,freezer 0 0
configfs /sys/kernel/config configfs rw,relatime 0 0
/dev/mapper/centos-root / xfs rw,seclabel,relatime,attr2,inode64,noquota 0 0
selinuxfs /sys/fs/selinux selinuxfs rw,relatime 0 0
systemd-1 /proc/sys/fs/binfmt_misc autofs rw,relatime,fd=22,pgrp=1,timeout=0,minproto=5,maxproto=5,direct,pipe_ino=10915 0 0
debugfs /sys/kernel/debug debugfs rw,relatime 0 0
mqueue /dev/mqueue mqueue rw,seclabel,relatime 0 0
fusectl /sys/fs/fuse/connections fusectl rw,relatime 0 0
hugetlbfs /dev/hugepages hugetlbfs rw,seclabel,relatime 0 0
/dev/sda1 /boot xfs rw,seclabel,relatime,attr2,inode64,noquota 0 0
sunrpc /var/lib/nfs/rpc_pipefs rpc_pipefs rw,relatime 0 0
tmpfs /run/user/1000 tmpfs rw,seclabel,nosuid,nodev,relatime,size=906448k,mode=700,uid=1000,gid=1000 0 0
gvfsd-fuse /run/user/1000/gvfs fuse.gvfsd-fuse rw,nosuid,nodev,relatime,user_id=1000,group_id=1000 0 0
tmpfs /run/user/0 tmpfs rw,seclabel,nosuid,nodev,relatime,size=906448k,mode=700 0 0

# そのため、/etc/mtabを誤って編集してしまった場合は、/proc/mountsを利用して復旧を試みることができる

```

- マウントとアンマウント
  - ファイルシステムを利用するには、任意のディレクトリをマウントポイントとしてマウントする必要がある
  - ファイルシステムをマウントするには`mount`コマンドを使う

```bash
[root@localhost etc]# mount
sysfs on /sys type sysfs (rw,nosuid,nodev,noexec,relatime,seclabel)
proc on /proc type proc (rw,nosuid,nodev,noexec,relatime)
devtmpfs on /dev type devtmpfs (rw,nosuid,seclabel,size=4515168k,nr_inodes=1128792,mode=755)
securityfs on /sys/kernel/security type securityfs (rw,nosuid,nodev,noexec,relatime)
tmpfs on /dev/shm type tmpfs (rw,nosuid,nodev,seclabel)
devpts on /dev/pts type devpts (rw,nosuid,noexec,relatime,seclabel,gid=5,mode=620,ptmxmode=000)
tmpfs on /run type tmpfs (rw,nosuid,nodev,seclabel,mode=755)
tmpfs on /sys/fs/cgroup type tmpfs (ro,nosuid,nodev,noexec,seclabel,mode=755)
cgroup on /sys/fs/cgroup/systemd type cgroup (rw,nosuid,nodev,noexec,relatime,seclabel,xattr,release_agent=/usr/lib/systemd/systemd-cgroups-agent,name=systemd)
pstore on /sys/fs/pstore type pstore (rw,nosuid,nodev,noexec,relatime)
cgroup on /sys/fs/cgroup/devices type cgroup (rw,nosuid,nodev,noexec,relatime,seclabel,devices)
cgroup on /sys/fs/cgroup/net_cls,net_prio type cgroup (rw,nosuid,nodev,noexec,relatime,seclabel,net_prio,net_cls)
cgroup on /sys/fs/cgroup/hugetlb type cgroup (rw,nosuid,nodev,noexec,relatime,seclabel,hugetlb)
cgroup on /sys/fs/cgroup/cpuset type cgroup (rw,nosuid,nodev,noexec,relatime,seclabel,cpuset)
cgroup on /sys/fs/cgroup/cpu,cpuacct type cgroup (rw,nosuid,nodev,noexec,relatime,seclabel,cpuacct,cpu)
cgroup on /sys/fs/cgroup/memory type cgroup (rw,nosuid,nodev,noexec,relatime,seclabel,memory)
cgroup on /sys/fs/cgroup/perf_event type cgroup (rw,nosuid,nodev,noexec,relatime,seclabel,perf_event)
cgroup on /sys/fs/cgroup/pids type cgroup (rw,nosuid,nodev,noexec,relatime,seclabel,pids)
cgroup on /sys/fs/cgroup/blkio type cgroup (rw,nosuid,nodev,noexec,relatime,seclabel,blkio)
cgroup on /sys/fs/cgroup/freezer type cgroup (rw,nosuid,nodev,noexec,relatime,seclabel,freezer)
configfs on /sys/kernel/config type configfs (rw,relatime)
/dev/mapper/centos-root on / type xfs (rw,relatime,seclabel,attr2,inode64,noquota)
selinuxfs on /sys/fs/selinux type selinuxfs (rw,relatime)
systemd-1 on /proc/sys/fs/binfmt_misc type autofs (rw,relatime,fd=22,pgrp=1,timeout=0,minproto=5,maxproto=5,direct,pipe_ino=10915)
debugfs on /sys/kernel/debug type debugfs (rw,relatime)
mqueue on /dev/mqueue type mqueue (rw,relatime,seclabel)
fusectl on /sys/fs/fuse/connections type fusectl (rw,relatime)
hugetlbfs on /dev/hugepages type hugetlbfs (rw,relatime,seclabel)
/dev/sda1 on /boot type xfs (rw,relatime,seclabel,attr2,inode64,noquota)
sunrpc on /var/lib/nfs/rpc_pipefs type rpc_pipefs (rw,relatime)
tmpfs on /run/user/1000 type tmpfs (rw,nosuid,nodev,relatime,seclabel,size=906448k,mode=700,uid=1000,gid=1000)
gvfsd-fuse on /run/user/1000/gvfs type fuse.gvfsd-fuse (rw,nosuid,nodev,relatime,user_id=1000,group_id=1000)
tmpfs on /run/user/0 type tmpfs (rw,nosuid,nodev,relatime,seclabel,size=906448k,mode=700)


# マウント
mount /dev/sdb1 /data
mount -o remount /data


```

- スワップ
  - スワップ領域は、ブロックデバイス上の仮想的なメモリ領域として使われます。
  - スワップ領域は通常、システムのインストール時に作成しますが、あとから作成することも可能
  - 作成するには、`mkswap`コマンドを使う

```bash
# スワップ領域作成
mkswap -c /dev/sda3

[root@localhost etc]# dd if=/dev/zero of=/tmp/swapfile bs=1M count=500
500+0 レコード入力
500+0 レコード出力
524288000 バイト (524 MB) コピーされました、 0.539949 秒、 971 MB/秒
[root@localhost etc]# mkswap /tmp/swapfile
スワップ空間バージョン1を設定します、サイズ = 511996 KiB
ラベルはありません, UUID=2b778452-5107-43a0-8f90-03fb310b6c19
[root@localhost etc]# chmod 600 /tmp/swapfile
[root@localhost etc]# ll /tmp/swapfile
-rw-------. 1 root root 524288000 11月 21 18:59 /tmp/swapfile

[root@localhost etc]# swapon /tmp/swapfile
[root@localhost etc]# swapon -s
Filename                                Type            Size    Used    Priority
/dev/dm-1                               partition       839676  0       -2
/tmp/swapfile                           file    511996  0       -3
[root@localhost etc]# cat /proc/swaps
Filename                                Type            Size    Used    Priority
/dev/dm-1                               partition       839676  0       -2
/tmp/swapfile                           file            511996  0       -3


[root@localhost etc]# swapoff /tmp/swapfile
[root@localhost etc]# swapon -s
Filename                                Type            Size    Used    Priority
/dev/dm-1                               partition       839676  0       -2

```

### 2.2　ファイルシステムの作成

- `mkfs`コマンド：ファイルシステムを作成するコマンド

```bash
# ブロックデバイス確認
lsblk
[root@localhost etc]# lsblk -p
NAME                        MAJ:MIN RM  SIZE RO TYPE MOUNTPOINT
/dev/sda                      8:0    0    8G  0 disk
tq/dev/sda1                   8:1    0    1G  0 part /boot
mq/dev/sda2                   8:2    0    7G  0 part
  tq/dev/mapper/centos-root 253:0    0  6.2G  0 lvm  /
  mq/dev/mapper/centos-swap 253:1    0  820M  0 lvm  [SWAP]
/dev/sr0                     11:0    1 1024M  0 rom

# ext2/ext3/ext4ファイルシステムの作成
mke2fs


# mke2fsコマンドのデフォルト値
[root@localhost etc]# cat /etc/mke2fs.conf
[defaults]
        base_features = sparse_super,filetype,resize_inode,dir_index,ext_attr
        default_mntopts = acl,user_xattr
        enable_periodic_fsck = 0
        blocksize = 4096
        inode_size = 256
        inode_ratio = 16384

[fs_types]
        ext3 = {
                features = has_journal
        }
        ext4 = {
                features = has_journal,extent,huge_file,flex_bg,uninit_bg,dir_nlink,extra_isize,64bit
                inode_size = 256
        }
        ext4dev = {
                features = has_journal,extent,huge_file,flex_bg,uninit_bg,dir_nlink,extra_isize
                inode_size = 256
                options = test_fs=1
        }
        rhel6_ext4 = {
                features = has_journal,extent,huge_file,flex_bg,uninit_bg,dir_nlink,extra_isize
                inode_size = 256
                enable_periodic_fsck = 1
                default_mntopts = ""
        }
        small = {
                blocksize = 1024
                inode_size = 128
                inode_ratio = 4096
        }
        floppy = {
                blocksize = 1024
                inode_size = 128
                inode_ratio = 8192
        }
        big = {
                inode_ratio = 32768
        }
        huge = {
                inode_ratio = 65536
        }
        news = {
                inode_ratio = 4096
        }
        largefile = {
                inode_ratio = 1048576
                blocksize = -1
        }
        largefile4 = {
                inode_ratio = 4194304
                blocksize = -1
        }
        hurd = {
             blocksize = 4096
             inode_size = 128
        }



# mkfsコマンドによるファイルシステム作成
mkdf -t ext3 /dev/sdc1


```

- Btrfsファイルシステムの作成
  - Btrfs(B-tree file system)はLinux向けの新しいファイルシステムで対象外性に優れ先進的な機能が取り込まれている
    - 最大ファイルサイズは16EiB
    - コピーオンライと
    - ディスク容量の効率的な使用
    - iノードの動的割当
    - ストレージプール対応
    - スナップショット機能
    - チェックサムによる完全性の保証
    - 効率的な増分バックアップ
    - オンラインデフラグ
  - `mkfs.btrfs`コマンドを実行して作成する
    - `mkfs.btrfs /dev/sdb1 /dev/sdb2`
      - このように複数の物理ボリュームをまとめた１つの仮想的なボリュームをストレージプールと言う
    - `btrfs-convert`コマンドを使うと、ext2/ext3/ext4ファイルシステムをBtrfsに変換できる

### 2.3　ファイルシステムの管理

- ext2/ext3ファイルシステムはブロック単位で管理されている
- ブロックには以下が存在する
  - データブロック
  - iノードブロック
    - どのデータブロックにどんなデータが格納されているかの情報
    - ファイル・タイプ、アクセス権、所有者、所有グループ、ファイルサイズ
  - スーパーブロック
    - ファイルシステムの全般的な情報（データブロックサイズ、マウント回数、iノードやデータブロックの数など）
    - スーパーブロックは非常に重要なので、ブロックグループごとにバックアップが作成される

- TODO: 詳細見れていない・・

### 2.4　LVM

- LVM:論理ボリューム管理　Logical Volume Manager
  - ディスクのパーティションを直接操作するのではなく、仮想的なパーティションである論理ボリュームを動的に管理
  - パーティションを使ったディスク管理に比べて次の制約を回避できる
    - 一度パーティションを作成するとサイズ変更ができない
    - 別のディスクにパーティションを移動させることができない
    - ディスクのサイズを超える大きさのパーティションは作成できない
  - ★：PVがPhysical Volume(物理ボリューム)、VGがVolume Group(ボリュームグループ)、LVがLogical Volume(論理ボリューム)の略称であることを覚えておく

- LVMの作成
  - 物理ボリュームを用意して、パーティションタイプを「8e」(Linux LVM)に設定しておく
  - `pvcreate`: デバイスを物理ボリュームとして初期化
  - `vgcreate testvg /dev/sdd1 /dev/sde1`: ボリュームグループの作成
  - `lvcreate -L 500M -n lv01 testvg`: 論理ボリュームの作成
  - `lvscan`: 論理ボリュームの状態を完結に表示

- TODO: vg~~コマンドが他にも多数あるが詳細は一旦飛ばす

### 練習問題

- 2.1 カーネルがサポートしているファイルシステムの種類を確認するにはどのコマンドを実行すればよいか
  - `cat /proc/filesystems`
  - その他：
    - `/etc/mtab`には現在マウントされているファイルシステムについての情報が格納されている
- 2.2 `/etc/fstab`で指定できるマウントオプションの説明で適切でないもの
  - 割愛
- 2.3 `/etc/fstab`の書式として適切でないもの
- 2.4 `/mnt`ディレクトリにマウント下Btrfsファイルシステムの使用状況を表示したい場合
  - `btrfs filesystem df /mnt`
- 2.5 Btrfsファイルシステムのサブボリューム/dataのスナップショットを/mnt/data_snapとして作成
  - `btrfs subvolume snapshot /data /mnt/data_snap`
- 2.6 USBメモリを読み取り専用でマウントしたい。マウントポイントは`/media/usb`、デバイスファイルは`/dev/sdb1`とする。ファイルシステム地アプは`vfat`
  - `mount -t vfat -o ro /dev/sdb1 /media/usb`
- 2.7 現在マウントされているファイルシステムとそのオプションを知るには何というファイルを参照
  - `cat /etc/mtab`
- 2.8 ファイルシステムの種類がxfsであるファイルシステムのみをすべてアンマウントするには
  - `unmount -at xfs`
- 2.9 `unmount /home; mount /home`を実行するのと同じことを１コマンドで実行したい場合
  - `mount -o remount /home`
- 2.10 スワップ領域を`/dev/sda7`に作成するコマンドを引数とともに記述してください
  - `mkswap /dev/sda7`
- 2.11 アクティブなスワップ領域を表示するには
  - `swapon -s`
- 2.12 mkfsコマンドを使ってext4ファイルシステムを作成。その際に、予約ブロックの割合も変更する。不良ブロックのチェックも行う。必要なオプションをすべて選択
  - `-t`:タイプを指定
  - `-c`:不良ブロックのチェック
  - `-m`:root用の予約領域を指定する
- 2.13 rootユーザー用予約領域が5%確保されているext4ファイルシステム`/dev/sda5`がある。この領域を0%に死体
  - `tune2fs -m 0 /dev/sda5`
- 2.14 XFSファイルシステムをバックアップするコマンド
  - `xfsdump`
- 2.15 `/dev/sdb1`を物理ボリュームとして初期化したい場合に実行するコマンド
  - `pvcreate /dev/sdb1`
- 2.16 `testvg`という名称のボリュームグループを作成したい場合。ボリュームグループを構成する物理ボリュームデバイスは`/dev/sdb1`と`/dev/sdc1`
  - `vgcreate -s 32m testvg /dev/sdb1 /dev/sdc1`
- 2.17 ボリュームグループtestvg内にサイズが10Gバイトの論理ボリュームlv01を作成しようとする。
  - `lvcreate`
    - -L:サイズ
    - -n:論理ボリューム名
    - 引数にはボリュームグループ名を指定する

## 第3章　ネットワーク構成

### 3.1　基本的なネットワーク構成

- ネットワークデバイスの操作
  - インターフェース名：eth0,eth1,loなどがもともと
  - 最近は、`enp0s3`などの名前が使われる

```bash
# カーネルが認識しているネットワークデバイスを確認
lspci | grep -i eth
journalctl -b | grep -i eth | grep enp

```

- `ip`コマンド
  - ネットワークインターフェースやルーティングテーブル、ARPテーブルなどを管理するコマンド

```bash
# データリンク層
ip link show
# IPアドレス
ip addr show
# ルーティングテーブル
ip route show
# ARPキャッシュ
ip neigh show


ip -s link show enp0s3

# add でパラメータ設定する
ip addr add 192.168.11.10/24 dev enp0s3

#### ifconfigコマンド
# ipコマンド以前に広く使われていたコマンド
ifconfig
ifconfig -a

ifconfig enp0s3 192.168.120.27 netmask 255.255.255.0
ifconfig enp0s3 up
# まとめて指定も可能
ifconfig enp0s3 192.168.120.27 netmask 255.255.255.0 up

#### ARP
# MACアドレスとIPアドレスを変換するプロトコル
# 自分のIPアドレス/MACアドレスと相手のIPアドレスが含まれたパケットをブロードキャストして、指定されたIPアドレスを持つ相手がこのパケットを受け取ると、自分のMACアドレスを返す
# 一度取得した情報は、ARPキャッシュと呼ばれるテーブルに一定期間キャッシュされる

```

- 無線ネットワークの設定

```bash
iwconfig

```

### 3.2　高度なネットワーク設定

```bash
route
netstat -r
# 情報は同じ物が出力される

[root@localhost etc]# netstat -r
Kernel IP routing table
Destination     Gateway         Genmask         Flags   MSS Window  irtt Iface
default         buffalo.setup   0.0.0.0         UG        0 0          0 enp0s3
192.168.11.0    0.0.0.0         255.255.255.0   U         0 0          0 enp0s3
192.168.122.0   0.0.0.0         255.255.255.0   U         0 0          0 virbr0
[root@localhost etc]# route
Kernel IP routing table
Destination     Gateway         Genmask         Flags Metric Ref    Use Iface
default         buffalo.setup   0.0.0.0         UG    100    0        0 enp0s3
192.168.11.0    0.0.0.0         255.255.255.0   U     100    0        0 enp0s3
192.168.122.0   0.0.0.0         255.255.255.0   U     0      0        0 virbr0


```

- 基本的なネットワーク管理コマンド
  - pingコマンド：指定されたホストにICMPパケットを贈り、その反応も表示
    - オプション：
      - -n:ホスト名を名前解決せずにIPアドレスで表示
      - -c 回数
      - -i 間隔：指定した間隔ごとにICMPパケットを送信
  - ping6コマンド：IPv6用コマンド
  - tcpdumpコマンド：指定したネットワークインターフェースを監視市、そこに到達したデータをコンソール上に表示
  - netstatコマンド：ネットワーク機能に関する様々な情報を表示
  - ssコマンド：netstatコマンドに変わるのがssコマンド
  - tracerouteコマンド：指定されたホストまでパケットが伝わる経路を表示
    - ネットワーク経路上にICMPメッセージに返答しないホストが存在する場合などでは適切な動作は期待できない
  - ncコマンド：TCP/UDPを使ったネットワーク通信を行うシンプルなコマンド
    - ポートスキャンを実施したり、通信状態を確認したりといったちょっとした操作に活用できる
    - `nc localhost 25`

- NetworkManager
  - ネットワークを管理するサブシステムとして、NetworkManagerが導入されている
  - 稼働しているか確認：`systemctl status NetworkManager`
  - `nmcli`コマンドを使ってネットワークの設定、接続の管理、状態の確認などが可能

```bash
nmcli

# NetworkManagerの状態確認
nmcli general status

# ネットワークインターフェースの設定ファイル
cat /etc/sysconfig/network-scripts/ifcfg-enp0s3


```

### 3.3　ネットワークの問題解決

- ネットワーク設定情報の収集
  - `/etc/hostname`: ホスト名を記述
  - `/etc/hosts`: ホスト名とIPアドレスの対応を記述
  - `/etc/networks`: ネットワーク名とネットワークアドレスの対応が記述
  - `/etc/nsswitch.conf`: 名前解決をする際の問い合わせ順を記述
  - `/etc/resolv.conf`: 問い合わせ先のDNSサーバーやドメイン名を記述

```bash
##### /etc/nsswitch.conf
[root@localhost ~]# cat /etc/nsswitch.conf
#
# /etc/nsswitch.conf
#
# An example Name Service Switch config file. This file should be
# sorted with the most-used services at the beginning.
#
# The entry '[NOTFOUND=return]' means that the search for an
# entry should stop if the search in the previous entry turned
# up nothing. Note that if the search failed due to some other reason
# (like no NIS server responding) then the search continues with the
# next entry.
#
# Valid entries include:
#
#       nisplus                 Use NIS+ (NIS version 3)
#       nis                     Use NIS (NIS version 2), also called YP
#       dns                     Use DNS (Domain Name Service)
#       files                   Use the local files
#       db                      Use the local database (.db) files
#       compat                  Use NIS on compat mode
#       hesiod                  Use Hesiod for user lookups
#       sss                     Use sssd (System Security Services Daemon)
#       [NOTFOUND=return]       Stop searching if not found so far
#
# WARNING: Running nscd with a secondary caching service like sssd may lead to
#          unexpected behaviour, especially with how long entries are cached.

# To use db, put the "db" in front of "files" for entries you want to be
# looked up first in the databases
#
# Example:
#passwd:    db files nisplus nis
#shadow:    db files nisplus nis
#group:     db files nisplus nis

passwd:     files sss
shadow:     files sss
group:      files sss
#initgroups: files sss

#hosts:     db files nisplus nis dns
hosts:      files dns myhostname

# Example - obey only what nisplus tells us...
#services:   nisplus [NOTFOUND=return] files
#networks:   nisplus [NOTFOUND=return] files
#protocols:  nisplus [NOTFOUND=return] files
#rpc:        nisplus [NOTFOUND=return] files
#ethers:     nisplus [NOTFOUND=return] files
#netmasks:   nisplus [NOTFOUND=return] files

bootparams: nisplus [NOTFOUND=return] files

ethers:     files
netmasks:   files
networks:   files
protocols:  files
rpc:        files
services:   files sss

netgroup:   nisplus sss

publickey:  nisplus

automount:  files nisplus sss
aliases:    files nisplus

```

- ネットワークの通信経路の確認

### 練習問題

- 3.1 ARPキャッシュを表示したりエントリーを追加したりするときに利用するコマンド
  - `arp`
- 3.2 tcpdumpコマンドの出力の一部。適切な説明を選択
  - 接続元IPアドレス.ポート番号(サービス名) > 接続先IPアドレス.ポート番号(サービス名)

- 3.3 routeコマンドを実行したときの表示
- 3.4 routeコマンドの使い方
  - `route add -net 192.168.100.0 netmask 255.255.255.0 gw 172.16.100.1`
- 3.5 ルーティングテーブルを表示するコマンド
  - `route`
  - `ip route show`
  - `netstat -r`
- 3.6 `/etc/resolv.conf`の記述
  - nameserver 172.16.0.1
- 3.7 `www.example.com`に到達するまでに経由するルーター一覧を表示して経路を確認したい場合、役立つコマンド
  - `traceroute6`
  - `mtr`

## 第4章　システムの保守と運用管理

### 4.1　makeによるソースコードからのビルドとインストール

```bash
tar cvf
tar xvf
tar tvf
gzip
gunzip
bzip
bunzip

```

### 4.2　バックアップ

- バックアップの種類
  - 完全バックアップ：時間がかかり容量も必要
  - 差分バックアップ：復元にはフルバックアップと最新の差分バックアップが必要
  - 増分バックアップ：復元にはフルバックアップとフルバックアップ以降のすべての増分バックアップが必要

- バックアップデバイス
  - CD-R/RW、リムーバブルハードディスク
  - DVD-R/RW
  - BD-R/RE
  - 磁気テープ
  - ネットワーク

- ローカルでのバックアップ
  - tar,dd,dump,restoreなどのコマンドでバックアップが可能

```bash
# OP,形式と拡張子
# -j bzip -> bz2
# -z gzip -> gz
# -J xz - xz

# このコマンドをあわせて使う使い方は必要に応じて調べるで良さそう
dump
restore

# テープドライブを操作するコマンド
mt

# ネットワーク経由でのバックアップ
rsync

```

### 4.3　ユーザーへのシステム管理情報の通知

- ログイン前後のメッセージ
  - `/etc/issue`: 接続前に表示されるメッセージ　telnet接続だと表示される sshだとログイン前メッセージが表示されない（Teratermとコマンドプロンプト）
  - `/etc/issue.net`: 接続前に表示されるメッセージ　telnet接続だと表示される  sshだとログイン前メッセージが表示されない（Teratermとコマンドプロンプト）
  - `/etc/motd`: 接続後に表示されるメッセージ

- ログイン中のユーザへの通知
  - `wall "message"`
  - `shutdown -k now "message"`

- <https://qiita.com/montblanc18/items/8b4fd2cf150913c6e1c2>
  - telnetを有効にする方法で参考

### 4.4　リソース使用状況の把握

- CPU使用率やメモリの状況など、システムリソースを総合的に確認できるツール
  - `top`
  - `vmstat`

- EPELリポジトリ epelリポジトリを追加方法
  - <https://linuc.spa-miz.com/2020/10/13/installing-htop-centos/>

```bash
top
htop
vmstat
iostat
iotop
sar
uptime # システムの稼働時間やログインユーザー数、平均負荷などが表示される。topコマンドの１行目とほぼ同じ
w # 現在ログインしているユーザと各ユーザのプロセス情報が表示される

```


```bash
# CPU使用率の測定
ps
ps aux: システムで使用されているすべてのプロセスを表示

# 開いているファイルやポートの確認
lsof
# /var/log/messagesファイルを開いているプロセスを検索
[root@localhost top]# lsof /var/log/messages
COMMAND    PID USER   FD   TYPE DEVICE SIZE/OFF     NODE NAME
abrt-watc  914 root    4r   REG  253,0   718793 10468097 /var/log/messages
rsyslogd  1338 root    7w   REG  253,0   718793 10468097 /var/log/messages
# プロセス名が開いているファイルを表示
[root@localhost top]# lsof -p `pidof rsyslogd`
COMMAND   PID USER   FD      TYPE             DEVICE SIZE/OFF     NODE NAME
rsyslogd 1338 root  cwd       DIR              253,0      224       64 /
rsyslogd 1338 root  rtd       DIR              253,0      224       64 /
rsyslogd 1338 root  txt       REG              253,0   663976  3172893 /usr/sbin/rsyslogd
rsyslogd 1338 root  mem       REG               0,19  8388608     8307 /run/log/journal/4f887155365a419b9cb02e497221d5a4/system.journal
rsyslogd 1338 root  mem       REG              253,0    68192   176358 /usr/lib64/libbz2.so.1.0.6
rsyslogd 1338 root  mem       REG              253,0    99944   176516 /usr/lib64/libelf-0.176.so
rsyslogd 1338 root  mem       REG              253,0   402384   383771 /usr/lib64/libpcre.so.1.2.0
rsyslogd 1338 root  mem       REG              253,0    19896   176626 /usr/lib64/libattr.so.1.1.0
rsyslogd 1338 root  mem       REG              253,0   338672  1300052 /usr/lib64/libdw-0.176.so
rsyslogd 1338 root  mem       REG              253,0   109976   383691 /usr/lib64/libresolv-2.17.so
rsyslogd 1338 root  mem       REG              253,0    19384   176460 /usr/lib64/libgpg-error.so.0.10.0
rsyslogd 1338 root  mem       REG              253,0   535064   176472 /usr/lib64/libgcrypt.so.11.8.2
rsyslogd 1338 root  mem       REG              253,0    61752   270256 /usr/lib64/liblz4.so.1.8.3
rsyslogd 1338 root  mem       REG              253,0   157424   176353 /usr/lib64/liblzma.so.5.2.2
rsyslogd 1338 root  mem       REG              253,0   155744   176263 /usr/lib64/libselinux.so.1
rsyslogd 1338 root  mem       REG              253,0  1136944   383671 /usr/lib64/libm-2.17.so
rsyslogd 1338 root  mem       REG              253,0    20048   176631 /usr/lib64/libcap.so.2.22
rsyslogd 1338 root  mem       REG              253,0   203688  1300065 /usr/lib64/libsystemd.so.0.6.0
rsyslogd 1338 root  mem       REG              253,0    25024  5817422 /usr/lib64/rsyslog/imjournal.so
rsyslogd 1338 root  mem       REG              253,0    38048  5817429 /usr/lib64/rsyslog/imuxsock.so
rsyslogd 1338 root  mem       REG              253,0    24432  5817430 /usr/lib64/rsyslog/lmnet.so
rsyslogd 1338 root  mem       REG              253,0  2156272   383663 /usr/lib64/libc-2.17.so
rsyslogd 1338 root  mem       REG              253,0    88720       85 /usr/lib64/libgcc_s-4.8.5-20150702.so.1
rsyslogd 1338 root  mem       REG              253,0    20064   176270 /usr/lib64/libuuid.so.1.3.0
rsyslogd 1338 root  mem       REG              253,0    40896  1245966 /usr/lib64/libfastjson.so.4.0.0
rsyslogd 1338 root  mem       REG              253,0    15424  1299766 /usr/lib64/libestr.so.0.0.0
rsyslogd 1338 root  mem       REG              253,0    43712   383693 /usr/lib64/librt-2.17.so
rsyslogd 1338 root  mem       REG              253,0    19248   383669 /usr/lib64/libdl-2.17.so
rsyslogd 1338 root  mem       REG              253,0   142144   383689 /usr/lib64/libpthread-2.17.so
rsyslogd 1338 root  mem       REG              253,0    90248   176266 /usr/lib64/libz.so.1.2.7
rsyslogd 1338 root  mem       REG              253,0   163312   383656 /usr/lib64/ld-2.17.so
rsyslogd 1338 root    0r      CHR                1,3      0t0     1028 /dev/null
rsyslogd 1338 root    1w      CHR                1,3      0t0     1028 /dev/null
rsyslogd 1338 root    2w      CHR                1,3      0t0     1028 /dev/null
rsyslogd 1338 root    3r  a_inode               0,10        0     6415 inotify
rsyslogd 1338 root    4u     unix 0xffff8e7135db5940      0t0    23333 socket
rsyslogd 1338 root    5r      REG               0,19  8388608     8307 /run/log/journal/4f887155365a419b9cb02e497221d5a4/system.journal
rsyslogd 1338 root    6w      REG              253,0    18803  8671877 /var/log/cron
rsyslogd 1338 root    7w      REG              253,0   718793 10468097 /var/log/messages
rsyslogd 1338 root    8w      REG              253,0    20795 10468098 /var/log/secure
rsyslogd 1338 root    9w      REG              253,0     1639 10468099 /var/log/maillog


### メモリ及びスワップ使用量の測定
# メモリ使用率を測定するには、先に上げたtop,sadc/sarコマンドなどが利用できる他freeコマンドも利用できる
# Linuxは、使われていない物理メモリをできるだけキャッシュに割り当てようとします。
# そのため、Linuxの起動時間が長くなればなるほど、Mem行のfree列の値は小さくなっていきます。
# その値が小さくても、キャッシュに割り当てられているサイズが大きいのであれば、実際にメモリが足りないわけではない、ということに注意してください。
# available列を見ると、おおよその利用可能なメモリ量がわかります。スワップはディスクの一部を仮想的なメモリとして利用する機能です。
# システムの物理メモリが不足するとスワップが行われます。スワップ領域が継続的に使われるようであれば、システムのパフォーマンスが低下します。
# そのため、システムが利用しているメモリ量を把握することは必要です。前記の例ではスワップは利用されていませんが、スワップが頻繁に利用されるようなら、
# 不要なサービスを停止させるか、メモリの増設を検討する必要があります。freeコマンド以上に詳細なメモリの情報を得るには、/proc/meminfoを参照します。


### ディスク使用量の測定
df

### ネットワークトラフィックの測定
netstat -s
ss -s

netserver
netperf
iptables
iftop

# この辺詳細ちょっとおいきれてないので後で振り返り

```

### 4.5　死活監視と運用監視ツール

- リソースの枯渇
  - スラッシング：アプリが使うメモリ領域が肥大し、空きメモリがなくなるとメモリの一部がスワップ領域に移されその分のメモリが開放される
    - さらにメモリ不足が継続すると、スワップ領域への対比が頻発市、システムの動作が大幅に遅くなってしまうこと
- システムの過負荷
- サービスの以上
- OOMKiller
  - `cat /proc/sys/vm/panic_on_oom`これが0であればOOM Killerは動作しない、1であれば動作する
  - 真っ先にOOM Killerに強制終了されるプロセスはdstatコマンドで調べることができる
  - `dstat --top-oom`
  - `pidof python2` dstatコマンドで出力されるのはこの値が最も高いプロセス
  - 強制終了の優先度を変更するには、`/proc/PID/oom_adj`ファイルに値を書き込む

- 監視作業
  - 死活監視
  - リソース監視
  - ログ監視
    - `swatch`: simple log watcherが古くから使われている

- SNMP: ネットワーク上のサーバーやネットワーク機器を監視できるプロトコル
  - SNMPマネージャ：監視する側
  - SNMPエージェント：監視される側
  - 監視の仕組み：
    - SNMPマネージャ側からSNMPエージェント側に情報を求める（ポーリング）
    - SNMPエージェント側からSNMPマネージャ側に通知する
      - ポーリングには、SNMPエージェント側のUDP161ポート、SNMPマネージャ側のUDP162ポートが使われる

- システム運用監視ツール
  - collectd: システムの各種情報を定期的に収集する軽量なデーモン
  - Nagios
  - MRTG (Multi Router Traffic Grapher)
  - Cacti
  - Icinga2
  - Zabbix

### 4.6　システム構成ツール

- Ansibleの概要
  - YAML形式のテキストファイルで設定
  - Pythonが動けば使える

- コントロールノードとターゲットノード
  - コントロールノード：システム構成処理の指示を出すホスト
  - ターゲットノード：コントロールノードによってシステム構成処理が実行されるホスト

- インベントリとPlaybook
  - インベントリ:
    - ターゲットノードのリストが記述される
    - 複数のターゲットノードをまとめたグループも設定できる
  - Playbook:
    - ターゲットノードで実施するシステム構成処理が記述される

- モジュール: Ansibleの構成管理機能を実現するため、数多くのモジュールが提供されている

- Ansibleの基本的な設定
  - `/etc/ansible/ansible.cfg`

```bash
[root@localhost 1340]# cat /etc/ansible/ansible.cfg
# config file for ansible -- https://ansible.com/
# ===============================================

# nearly all parameters can be overridden in ansible-playbook
# or with command line flags. ansible will read ANSIBLE_CONFIG,
# ansible.cfg in the current working directory, .ansible.cfg in
# the home directory or /etc/ansible/ansible.cfg, whichever it
# finds first

[defaults]

# some basic default values...

#inventory      = /etc/ansible/hosts
#library        = /usr/share/my_modules/
#module_utils   = /usr/share/my_module_utils/
#remote_tmp     = ~/.ansible/tmp
#local_tmp      = ~/.ansible/tmp
#plugin_filters_cfg = /etc/ansible/plugin_filters.yml
#forks          = 5
#poll_interval  = 15
#sudo_user      = root
#ask_sudo_pass = True
#ask_pass      = True
#transport      = smart
#remote_port    = 22
#module_lang    = C
#module_set_locale = False

# plays will gather facts by default, which contain information about
# the remote system.
#
# smart - gather by default, but don't regather if already gathered
# implicit - gather by default, turn off with gather_facts: False
# explicit - do not gather by default, must say gather_facts: True
#gathering = implicit

# This only affects the gathering done by a play's gather_facts directive,
# by default gathering retrieves all facts subsets
# all - gather all subsets
# network - gather min and network facts
# hardware - gather hardware facts (longest facts to retrieve)
# virtual - gather min and virtual facts
# facter - import facts from facter
# ohai - import facts from ohai
# You can combine them using comma (ex: network,virtual)
# You can negate them using ! (ex: !hardware,!facter,!ohai)
# A minimal set of facts is always gathered.
#gather_subset = all

# some hardware related facts are collected
# with a maximum timeout of 10 seconds. This
# option lets you increase or decrease that
# timeout to something more suitable for the
# environment.
# gather_timeout = 10

# Ansible facts are available inside the ansible_facts.* dictionary
# namespace. This setting maintains the behaviour which was the default prior
# to 2.5, duplicating these variables into the main namespace, each with a
# prefix of 'ansible_'.
# This variable is set to True by default for backwards compatibility. It
# will be changed to a default of 'False' in a future release.
# ansible_facts.
# inject_facts_as_vars = True

# additional paths to search for roles in, colon separated
#roles_path    = /etc/ansible/roles

# uncomment this to disable SSH key host checking
#host_key_checking = False

# change the default callback, you can only have one 'stdout' type  enabled at a time.
#stdout_callback = skippy


## Ansible ships with some plugins that require whitelisting,
## this is done to avoid running all of a type by default.
## These setting lists those that you want enabled for your system.
## Custom plugins should not need this unless plugin author specifies it.

# enable callback plugins, they can output to stdout but cannot be 'stdout' type.
#callback_whitelist = timer, mail

# Determine whether includes in tasks and handlers are "static" by
# default. As of 2.0, includes are dynamic by default. Setting these
# values to True will make includes behave more like they did in the
# 1.x versions.
#task_includes_static = False
#handler_includes_static = False

# Controls if a missing handler for a notification event is an error or a warning
#error_on_missing_handler = True

# change this for alternative sudo implementations
#sudo_exe = sudo

# What flags to pass to sudo
# WARNING: leaving out the defaults might create unexpected behaviours
#sudo_flags = -H -S -n

# SSH timeout
#timeout = 10

# default user to use for playbooks if user is not specified
# (/usr/bin/ansible will use current user as default)
#remote_user = root

# logging is off by default unless this path is defined
# if so defined, consider logrotate
#log_path = /var/log/ansible.log

# default module name for /usr/bin/ansible
#module_name = command

# use this shell for commands executed under sudo
# you may need to change this to bin/bash in rare instances
# if sudo is constrained
#executable = /bin/sh

# if inventory variables overlap, does the higher precedence one win
# or are hash values merged together?  The default is 'replace' but
# this can also be set to 'merge'.
#hash_behaviour = replace

# by default, variables from roles will be visible in the global variable
# scope. To prevent this, the following option can be enabled, and only
# tasks and handlers within the role will see the variables there
#private_role_vars = yes

# list any Jinja2 extensions to enable here:
#jinja2_extensions = jinja2.ext.do,jinja2.ext.i18n

# if set, always use this private key file for authentication, same as
# if passing --private-key to ansible or ansible-playbook
#private_key_file = /path/to/file

# If set, configures the path to the Vault password file as an alternative to
# specifying --vault-password-file on the command line.
#vault_password_file = /path/to/vault_password_file

# format of string {{ ansible_managed }} available within Jinja2
# templates indicates to users editing templates files will be replaced.
# replacing {file}, {host} and {uid} and strftime codes with proper values.
#ansible_managed = Ansible managed: {file} modified on %Y-%m-%d %H:%M:%S by {uid} on {host}
# {file}, {host}, {uid}, and the timestamp can all interfere with idempotence
# in some situations so the default is a static string:
#ansible_managed = Ansible managed

# by default, ansible-playbook will display "Skipping [host]" if it determines a task
# should not be run on a host.  Set this to "False" if you don't want to see these "Skipping"
# messages. NOTE: the task header will still be shown regardless of whether or not the
# task is skipped.
#display_skipped_hosts = True

# by default, if a task in a playbook does not include a name: field then
# ansible-playbook will construct a header that includes the task's action but
# not the task's args.  This is a security feature because ansible cannot know
# if the *module* considers an argument to be no_log at the time that the
# header is printed.  If your environment doesn't have a problem securing
# stdout from ansible-playbook (or you have manually specified no_log in your
# playbook on all of the tasks where you have secret information) then you can
# safely set this to True to get more informative messages.
#display_args_to_stdout = False

# by default (as of 1.3), Ansible will raise errors when attempting to dereference
# Jinja2 variables that are not set in templates or action lines. Uncomment this line
# to revert the behavior to pre-1.3.
#error_on_undefined_vars = False

# by default (as of 1.6), Ansible may display warnings based on the configuration of the
# system running ansible itself. This may include warnings about 3rd party packages or
# other conditions that should be resolved if possible.
# to disable these warnings, set the following value to False:
#system_warnings = True

# by default (as of 1.4), Ansible may display deprecation warnings for language
# features that should no longer be used and will be removed in future versions.
# to disable these warnings, set the following value to False:
#deprecation_warnings = True

# (as of 1.8), Ansible can optionally warn when usage of the shell and
# command module appear to be simplified by using a default Ansible module
# instead.  These warnings can be silenced by adjusting the following
# setting or adding warn=yes or warn=no to the end of the command line
# parameter string.  This will for example suggest using the git module
# instead of shelling out to the git command.
# command_warnings = False


# set plugin path directories here, separate with colons
#action_plugins     = /usr/share/ansible/plugins/action
#become_plugins     = /usr/share/ansible/plugins/become
#cache_plugins      = /usr/share/ansible/plugins/cache
#callback_plugins   = /usr/share/ansible/plugins/callback
#connection_plugins = /usr/share/ansible/plugins/connection
#lookup_plugins     = /usr/share/ansible/plugins/lookup
#inventory_plugins  = /usr/share/ansible/plugins/inventory
#vars_plugins       = /usr/share/ansible/plugins/vars
#filter_plugins     = /usr/share/ansible/plugins/filter
#test_plugins       = /usr/share/ansible/plugins/test
#terminal_plugins   = /usr/share/ansible/plugins/terminal
#strategy_plugins   = /usr/share/ansible/plugins/strategy


# by default, ansible will use the 'linear' strategy but you may want to try
# another one
#strategy = free

# by default callbacks are not loaded for /bin/ansible, enable this if you
# want, for example, a notification or logging callback to also apply to
# /bin/ansible runs
#bin_ansible_callbacks = False


# don't like cows?  that's unfortunate.
# set to 1 if you don't want cowsay support or export ANSIBLE_NOCOWS=1
#nocows = 1

# set which cowsay stencil you'd like to use by default. When set to 'random',
# a random stencil will be selected for each task. The selection will be filtered
# against the `cow_whitelist` option below.
#cow_selection = default
#cow_selection = random

# when using the 'random' option for cowsay, stencils will be restricted to this list.
# it should be formatted as a comma-separated list with no spaces between names.
# NOTE: line continuations here are for formatting purposes only, as the INI parser
#       in python does not support them.
#cow_whitelist=bud-frogs,bunny,cheese,daemon,default,dragon,elephant-in-snake,elephant,eyes,\
#              hellokitty,kitty,luke-koala,meow,milk,moofasa,moose,ren,sheep,small,stegosaurus,\
#              stimpy,supermilker,three-eyes,turkey,turtle,tux,udder,vader-koala,vader,www

# don't like colors either?
# set to 1 if you don't want colors, or export ANSIBLE_NOCOLOR=1
#nocolor = 1

# if set to a persistent type (not 'memory', for example 'redis') fact values
# from previous runs in Ansible will be stored.  This may be useful when
# wanting to use, for example, IP information from one group of servers
# without having to talk to them in the same playbook run to get their
# current IP information.
#fact_caching = memory

#This option tells Ansible where to cache facts. The value is plugin dependent.
#For the jsonfile plugin, it should be a path to a local directory.
#For the redis plugin, the value is a host:port:database triplet: fact_caching_connection = localhost:6379:0

#fact_caching_connection=/tmp



# retry files
# When a playbook fails a .retry file can be created that will be placed in ~/
# You can enable this feature by setting retry_files_enabled to True
# and you can change the location of the files by setting retry_files_save_path

#retry_files_enabled = False
#retry_files_save_path = ~/.ansible-retry

# squash actions
# Ansible can optimise actions that call modules with list parameters
# when looping. Instead of calling the module once per with_ item, the
# module is called once with all items at once. Currently this only works
# under limited circumstances, and only with parameters named 'name'.
#squash_actions = apk,apt,dnf,homebrew,pacman,pkgng,yum,zypper

# prevents logging of task data, off by default
#no_log = False

# prevents logging of tasks, but only on the targets, data is still logged on the master/controller
#no_target_syslog = False

# controls whether Ansible will raise an error or warning if a task has no
# choice but to create world readable temporary files to execute a module on
# the remote machine.  This option is False by default for security.  Users may
# turn this on to have behaviour more like Ansible prior to 2.1.x.  See
# https://docs.ansible.com/ansible/become.html#becoming-an-unprivileged-user
# for more secure ways to fix this than enabling this option.
#allow_world_readable_tmpfiles = False

# controls the compression level of variables sent to
# worker processes. At the default of 0, no compression
# is used. This value must be an integer from 0 to 9.
#var_compression_level = 9

# controls what compression method is used for new-style ansible modules when
# they are sent to the remote system.  The compression types depend on having
# support compiled into both the controller's python and the client's python.
# The names should match with the python Zipfile compression types:
# * ZIP_STORED (no compression. available everywhere)
# * ZIP_DEFLATED (uses zlib, the default)
# These values may be set per host via the ansible_module_compression inventory
# variable
#module_compression = 'ZIP_DEFLATED'

# This controls the cutoff point (in bytes) on --diff for files
# set to 0 for unlimited (RAM may suffer!).
#max_diff_size = 1048576

# This controls how ansible handles multiple --tags and --skip-tags arguments
# on the CLI.  If this is True then multiple arguments are merged together.  If
# it is False, then the last specified argument is used and the others are ignored.
# This option will be removed in 2.8.
#merge_multiple_cli_flags = True

# Controls showing custom stats at the end, off by default
#show_custom_stats = True

# Controls which files to ignore when using a directory as inventory with
# possibly multiple sources (both static and dynamic)
#inventory_ignore_extensions = ~, .orig, .bak, .ini, .cfg, .retry, .pyc, .pyo

# This family of modules use an alternative execution path optimized for network appliances
# only update this setting if you know how this works, otherwise it can break module execution
#network_group_modules=eos, nxos, ios, iosxr, junos, vyos

# When enabled, this option allows lookups (via variables like {{lookup('foo')}} or when used as
# a loop with `with_foo`) to return data that is not marked "unsafe". This means the data may contain
# jinja2 templating language which will be run through the templating engine.
# ENABLING THIS COULD BE A SECURITY RISK
#allow_unsafe_lookups = False

# set default errors for all plays
#any_errors_fatal = False

[inventory]
# enable inventory plugins, default: 'host_list', 'script', 'auto', 'yaml', 'ini', 'toml'
#enable_plugins = host_list, virtualbox, yaml, constructed

# ignore these extensions when parsing a directory as inventory source
#ignore_extensions = .pyc, .pyo, .swp, .bak, ~, .rpm, .md, .txt, ~, .orig, .ini, .cfg, .retry

# ignore files matching these patterns when parsing a directory as inventory source
#ignore_patterns=

# If 'true' unparsed inventory sources become fatal errors, they are warnings otherwise.
#unparsed_is_failed=False

[privilege_escalation]
#become=True
#become_method=sudo
#become_user=root
#become_ask_pass=False

[paramiko_connection]

# uncomment this line to cause the paramiko connection plugin to not record new host
# keys encountered.  Increases performance on new host additions.  Setting works independently of the
# host key checking setting above.
#record_host_keys=False

# by default, Ansible requests a pseudo-terminal for commands executed under sudo. Uncomment this
# line to disable this behaviour.
#pty=False

# paramiko will default to looking for SSH keys initially when trying to
# authenticate to remote devices.  This is a problem for some network devices
# that close the connection after a key failure.  Uncomment this line to
# disable the Paramiko look for keys function
#look_for_keys = False

# When using persistent connections with Paramiko, the connection runs in a
# background process.  If the host doesn't already have a valid SSH key, by
# default Ansible will prompt to add the host key.  This will cause connections
# running in background processes to fail.  Uncomment this line to have
# Paramiko automatically add host keys.
#host_key_auto_add = True

[ssh_connection]

# ssh arguments to use
# Leaving off ControlPersist will result in poor performance, so use
# paramiko on older platforms rather than removing it, -C controls compression use
#ssh_args = -C -o ControlMaster=auto -o ControlPersist=60s

# The base directory for the ControlPath sockets.
# This is the "%(directory)s" in the control_path option
#
# Example:
# control_path_dir = /tmp/.ansible/cp
#control_path_dir = ~/.ansible/cp

# The path to use for the ControlPath sockets. This defaults to a hashed string of the hostname,
# port and username (empty string in the config). The hash mitigates a common problem users
# found with long hostnames and the conventional %(directory)s/ansible-ssh-%%h-%%p-%%r format.
# In those cases, a "too long for Unix domain socket" ssh error would occur.
#
# Example:
# control_path = %(directory)s/%%h-%%r
#control_path =

# Enabling pipelining reduces the number of SSH operations required to
# execute a module on the remote server. This can result in a significant
# performance improvement when enabled, however when using "sudo:" you must
# first disable 'requiretty' in /etc/sudoers
#
# By default, this option is disabled to preserve compatibility with
# sudoers configurations that have requiretty (the default on many distros).
#
#pipelining = False

# Control the mechanism for transferring files (old)
#   * smart = try sftp and then try scp [default]
#   * True = use scp only
#   * False = use sftp only
#scp_if_ssh = smart

# Control the mechanism for transferring files (new)
# If set, this will override the scp_if_ssh option
#   * sftp  = use sftp to transfer files
#   * scp   = use scp to transfer files
#   * piped = use 'dd' over SSH to transfer files
#   * smart = try sftp, scp, and piped, in that order [default]
#transfer_method = smart

# if False, sftp will not use batch mode to transfer files. This may cause some
# types of file transfer failures impossible to catch however, and should
# only be disabled if your sftp version has problems with batch mode
#sftp_batch_mode = False

# The -tt argument is passed to ssh when pipelining is not enabled because sudo
# requires a tty by default.
#usetty = True

# Number of times to retry an SSH connection to a host, in case of UNREACHABLE.
# For each retry attempt, there is an exponential backoff,
# so after the first attempt there is 1s wait, then 2s, 4s etc. up to 30s (max).
#retries = 3

[persistent_connection]

# Configures the persistent connection timeout value in seconds.  This value is
# how long the persistent connection will remain idle before it is destroyed.
# If the connection doesn't receive a request before the timeout value
# expires, the connection is shutdown. The default value is 30 seconds.
#connect_timeout = 30

# The command timeout value defines the amount of time to wait for a command
# or RPC call before timing out. The value for the command timeout must
# be less than the value of the persistent connection idle timeout (connect_timeout)
# The default value is 30 second.
#command_timeout = 30

[accelerate]
#accelerate_port = 5099
#accelerate_timeout = 30
#accelerate_connect_timeout = 5.0

# The daemon timeout is measured in minutes. This time is measured
# from the last activity to the accelerate daemon.
#accelerate_daemon_timeout = 30

# If set to yes, accelerate_multi_key will allow multiple
# private keys to be uploaded to it, though each user must
# have access to the system via SSH to add a new key. The default
# is "no".
#accelerate_multi_key = yes

[selinux]
# file systems that require special treatment when dealing with security context
# the default behaviour that copies the existing context or uses the user default
# needs to be changed to use the file system dependent context.
#special_context_filesystems=nfs,vboxsf,fuse,ramfs,9p,vfat

# Set this to yes to allow libvirt_lxc connections to work without SELinux.
#libvirt_lxc_noseclabel = yes

[colors]
#highlight = white
#verbose = blue
#warn = bright purple
#error = red
#debug = dark gray
#deprecate = purple
#skip = cyan
#unreachable = red
#ok = green
#changed = yellow
#diff_add = green
#diff_remove = red
#diff_lines = cyan


[diff]
# Always print diff when running ( same as always running with -D/--diff )
# always = no

# Set how many context lines to show in diff
# context = 3

```

- `/etc/ansible/hosts`

```bash
[root@localhost 1340]# cat /etc/ansible/hosts
# This is the default ansible 'hosts' file.
#
# It should live in /etc/ansible/hosts
#
#   - Comments begin with the '#' character
#   - Blank lines are ignored
#   - Groups of hosts are delimited by [header] elements
#   - You can enter hostnames or ip addresses
#   - A hostname/ip can be a member of multiple groups

# Ex 1: Ungrouped hosts, specify before any group headers.

## green.example.com
## blue.example.com
## 192.168.100.1
## 192.168.100.10

# Ex 2: A collection of hosts belonging to the 'webservers' group

## [webservers]
## alpha.example.org
## beta.example.org
## 192.168.1.100
## 192.168.1.110

# If you have multiple hosts following a pattern you can specify
# them like this:

## www[001:006].example.com

# Ex 3: A collection of database servers in the 'dbservers' group

## [dbservers]
##
## db01.intranet.mydomain.net
## db02.intranet.mydomain.net
## 10.25.1.56
## 10.25.1.57

# Here's another example of host ranges, this time there are no
# leading 0s:

## db-[99:101]-node.example.com

```

- Playbook
  - YAML形式で記載する
  - 実行するには`ansible-playbook`コマンドを使う

- Ansibleの活用
  - アプリケーションのリリース
  - 仮想サーバー・コンテナの払い出し
    - KVMによる仮想マシンや、Dockerコンテナ、コンテナイメージの作成などを自動化できる
  - ネットワーク機器の管理
    - CISCOを始めとするネットワークベンダーの様々なネットワーク機器に対応しており、ネットワーク機器の設定や情報収集に利用できる

### 練習問題

- 4.1 gitコマンド
  - `git clone http://github/xxxx`
- 4.2 gzファイルを展開する方法
  - `gunzip newsoft.tar.gx ; tar xvf newsoft.tar`
  - `tar zxvf newsoft.tar.gz`
  - `gzip -dc newsoft.tar.gz | tar xvf -`
- 4.3 `make`
  - `./configure`でMackefileを作成
  - `make`コマンドでMakefileに基づいてコンパイルを行う
  - `make install`コマンドでコンパイル済みのファイルをインストール
- 4.4 パッチの適用を取り消すには？patchコマンドでなんというオプション？
  - R
- 4.5 `dd if=/dev/sdb of=/dev/sdc`
- 4.6 `tar cvf /dev/st0 /home`
  - tar [option] [アーカイブ先] [アーカイブ元]
- 4.7 /dataディレクトリ以下を、ホストjupiterの/backupディレクトリにバックアップ
  - `rsync -auvz -e ssh /data/ march@jupiter:/backup`
  - TODO: rsyncコマンド使ってみる
- 4.8 メンテナンス情報を通知する方法
- 4.9 スワップ領域がどの程度利用されているのか、その容量を計測したい場合のコマンド
  - `vmstat`,`cat /proc/swaps`,`free`
  - `swapon`,`/proc/meminfo`
- 4.10 vmstatコマンドで使用率が高いと考えられるリソース
  - TODO: vmstatコマンドの見方再確認
- 4.11 sarで今月の15日の記録を見たい
  - `sar -b -f /var/log/sa/sa15`
- 4.12 次のコマンド実行結果の説明
  - vmstat 30 50
    - 30秒間隔で計測結果が50回表示される
    - 使用中のスワップ領域サイズが表示される
    - バッファキャッシュとページキャッシュの利用状況が表示される
- 4.13 プロセスごとにメモリ使用量を把握したい
  - `top`
  - `ps aux`でもわかる。`ps -ex`は、Unix98オプションとGNUオプションを続けて指定できないためエラーになる
- 4.14 物理メモリが枯渇してしまう前にプロセスを強制終了し、そのプロセスが使っていたメモリを開放する仕組み
  - OOM Killer
- 4.15 Ansibleの説明について
- 4.16 Ansilbeをインストール下ホストで以下のコマンドを実行
  - `ansible-playbook -i localtest test_playbook.yml`
  - TODO: ansibleを実際に使ってみる必要ある

## 第5章　仮想化サーバー

### 5.1　仮想マシンの仕組みとKVM  

- 仮想化
  - ホスト型仮想化：仮想化ソフトウェアをインストールし、仮想化ソフトウェアが作り出した仮想マシン上にOSをインストールする方式
    - ホストOSとゲストOSに分けられる
  - ハイパーバイザー型仮想化：コンピュータ上にハイパーバイザと呼ばれる仮想化管理機構を用意し、その上で仮想マシンを動かす方式
    - ホスト型仮想化よりも高いパフォーマンスを期待できる

- 仮想化のメリット・デメリット
  - メリット：
    - トータルの運用コストを削減できる
    - リソースの変化に柔軟に対応できる
  - デメリット：
    - 仮想マシンのホストに障害が発生したい場合、複数の仮想マシンが影響
    - 物理サーバとは違った形での運用スキルやセキュリティ対策が必要
    - ハードウェア上で直接OSを動作させるのに比べてパフォーマンスが低下してしまう
      - オーバーヘッドを低減するCPUの仮想化支援機能
        - Intel社のCPUに搭載されているVT-x
        - AMD社のCPUに搭載されているADM-V

- KVM
  - CPUが仮想化支援機構に対応しているかどうかを確認するコマンド：
    - `lscpu | grep Virtualization`
    - `grep -E 'vmx|svm' /proc/cpuinfo`

### 5.2　仮想マシンの作成と管理

- KVM環境の構築
  - 手順
    - KVMと関連ツールおよびQEMU(ハードウェアエミュレータ)をインストール
      - `yum install libvirt bridge-utils qemu-kvm virt-manager virt-install`
      - `systemctl start libvirt`
      - `systemctl enable libvirt`
    - ブリッジネットワークを設定する
      - `nmcli con add type bridge con-name br0 ifname br0`
      - `nmcli con mod br0 ipv4.method manual ipv4.addresses "192.168.1.80/24" ipv4.gateway "192.168.1.1" ipv4.dns "192.168.1.1"`
    - 仮想マシンを作成する

- 実際にvirshを使った操作が紹介されているが試す環境ないので割愛

### 練習問題

- 5.1 ホスト型とハイパーバイザ型の問題
- 5.2 `cat /proc/cpuinfo | grep flags | uniq`
  - KVMを利用するには、CPUが仮想化支援機能に対応している必要がある（IntelのVT-xかAMDのAMD-V）
  - 中の文字列に、「vmx」か「svm」がなければ対応しない
- 5.3 CUI環境でKVM観葉マシンを作成してゲストOSをインストールするには
  - `virt-install`コマンドを使う
- 5.4 KVMを使って仮想マシンを運用したい
  - `systemctl enamble libvirt`
    - libvirtは仮想マシンの制御を抽象化したライブラリ
    - KVMを使って仮想マシンを運用するには、libvirtサービスを起動しておく必要がある
- 5.5 KVM仮想マシンを作成してCentOS7をインストールしたい
  - `virt-install`コマンド
- 5.6 コマンドラインからKVM仮想マシン「vm01」に接続してコマンド操作をしようとしています。
  - `virsh console vm01`

## 第6章　コンテナ

### 6.1　コンテナの仕組み

仮想マシンと並んでよく使われる仮想化技術

- コンテナ型仮想化
  - 仮想マシンを動かす技術ではなく、独立下環境でアプリケーションを動かす技術
  - コンテナ型仮想化ではホストOSとカーネルを共有するので仮想マシンよりもコンテナのほうがシステムリソースの消費が少なくて済む

- 参考
  - 特定のサーバープロセスなどアプリケーションのみを実行するコンテナをアプリケーションコンテナ
  - 一連のシステムプロセス群を実行し仮想マシンに近いコンテナをシステムコンテナということがあります。

- 名前空間とcgroup
  - 名前空間
    - コンテナの隔離に使われているカーネルの機能のこと
  - cgroup
    - プロセスをグループ化して管理する仕組み
    - グループごとにシステムリソースの利用に制限をかけることができる
    - 管理できるシステムリソースは`ls /sys/fs/cgroup/`で確認できる

- Docker
  - コンテナ化する仕組みをDockerエンジンといいます。

### 6.2　Dockerコンテナとコンテナイメージの管理

- Dockerの導入
  - `yum install docker`
  - `systemctl start docker.service`
  - `docker version`

- dockerコマンド
  - 実行するにはroot権限が必要
  - 一般ユーザでも実行させるにはdockerグループに所属させる必要がある
  - `groupadd docker`
  - `usermod -aG docker linucuser`

- dockerの基本操作
  - コンテナイメージの取得
    - `docker pull centos:8`

- ディスク容量不足になったのでvirtualboxの容量増やす
  - <https://cream-worker.blog.jp/archives/1077340749.html>

```bash
docker pull centos:8
docker images
docker create --name mycentos8 centos:8
docker start mycentos8
# dokcer pull/create/start をあわせた動きが docekr runコマンド
docker run centos:8 cat /etc/redhat-release
docker ps
docker ps -a
docker rm [コンテナIDorコンテナ名]

# コンテナへのログイン
# docker run -it --name コンテナ名 イメージ名:タグ名 シェル
docker run -it --name mucentos centos:8 /bin/bash
uname -a # あくまでホストOSのカーネル情報が見える
Ctrl + p, Ctrl + q で抜ける
docker ps # プロセスが立ち上がっていることを確認
docker attach mycentos
exit # exitで抜けるとcontainerが落ちる
docker ps



```

- 仮想ネットワークの利用

```bash
docker run -itd --name centosA cenots:8 /bin/bash
docker run -itd --name centosB cenots:8 /bin/bash
docker ps
docker exec centosA /sbin/ip a
docker exec centosB /sbin/ip a

# ホストOS側にdocker0というネットワークインターフェースが作成されているのがわかる
ip a show docker0

# 仮想ネットワークを新しく作成することもできる
docker network create mynetwork
docker network connect mynetwork centosA
docker network connect mynetwork centosB

docker exec centosA /sbin/ip a
docker exec centosB /sbin/ip a

```

- dockerイメージの作成

```bash
docker run -it centos:8 /bin/bash

echo "My Docker Image" >> /root/docker.txt
exit

docker commit [コンテナID/コンテナ名] test/centos
docker images

docker run test/centos cat /root/docker.txt
docker rmi test/centos

```

- ポート変換

```bash
docker run --name nginxtest -d -p 8080:80 nginx

docker run --name nginxtest2 -v /home/tomo/html:/usr/share/nginx/html -d -p 8080:80 nginx
# 権限が足りずうまく行かなかった


```

- Dcokerfile
  - 既存のDockerイメージに操作を加えて、新しいDockerイメージを作ることができる
  - Dockerfileに記述して独自のイメージを作成する

```Dockerfile
FROM centos:8
MAINTAINER testimage <linucuser@example.com>

RUN yum -y install httpd

EXPOSE 80

CMD ["/usr/sbin/httpd","-DFOREGROUND"]

```

```bash
docker build -t local/centos:apache .
docker images

# 作成したDockerイメージからコンテナ名「apachetest」としてコンテナを作成、起動
docker run --name apachetest -d -p 8080:80 local/centos:apache

```

- コンテナの運用・管理コマンド

```bash
# コンテナの状態を詳しく確認できる
docker stats

# 圧縮アーカイブファイルを取得してDockerイメージを生成
docker import http://example.com/exampleimage.tgz

# コンテナ内のすべてのプロセスを一時停止/再開
docker pause
docker unpause

# コンテナ終了
docker stop
# docker stopコマンドで終了できない場合に利用 メインプロセスに対してKILLシグナルを送信してコンテナを終了します。
docker kill

# プライベートレジストリの構築
docker run -d -p 5000:5000 --name registry registry:2
docker pull ubuntu
docker tag ubuntu:latest localhost:5000/ubuntu
docker push localhost:5000/ubuntu

docker images

docker pull localhost:5000/ubuntu
# ローカルレジストリ削除
docker stop registry && docker rm -v registry

```

### 練習問題

- 6.1 仮想マシンと比較した際、コンテナにはどういうメリットがあるか
  - カーネルはホストOSのものを利用するのでシステムリソースの消費が少なくて済む
- 6.2 dockerコマンド
  - `docker pull centos:8`
  - `docker create --name testctl centos:8`
  - `dokcer start testctl`
- 6.3 起動中コンテナのシェルに接続
  - `docker attach testct2`
- 6.4 改変を加えたコンテナから新しいDockerイメージを作成する際のコマンド
  - docker commit
- 6.5 Dockerfile

## 第7章　201模擬試験

- TODO: Q1.
  - EFIシステムパーティションはFAT（またはVFAT）でフォーマットされる
  - BIOSはマザーボード上のフラッシュメモリに保存される
- TODO: Q2.GRUB2の設定ファイル`/etc/default/grub`の変更後は、`grub-mkconfig`コマンドを実行して`/boot/grub/grub.cfg`ファイルを生成する必要がある
- TODO: Q3.GRUB2ブートローダ
- TODO: Q4.GRUBを再インストールするには
  - `grub2-install /dev/sda`
- TODO: Q5.systemdについて
  - `/usr/lib/systemd/system`ディレクトリ：デフォルトのUnitファイル
  - `/etc/systemd/system`ディレクトリ：管理者がカスタマイズするUnitファイル
- Q6.systemd postfix.serviceが自動起動するように設定
  - `systemctl enable postfix.service`
- TODO: Q7.システムメンテナンスを行うためレスキューモードに移行
  - `systemctl isolate rescue.target`
- TODO: Q8.`/boot`ディレクトリ以下にあるファイルのうち、カーネルイメージを選択
  - `/boot/vmlinuz-カーネルバージョン`という名前のファイル
  - 自己解凍される圧縮ファイルとなっている
  - `/boot/initamfs`や`/boot/initrd`は初期RAMディスクファイル
  - `/boot/System.map`はシンボルのマッピングファイル
  - configはカーネルコンフィギュレーションファイル
- TODO: Q9.現在利用中のカーネルバージョンを表示することができるコマンド
  - `uname -r`
  - `cat /proc/version`
- TODO: Q10.カーネルのコンフィギュレーションが保存されるファイルのファイル名
  - `/usr/src/linux/.config`
- TODO: Q11.初期RAMディスクの作成ができるコマンド
  - `mkinitrd`,`mkinitramfs`,`dracut`
- Q12.systemdを採用したシステムでsshdサービスのログを取得
  - `journalctl -u sshd.service`
- TODO: Q13. udevを使用している場合、`.rules`ファイルが格納されているデフォルトのディレクトリ
  - `/etc/udev/udev.conf`
  - `/etc/udev/rules.d`ディレクトリ
- TODO: Q14.PCIデバイスの情報を集めている。1番目のバス、8番目のスロットに関する詳細な情報を表示
  - `lspci -vv -s 0:8`
- TODO: Q15.`/etc/fstab`ファイルの書式
  - ファイルシステムの情報が記載されたファイル
  - デバイスファイル名またはUUIDまたはラベル　マウントポイント　ファイルシステムの種類　マウントオプション　dumpフラグ　fsckのチェック順
- TODO: Q16.現在マウントされているファイルシステムとそのマウントオプションを確認
  - `/etc/mtab`
  - `/proc/mounts`
- TODO: Q17.有効になっているスワップ領域を確認するコマンド
  - `cat /proc/swaps`
  - `swapon -s`
- Q18.ext4ファイルシステムをブロクサイズ4096バイトで作成したい場合
  - `mke2fs -b 4096 -t ext4 /dev/sdb1`
- TODO: Q19.Btrfsを使っている。/mntにマウントしているトップレベルのサブボリュームの下に、/mnt/sub1というボリュームを作ろうとしている。
  - `btrfs subvolume create /mnt/sub1`
- TODO: Q20./dev/sda5にはext2ファイルシステムが格納されている。このファイルシステム内のデータに影響を与えずに、ext3ファイルシステムに変換したい場合
  - `tune2fs -j /dev/sda5`
  - 既存のext2ファイルシステムに影響を与えずにext3ファイルシステムに変換できる
    - 他のオプションも含めて確認する
- Q21.LVMの論理ボリューム/dev/centos/rootｎ構築されたXFSファイルシステムの情報を確認
  - `xfs_info`: XFSファイルシステムの情報を確認できる
- Q22.パーティションやディスクに対してLVMの物理ボリュームを作成するコマンド
  - `pvcreate`:物理ボリュームを作成
  - `vgcreate`:ボリュームグループを作成
  - `lvcreate`:論理ボリュームを作成
- Q23.ボリュームグループvolgroup1の空き容量が不足してきたので、物理ボリューム/dev/sdd1をvolgroup1に追加したい
  - `vgextend volgroup1 /dev/sdd1`
- Q24./dev/vg01/lv01のスナップショットをlv01_snapという名前で作成しようとしている
  - `lvcreate -s -L 500m -n lv01_snap /dev/vg01/lv01`
  - スナップショットを作成するには、lvcreateに-sオプションをつける
  - -Lはサイズの指定、-nはスナップショットの名称を指定
- Q25.LAN内に存在するホストをしるために、IPアドレスとMACアドレスとの対応テーブルを作成したい場合実行すべきこと
  - LAN内のブロードキャストアドレスに対してpingコマンドを実行し、次にarpコマンドを実行する
- Q26.デフォルトゲートウェイを192.168.1.1に設定しようとしている
  - `ip route add default via 192.168.1.1`
  - `route add default gw 192.168.1.1`
- Q27.無線ネットワークに関わるコマンドや説明で適切なもの
  - iwconfigコマンドで無線LANインターフェースの状態を表示できる
  - 無線LANのアクセスポイントを識別するIDとしてSSID・ESSIDがある
- Q28.ルーティングテーブル系問題
- Q29.tcpdumpコマンドの出力結果読み解き問題 クライアントのIPアドレスはどれか
- Q30.ルーティングテーブル系問題
- Q31.ネットワークに異常がみられるので、ルーティングテーブルを表示しようとしている。
  - DNSの問題と切り離すため、名前解決せずに表示させたい場合、routeコマンドにどのオプションをつければよいか
    - `route -n`
    - `netstat -rn`でも同じ
- Q32.パケットの受信および転送におけるエラーや取りこぼしの状況をネットワークインターフェースごとに表示することができるコマンド
  - `netstat -i`
- Q33.ターゲットホストまでのネットワーク経路を確認
  - `mtr`
  - `traceroute`
  - `tracepath`
- Q34.gitコマンド系
  - `git clone https://github.com/xxxxxx`
- Q35.ソフトウェアをソースコードからコンパイルしてインストールするときの説明
  - makeコマンドを利用してもソフトウェア間の依存関係を解消できない
- Q36.gccコンパイラがなくてconfigureとmakeでエラー
- Q37.ソースコードに適用したパッチを取り消したい場合、patchコマンドでは何というオプションを指定すればいいか
  - `patch -R p0 < patch-2.3.4`
- Q38.バックアップメディアの必要本数問題
- Q39.dumpコマンド
  - ファイルシステム単位でext2/ext3/ext4ファイルシステムをバックアップ
- Q40.ログインプロンプトの上方に表示されるディストリビューション情報などを編集したい
  - 編集すべきファイル「`/etc/issue`」
- Q41.ファイルシステムやディスクのI/Oを計測できるコマンドを2つ選択してください
  - `iostat`
  - `iotop`
- Q42.vmstatの出力結果
  - bi:block in ブロックデバイスから受け取ったブロック数(ブロック数/秒)
  - r: 実行待ちプロセス数
  - bo: ブロックデバイスに送られたブロック数(ブロック数/秒)
  - wa: 入出力待ち時間
  - b: 割り込み不可能なスリープ状態にあるプロセス数
- Q43.freeコマンドからメモリとスワップ領域の状態について読み取る問題
- Q44.vmstatコマンドの実行結果から読み取る問題
- Q45.Webブラウザ経由でサーバーのCPU利用率やネットワークのトラフィックを監視したいときに導入すべきソフトウェア
  - collectd,Nagios,MRTG,Cacti,Icinga2
- Q46.SNMPに関する説明
  - SNMPマネージャからSNMPエージェント側に情報を求めることをポーリングという
  - 障害発生時にSNMPマネージャへ通知する異常通知データをTRAPという
  - SNMPではUDPの161と162が使われる
- Q47.Ansibleに関する説明
  - インベントリにはシステム構成処理が実行されるホストのリストが記述されている
  - AnsibleのターゲットノードはLinuxホスト以外にも対応
  - 冪等性とはある操作を何度行っても同じ結果になること
- Q48.Ansibleの導入目的として不適切なものを１つ
  - サーバーのセキュリティを高める
- Q49.playbookを実行するコマンド
  - `ansilbe-playbook -i server.hosts sample_playbook.yml`
- Q50.ハイパーバイザ型仮想化の説明
  - 1つのハードウェア上で複数のOSを仮想マシン上で実行できる
  - ホストOSのハードウェア障害は仮想マシンから特定しづらい
  - CPUの仮想化支援機能を利用できる
- Q51.サーバーのCPUがKVMに対応しているかどうかを調べる
  - `cat /proc/cpuinfo | grep flags | uniq`
    - 根拠となるフラグ：vmx or svm
- Q52.仮想マシンのネットワークインターフェースをホストOSのネットワークインターフェースと同じネットワークに配置する仕組みをなんと呼ぶか？
  - ブリッジネットワーク
- Q53.GUI環境で仮想マシンを管理：virt-manager
- Q54.virsh は仮想マシン操作のためのコマンドラインインターフェース
  - `virsh shutdown vm_centos7`
- Q55.コマンドラインで仮想マシンを作成してOSをインストールするためのコマンド
  - `virt-install`
- Q56.コンテナに関する説明で誤っているもの
  - 
- Q57.Dockerの説明としてただしいもの
  - ホストOSのディレクトリをコンテナ内からアクセスできるように設定できる
  - DockerレジストリでDockerイメージを入手できる
  - DockerではLinuxカーネルの機能であるcgroupが使われる
- Q58.
  - `docker run -it alpine:latest /bin/sh`
- Q59.
  - `docker attach [id]`
    - バックグラウンドで起動中のコンテナに入るにはattachを使う
- Q60.
  - `docker images`



## 模擬試験 問題

## 模擬試験 解答・解説

## ■第2部　202試験（LinuC Level2 Exam 202）

## 第8章　ネットワーククライアントの管理
### 8.1　DHCPの設定
### 8.2　PAM認証
### 8.3　LDAP

## 第9章　ドメインネームサーバー
### 9.1　DNSの基本
### 9.2　BINDの基本設定
### 9.3　ゾーンファイルの管理
### 9.4　DNSサーバーのセキュリティ

## 第10章　HTTPサーバーとプロキシサーバー
### 10.1　Webサーバーの設定
### 10.2　Nginx
### 10.3　プロキシサーバーの設定

## 第11章　電子メールサービス
### 11.1　SMTPサーバーの構築
### 11.2　Dovecotの利用

## 第12章　ファイル共有サービス
### 12.1　Microsoftネットワーク
### 12.2　Sambaサーバーの構築
### 12.3　NFSサーバーの構築

## 第13章　システムのセキュリティ
### 13.1　パケットフィルタリング
### 13.2　OpenSSH
### 13.3　OpenVPN
### 13.4　セキュリティ業務

## 第14章　システムアーキテクチャ
### 14.1　高可用システムの実現方法
### 14.2　キャパシティプランニングとスケーラビリティの確保
### 14.3　クラウドサービス上のシステム構成
### 14.4　典型的なシステムアーキテクチャ

## 第15章　202模擬試験
## 模擬試験 問題
## 模擬試験 解答・解説

## 付録　Linux実習環境の使い方
## Linux実習環境の利用について
## VirtualBoxのインストール
## 仮想マシンの使い方



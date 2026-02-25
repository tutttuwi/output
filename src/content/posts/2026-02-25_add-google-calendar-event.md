---
title: 2026-02-25_edit-markdown-efficiency
published: 2026-02-25
description: ''
image: ''
tags: ['markdown']
category: 'スクラップ'
draft: false 
lang: ''
---

## 概要

GoogleCalendarイベントをリンクから作成する方法についてまとめます。

## 作成方法参考

- <https://github.com/InteractionDesignFoundation/add-event-to-calendar-docs/blob/main/services/google.md>

## パラメータ解説

- ドメイン / いづれかを利用
  - <https://calendar.google.com/calendar/render>
  - <https://calendar.google.com/calendar/r/eventedit>
    - こっちはactionパラメータが不要

```txt
# TEMPLATE のみしか指定できない
action=TEMPLATE

# タイトル
text=hogeTitle 

# 日付
dates=20201231T193000Z/20201231T223000Z

# タイムゾーン
ctz=America/New_York

# 詳細
details=With clowns and stuff

# 場所
location=North Pole

# 他、パラメータは割愛

```

## サンプルURL

- <https://calendar.google.com/calendar/u/0/r/eventedit?text=Birthday&dates=20201231T193000Z/20201231T223000Z&details=With+clowns+and+stuff&location=North+Pole>

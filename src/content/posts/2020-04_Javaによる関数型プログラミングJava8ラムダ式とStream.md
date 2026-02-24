---
title: Javaによる関数型プログラミングJava8ラムダ式とStream
published: 2020-04-01
category: 書籍
tags: []
draft: false
---


# Javaによる関数型プログラミングJava8ラムダ式とStream

- 著者：vankat subramaniam
- 訳：株式会社プログラミングシステム社
- 2014年10月 発行
- オライリー本

## まえがき

## はじめに

### 対象者

- Java5経験者
- 他の言語で関数型プログラミングを行っていて、Javaで実施したい人
- すでにラムダ式に詳しい人は、チームメンバーのトレーニングに使用できる

### 本書の内容

- 最初から最後まで通して読むことをおすすめする（前の章で紹介した内容を後ろの章で使ってる）

### 使用するJavaのバージョン

- `Java8`が必要

### サンプルコードの読み方

- サンプル
  - <https://pragprog.com/titles/vsjava8/source_code>

### オンラインリソース

- サンプルコード
  - <https://pragprog.com/book/vsjava8/functional-programming-in-java>

## 1章　Hello、ラムダ式

### 1.1 考え方を変える

- ラムダ式の紹介

### 1.2 関数型のコードによる大きな利益

### 1.3 なぜ関数型で記述するのか

### 1.4 革命ではなく、進化

### 1.5 簡単にするためのほんの少しの砂糖

### 1.6 まとめ

- 第一章はラムダ式の紹介をしていたので流し読み

## 2章　コレクションの使用

### 2.1 リストをイテレート

- 今までの書き方から徐々にエレガントに進化させていく

```java
// 自殺点パターンと呼ぶ
    for(int i = 0; i < friends.size(); i++) {
      System.out.println(friends.get(i));
    }
// 冗長でエラーが発生しやすいから
// <i だったかな？ <=i だったかな？と悩む

// 上記よりは儀式が少なくなっている
// 特定のインデックスに対する操作がなければ、上記より優れているパターン
    for(String name : friends) {
      System.out.println(name);
    }

// これら両方とも命令形のコードであり、モダンなJavaでは捨て去ることができる
```

- 関数型へ移行を進める理由
  - forループは本質的にシーケンシャルであり、並列化が極めて難しい
  - このようなループはポリモーフィックではなく、命令した通りのことを実行される。コレクションに対して（ポリモーフィックな処理を行う）メソッドを呼び出すのではなく、forループに渡している
  - 設計レベルで、コードは「伝えろ、聞くな」という原則を破っている。forループではイテレーションの詳細をライブラリに任せるのではなく、特定のイテレーション処理を実行するよう要求している

- Tell, Don't Ask <https://www.jabba.cloud/20150912232135/>

```java
    System.out.println("//" + "START:INTERNAL_OUTPUT");
    friends.forEach((final String name) -> System.out.println(name));
    System.out.println("//" + "END:INTERNAL_OUTPUT");

    friends.forEach((name) -> System.out.println(name));

    // 型推論されたパラメータはfinalが保証されなくなる
    // 引数を変更しない習慣を開発者自身が身につける必要がある
    friends.forEach(name -> System.out.println(name));

    friends.forEach(System.out::println);
```

### 2.2 リストの変換

#### 2.2.1 ラムダ式を使う

- map()メソッドについて：連続した入力を連続した出力に変換します

```java
// こうじゃなくて
    final List<String> uppercaseNames = new ArrayList<String>();
    friends.forEach(name -> uppercaseNames.add(name.toUpperCase()));
    System.out.println(uppercaseNames);

// こう書く
    friends.stream()
           .map(name -> name.toUpperCase())
           .forEach(name -> System.out.print(name + " "));

```

#### 2.2.2 メソッド参照を使用

```java
    friends.stream()
           .map(String::toUpperCase)
           .forEach(name -> System.out.println(name));
```

- メソッド参照の使い所
  - ラムダ式が非常に短い場合や、ラムダ式がインスタンスメソッドやstaticメソッドをシンプルで直接的に呼び出している場合における優れた代替手段
  - 映画「Offiece Space」のTom Smykowskiのようなもの...　著者が例えている
  - →個人的に「Offiece-spaceパターン」とよんでいる

### 2.3 要素の検索

- fileter()
  - コレクションから要素を抜き出すために用いる
  - map()メソッドと同様にイテレーターを返すが、同じ要素数返すとは限らない

```java
{
    final List<String> startsWithN = new ArrayList<String>();
    for(String name : friends) {
      if(name.startsWith("N")) {
        startsWithN.add(name);
      }
    }
    System.out.println(String.format("Found %d names", startsWithN.size()));
}
{
    final List<String> startsWithN =
      friends.stream()
             .filter(name -> name.startsWith("N"))
             .collect(Collectors.toList());
    System.out.println(String.format("Found %d names", startsWithN.size()));
}

```

### 2.4 ラムダ式の再利用

- ラムダ式を定義しておいて重複をなくそうという説明

```java
    final Predicate<String> startsWithN = name -> name.startsWith("N");

    final long countFriendsStartN =
      friends.stream()
             .filter(startsWithN)
             .count();
    final long countEditorsStartN =
      editors.stream()
             .filter(startsWithN)
             .count();
    final long countComradesStartN =
      comrades.stream()
              .filter(startsWithN)
              .count();
```

- DRYの原則

### 2.5 静的スコープとクロージャ

- ラムダ式内は実質的にfinalな変数しか使えない

- `Predicate<T>`は`T`型を引数に取り、関数が行う検査の結果として`boolean`を返却。候補値の取捨選択を行う際に利用できる。
- `Function<T,R>`は`T`型の引数を取り、`R`型の結果を返す関数。常に`boolean`を返却する`Predicate<T>`より汎用的。

- `Optional`クラスは、結果が存在しない可能性がある場合に便利

```java
    final Function<String, Predicate<String>> startsWithLetter =
      letter -> name -> name.startsWith(letter);

    final long countFriendsStartN =
      friends.stream()
             .filter(startsWithLetter.apply("N")).count();
    final long countFriendsStartB =
      friends.stream()
             .filter(startsWithLetter.apply("B")).count();

```

- MEMO: Functionで囲うメリットがいまいち理解できていない（2020-04-26 14:52:51）

### 2.6 要素を 1つ選択

- Null初期化は、Nullであることを確認する作業が必要になって来る
  - これを忘れるとNullpointerExcepiton

```java
// エレガントな例
  public static void pickName(
    final List<String> names, final String startingLetter) {
    final Optional<String> foundName = 
      names.stream()
           .filter(name ->name.startsWith(startingLetter))
           .findFirst();
    System.out.println(String.format("A name starting with %s: %s",
      startingLetter, foundName.orElse("No name found")));
  }
```

- OptionalはNull脱臭剤

### 2.7 コレクションを単一の値に集約（reduce）

- 本節では、要素の比較や計算状態をコレクションに渡って持ち越して使用する方法を学ぶ

```java
System.out.println("//" + "START:SUM_OUTPUT");
      System.out.println("Total number of characters in all names: " +
        friends.stream()
               .mapToInt(name -> name.length())
               .sum());
    }
System.out.println("//" + "END:SUM_OUTPUT");

System.out.println("//" + "END:AVERAGE_OUTPUT");
System.out.println("//" + "START:REDUCE_OUTPUT");
    final Optional<String> aLongName =
      friends.stream()
             .reduce((name1, name2) ->
                name1.length() >= name2.length() ? name1 : name2);
    aLongName.ifPresent(name ->
      System.out.println(String.format("A longest name: %s", name)));
System.out.println("//" + "END:REDUCE_OUTPUT");

    final String steveOrLonger =
      friends.stream()
             .reduce("Steve", (name1, name2) ->
                name1.length() >= name2.length() ? name1 : name2);

    System.out.println(steveOrLonger);
```

### 2.8 要素の結合

- StringJoinerの説明

```java
System.out.println("//" + "START:MAP_JOIN_OUTPUT");
    System.out.println(
      friends.stream()
             .map(String::toUpperCase)
             .collect(joining(", ")));
System.out.println("//" + "END:MAP_JOIN_OUTPUT");
```

### 2.9 まとめ

- コレクションはプログラムにおいてはありふれたもので、
- ラムダ式によりJavaにおけるコレクションの利用は従来よりも遥かに簡単で単純になりました
- 記述するコード量が減少し、保守性が高くなる

## 3章　文字列、コンパレータ、フィルタ

- ラムダ式とメソッド参照を使用してSringをいてレートし、Comparatorを実装し、ディレクトリのファイルリストを取得し、
- そしてファイルやディレクトリを監視します

### 3.1 文字列のイテレーション

```java
    System.out.println("//" + "START:ITERATE_OUTPUT");

    final String str = "w00t";

    str.chars()
       .forEach(ch -> System.out.println(ch));
    System.out.println("//" + "END:ITERATE_OUTPUT");

    str.chars()
       .forEach(System.out::println);

    System.out.println("//" + "START:FIX_OUTPUT");
    str.chars()
       .forEach(IterateString::printChar);
    System.out.println("//" + "END:FIX_OUTPUT");

        str.chars()
           .mapToObj(ch -> Character.valueOf((char)ch))
           .forEach(System.out::println);

    System.out.println("//" + "START:FILTER_OUTPUT");
    str.chars()
       .filter(ch -> Character.isDigit(ch))
       .forEach(ch -> printChar(ch));
    System.out.println("");
    System.out.println("//" + "END:FILTER_OUTPUT");

    str.chars()
       .filter(ch -> Character.isDigit(ch));

    str.chars()
       .filter(Character::isDigit);

    str.chars()
       .filter(Character::isDigit)
       .forEach(IterateString::printChar);
```

- インスタンスメソッドのメソッド参照（String::toUppercase）と、staticメソッドのメソッド参照（Character::isDigit）は構造的に同じように見えるが異なる
- インスタンスメソッド： `引数.toUppercase();`
- staticメソッド： `Character.isDigit(引数);`

- インスタンスメソッドとstaticメソッドの定義が衝突すると、
- どちらを使用していいかコンパイラが判断できなくなりコンパイルエラーとなる
  - →この場合はラムダ式を使う！
  - ラムダ式とメソッド参照を自由自在に切り替えられるようになる

### 3.2 Comparatorインタフェースを実装

- `List`の`sort()メソッド`だと戻り値が`void`なので、リスト本体が変更されてしまう
- コピーを取得した上で、変更する必要があったが、面倒
- 代わりにStreamの力を借りて処理する方法を考える

```java
people.sorted((person1,person2) -> person1.ageDifference(person2)).collect(toList());
// ↓改善
people.stream().sorted(Person::ageDifference).collect(toList());
```

- 逆順にしたい場合

```java

people.stream().sorted((person1, person2) -> person2.ageDifference(person1)).collect(toList());
// パラメータの順番が引数受け渡しの規約に従っていないため、メソッド参照を使うようにリファクタリングすることはできません。

```

- 事前に`Comparator`を定義しておいて、使用することで簡潔に記載できる

```java
  
  public static void main(String[] args) {
    final List<Person> people = Arrays.asList(
      new Person("John", 20),
      new Person("Sara", 21),
      new Person("Jane", 21),
      new Person("Greg", 35));

{  
    System.out.println("//" + "START:AGE_ASCEND_OUTPUT");
    List<Person> ascendingAge = 
      people.stream()
            .sorted((person1, person2) -> person1.ageDifference(person2))
            .collect(toList());
    printPeople("Sorted in ascending order by age: ", ascendingAge);
    System.out.println("//" + "END:AGE_ASCEND_OUTPUT");
}

{  
  // メソッド参照（Method Reference）
    System.out.println("//" + "START:AGE_ASCEND_MR_OUTPUT");
    List<Person> ascendingAge = 
      people.stream()
            .sorted(Person::ageDifference)
            .collect(toList());

    printPeople("Sorted in ascending order by age: ", ascendingAge);
    System.out.println("//" + "END:AGE_ASCEND_MR_OUTPUT");
}

{
    System.out.println("//" + "START:AGE_DESCEND_OUTPUT");
    printPeople("Sorted in descending order by age: ",
      people.stream()
            .sorted((person1, person2) -> person2.ageDifference(person1))
            .collect(toList()));
    System.out.println("//" + "END:AGE_DESCEND_OUTPUT");

    System.out.println("//" + "START:REVERSE_ORDER_OUTPUT");
    Comparator<Person> compareAscending = 
      (person1, person2) -> person1.ageDifference(person2);
      // reversed()を使うことで降順の関数を事前に用意できる
    Comparator<Person> compareDescending = compareAscending.reversed();

    printPeople("Sorted in ascending order by age: ",
      people.stream()
            .sorted(compareAscending)
            .collect(toList())
    );
    printPeople("Sorted in descending order by age: ",
      people.stream()
            .sorted(compareDescending)
            .collect(toList())
    );
    System.out.println("//" + "END:REVERSE_ORDER_OUTPUT");

    // 名前の昇順に並び替え
    System.out.println("//" + "START:NAME_ASCEND_OUTPUT");
    printPeople("Sorted in ascending order by name: ",
      people.stream()
            .sorted((person1, person2) -> 
               person1.getName().compareTo(person2.getName()))
            .collect(toList()));
    System.out.println("//" + "END:NAME_ASCEND_OUTPUT");
}

{
    // min()メソッドはOptionalを返す！
    System.out.println("//" + "START:YOUNGEST_OUTPUT");
    people.stream()
          .min(Person::ageDifference)
          .ifPresent(youngest -> System.out.println("Youngest: " + youngest));
System.out.println("//" + "END:YOUNGEST_OUTPUT");
}

{
    System.out.println("//" + "START:ELDEST_OUTPUT");
    people.stream()
          .max(Person::ageDifference)
          .ifPresent(eldest -> System.out.println("Eldest: " + eldest));
    System.out.println("//" + "END:ELDEST_OUTPUT");
}

```

### 3.3 複数のプロパティによる流暢な比較

```java

{
    // 名前のアルファベット順にするために以下の関数を用意した
    // 従来の内部クラス構文と比較すると非常に簡潔
    people.stream()
          .sorted((person1, person2) -> 
             person1.getName().compareTo(person2.getName()));

    printPeople("Sorted in ascending order by name: ",
    people.stream()
          .sorted(comparing((Person person) -> person.getName()))
          .collect(toList()));

    // Comparatorインターフェースのコンビニエンス関数を使用することで、より自由にコードの目的を表現できる
    // Comparaotrインターフェースのcomparing()メソッドを静的にインポートしました。comparing()メソッドは与えられた
    // ラムダ式のロジックを使用してComparatorを生成する！
    // つまり、関数（Function）を引数に取り、関数（Comparator）を返す高階関数
    final Function<Person, String> byName = person -> person.getName();
    people.stream()
          .sorted(comparing(byName));
}

{
    System.out.println("//" + "START:SORT_NAME_AND_AGE_OUTPUT");
    
    final Function<Person, Integer> byAge = person -> person.getAge();
    final Function<Person, String> byTheirName = person -> person.getName();
    
    printPeople("Sorted in ascending order by age and name: ",
      people.stream()
            .sorted(comparing(byAge).thenComparing(byTheirName))
            .collect(toList()));
    System.out.println("//" + "END:SORT_NAME_AND_AGE_OUTPUT");
}
```

- このように、Comparatorの実装をラムダ式やJDKの新たなユーティリティクラスを使用して簡単に合成できる
  - MEMO: 少し納得してないので再度確認

### 3.4 collectメソッドとCollectorsクラスの使用

- これまでに、Streamの要素をArrayListに変換する例でcollect()メソッドを数回使用している
  - このメソッドは、あるコレクションを可変コレクションなど他のデータ型へ変換する際に便利な集約処理を行います
  - collect()関数はCollectorsクラスのユーティリティメソッドと組み合わせるととても便利

```java
// 20歳以上の人を抽出してリストを取得する
{  
    // 従来の書き方
    System.out.println("//" + "START:MUTABLE_OUTPUT");
    List<Person> olderThan20 = new ArrayList<>();
      people.stream()
            .filter(person -> person.getAge() > 20)
            .forEach(person -> olderThan20.add(person));
    System.out.println("People older than 20: " + olderThan20);
    System.out.println("//" + "END:MUTABLE_OUTPUT");
    // 問題点：
    // ターゲットとするコレクションに要素を１つずつ追加する保s理はとても低レベルなもので、宣言型ではなく命令形のコード
    // 並列に実行させる場合にはスレッドセーフ問題を適切に処理しなければならない
    // 可変性を持つコードを並列化するのは難しいものです。
}

// この問題はcollect()を使うことで緩和できる
// collect()メソッドの以下の３つについて知っておく
// サプライヤ　　：結果を収めるコンテナの精製方法（例えば、ArrayList::new）
// アキュムレータ：結果コンテナに単一の要素を追加する方法（例えばArrayList::add）
// コンバイナ　　：結果コンテナを他のコンテナと結合する方法（例えばArrayList::addAll）

{  
    // 便利な書き方！
    System.out.println("//" + "START:COLLECT_OUTPUT");
    List<Person> olderThan20 = 
      people.stream()
            .filter(person -> person.getAge() > 20)
            .collect(ArrayList::new, ArrayList::add, ArrayList::addAll);
    System.out.println("People older than 20: " + olderThan20);
    System.out.println("//" + "END:COLLECT_OUTPUT");
}
// メリット：
// より明確で意図を持ったプログラミングを行っている→ArrayListに処理結果を集めることがこのコードの目的
// コード内で状態変更を行っていないため、イテレーションを簡単に並列化できる

```

- 次は基本の`collect()`メソッドよりも簡潔で便利な、オーバーロードされたcollect()メソッドを見ていく
- このメソッドはCollectorを引数に取ります
- Collectorはcollect()メソッドに設定された３つの異なるパラメータをカプセル化した、より簡単で再利用可能なインターフェース
- 様々なCollectorの実装を提供するCollectorsクラスにtoList()というコンビニエンスメソッドがある
- このメソッドはArrayListに要素を蓄積するメソッドで、Collectorインターフェースの実装

```java
{  
    System.out.println("//" + "START:COLLECT_TO_LIST_OUTPUT");
    List<Person> olderThan20 = 
      people.stream()
            .filter(person -> person.getAge() > 20)
            .collect(Collectors.toList());
    System.out.println("People older than 20: " + olderThan20);
    System.out.println("//" + "END:COLLECT_TO_LIST_OUTPUT");
}
```

- 他にも色々集計できるよっていう説明!
  - <https://docs.oracle.com/javase/jp/8/docs/api/java/util/stream/Collectors.html>

```java

{  
    System.out.println("//" + "START:GROUP_BY_OUTPUT");
    Map<Integer, List<Person>> peopleByAge = 
      people.stream()
            .collect(Collectors.groupingBy(Person::getAge));
    System.out.println("Grouped by age: " + peopleByAge);
    System.out.println("//" + "END:GROUP_BY_OUTPUT");
}

{  
    System.out.println("//" + "START:GROUP_BY_AGE_NAME_OUTPUT");
    Map<Integer, List<String>> nameOfPeopleByAge = 
      people.stream()
            .collect(
              groupingBy(Person::getAge, mapping(Person::getName, toList())));
    System.out.println("People grouped by age: " + nameOfPeopleByAge);
    System.out.println("//" + "END:GROUP_BY_AGE_NAME_OUTPUT");
}

{  
    System.out.println("//" + "START:OLDEST_IN_EACH_LETTER_OUTPUT");
    Comparator<Person> byAge = Comparator.comparing(Person::getAge);
    Map<Character, Optional<Person>> oldestPersonOfEachLetter = 
      people.stream()
            .collect(groupingBy(person -> person.getName().charAt(0),
               reducing(BinaryOperator.maxBy(byAge))));
    System.out.println("Oldest person of each letter:");
    System.out.println(oldestPersonOfEachLetter);
    System.out.println("//" + "END:OLDEST_IN_EACH_LETTER_OUTPUT");
}
```

- MEMO: 集計関数を実際に色々使ってみる！！

### 3.5 ディレクトリの全ファイルをリスト

- `File`クラスの`list()`メソッドを使うと、ディレクトリにある全ファイル名を簡単にリスト化できる
- ファイル名だけでなくすべてのファイルを取得する場合は`listFiles()`メソッドが使える

- ファイルを取得したあとの処理が大変
- ここでは、従来のくどい外部イテレータを使用するのではなく、エレガントな関数型スタイルの機能を使ってリストをイテレートしていく

```java
  // 以下の２つとも古いjavaより格段にシンプル
  Files.list(Paths.get("."))
       .forEach(System.out::println);
  }
  Files.list(Paths.get("."))
       .filter(Files::isDirectory) // filterはPredicateを期待する
       .forEach(System.out::println);
  }

```

### 3.6 ディレクトリの特定のファイルだけをリスト

- 特定のファイル名取得のためにオーバーロードされたFileクラスのlist()メソッドを提供してきました
- このlist()メソッドはFilenameFilterインターフェースを引数に取ります

```java
  final String[] files =
    new File("fpij").list(new java.io.FilenameFilter() {
      public boolean accept(final File dir, final String name) {
        return name.endsWith(".java");
      }
    });
```

- これをラムダ式に置き換える！

```java
    Files.newDirectoryStream(
         Paths.get("fpij"), path -> path.toString().endsWith(".java"))
     .forEach(System.out::println);
  }
```

### 3.7 flatMapで直下のサブディレクトリをリスト

- 与えられたディレクトリ直下のサブディレクトリを探索する方法を解説する
- 最初に原始的な方法を説明し、次により便利なflatMap()メソッド（Streamクラス）を使用する

```java
  public static void listTheHardWay() {
    List<File> files = new ArrayList<>();

    File[] filesInCurrentDir = new File(".").listFiles();
    for(File file : filesInCurrentDir) {
      File[] filesInSubDir = file.listFiles();
      if(filesInSubDir != null) {
        files.addAll(Arrays.asList(filesInSubDir));
      } else {
        files.add(file);
      }
    }

    System.out.println("Count: " + files.size());
  }

  public static void betterWay() {
    List<File> files =
      Stream.of(new File(".").listFiles())
            .flatMap(file -> file.listFiles() == null ? 
                Stream.of(file) : Stream.of(file.listFiles()))
            .collect(toList());
    System.out.println("Count: " + files.size());
  }

```

- MEMO: モナド合成という言葉が出てきたが、いまいち意味がわからない

### 3.8 ファイルの変更を監視

- ファイルが生成・変更・削除される際のアラートも簡単に実現できる
- Java7で追加されたWatchServiceの機能を紹介

```java
  public static void main(String[] args) throws Exception {
    new Thread(() -> watchFileChange()).start();
    final File file = new File("sample.txt");
    file.createNewFile();
    Thread.sleep(5000);
    file.setLastModified(System.currentTimeMillis());
  }
  
  public static void watchFileChange() {
    try {
      final Path path = Paths.get(".");
      final WatchService watchService = 
        path.getFileSystem()
            .newWatchService();
        
      path.register(watchService, StandardWatchEventKinds.ENTRY_MODIFY);
      
      System.out.println("Report any file changed within next 1 minute...");

      final WatchKey watchKey = watchService.poll(1, TimeUnit.MINUTES);
      
      if(watchKey != null) {
        watchKey.pollEvents()
                .stream()
                .forEach(event ->
                   System.out.println(event.context()));
      }
    } catch(InterruptedException | IOException ex) {
      System.out.println(ex);
    }
  }
```

### 3.9 まとめ

- 文字列操作やファイル処理、カスタムコンパレータの生成などの定型タスクはラムダ式とメソッド参照によって非常に楽に、簡潔になりました。

## 4章　ラムダ式で設計する

- 本章では、ラムダ式が巧妙なデザインアイデアに生命を与える
- これまではオブジェクトを使用していた箇所を軽量関数で代用できる

### 4.1 ラムダ式を使った関心の分離

- コードの再利用のためにクラスを生成することは良い心がけですが、それが常に正しいとは限らない
- クラスの代わりに高階関数を使うことで、クラス階層を必要とせずに同じことが達成できる

#### 4.1.1 デザイン問題の探求

```java
// JavaBean
public class Asset {
  public enum AssetType { BOND, STOCK }; 
  private final AssetType type;
  private final int value;
  public Asset(final AssetType assetType, final int assetValue) {
    type = assetType;
    value = assetValue;
  }
  public AssetType getType() { return type; }
  public int getValue() { return value; }
}
// Utilクラス
  public static int totalAssetValues(final List<Asset> assets) {
    return assets.stream()
                 .mapToInt(Asset::getValue)
                 .sum();
  }
```

- ラムダ式を使って、totalAssetValues()メソッドを書き、流暢なイテレータと好むべき不変性を使いました
- しかし今はメソッド自身の設計に目を向けましょう
- このメソッドでは
  - どのようにイテレーションを行うか
  - 何を合計するか
  - どのように合計するか
    - といった３つの問題が絡み合っている

#### 4.1.2 問題でがんじがらめ

- 資産のうち、債券（bond）だけを合計したい場合を考える

```java
  public static int totalBondValues(final List<Asset> assets) {
    return assets.stream()
                 .mapToInt(asset -> 
                    asset.getType() == AssetType.BOND ? asset.getValue() : 0)
                 .sum();
  }

  public static int totalStockValues(final List<Asset> assets) {
    return assets.stream()
                 .mapToInt(asset -> 
                    asset.getType() == AssetType.STOCK ? asset.getValue() : 0)
                 .sum();
  }
```

- こんなふうにコピペで増やしていって良いでしょうか？
- DRYの原則に従ってもう少しましな設計をしましょう

#### 4.1.3 主要な関心の分離

- イテレーションと合計を求める方法は同じですが、「何を」合計するかが異なります
- この「何を合計するか」部分はメソッドから切り離す良い候補

```java
  public static int totalAssetValues(final List<Asset> assets,
    final Predicate<Asset> assetSelector) {
    return assets.stream()
                 .filter(assetSelector)
                 .mapToInt(Asset::getValue)
                 .sum();
  }
  
  public static void main(final String[] args) {
    List<Asset> assets = Arrays.asList(
      new Asset(Asset.AssetType.BOND, 1000),
      new Asset(Asset.AssetType.BOND, 2000),
      new Asset(Asset.AssetType.STOCK, 3000),
      new Asset(Asset.AssetType.STOCK, 4000)
    );

    System.out.println("Total of all assets: " + 
      totalAssetValues(assets, asset -> true));

    System.out.println("Total of bonds: " + 
      totalAssetValues(assets, asset -> asset.getType() == AssetType.BOND));

    System.out.println("Total of stocks: " + 
      totalAssetValues(assets, asset -> asset.getType() == AssetType.STOCK));
  }
```

- 個々まではメソッドレベルでの関心の分離を行いましたが、次はクラスレベルで応用します

### 4.2 ラムダ式を使った委譲

### 4.3 ラムダ式を使ったデコレーション

- Cameraクラスのフィルター設定

### 4.4 defaultメソッドを覗く

- interfaceがdefaultメソッドを持てる
- 実装の衝突を防ぐためにルールが存在する

- 実際にinterfaceにdefaultメソッドが記述できるメリットがあまり浮かばないような気がする

### 4.5 ラムダ式を使った流暢なインタフェース

- MEMO: ここは参考になる実装だと感じた
  - 用途例：メーラの設定、データベース設定パラメータの設定、インスタンスの連続した状態を管理下におきつつ構築する必要のある場合
  - ローンパターンと言うらしい

```java
  private FluentMailer() {}
  
  public FluentMailer from(final String address) { /*... */; return this; }
  public FluentMailer to(final String address)   { /*... */; return this; }
  public FluentMailer subject(final String line) { /*... */; return this; }
  public FluentMailer body(final String message) { /*... */; return this; }
  
  public static void send(final Consumer<FluentMailer> block) {
    final FluentMailer mailer = new FluentMailer();
    block.accept(mailer);
    System.out.println("sending...");
  }

  //...
  public static void main(final String[] args) {
    FluentMailer.send(mailer ->
      mailer.from("build@agiledeveloper.com")
            .to("venkats@agiledeveloper.com")
            .subject("build notification")
            .body("...much better..."));
  }
```

### 4.6 例外処理

- ラムダ式の例外処理について
  - MEMO: 再読する必要あり

### 4.7 まとめ

## 5章　外部リソースを扱う

- Java仮想マシン（JVM）は、自動的にガベージコレクション（GC）を行っているものだと信じているかもしれません。
- 内部リソースだけを扱っている場合はJVMにGCを任せられることは事実
- しかし、
  - データベース接続
  - ファイルやソケット
  - ネイティブリソースといった外部リソースを使用する場合は
    - GCは開発者の責任範囲

- 本章では、ラムダ式を使って、`execute around method(EAM)`を実装します。
- 連続操作をより効率的に制御できます。そしてこのパターンを使ってロック管理と書き込み例外テストを行います

### 5.1 リソースの解放

- finalize()なんて使ったらGCされずに貯まるでしょ？
- close()メソッドで閉じる？→閉じ忘れたらどうするの？→エラー発生したらclose()呼ばれないままになるよね？
- try-with-resources構文使う？Java7から追加された便利な構文だけど、開発者が下記忘れたら元も子もない、AutoClosableの実装もしておかないと行けないでしょ？
  - →ラムダ式で解決しましょう！という説明

### 5.2 ラムダ式でリソース解放

- ラムダ式で設計して、開発者にこれを使うように共有すれば問題なし

```java

public class FileWriterEAM  {
  private final FileWriter writer;
  
  private FileWriterEAM(final String fileName) throws IOException {
    writer = new FileWriter(fileName);
  }
  private void close() throws IOException {
    System.out.println("close called automatically...");
    writer.close();
  }
  public void writeStuff(final String message) throws IOException {
    writer.write(message);
  }
  //...

  public static void use(final String fileName,
    final UseInstance<FileWriterEAM, IOException> block) throws IOException {

    final FileWriterEAM writerEAM = new FileWriterEAM(fileName);
    try {
      block.accept(writerEAM);
    } finally {
      writerEAM.close();
    }
  }

  public static void main(final String[] args) throws IOException {
  
    System.out.println("//" + "START:EAM_USE_OUTPUT");
    FileWriterEAM.use("eam.txt", writerEAM -> writerEAM.writeStuff("sweet"));
    System.out.println("//" + "END:EAM_USE_OUTPUT");

    FileWriterEAM.use("eam2.txt", writerEAM -> {
        writerEAM.writeStuff("how");
        writerEAM.writeStuff("sweet");
      });

  }

}

// interface
// @FunctionalInterfaceは関数型インターフェースであることの宣言
// 例外を考慮する必要がなければ、Consumerインターフェースを使えばよかったが、ラムダ式は、合成されるabstratメソッドのシグネチャの一部として定義されたチェック例外を投げることができるため実装
@FunctionalInterface
public interface UseInstance<T, X extends Throwable> {
  void accept(T instance) throws X;
}

```

- MEMO: `execute around method`パターンの構造らしい
  - この仕組はファイル読み込みを行う際に見習うべき
  - そもそも標準のjavaでファイル読み込み時に自動的に開放するような書き方ができないか確認すべき
  - 実際には読み込みファイルと書き込みファイル両方を開いて処理を行う場合が多いのでは？
    - そのような場合どうやって書いていく？
  - Transactionという形でUTIL作成して、複数ファイルをオープンして操作していけば行ける？

### 5.3 ロックの管理

- コンカレントなJavaアプリケーションにおいてロックは重要な役割を果たす
- ここでは、ラムダ式を使って細かなロックの制御を行い、重要なセクションの適切なロックの単体テストの可能性を開く

```java
public class Locker {
  public static void runLocked(Lock lock, Runnable block) {
    lock.lock();

    try {
      block.run();
    } finally {
      lock.unlock();
    }
  }
}

```

- MEMO: Lockの使い方確認 このロジックレベルでロックする使い所がいまいちピンとこない
  - 使い所があれば、synchronizedを使用するより、こちらの方が単体テストもしやすいメリットがあるみたい

### 5.4 簡潔な例外テストの生成

- Junitフレームワークなどでアノテーションを使用した、例外テストを実施する場合は、
- ラムダ式で書き換えた方が良いという例

```java
public class RodCutter {
  private boolean mustFail;
  
  public RodCutter(final boolean fail) { mustFail = fail; }

  public void setPrices(final List<Integer> prices) {
    //...
    if(mustFail) 
      throw new RodCutterException();
  }

  public int maxProfit(final int length) {
    if (length == 0) throw new RodCutterException();
    
    return 0;
  }
}


public class RodCutterTest {
  private RodCutter rodCutter;
  private List<Integer> prices;
  
  protected RodCutter createCutter() {
    return new RodCutter(false);
  }
  
  @Before public void initialize() {
    rodCutter = createCutter();
    prices = Arrays.asList(1, 1, 2, 2, 3, 4, 5);
  }

  @Test public void VerboseExceptionTest() {
    rodCutter.setPrices(prices);
    try {
      rodCutter.maxProfit(0);
      fail("Expected exception for zero length");
    } catch(RodCutterException ex) {
      assertTrue("expected", true);
    }
  }

  @Test(expected = RodCutterException.class) 
  public void TerseExceptionTest() {
    rodCutter.setPrices(prices);
    rodCutter.maxProfit(0);
  }

  // Lamda式を利用したテスト方法
  @Test 
  public void ConciseExceptionTest() {
    rodCutter.setPrices(prices);
    assertThrows(RodCutterException.class, () -> rodCutter.maxProfit(0));
  }
  
  public static void main(String[] args) {
    junit.textui.TestRunner.run(new JUnit4TestAdapter(RodCutterTest.class));
  }
}


// HELPERの実装
public class TestHelper {
  public static <X extends Throwable> Throwable assertThrows(
    final Class<X> exceptionClass, final Runnable block) {

    try {
      block.run();
    } catch(Throwable ex) {
      if(exceptionClass.isInstance(ex))
        return ex;
    }
    fail("Failed to throw expected exception ");
    return null;
  }
}
```

- MEMO: 現在のフレームワークでラムダ式を利用したメソッドが提供されていないかどうか確認する

### 5.5 まとめ

- アプリケーションが外部リソースを使用する場合、全面的に自動ガベージコレクションに頼ることはできません。
- `execute around method`パターンは実行フローのきめ細かい制御や外部リソースの開放に役立つ
  - オブジェクト生存期間の制御
  - ロック管理
  - 簡潔な例外テストの記述

## 6章　「遅延させる」ということ

### 6.1 初期化の遅延

- オブジェクト内部に重いリソースが存在する場合、その生成を後回しにできれば有益
- オブジェクトの一部の生成をアトマwしにするという設計上の決断は、オブジェクトを使う開発者にとって重荷になるべきではなく、シームレスであるべき

```java
public class Holder {
  private Supplier<Heavy> heavy = () -> createAndCacheHeavy();
  
  public Holder() {
    System.out.println("Holder created");
  }

  public Heavy getHeavy() {
    return heavy.get();
  }
  //...

  private synchronized Heavy createAndCacheHeavy() {
    class HeavyFactory implements Supplier<Heavy> {
      private final Heavy heavyInstance = new Heavy();

      public Heavy get() { return heavyInstance; }
    }

    if(!HeavyFactory.class.isInstance(heavy)) {
      heavy = new HeavyFactory();
    }

    return heavy.get();
  }

  public static void main(final String[] args) {
    final Holder holder = new Holder();
    System.out.println("deferring heavy creation...");
    System.out.println(holder.getHeavy());
    System.out.println(holder.getHeavy());
  }
}

```

- virtual poroxyパターン
- オブジェクトの生成に１レベル挟む
  次はラムダ式で実現する

### 6.2 遅延評価

- 短絡評価： `fn1() || fn2()`
- メソッドの引数の場合は渡されたものすべてが評価される
  - すべての引数を使用しない場合はその評価に費やした時間とリソースが無駄になる
  - ここでもラムダ式を使って任意の引数の評価を遅らせることができる

- メソッド実行時にある引数が使用されない可能性があることがわかっていれば、いくつかの引数、またはすべての引数を遅延実行するようにメソッドのインターフェースを変更できる

```java

public class Evaluation {
  public static boolean evaluate(final int value) {
    System.out.println("evaluating ..." + value);
    simulateTimeConsumingOp(2000);
    return value > 100;
  }
  //...

  public static void simulateTimeConsumingOp(final int millseconds) {
    try { 
      Thread.sleep(2000); 
    } catch(Exception ex) { throw new RuntimeException(ex); }
  }

  public static void eagerEvaluator(
    final boolean input1, final boolean input2) {
    System.out.println("eagerEvaluator called...");
    System.out.println("accept?: " + (input1 && input2));
  }

  /**
  * 遅延評価のためのメソッド
  * ラムダ式を引数に取り、実行自体はこのメソッドの中で行う
  */
  public static void lazyEvaluator(
    final Supplier<Boolean> input1, final Supplier<Boolean> input2) {
    System.out.println("lazyEvaluator called...");
    System.out.println("accept?: " + (input1.get() && input2.get()));
  }
  
  public static void main(final String[] args) {

    System.out.println("//" + "START:EAGER_OUTPUT");
    eagerEvaluator(evaluate(1), evaluate(2));
    System.out.println("//" + "END:EAGER_OUTPUT");

    // ４秒かかっていた処理が２秒でfalseを返却するようになる
    System.out.println("//" + "START:LAZY_OUTPUT");
    lazyEvaluator(() -> evaluate(1), () -> evaluate(2));
    System.out.println("//" + "END:LAZY_OUTPUT");
  }
}

```

- デメリット
  - ラムダ式をわざわざ書かないと行けないので面倒（場合によってはメソッド参照を利用できる）
  - コード量は多くなる

- MEMO: フレームワークで遅延処理を行うためにはどのようにするべきか

### 6.3 Streamの遅延処理を活用

- Streamの遅延評価について説明

#### 6.3.1 中間処理と終端処理

- Streamには２種類のメソッドがある
  - 中間処理
  - 終端処理

- Streamの遅さは複数の中間処理をチェーンし、最後に終端処理を行うことで実現している

```java
  List<String> names = Arrays.asList("Brad", "Kate", "Kim", "Jack", "Joe",
    "Mike", "Susan", "George", "Robert", "Julia", "Parker", "Benson");
  System.out.println("//" + "START:CHAIN_OUTPUT");
  {

  // ここの処理はコレクションの変換に多くの作業を費やしている働き者に見えますが、実は見かけによらず怠け者です。
  final String firstNameWith3Letters = 
    names.stream()
          .filter(name -> length(name) == 3)
          .map(name -> toUpper(name))
          .findFirst()
          .get();

  System.out.println(firstNameWith3Letters);
  }
  System.out.println("//" + "END:CHAIN_OUTPUT");
```

- 本当に必要な処理以外は実施していないらしい
- その詳細を次で！述べる

- 中間処理、終端処理まで考慮された上で、初めて処理が実行される
  - filter 12処理
    - map 2処理
      - findFirst 1処理
  - ではなく！
  - filter 3 処理！！
    - map 1処理
      - findFirst 1処理
  - という形で評価される

- JDKが裏で結合（fusing）処理を行うことで実現している
- データの通り道は１本ということ
- 要素の抽出、マッピング、選択が１度に行われる

### 6.4 無限の「遅い」コレクションを生成

- MEMO: スキップ

### 6.5 まとめ

## 7章　再帰の最適化

- 再帰は魅力的で強力な問題解決方法
- 再帰はとても表現力に富んでいます

- 大きな問題の再帰処理を可能とする末尾呼び出し最適化（tail-call optimization TCO）を説明

### 7.1 末尾呼び出し最適化を使う

- 再帰を使う上で最も高いハードルは、巨大な入力値によるスタックオーバーフローのリスク
- しかし、末尾呼び出し最適化（TCO）という優れたテクニックがこの心配のタネを取り除く
- 末尾呼び出しとは
  - 最後の処理が自身の呼び出しとなるような再帰呼び出しのことを言います

- JavaはTCOをコンパイラレベルで直接サポートしていませんが、ラムダ式を使って数行で実装できる
- このソリューションはトランポリンとも呼ばれrます。

```java
// 通常の実装
  public static int factorialRec(final int number) {
    if(number == 1)
      return number;
    else
      return number * factorialRec(number - 1); 
  }
  // 大きい数を渡すとStackOverflowErrorが発生
```

- この再帰関数は大きな入力値を扱えず、落ちてしまう
- 再帰が強力で表現力豊かであっても使えません。
- この問題は再帰そのものにあるわけではない
- 再帰の完了を待つ間、部分的な計算結果をすべて保存しているためです。
- スタックに積み上げずに再帰を行う方法が必要

#### 7.1.2 末尾再帰に変換する

- 遅延評価させるために
  - TailCall関数型インターフェース
  - TailCallsクラスを設計する

```java
  public static TailCall<Integer> factorialTailRec(
    final int factorial, final int number) {
    if (number == 1)
      return done(factorial);
    else
      return call(() -> factorialTailRec(factorial * number, number - 1));
  }

```

- MEMO: TCOについて理解できていない... 再帰処理設計が必要になったら読み返す

### 7.2 メモ化でスピードアップ

### 7.3 まとめ

## 8章　ラムダ式で合成

- Java8には、オブジェクト志向アプローチと関数型スタイルという２つの強力なツールがある
- 組み合わせて使っていこう！

- 本章では、
  - 関数合成を詳しく説明し、実践的なMapReduceパターンを例として実装
  - MapReduceパターンでは、独立した計算処理を分散し、それらの処理結果を集約して最終的な結果を計算します
  - 最後はJDKの力を借りて、この計算処理を簡単に並列化します。

### 8.1 関数合成の利用

- オブジェクト指向＋関数型スタイル複合アプローチでは、状態が変化するのではなく、軽量なオブジェクトが別のオブジェクトに変換される
- 可変性がないことで、エラー発生の可能性を減らし、並列実行家より簡単

- リストからStreamを作成し、オリジナルのリストは変更されず、新しくオブジェクトを生成するということが言いたいだけ

### 8.2 MapReduceの使用

- MapReduceパターンは２つの操作がある
  - コレクションの各要素で実行する操作
  - これらの実行結果を組み合わせて最終結果を導き出す
- このパターンでマルチコアプロセッサを有効活用可能であることから注目をされつつある

- `Tickers.symbols.parallelStream()`は裏側に隠れているスレッドプールで管理された複数のスレッドで、
- map()やfilter()のようなメソッドを並列処理します。

- stream()とparallelStream()のどちらを使用するかを決める際には、いくつかの問題を考えなければいけません
  - 本当にラムダ式を同時に実行したいのか？
  - 対象コードは副作用や競合状態が発生しない、独立した動作を行える？
  - 実行順序に影響を与えることはないか？

- map()やfilter()のように、計算を行って、その結果を次の処理に回すようなメソッドは並列化に向いている

- MEMO: 闇雲に並列化はしないほうがよい！！
- 並列ストリームを選択すべきか？
  - ライブラリは簡単に並列化を行ってくれるが、並列化が常に正しい選択であるとは限らない
  - データと、実行する計算内容によっては、並列計算はシーケンシャルな計算より遅くなることもあり得る
  - 並列化実行処理のためのコストもかかる
  - コレクションが小さいのであれば、シーケンシャル実行のほうが早くなるかも
  - 速度を計測して実装していくべき

### 8.3 並列化への飛躍

### 8.4 まとめ

## 9章　すべてをまとめて

- 本書を通してJava8のラムダ式を紹介しました
- コレクションのイテレーションを行い
- 軽量でよりよい設計を実現し、コードを簡単に合成、そして並列化しました。
- この最終章ではまとめとして、関数型スタイルのプログラミングを使って、最大の効果を上げるために
- 磨いておくべきことを説明し、関数型スタイルを採用して成功するための推奨事項を最後に取り上げる

### 9.1 関数型スタイルで成功するために実践すべきこと

新機能のメリットを十分に活かし、簡潔で軽量なアプリケーションを生成するには、設計、コーディング、そして考え方まで変えなければいけません。

これまでのJavaを使ってきた命令形や、オブジェクト指向のパラダイムとは違うもの

ここでは根本的に変えるべきアプリケーション開発手法や、その変更によって得られる利点について説明

#### 9.1.1 宣言的により近く、命令型からより遠く

- 価格リストを与えられていて、その中から最大値を選ぶようにと依頼されたとしたときに、
- 命令型のfor文で最大値を探すのではなく、ラムダ式を使ってstream経由で取得する

#### 9.1.2 普遍性の尊重

- 状態変更が可能な(mutable)変数はあまり上品とは言えません。
- そしてそのような変数の共有は単なる害悪
- 開発者は変数の状態変更によって混乱させられてしまい、時には変更を見逃してしまいます。
- したがって、変更可能な変数が多いほど、より多くのエラーが発生する可能性があるということ
- 正確な並列化が非常に難しくなるということもデメリット
- 関数型スタイルの導入がそれを簡単にしてくれる
- 純粋な関数型言語は値しか持っていません。つまり１回しか書き込みができない、初期化後は全く変更を受け付けない変数です。
- しかしJavaはそのような言語とはことなり、不変性(immutability)を強制しないため、不変性を尊重する責任は開発者にある

#### 9.1.3 副作用の削減

- 副作用を減らそう
- 所感：時間や状態などの外部要員によって関数の処理結果が異なることが無いように作成すること

#### 9.1.4 文より式を優先

- 文：アクションを実行するが何も返さない
- 式：アクションを実行して結果を返す

- 文は何も返さないため、目的を遂行するためには副作用を起こしメモリを書き換える必要がある
- 一方式は、参照透明性を保つように設計できるため、これまでに述べたメリットを得られる

- 式を使うメリット
  - 関数合成ができるということが挙げられる
  - チェーンでコードを記述することで、文章を読むように簡単にコードを読めるようになる

#### 9.1.5 高階関数を利用して設計

- これまでは匿名内部クラスを単一メソッドのインターフェースに渡していたような場所で、
- ラムダ式やメソッド参照を渡すことができる様になり、コードがより簡潔になります。

- メーラーを関数で設計することでローンパターンを適用する例
- Colorフィルターを関数で表現する例
- 関数を引数に渡してDRYな設計をしよう

### 9.2 パフォーマンスの問題

- 命令型のコードと比較してもパフォーマンスは劣らない
  - メリット
    - 直感的に見やすい
    - 並列化も容易

- 関数型を採用しましょう

- MEMO: 処理時間の違いはむやみに信頼できるものではないのでやめましょうと書かれている...

### 9.3 関数型スタイルを採用

- 実際に使ってみて、試して、より良い設計を考えていこう！

## 付録A 基本的な関数型インタフェース

- JDK8には様々な関数型インターフェースを持っている
- ここでは頻繁に出現する基本的なインターフェースをいくつか紹介

### A.1 Consumer<T>

- 入力を受け入れ、戻り値を返さない操作を表すインターフェース
- 有効活用するためには副作用を伴う必要がある

- 抽象メソッド
  - accept()
- defaultメソッド
  - andThen()
- 主な利用方法
  - forEach()メソッドの引数
- 特注なプリミティブ
  - IntConsumer, LongConsumer, DoubleConsumerなど

```java
package java8sample;

import java.util.function.Consumer;

public class Java8Sample {
    public static void main(String[] args) {
        Consumer<String> hoge = string -> System.out.println("hoge : " + string);
        Consumer<String> fuga = string -> System.out.println("fuga : " + string);

        Consumer<String> piyo = hoge.andThen(fuga);

        piyo.accept("piyo");
    }
}
```

### A.2 Supplier<T>

- 新しいインスタンス、またはあらかじめ生成しておいたインスタンスを返すファクトリ。

- 抽象メソッド
  - get()
- defaultメソッド
  - なし
- 主な利用方法
  - 遅延実行を行う無限Streamの生成
  - OptionalクラスのorElseGet()メソッドの引数
- 特殊なプリミティブ
  - IntSupplier, LongSupplier, DoubleSupplierなど

```java
package java8sample;

import java.util.function.Supplier;

public class Java8Sample {
    public static void main(String[] args) {
        Supplier<String> supplier = () -> "hoge";
        System.out.println(supplier.get());
    }
}
```

- 遅延初期化で少し出てきた程度

### A.3 Predicate<T>

- 入力値が何らかの条件に該当するかを確認するために有効。

- 抽象メソッド
  - test()
- defaultメソッド
  - and(), nagate(), or()
- 主な利用方法
  - Streamのfilter()やanyMatch()メソッドなどの引数
- 特殊なプリミティブ
  - IntPredicate, LongPredicate, DoublePredicateなど

- anyMatchはリストのStreamのうちどれか１つでも一致する条件であればtrueを返却する動きになるみたい
  - →終端操作
- filterは中間操作

### A.4 Function<T, R>

- 引数をとって適切な結果値を返す操作を表す変換インターフェース

- 抽象メソッド
  - apply()
- defaultメソッド
  - andThen(), compose()
- 主な利用方法
  - Streamのmap()メソッドの引数
- 特殊なプリミティブ
  - IntFunction、LongFunction, DoubleFunction, IntToDoubleFunction, DoubleToIntFunction

```java
package java8sample;

import java.util.function.Function;

public class Java8Sample {
    public static void main(String[] args) {
        Function<String, String> wrapDoubleQuotation = str -> "\"" + str + "\"";
        Function<String, String> wrapSingleQuotation = str -> "'" + str + "'";

        Function<String, String> wrapDoubleAndSingleQuotation = wrapDoubleQuotation.compose(wrapSingleQuotation);
        String result = wrapDoubleAndSingleQuotation.apply("hoge");

        System.out.println(result);
    }
}
```

## 付録B 構文の基礎

- 関数型インターフェスのクイック・リファレンス

### B.1 関数型インタフェースの定義

- 関数型インターフェース
  - interface実装して、`@FunctionalInterface`を付与する
  - 実装されていないabstractメソッドを必ず１つ持つ
  - 必要に応じて実装されたdefaultメソッドを持つ
  - staticメソッドも持つことができる

### B.2 パラメータを持たないラムダ式の生成

### B.3 パラメータ 1つのラムダ式の生成

型推論は効くが、明示した場合は `(final String str) -> System.out.println(str);`などとする

### B.4 ラムダ式のパラメータ型を推論する

- 通常、型推論されるが、１つでも型を明示的に記載する必要がある場合、
- すべて引数の型を記載する必要がある

### B.5 パラメータ 1つのラムダ式では括弧を省略可能

- `(name) -> ;`とかいても `name -> ;`とかいてもよい

### B.6 複数パラメータを持つラムダ式の生成

- 複数のパラメータを持つ場合はカッコが必須 `frinends.stream().reduce((name1,name2) -> name1.length() >= name2.length() ? name1 : name2);`

### B.7 複数の型のパラメータを持つメソッドを呼び出す

- ラムダ式やメソッド参照を引数に渡せる

### B.8 ラムダ式を変数に格納

- 再利用するためにラムダ式を変数に格納できる

### B.9 複数行のラムダ式を生成

- ラムダ式は複数行に渡って記載できる
- 必要に応じて、return文を記載しないといけない

### B.10 ラムダ式を返す

- メソッドの戻り値型として関数型インタフェースを指定できる

### B.11 ラムダ式からラムダ式を返す

- ラムダ式を返すラムダ式をかける

### B.12 クロージャにおける静的スコープ

### B.13 インスタンスメソッドのメソッド参照を渡す

### B.14 メソッド参照をstaticメソッドに渡す

### B.15 メソッド参照を他のインスタンスのメソッドに渡す

### B.16 複数の引数を取るメソッドの参照を渡す

### B.17 コンストラクタ参照を使う

### B.18 関数合成

## 付録C Web上のリソース

- Cutting Stock問題
  - <https://en.wikipedia.org/wiki/Cutting_stock_problem>
  - メモ化テクニックを使って解決できる最適化問題

- 依存関係逆転の原則
  - クラスの実装で拡張するのではなく、抽象（インタフェース）とカップリングすることによる拡張方法を説明している

- DRY原則
  - <https://ja.wikipedia.org/wiki/Don%27t_repeat_yourself>

- 本質と儀式について（Essence vs. Ceremony）
  - →古いからやめようと思う

- Execute Around Methodパターン

- ローンパターン(Loan Pattern)
  - Scalaにおけるローンパターンの紹介
  - 記事がなかった
    - <https://docs.scala-lang.org/>

- 伝えろ。聞くな。
  - <https://pragprog.com/articles/tell-dont-asks>
  - 伝えろ、聞くなという原則を説明するコラム

- 書籍サイト
  - <https://pragprog.com/>

## 付録D 参考文献

## 訳者あとがき

## 索引

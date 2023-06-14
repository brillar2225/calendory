# Calendory

Calendory は、Calendar と ToDo List と Diary の造語として、名前の通り日程管理からタスク管理、ダイアリーまで纏めて管理できるアプリです。

![Welcome Page](https://github.com/brillar2225/calendory/assets/91242076/fd8605c6-853d-428d-8c1f-d3e9f6523d3f)
![Calendar Page](https://github.com/brillar2225/calendory/assets/91242076/3209a5e9-1e6d-48c6-8042-0e1f01449cfb)
![ToDoList Page](https://github.com/brillar2225/calendory/assets/91242076/142d6528-dec4-4313-9991-2d8a85cecaa4)
![Diary Page](https://github.com/brillar2225/calendory/assets/91242076/64eaa5ec-5b04-45e0-9d3d-43ad54fffdc5)

デモ版: <https://calendory.web.app/>

## 概要

> ToDo リストを作成するたび、カレンダーをいちいち開くの面倒臭いな…  
> 日程やタスクの管理、1 日の振り返りまで全て一つに纏めて管理できて、それぞれが連動できればいいのに

Calendory はこのような悩みから始まりました。

そこで、私は、3 つの機能を 1 つのアプリに纏めるだけでなく、**カレンダーにスケジュールを追加しておけば、該当する日付の ToDo リストからもすぐにスケジュールが確認できる**ように Calendory を作り上げました。  
また、ダイアリーは**一日に複数回にかけて作成**することができ、その日のページに**リストのように表示されるため、ダイアリーを一目で確認し過去の自分を簡単に振り返られます。**

## 使用技術

- React
- React Router Dom
- Firebase
- FullCalendar
- React DatePicker
- Tailwind CSS

## 利用方法及び機能別導入技術や特徴

本アプリは、全てのページにおいてレスポンシブデザインを導入しており、お持ちのスマホ、タブレット、パソコンからご利用いただけます。  
利用方法は、追加・変更・削除したい日程、タスクやダイアリーの日付を選択したあと、通常のカレンダーや ToDo リスト、ダイアリーを使う感覚で利用していただければ十分です。

以下より、このアプリの詳細機能について説明します。

### サインアップ及びサインイン

このアプリは、Firebase Authentication により会員登録及びログイン機能を実装しております。  
Firebase Authentication の中でメールアドレス、Google ログイン、Twitter ログイン、GitHub ログインの 4 つのログイン方法を提供しております。  
お好きな方法で会員登録及びログインいただくとすぐに利用可能です。

### マイページ

ユーザー情報に関しては、React の useContext フックと Firebase Authentication のを使用してグローバルにログイン状態をオブザーブし管理されるようにしました。

グローバルでの管理の下で、アカウント情報は、マイページから確認することができるようにしました。  
メールアドレスでのログインの場合、ニックネームやメールアドレス、そしてパスワードが変更可能となっており、ソーシャルログインの場合、変更可能な情報はニックネームだけ限られます。  
残念ながら、現バージョンではプロフィール画像の変更は不可であり、今後アップデート予定です。

### メイン機能

ログインが成功すると、ホーム画面にて現在時刻に合わせた挨拶とともに Calendory があなたを歓迎してくれます。

ホーム画面の上部に「カレンダー」「ToDo リスト」「ダイアリー」という 3 つのカテゴリーからタップすると、それぞれの機能を簡単に遊泳しながら Calendory を楽しめます。

* #### **カレンダー**

カレンダーは、FullCalendar というライブラリーを使用しております。  
FullCalendar を導入した理由は、以下の通りです。

1. Google カレンダーに依存せず自分で日程を追加・変更することができる。
2. Google カレンダーとの連携 API も提供している。
3. クリックやドロップなどの多様なイベントメソッドを提供している。
4. React のコンポーネント型での機能を提供している。

カレンダーの利用方法に関しては、通常のカレンダーアプリと変わらず、非常に簡単です。

ご希望の日付をクリックすると、追加用のモーダルが表示されますので、その画面からスケジュールを記入し追加ボタンを押すとスケジュール追加ができます。スケジュールの追加時には、スケジュールに関するメモや優先順位をつけることができ、終日日程や時間指定ののいずれかに選択していただけます。  
スケジュールの変更または削除の際はご希望のスケジュールイベントバーをクリックし変更用のモーダルから変更または削除を行えるよう実装しました。

* #### **ToDo リスト**

ToDo リストでは、React Date Picker というライブラリーを使用し、日付ごとに ToDo リストを管理できるようにしました。  
さらに、カレンダーで追加したスケジュールを該当する日付に ToDo リストからも確認できるようにしました。スケジュールは ToDo リストの上に表示されるようにすることで、すぐ目に立つように実装しました。

ToDo リストの利用方法に関しては、画面の上部に位置する日付の部分や日付の左右にある矢印ボタンよりご希望の日付まで移動して下さい（最初は今日の ToDo を表示します）。  
その後、画面の下部の青い追加ボタンから追加用のモーダルを表示させ、記入事項を記入したあと追加ボタンを押すと ToDo リストからリアルタイムで確認できます。ToDo リストの変更や削除はリストアイテムの右側のアイコンより行うことができます。

* #### **ダイアリー**

ダイアリーも ToDo リストと同じく React Date Picker を通じて日付を自由に選択していただけるようにしました。  
また、ダイアリーの特徴としては、一日に複数の日記をつけることができ、またそれをリストとして表示して一目で確認できるように工夫した点です。このように UI/UX を工夫した理由は、大きく 2 つあります。

1. 一日の中での複数の出来事や感情を別々に記す自由度をユーザーに与えるため。
2. 複数作成された日記を 1 つのページにリストとして表示することで、過去の自分をより簡単に振り替えられるようにするため。

これにより、ユーザーは一日の複数の出来事や感情をテーマごとに記録することができ、振り返りの際においてもその日付を選択するだけで済むのです。

ダイアリーの利用方法は、ToDo リストと同様に作成することで、初めて使うユーザーも簡単に利用できるようにしています。
そのため、ToDo リストと同様に、下部の青い追加ボタンからダイアリーを追加し、右側の変更または削除ボタンから自由に変更・削除していただけます。

## インストレーション

```sh
git clone https://github.com/brillar2225/calendory.git
cd calendory
npm run start
```

## 今後のアップデート事項

今回の開発は時間の問題もあり、これからアップデートをしていく予定です。アップデートポイントは以下の通りです。

- コードの可読性や重複するコードをなくすためのリファクタリング
- 性能の向上のため、TanStack Query を使用してカレンダー・ToDo リスト・ダイアリーのロジックをリファクタリング
- プロフィール画像の変更機能追加
- ユーザーインターフェース向上のため、カレンダーのドロップダウンイベントの追加
- ToDo リストが追加されている日付を日付のミニカレンダーに表示
- ToDo リストのタグをキーワードとして検索する機能
- ダイアリーが追加されている日付を日付のミニカレンダーに表示
- アプリの利用方法を説明する「利用案内」ページ追加

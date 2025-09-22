# 🚀 Render Deployment Guide for TODO Demo App

このドキュメントは、Spring Boot + Bootstrap で構築された TODO アプリを [Render.com](https://render.com) にデプロイするための手順をまとめたものです。

---

## 📦 プロジェクト概要

- **アプリ名**：TODO Demo App  
- **技術構成**：Java (Spring Boot), HTML/CSS/JS (Bootstrap), Docker  
- **GitHub リポジトリ**：[https://github.com/design-pull/todo_clean](https://github.com/design-pull/todo_clean)

---

## ✅ 前提条件

- GitHub にリポジトリが公開されている  
- `Dockerfile` がプロジェクトルートに存在する  
- `.jar` ファイルが `target/` に生成されるように設定済み  
- `application.properties` に以下の設定が含まれている：

```properties
server.port=${PORT:8080}
spring.profiles.active=${SPRING_PROFILES_ACTIVE:prod}

⚙️ Render.com での設定手順
Render.com にログイン
https://render.com/

「New Web Service」をクリック

GitHub リポジトリ todo_clean を選択

以下の設定を入力：

項目	設定値
Name	todo-clean-app
Environment	Docker
Branch	main
Root Directory	（空欄）
「Create Web Service」をクリック

🔐 環境変数の設定（推奨）
Render の「Environment」セクションで以下を追加：

変数名	値	説明
SPRING_PROFILES_ACTIVE	prod	本番プロファイルを有効化
JAVA_OPTS	-Xmx512m -Xms256m	JVM メモリ制限（Renderのリソースに合わせる）

🧪 起動確認とトラブルシュート
✅ 正常起動のログ例
コード
Your service is live 🎉
Available at your primary URL: https://todo-clean.onrender.com

❌ よくあるエラーと対処法
エラー	原因	対処法
502 Bad Gateway	ポート設定が不正	application.properties に server.port=${PORT:8080} を追加
.jar 実行失敗	Dockerfile の CMD が不一致	.jar ファイル名を確認し、CMD を修正
メモリ不足	JVM がRenderの制限を超えている	JAVA_OPTS を設定して制限

📎 補足情報
Dockerfile に EXPOSE 8080 を追加するとポート検出が安定する
README.md に Render の公開URLを記載すると親切
デプロイ後のURL例：https://todo-clean.onrender.com
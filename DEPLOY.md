# 🚀 DEPLOY.md - TODO Demo App Deployment Guide

このドキュメントでは、TODO Demo App を GitHub Pages および Render.com にデプロイする方法をまとめています。

---

## 📦 プロジェクト概要

- **アプリ名**：TODO Demo App  
- **技術構成**：Java (Spring Boot), HTML/CSS/JS (Bootstrap), Docker  
- **GitHub リポジトリ**：[https://github.com/design-pull/todo_clean](https://github.com/design-pull/todo_clean)

---

## 🌐 GitHub Pages での公開（静的UI）

### 対象：HTML/CSS/JS の静的UI部分のみ

1. `docs/` フォルダを作成し、`index.html` と `static/` をコピー
2. GitHub にプッシュ：

```bash
git add docs
git commit -m "GitHub Pages公開用ファイル追加"
git push

GitHub の「Settings」→「Pages」で以下を設定：

項目	設定値
Branch	main
Folder	/docs
公開URLが表示される（例：https://design-pull.github.io/todo_clean/）

🖥️ Render.com での公開（Javaバックエンド）
対象：Spring Boot バックエンド含む完全なWebアプリ
Render にログイン → 「New Web Service」を作成

GitHub リポジトリ todo_clean を選択

以下の設定を入力：

項目	設定値
Environment	Docker
Branch	main
Root Directory	（空欄）
環境変数を設定（任意）：

変数名	値
SPRING_PROFILES_ACTIVE	prod
JAVA_OPTS	-Xmx512m -Xms256m
application.properties に以下があることを確認：

properties
server.port=${PORT:8080}
spring.profiles.active=${SPRING_PROFILES_ACTIVE:prod}
公開URL（例）：https://todo-clean.onrender.com

🧪 よくあるエラーと対処法
エラー	原因	対処法
502 Bad Gateway	ポート設定が不正	server.port=${PORT:8080} を追加
.jar 実行失敗	Dockerfile の CMD が不一致	.jar ファイル名を確認
メモリ不足	JVM がRenderの制限を超えている	JAVA_OPTS を設定
✨ まとめ
GitHub Pages → UIだけ公開したいときに便利

Render.com → Javaの処理も含めて完全公開したいときに最適

両方使い分けることで、デモと実装を分離して見せられる！
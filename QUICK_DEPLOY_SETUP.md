# 🚀 Быстрая настройка автоматического деплоя

## ⚡ Самый простой способ (5 минут)

### Вариант: GitHub Actions (Рекомендуется)

1. **Создайте SSH ключ:**
```bash
ssh-keygen -t rsa -b 4096 -C "github-actions-deploy"
# Нажмите Enter для всех вопросов (или укажите путь)
```

2. **Скопируйте публичный ключ на сервер:**
```bash
ssh-copy-id -i ~/.ssh/id_rsa.pub user@trendagent.siteaccess.ru
# Введите пароль от сервера
```

3. **Добавьте приватный ключ в GitHub:**
   - Откройте: `https://github.com/letoceiling-coder/avangard-react/settings/secrets/actions`
   - Нажмите `New repository secret`
   - Добавьте:
     - `SSH_PRIVATE_KEY` - содержимое файла `~/.ssh/id_rsa` (приватный ключ)
     - `SERVER_HOST` - `trendagent.siteaccess.ru`
     - `SERVER_USER` - ваш пользователь на сервере
     - `SERVER_PORT` - `22` (или другой порт SSH)

4. **Готово!** Теперь при каждом `git push origin main` будет автоматический деплой.

---

## 🔄 Альтернатива: Webhook (Для Apache)

1. **Скопируйте скрипт на сервер:**
```bash
scp scripts/webhook-deploy.php user@trendagent.siteaccess.ru:~/trendagent.siteaccess.ru/public_html/
```

2. **Настройте секретный ключ:**
```bash
ssh user@trendagent.siteaccess.ru
nano ~/trendagent.siteaccess.ru/public_html/webhook-deploy.php
# Измените $SECRET на случайную строку (например: openssl rand -hex 32)
```

3. **Настройте webhook в GitHub:**
   - `Settings → Webhooks → Add webhook`
   - URL: `https://trendagent.siteaccess.ru/webhook-deploy.php`
   - Secret: ваш секретный ключ из шага 2
   - Events: `Just the push event`

4. **Готово!** При каждом push будет автоматический деплой.

---

## 📝 Ручной деплой (если нужно)

```bash
npm run deploy
# или
./scripts/deploy.sh production
```

---

## ✅ Проверка работы

1. Сделайте небольшое изменение в коде
2. Закоммитьте и запушьте:
```bash
git add .
git commit -m "Test deploy"
git push origin main
```

3. Проверьте:
   - GitHub Actions: `Actions` tab в репозитории
   - Сайт: `https://trendagent.siteaccess.ru/`

---

## 🆘 Проблемы?

Смотрите подробную документацию: `AUTO_DEPLOY.md`


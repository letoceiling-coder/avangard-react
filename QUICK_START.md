# ⚡ Быстрый старт - Автоматический деплой за 5 минут

## 🎯 Что нужно сделать

### 1️⃣ Создать SSH ключ (2 минуты)

**Откройте PowerShell и выполните:**
```powershell
ssh-keygen -t rsa -b 4096 -C "github-deploy"
# Нажмите Enter 3 раза (путь, пароль, подтверждение пароля)
```

**Где найти ключи:**
- Приватный: `C:\Users\ВашеИмя\.ssh\id_rsa`
- Публичный: `C:\Users\ВашеИмя\.ssh\id_rsa.pub`

---

### 2️⃣ Скопировать ключ на сервер (1 минута)

**Откройте публичный ключ:**
```powershell
notepad C:\Users\ВашеИмя\.ssh\id_rsa.pub
```

**Скопируйте ВСЁ содержимое** (одна длинная строка)

**Подключитесь к серверу:**
```powershell
ssh user@trendagent.siteaccess.ru
```

**На сервере выполните:**
```bash
mkdir -p ~/.ssh
echo "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQCfDT2nhPFvSoDEj6nOCr/kQKxnvCjUTzIh66JqTSoySMqVgJH44M0zEgtj/zM3f5rBBVtLq9vYNUbFnWA7sxrXasmzbYGSCZ1jG8Hm5BABN/Be6HSqganNlPHsVlQlVrpi7H2z8Tw7U5NYV/a4vF9FwToKGBTrhZFFmpGhp773pRDhwP2agzDXGoMrhHAjoTeGBcR1ao7gt5zUtiHxMBKwtV2RcLq0jOR8brWVQGAUweuhPOSzrAf1pvDYiIvvVZyF2Wv4QIKE4YpuGjhzTJlNaXMBeCtyPgNa/rxF2kZRmH5lLAlUmMt71I/n5dLbs60xJLSdWF7ec2I695e4sQi2ONkdJ1nhjNKZfK8tVJ4CoQIkThd8uJiqO+GLcjJscUt8v0JjzNxoMUPCOaOycsV0crEuq4mCXHbKrkGrPGFquaAM4/1b9goV7vOT6GdO2jUcIGUz6fGFIum3zMQ80IvdJUfQ1xc5UB4soIKkSTmhpTr3l2glhpt7+Nq3oGiKHrd/OKedy0SZf+YrcyW6zuMhm0duFA6mMVppjfae0CmWb+9i9U/ZVe1ytImXngtZT1PeOCmsUHihUTMOTNWE2cPKoWz+ssLeQWoGhCQYeHy6d8RmTLhbLhWfMzUvrGsaUorLgILjrp6+eIIovrUe3QcrKevhqH4q/Atec2AXCNpwvw== dsc-2@localhost" >> ~/.ssh/authorized_keys
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
exit
```

**Проверьте подключение:**
```powershell
ssh user@trendagent.siteaccess.ru
# Должно подключиться БЕЗ пароля
```

---

### 3️⃣ Добавить секреты в GitHub (2 минуты)

**3.1. Откройте приватный ключ:**
```powershell
notepad C:\Users\ВашеИмя\.ssh\id_rsa
```

**Скопируйте ВСЁ содержимое** (включая BEGIN и END)

**3.2. Перейдите в GitHub:**
1. Откройте: https://github.com/letoceiling-coder/avangard-react/settings/secrets/actions
2. Нажмите: **New repository secret**

**3.3. Добавьте 4 секрета:**

**Секрет 1:**
- Name: `SSH_PRIVATE_KEY`
- Secret: вставьте приватный ключ
- Add secret

**Секрет 2:**
- Name: `SERVER_HOST`
- Secret: `trendagent.siteaccess.ru`
- Add secret

**Секрет 3:**
- Name: `SERVER_USER`
- Secret: ваш пользователь (например: `user`)
- Add secret

**Секрет 4:**
- Name: `SERVER_PORT`
- Secret: `22`
- Add secret

---

### 4️⃣ Проверить работу (30 секунд)

**Сделайте тестовый коммит:**
```powershell
git add .
git commit -m "Test deploy"
git push origin main
```

**Проверьте:**
1. Откройте: https://github.com/letoceiling-coder/avangard-react/actions
2. Должен запуститься workflow "Deploy to Production"
3. Подождите 2-3 минуты
4. Зеленый значок ✅ = успешно!

---

## ✅ Готово!

Теперь при каждом `git push origin main` будет автоматический деплой!

---

## 🆘 Проблемы?

**Ошибка "Permission denied":**
- Проверьте, что ключ скопирован на сервер правильно
- Проверьте права: `chmod 600 ~/.ssh/authorized_keys`

**Workflow не запускается:**
- Проверьте, что файл `.github/workflows/deploy.yml` существует
- Проверьте, что ветка называется `main`

**Деплой падает:**
- Откройте Actions → выберите failed workflow
- Посмотрите логи ошибки
- Проверьте, что все секреты добавлены

---

**Подробная инструкция:** `STEP_BY_STEP_DEPLOY.md`


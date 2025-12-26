# 📚 Документация по автоматическому деплою

## 📖 Инструкции (выберите нужную)

### 🚀 Для быстрого старта:
**→ [QUICK_START.md](QUICK_START.md)** - Настройка за 5 минут

### 📋 Для подробной настройки:
**→ [STEP_BY_STEP_DEPLOY.md](STEP_BY_STEP_DEPLOY.md)** - Пошаговая инструкция со всеми деталями

### 🔧 Для выбора варианта:
**→ [AUTO_DEPLOY.md](AUTO_DEPLOY.md)** - Все варианты автоматизации с описанием

### 🔒 Для безопасности:
**→ [SECURITY_DEPLOY.md](SECURITY_DEPLOY.md)** - Правила работы с токенами и ключами
**→ [CRITICAL_SECURITY.md](CRITICAL_SECURITY.md)** - Критически важная информация

---

## 🎯 Рекомендуемый путь

1. **Начните с:** [QUICK_START.md](QUICK_START.md)
2. **Если нужны детали:** [STEP_BY_STEP_DEPLOY.md](STEP_BY_STEP_DEPLOY.md)
3. **Если проблемы:** Раздел "Решение проблем" в STEP_BY_STEP_DEPLOY.md

---

## 📁 Структура файлов

```
project/
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Actions workflow
├── scripts/
│   ├── deploy.sh                   # Bash скрипт для ручного деплоя
│   ├── webhook-deploy.php          # PHP webhook для Apache
│   ├── post-receive-hook.sh        # Git hook для автоматического деплоя
│   └── pm2-deploy.js               # PM2 конфигурация
├── QUICK_START.md                  # ⚡ Быстрый старт (5 минут)
├── STEP_BY_STEP_DEPLOY.md          # 📋 Подробная инструкция
├── AUTO_DEPLOY.md                  # 🔧 Все варианты
├── SECURITY_DEPLOY.md              # 🔒 Безопасность
└── CRITICAL_SECURITY.md            # 🚨 Критическая безопасность
```

---

## ✅ Чеклист настройки

- [ ] SSH ключ создан
- [ ] SSH ключ скопирован на сервер
- [ ] SSH ключ добавлен в GitHub Secrets
- [ ] Все секреты добавлены (4 штуки)
- [ ] Workflow файл существует
- [ ] Тестовый деплой выполнен
- [ ] Деплой работает автоматически

---

## 🆘 Нужна помощь?

1. Проверьте логи в GitHub Actions
2. Проверьте логи на сервере: `~/deploy.log`
3. Прочитайте раздел "Решение проблем" в STEP_BY_STEP_DEPLOY.md

---

**Удачи с настройкой! 🚀**


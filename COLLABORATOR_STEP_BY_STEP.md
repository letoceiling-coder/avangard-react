# Пошаговая инструкция: Добавление Collaborator (Вариант 1)

## Часть 1: Действия владельца репозитория

### Шаг 1: Откройте настройки репозитория

1. Перейдите на GitHub: https://github.com/letoceiling-coder/avangard-react
2. Убедитесь, что вы вошли в аккаунт `letoceiling-coder`
3. Нажмите на вкладку **Settings** (Настройки) в верхнем меню репозитория

### Шаг 2: Перейдите в раздел Collaborators

1. В левом боковом меню найдите раздел **Access** (Доступ)
2. Нажмите на **Collaborators and teams** (Сотрудники и команды)
3. Если появится предупреждение о двухфакторной аутентификации - подтвердите доступ

### Шаг 3: Добавьте нового пользователя

1. Нажмите кнопку **Add people** (Добавить людей) или **Invite a collaborator** (Пригласить сотрудника)
2. В появившемся поле введите:
   - **GitHub username** пользователя (например: `username`)
   - ИЛИ **email адрес**, привязанный к GitHub аккаунту
3. GitHub покажет список найденных пользователей
4. Выберите нужного пользователя из списка

### Шаг 4: Выберите уровень доступа

1. В выпадающем меню выберите роль:
   - **Write** - рекомендуется (позволяет коммитить, пушить, создавать ветки)
   - **Read** - только чтение (не подходит для разработки)
   - **Admin** - полный доступ (осторожно!)
2. Нажмите **Add [username] to this repository**

### Шаг 5: Подтверждение

1. GitHub отправит email-приглашение пользователю
2. Пользователь появится в списке Collaborators со статусом **Pending** (Ожидает)
3. После принятия приглашения статус изменится на **Active**

---

## Часть 2: Действия нового пользователя (Collaborator)

### Шаг 1: Получите приглашение

**Вариант A: Через Email**
1. Проверьте почту, указанную в GitHub аккаунте
2. Найдите письмо от GitHub с темой "Invitation to collaborate on letoceiling-coder/avangard-react"
3. Нажмите на кнопку **View invitation** (Просмотреть приглашение)

**Вариант B: Через GitHub**
1. Перейдите на https://github.com/letoceiling-coder/avangard-react/invitations
2. Или откройте https://github.com/notifications
3. Найдите уведомление о приглашении

### Шаг 2: Примите приглашение

1. Нажмите кнопку **Accept invitation** (Принять приглашение)
2. Если не авторизованы - войдите в GitHub
3. Подтвердите принятие приглашения

### Шаг 3: Настройте Git (если еще не настроен)

Откройте терминал (PowerShell на Windows, Terminal на Mac/Linux):

```bash
# Установите ваше имя (будет видно в коммитах)
git config --global user.name "Ваше Имя"

# Установите ваш email (должен совпадать с GitHub)
git config --global user.email "ваш-email@example.com"

# Проверьте настройки
git config --global --list
```

### Шаг 4: Клонируйте репозиторий

**Вариант A: Через HTTPS (проще)**

```bash
# Перейдите в папку, где хотите сохранить проект
cd C:\Projects  # или любая другая папка

# Клонируйте репозиторий
git clone https://github.com/letoceiling-coder/avangard-react.git

# Перейдите в папку проекта
cd avangard-react
```

**Вариант B: Через SSH (если настроен SSH ключ)**

```bash
git clone git@github.com:letoceiling-coder/avangard-react.git
cd avangard-react
```

### Шаг 5: Проверьте подключение

```bash
# Проверьте удаленные репозитории
git remote -v

# Должно показать:
# origin  https://github.com/letoceiling-coder/avangard-react.git (fetch)
# origin  https://github.com/letoceiling-coder/avangard-react.git (push)
```

### Шаг 6: Установите зависимости

```bash
# Убедитесь, что Node.js установлен (версия 18 или выше)
node --version

# Если Node.js не установлен:
# Скачайте с https://nodejs.org/ и установите

# Установите зависимости проекта
npm install
```

### Шаг 7: Запустите проект локально

```bash
# Запустите dev-сервер
npm run dev

# Откройте браузер на http://localhost:5173
# Или на адрес, который покажет терминал
```

---

## Часть 3: Рабочий процесс для Collaborator

### Ежедневная работа

#### 1. Получите последние изменения

```bash
# Переключитесь на ветку main
git checkout main

# Получите последние изменения с сервера
git pull origin main
```

#### 2. Создайте ветку для новой функции

```bash
# Создайте и переключитесь на новую ветку
git checkout -b feature/название-функции

# Например:
git checkout -b feature/add-new-button
```

#### 3. Внесите изменения

- Отредактируйте файлы в редакторе (Cursor, VS Code и т.д.)
- Сохраните изменения

#### 4. Проверьте изменения

```bash
# Посмотрите, какие файлы изменены
git status

# Посмотрите конкретные изменения
git diff
```

#### 5. Закоммитьте изменения

```bash
# Добавьте файлы в staging
git add .

# Или добавьте конкретные файлы
git add src/components/Header.tsx

# Создайте коммит с описанием
git commit -m "Добавлена новая кнопка в Header"

# Хорошие примеры сообщений коммитов:
# "Fix: исправлена ошибка в навигации"
# "Feature: добавлен фильтр по цене"
# "Style: улучшен дизайн кнопок"
```

#### 6. Отправьте изменения

**Вариант A: Push в свою ветку (рекомендуется)**

```bash
# Отправьте ветку на GitHub
git push origin feature/название-функции

# Затем создайте Pull Request на GitHub для проверки
```

**Вариант B: Push напрямую в main (если есть права)**

```bash
# Переключитесь на main
git checkout main

# Смержите свою ветку
git merge feature/название-функции

# Отправьте в main
git push origin main

# ⚠️ Внимание: это запустит автоматический deploy!
```

### Создание Pull Request (рекомендуется)

1. После `git push origin feature/название-функции`
2. Перейдите на GitHub: https://github.com/letoceiling-coder/avangard-react
3. Появится желтый баннер "Compare & pull request" - нажмите на него
4. Заполните описание изменений
5. Нажмите **Create pull request**
6. Владелец репозитория проверит и одобрит изменения
7. После merge в main - автоматически запустится deploy

---

## Часть 4: Автоматический Deploy

### Как это работает

1. **При push в ветку `main`:**
   - GitHub Actions автоматически запускает workflow
   - Проверьте статус: https://github.com/letoceiling-coder/avangard-react/actions

2. **Что происходит автоматически:**
   - Код клонируется
   - Устанавливаются зависимости (`npm ci`)
   - Проект собирается (`npm run build`)
   - Файлы копируются на сервер
   - Сайт обновляется

3. **Время выполнения:** ~1-2 минуты

### Проверка статуса Deploy

1. Перейдите: https://github.com/letoceiling-coder/avangard-react/actions
2. Найдите последний workflow run
3. Нажмите на него, чтобы увидеть детали
4. Зеленый значок ✓ = успешно
5. Красный значок ✗ = ошибка (проверьте логи)

### ⚠️ Важно

- **Deploy запускается только при push в `main`**
- Push в другие ветки не запускает deploy
- После merge Pull Request в main - deploy запустится автоматически

---

## Часть 5: Решение проблем

### Проблема: "Permission denied" при push

**Решение:**
```bash
# Проверьте, что вы приняли приглашение
# Перейдите: https://github.com/letoceiling-coder/avangard-react/invitations

# Если нужно, используйте Personal Access Token:
# 1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
# 2. Generate new token → Выберите права: repo
# 3. Используйте токен вместо пароля при push
```

### Проблема: "Remote origin already exists"

**Решение:**
```bash
# Проверьте текущие remote
git remote -v

# Если нужно изменить URL:
git remote set-url origin https://github.com/letoceiling-coder/avangard-react.git
```

### Проблема: Конфликты при merge

**Решение:**
```bash
# Получите последние изменения
git pull origin main

# Если есть конфликты, разрешите их вручную в файлах
# Затем:
git add .
git commit -m "Resolve merge conflicts"
git push origin main
```

### Проблема: "npm install" не работает

**Решение:**
```bash
# Убедитесь, что Node.js установлен
node --version  # Должно быть 18 или выше

# Очистите кеш и переустановите
rm -rf node_modules package-lock.json
npm install
```

---

## Часть 6: Полезные команды Git

```bash
# Просмотр статуса
git status

# Просмотр истории коммитов
git log --oneline

# Просмотр различий
git diff

# Отмена изменений в файле (до add)
git checkout -- имя-файла

# Отмена изменений после add (но до commit)
git reset HEAD имя-файла

# Просмотр всех веток
git branch -a

# Удаление локальной ветки
git branch -d feature/название-функции

# Удаление удаленной ветки
git push origin --delete feature/название-функции

# Обновление информации о ветках
git fetch origin
```

---

## Чек-лист для нового Collaborator

- [ ] Принял приглашение на GitHub
- [ ] Настроил Git (user.name и user.email)
- [ ] Клонировал репозиторий
- [ ] Установил зависимости (`npm install`)
- [ ] Запустил проект локально (`npm run dev`)
- [ ] Создал тестовую ветку и сделал коммит
- [ ] Успешно отправил изменения (`git push`)
- [ ] Проверил, что deploy работает (после push в main)

---

## Контакты и помощь

Если возникли проблемы:
1. Проверьте логи GitHub Actions
2. Проверьте настройки репозитория
3. Обратитесь к владельцу репозитория (`letoceiling-coder`)

**Полезные ссылки:**
- Репозиторий: https://github.com/letoceiling-coder/avangard-react
- Actions (Deploy): https://github.com/letoceiling-coder/avangard-react/actions
- Settings: https://github.com/letoceiling-coder/avangard-react/settings


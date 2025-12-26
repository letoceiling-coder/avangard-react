# Инструкция по подключению пользователя к проекту

## Варианты подключения пользователя к Git

### Вариант 1: Добавление как Collaborator (Рекомендуется)

Этот вариант позволяет добавить пользователя напрямую в репозиторий с правами на чтение/запись.

#### Шаги для владельца репозитория:

1. **Откройте настройки репозитория на GitHub:**
   - Перейдите на https://github.com/letoceiling-coder/avangard-react
   - Нажмите на вкладку **Settings** (Настройки)

2. **Добавьте Collaborator:**
   - В левом меню выберите **Collaborators and teams** (Сотрудники и команды)
   - Нажмите **Add people** (Добавить людей)
   - Введите GitHub username или email пользователя
   - Выберите роль: **Write** (для возможности коммитить и пушить)
   - Нажмите **Add [username] to this repository**

3. **Пользователь получит email-приглашение:**
   - Пользователь должен принять приглашение по ссылке из email
   - Или перейти на https://github.com/letoceiling-coder/avangard-react/invitations

#### Шаги для нового пользователя:

1. **Примите приглашение:**
   - Проверьте email или перейдите по ссылке приглашения
   - Нажмите **Accept invitation**

2. **Клонируйте репозиторий:**
   ```bash
   git clone https://github.com/letoceiling-coder/avangard-react.git
   cd avangard-react
   ```

3. **Настройте Git (если еще не настроен):**
   ```bash
   git config --global user.name "Ваше Имя"
   git config --global user.email "ваш-email@example.com"
   ```

---

### Вариант 2: Fork + Pull Request (Для внешних разработчиков)

Этот вариант подходит, если вы хотите контролировать изменения через Pull Requests.

#### Шаги для пользователя:

1. **Сделайте Fork репозитория:**
   - Перейдите на https://github.com/letoceiling-coder/avangard-react
   - Нажмите кнопку **Fork** в правом верхнем углу
   - Выберите свой аккаунт для форка

2. **Клонируйте свой форк:**
   ```bash
   git clone https://github.com/ВАШ-USERNAME/avangard-react.git
   cd avangard-react
   ```

3. **Добавьте оригинальный репозиторий как upstream:**
   ```bash
   git remote add upstream https://github.com/letoceiling-coder/avangard-react.git
   ```

4. **Создайте ветку для работы:**
   ```bash
   git checkout -b feature/название-функции
   ```

5. **После внесения изменений:**
   ```bash
   git add .
   git commit -m "Описание изменений"
   git push origin feature/название-функции
   ```

6. **Создайте Pull Request:**
   - Перейдите на GitHub в свой форк
   - Нажмите **Compare & pull request**
   - Опишите изменения и отправьте PR

---

### Вариант 3: Организация (Для команды)

Если у вас несколько разработчиков, создайте GitHub Organization.

#### Шаги:

1. **Создайте Organization:**
   - Перейдите на https://github.com/organizations/new
   - Создайте организацию

2. **Перенесите репозиторий в Organization:**
   - Settings → Transfer ownership
   - Или создайте новый репозиторий в Organization

3. **Добавьте команду:**
   - Settings → Teams → New team
   - Добавьте участников с нужными правами

---

## Настройка автоматического Deploy для нового пользователя

### Вариант 1: Использовать существующие GitHub Secrets (Проще)

Если новый пользователь будет работать через основной репозиторий, deploy будет работать автоматически при push в `main`.

**Ничего дополнительно настраивать не нужно!** GitHub Actions использует Secrets из настроек репозитория.

### Вариант 2: Добавить SSH ключ нового пользователя на сервер

Если нужно, чтобы каждый пользователь имел свой доступ:

1. **Новый пользователь генерирует SSH ключ:**
   ```bash
   ssh-keygen -t ed25519 -C "email@example.com"
   # Нажмите Enter для сохранения в ~/.ssh/id_ed25519
   ```

2. **Покажите публичный ключ:**
   ```bash
   cat ~/.ssh/id_ed25519.pub
   ```

3. **Добавьте ключ на сервер:**
   - Подключитесь к серверу: `ssh dsc23ytp@trendagent.siteaccess.ru`
   - Добавьте ключ в `~/.ssh/authorized_keys`:
     ```bash
     echo "публичный_ключ_пользователя" >> ~/.ssh/authorized_keys
     chmod 600 ~/.ssh/authorized_keys
     ```

4. **Добавьте новый SSH ключ в GitHub Secrets:**
   - Settings → Secrets and variables → Actions
   - Создайте новый секрет `SSH_PRIVATE_KEY_NEW_USER` с приватным ключом
   - Обновите `.github/workflows/deploy.yml` для использования нового ключа (если нужно)

---

## Подключение проекта к Cursor

### Шаг 1: Установка Cursor

1. **Скачайте Cursor:**
   - Перейдите на https://cursor.sh/
   - Скачайте установщик для вашей ОС (Windows/Mac/Linux)
   - Установите приложение

2. **Запустите Cursor**

### Шаг 2: Клонирование проекта

#### Вариант A: Через Cursor UI

1. Откройте Cursor
2. Нажмите **File → Open Folder** (или `Ctrl+K Ctrl+O`)
3. Если проект еще не клонирован:
   - Нажмите **File → Clone Repository**
   - Введите URL: `https://github.com/letoceiling-coder/avangard-react.git`
   - Выберите папку для клонирования
   - Нажмите **Clone**

#### Вариант B: Через терминал

```bash
# Клонируйте репозиторий
git clone https://github.com/letoceiling-coder/avangard-react.git

# Откройте папку в Cursor
cd avangard-react
cursor .
```

### Шаг 3: Настройка Git в Cursor

1. **Откройте терминал в Cursor:**
   - `Ctrl+` ` (обратная кавычка) или View → Terminal

2. **Настройте Git (если еще не настроен):**
   ```bash
   git config --global user.name "Ваше Имя"
   git config --global user.email "ваш-email@example.com"
   ```

3. **Проверьте подключение:**
   ```bash
   git remote -v
   # Должно показать:
   # origin  https://github.com/letoceiling-coder/avangard-react.git (fetch)
   # origin  https://github.com/letoceiling-coder/avangard-react.git (push)
   ```

### Шаг 4: Установка зависимостей

```bash
# Установите Node.js (если еще не установлен)
# Скачайте с https://nodejs.org/ (версия 18 или выше)

# Установите зависимости проекта
npm install
```

### Шаг 5: Настройка окружения

1. **Создайте файл `.env`** (если нужен):
   ```bash
   cp .env.example .env  # Если есть пример
   # Или создайте вручную
   ```

2. **Заполните переменные окружения** (если нужно):
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_key
   ```

### Шаг 6: Запуск проекта

```bash
# Запустите dev-сервер
npm run dev

# Откройте браузер на http://localhost:5173
```

### Шаг 7: Работа с Git в Cursor

#### Просмотр изменений:
- Откройте вкладку **Source Control** (иконка ветки слева)
- Или используйте `Ctrl+Shift+G`

#### Коммит изменений:
1. Нажмите `+` рядом с файлами для добавления в staging
2. Введите сообщение коммита
3. Нажмите `✓ Commit` или `Ctrl+Enter`
4. Нажмите `Sync Changes` для push в репозиторий

#### Создание ветки:
```bash
# В терминале
git checkout -b feature/название-функции

# Или через UI: Source Control → ... → Branch → Create Branch
```

#### Pull изменений:
```bash
git pull origin main
```

---

## Рабочий процесс для нового пользователя

### Ежедневная работа:

1. **Получите последние изменения:**
   ```bash
   git pull origin main
   ```

2. **Создайте ветку для новой функции:**
   ```bash
   git checkout -b feature/название-функции
   ```

3. **Внесите изменения в коде**

4. **Проверьте изменения:**
   ```bash
   npm run build  # Проверка сборки
   npm run dev    # Локальная проверка
   ```

5. **Закоммитьте изменения:**
   ```bash
   git add .
   git commit -m "Описание изменений"
   ```

6. **Отправьте изменения:**
   ```bash
   git push origin feature/название-функции
   ```

7. **Создайте Pull Request** (если используете Fork) или **Push в main** (если Collaborator)

### После push в main:

- GitHub Actions автоматически запустит deploy
- Проверьте статус: https://github.com/letoceiling-coder/avangard-react/actions
- Через ~1-2 минуты изменения появятся на сайте

---

## Полезные команды Git

```bash
# Проверить статус
git status

# Посмотреть историю коммитов
git log --oneline

# Отменить изменения в файле
git checkout -- имя-файла

# Посмотреть различия
git diff

# Переключиться на другую ветку
git checkout main

# Удалить ветку
git branch -d feature/название-функции
```

---

## Решение проблем

### Проблема: "Permission denied"

**Решение:**
- Убедитесь, что вы приняли приглашение Collaborator
- Проверьте, что используете правильный GitHub аккаунт
- Попробуйте использовать Personal Access Token вместо пароля

### Проблема: "Deploy не работает"

**Решение:**
- Проверьте, что push был в ветку `main`
- Проверьте GitHub Actions: https://github.com/letoceiling-coder/avangard-react/actions
- Убедитесь, что Secrets настроены в Settings → Secrets and variables → Actions

### Проблема: "Конфликты при merge"

**Решение:**
```bash
# Получите последние изменения
git pull origin main

# Разрешите конфликты вручную в файлах
# Затем:
git add .
git commit -m "Resolve merge conflicts"
git push origin main
```

---

## Дополнительные ресурсы

- **GitHub Docs:** https://docs.github.com/
- **Git Handbook:** https://guides.github.com/introduction/git-handbook/
- **Cursor Docs:** https://cursor.sh/docs

---

## Контакты для помощи

Если возникнут вопросы:
1. Проверьте логи GitHub Actions
2. Проверьте настройки репозитория
3. Обратитесь к владельцу репозитория


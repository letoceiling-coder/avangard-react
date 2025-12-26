# Решение проблемы: "not a git repository"

## Проблема

Ошибка `fatal: not a git repository` означает, что вы находитесь не в папке git-репозитория.

## Решение

### Шаг 1: Проверьте текущую папку

```bash
# Посмотрите, где вы находитесь
pwd

# Посмотрите содержимое папки
ls -la
```

### Шаг 2: Найдите правильную папку

После клонирования репозитория должна быть папка `avangard-react`:

```bash
# Если вы в папке LIVEGRID, проверьте, есть ли там папка avangard-react
ls -la

# Или найдите папку avangard-react
find . -name "avangard-react" -type d
```

### Шаг 3: Перейдите в правильную папку

```bash
# Перейдите в папку проекта
cd avangard-react

# Проверьте, что это git репозиторий
git status
```

Если команда `git status` работает - вы в правильной папке!

---

## Если репозиторий не был клонирован

### Правильное клонирование:

```bash
# Перейдите в папку, где хотите сохранить проект
cd ~/Projects  # или любая другая папка

# Клонируйте репозиторий
git clone https://github.com/letoceiling-coder/avangard-react.git

# Перейдите в папку проекта
cd avangard-react

# Теперь проверьте
git status
```

---

## ⚠️ Важно: Для Collaborator НЕ нужен upstream!

Команда `git remote add upstream` используется только для **Fork workflow** (Вариант 2).

Если вы **Collaborator** (Вариант 1), вам НЕ нужно добавлять upstream!

### Проверьте текущие remote:

```bash
# Перейдите в папку проекта
cd avangard-react

# Посмотрите настроенные remote
git remote -v
```

**Для Collaborator должно быть:**
```
origin  https://github.com/letoceiling-coder/avangard-react.git (fetch)
origin  https://github.com/letoceiling-coder/avangard-react.git (push)
```

**Если вы видите только origin - это правильно!** Не нужно добавлять upstream.

---

## Правильный рабочий процесс для Collaborator

### 1. Получите последние изменения:

```bash
cd avangard-react
git pull origin main
```

### 2. Создайте ветку:

```bash
git checkout -b feature/название-функции
```

### 3. Внесите изменения и закоммитьте:

```bash
git add .
git commit -m "Описание изменений"
```

### 4. Отправьте изменения:

```bash
# Отправьте в свою ветку
git push origin feature/название-функции

# Или если работаете напрямую в main (не рекомендуется):
git push origin main
```

---

## Если вы все же хотите добавить upstream (не рекомендуется для Collaborator)

```bash
# Сначала убедитесь, что вы в папке проекта
cd avangard-react

# Проверьте, что это git репозиторий
git status

# Только потом добавляйте upstream (если действительно нужно)
git remote add upstream https://github.com/letoceiling-coder/avangard-react.git

# Проверьте
git remote -v
```

Но помните: **для Collaborator это не нужно!**

---

## Пошаговая инструкция для исправления

### Вариант A: Репозиторий уже клонирован

```bash
# 1. Найдите папку avangard-react
cd ~  # Перейдите в домашнюю папку
find . -name "avangard-react" -type d 2>/dev/null

# 2. Перейдите в найденную папку
cd путь/к/avangard-react

# 3. Проверьте
git status
```

### Вариант B: Репозиторий не клонирован

```bash
# 1. Перейдите в папку для проектов
cd ~/Projects  # или cd ~/Documents, или любая другая папка

# 2. Клонируйте репозиторий
git clone https://github.com/letoceiling-coder/avangard-react.git

# 3. Перейдите в папку
cd avangard-react

# 4. Проверьте
git status
git remote -v
```

---

## Проверка правильности настройки

Выполните эти команды по порядку:

```bash
# 1. Проверьте текущую папку
pwd

# 2. Проверьте, что это git репозиторий
git status

# 3. Проверьте remote
git remote -v

# 4. Проверьте текущую ветку
git branch

# 5. Получите последние изменения
git pull origin main
```

Если все команды работают без ошибок - настройка правильная!

---

## Частые ошибки

### Ошибка: "fatal: not a git repository"
**Причина:** Вы не в папке git-репозитория  
**Решение:** Перейдите в папку `avangard-react`

### Ошибка: "remote origin already exists"
**Причина:** Remote уже настроен  
**Решение:** Это нормально! Используйте `git remote -v` для проверки

### Ошибка: "Permission denied"
**Причина:** Не принято приглашение Collaborator  
**Решение:** Проверьте https://github.com/letoceiling-coder/avangard-react/invitations

---

## Нужна помощь?

Если проблема не решена:

1. Выполните и покажите результат:
   ```bash
   pwd
   ls -la
   git status
   git remote -v
   ```

2. Проверьте, приняли ли вы приглашение Collaborator:
   - https://github.com/letoceiling-coder/avangard-react/invitations

3. Убедитесь, что используете правильный GitHub аккаунт


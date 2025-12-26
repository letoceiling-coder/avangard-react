# Команды для развертывания на сервере

## Первое развертывание

```bash
# 1. Подключение к серверу
ssh user@your-server.com

# 2. Переход в директорию public_html
cd ~/trendagent.siteaccess.ru/public_html

# 3. Клонирование репозитория
git clone https://github.com/letoceiling-coder/avangard-react.git

# 4. Переход в директорию проекта
cd avangard-react

# 5. Установка зависимостей
npm install

# 6. Сборка проекта
npm run build

# 7. Копирование собранных файлов в корень public_html
cp -r dist/. ..

# Готово! Приложение доступно по адресу: https://trendagent.siteaccess.ru/
```

## Обновление проекта (после изменений в git)

```bash
# 1. Переход в директорию проекта
cd ~/trendagent.siteaccess.ru/public_html/avangard-react

# 2. Получение обновлений из git
git pull origin main

# 3. Установка новых зависимостей (если были изменения в package.json)
npm install

# 4. Сборка проекта
npm run build

# 5. Копирование обновленных файлов в корень public_html
cp -r dist/. ..

# Готово! Изменения применены.
```

## Одной командой (обновление)

```bash
cd ~/trendagent.siteaccess.ru/public_html/avangard-react && git pull origin main && npm install && npm run build && cp -r dist/. ..
```


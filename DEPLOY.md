# Инструкция по развертыванию проекта на сервере

## Быстрое развертывание на сервере

**Путь на сервере:** `~/trendagent.siteaccess.ru/public_html`

```bash
# 1. Подключение к серверу
ssh user@your-server.com

# 2. Переход в директорию
cd ~/trendagent.siteaccess.ru/public_html

# 3. Клонирование (если еще не клонирован)
git clone https://github.com/letoceiling-coder/avangard-react.git
cd avangard-react

# 4. Установка зависимостей
npm install

# 5. Сборка проекта
npm run build

# 6. Копирование файлов в корень public_html
cp -r dist/. ..
```

**Важно:** 
- Приложение доступно по адресу: `https://trendagent.siteaccess.ru/`
- Проект настроен для работы с корня домена
- Файл `.htaccess` автоматически копируется в `dist/` при сборке

## Предварительные требования

- Node.js (версия 18 или выше)
- npm или yarn
- Git

## Пошаговые команды

### 1. Подключение к серверу и переход в рабочую директорию

```bash
ssh user@your-server.com
cd ~/trendagent.siteaccess.ru/public_html
```

### 2. Клонирование репозитория

```bash
git clone https://github.com/letoceiling-coder/avangard-react.git
cd avangard-react
```

**Важно:** Проект настроен для работы с корня домена. 
Приложение будет доступно по адресу: `https://trendagent.siteaccess.ru/`

### 3. Установка зависимостей

```bash
npm install
```

### 4. Сборка проекта для production

```bash
npm run build
```

После сборки файлы будут в директории `dist/`

**Примечание:** Файл `.htaccess` автоматически копируется в `dist/` при сборке для настройки Apache сервера.

### 5. Варианты развертывания

#### Вариант A: Статический сервер через Node.js (без sudo)

Установка простого статического сервера:

```bash
npm install -g serve
```

Запуск сервера на порту 3000:

```bash
serve -s dist -l 3000
```

Для запуска в фоне (с PM2, если установлен):

```bash
npm install -g pm2
pm2 serve dist 3000 --spa
pm2 save
pm2 startup  # покажет команду для автозапуска
```

#### Вариант B: Использование встроенного preview сервера Vite

```bash
npm run preview
```

#### Вариант C: Развертывание на Apache сервере (рекомендуется)

**Путь на сервере:** `~/trendagent.siteaccess.ru/public_html`

После сборки проекта файл `.htaccess` автоматически копируется в `dist/`.

**Копирование собранных файлов в production:**

```bash
cd ~/trendagent.siteaccess.ru/public_html/avangard-react
npm run build
# Копируем содержимое dist/ в корень public_html
cp -r dist/. ..
```

**Настройка Apache:**

Убедитесь, что в конфигурации виртуального хоста для `trendagent.siteaccess.ru` разрешен `AllowOverride All`:

```apache
<Directory /home/user/trendagent.siteaccess.ru/public_html>
    Options -Indexes +FollowSymLinks
    AllowOverride All
    Require all granted
</Directory>
```

**Важно:**
- Включен `mod_rewrite` в Apache
- Файл `.htaccess` находится в корне `public_html/`
- Приложение доступно по адресу: `https://trendagent.siteaccess.ru/`

#### Вариант D: Настройка через reverse proxy (если есть доступ к nginx без sudo)

Если у вас есть доступ к конфигурации nginx (через панель управления или без sudo):

```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    root /home/user/projects/avangard-react/dist;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### 6. Обновление проекта (после изменений в git)

```bash
cd ~/trendagent.siteaccess.ru/public_html/avangard-react
git pull origin main
npm install  # если были изменения в package.json
npm run build

# Копирование обновленных файлов в корень public_html
cp -r dist/. ..
```

### 7. Настройка переменных окружения (если нужны)

Создать файл `.env.production`:

```bash
cp .env.example .env.production  # если есть пример
# или создать вручную
nano .env.production
```

### 8. Автозапуск при перезагрузке сервера (PM2)

```bash
pm2 startup
# Выполнить команду, которую покажет PM2
pm2 save
```

## Полезные команды

- Проверка статуса PM2: `pm2 status`
- Логи PM2: `pm2 logs`
- Остановка PM2: `pm2 stop all`
- Удаление из PM2: `pm2 delete all`


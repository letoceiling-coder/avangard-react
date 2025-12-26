# Инструкция по развертыванию проекта на сервере

## Предварительные требования

- Node.js (версия 18 или выше)
- npm или yarn
- Git

## Пошаговые команды

### 1. Подключение к серверу и переход в рабочую директорию

```bash
ssh user@your-server.com
cd ~/projects  # или любая другая директория
```

### 2. Клонирование репозитория

```bash
git clone https://github.com/letoceiling-coder/avangard-react.git
cd avangard-react
```

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

#### Вариант C: Развертывание на Apache сервере

После сборки проекта скопируйте `.htaccess` в директорию `dist`:

```bash
cp .htaccess dist/
```

Настройте Apache виртуальный хост (если есть доступ к конфигурации):

```apache
<VirtualHost *:80>
    ServerName your-domain.com
    DocumentRoot /home/user/projects/avangard-react/dist
    
    <Directory /home/user/projects/avangard-react/dist>
        Options -Indexes +FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
    
    ErrorLog ${APACHE_LOG_DIR}/avangard-react-error.log
    CustomLog ${APACHE_LOG_DIR}/avangard-react-access.log combined
</VirtualHost>
```

Или если используете `.htaccess` в директории `dist`, просто убедитесь, что:
- Включен `mod_rewrite` в Apache
- В конфигурации виртуального хоста разрешен `AllowOverride All`

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
cd ~/projects/avangard-react
git pull origin main
npm install  # если были изменения в package.json
npm run build
# Перезапустить сервер (если используется PM2: pm2 restart all)
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


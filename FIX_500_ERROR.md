# Исправление ошибки 500 при загрузке статических файлов

## Проблема
Файлы пытаются загрузиться с корня домена (`/assets/...`) вместо поддиректории (`/avangard-react/assets/...`)

## Решение

### Вариант 1: Пересборка проекта (рекомендуется)

Выполните на сервере:

```bash
cd ~/trendagent.siteaccess.ru/public_html/avangard-react
git pull origin main
npm install
npm run build
cp -r dist/. .
```

**Важно:** Убедитесь, что в `vite.config.ts` установлен `base: "/avangard-react/"`

### Вариант 2: Добавление правил в .htaccess в корне public_html

Если файлы все еще не работают, создайте `.htaccess` в корне `public_html/`:

```apache
# Редирект запросов к assets в avangard-react
RewriteEngine On
RewriteCond %{REQUEST_URI} ^/assets/(.*)$
RewriteRule ^assets/(.*)$ /avangard-react/assets/$1 [L]

# Редирект favicon
RewriteCond %{REQUEST_URI} ^/favicon\.ico$
RewriteRule ^favicon\.ico$ /avangard-react/favicon.ico [L]
```

### Вариант 3: Проверка структуры директорий

Убедитесь, что структура правильная:

```
public_html/
  ├── avangard-react/
  │   ├── index.html
  │   ├── assets/
  │   │   ├── index-*.js
  │   │   └── index-*.css
  │   ├── .htaccess
  │   └── ...
```

### Вариант 4: Использование символической ссылки

Если файлы находятся в `dist/`, создайте символическую ссылку:

```bash
cd ~/trendagent.siteaccess.ru/public_html
rm -rf avangard-react  # если уже существует
ln -s avangard-react/dist avangard-react
```

## Проверка

После исправления проверьте:
1. Откройте `https://trendagent.siteaccess.ru/avangard-react/`
2. В консоли браузера не должно быть ошибок 500
3. Файлы должны загружаться с пути `/avangard-react/assets/...`


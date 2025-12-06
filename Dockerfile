# ------------------------------
# 1. Image PHP officielle
# ------------------------------
FROM php:8.2-fpm

# ------------------------------
# 2. Install packages nécessaires
# ------------------------------
RUN apt-get update && apt-get install -y \
    build-essential \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    locales \
    zip \
    jpegoptim optipng pngquant gifsicle \
    vim \
    unzip \
    git \
    curl \
    libonig-dev \
    libxml2-dev \
    libzip-dev

# ------------------------------
# 3. Extensions PHP pour Laravel
# ------------------------------
RUN docker-php-ext-install pdo pdo_mysql mbstring zip exif pcntl bcmath gd

# ------------------------------
# 4. Installer Composer
# ------------------------------
COPY --from=composer:2.6 /usr/bin/composer /usr/bin/composer

# ------------------------------
# 5. Cloner le code dans /var/www
# ------------------------------
WORKDIR /var/www

COPY . .

# ------------------------------
# 6. Installer les dépendances Laravel
# ------------------------------
RUN composer install --optimize-autoloader --no-dev

# ------------------------------
# 7. Donner permissions (important)
# ------------------------------
RUN chown -R www-data:www-data /var/www \
    && chmod -R 775 storage \
    && chmod -R 775 bootstrap/cache

# ------------------------------
# 8. Exposer Render port obligatoire
# ------------------------------
EXPOSE 10000

# ------------------------------
# 9. Commande de démarrage
# ------------------------------
CMD php artisan migrate --force && php artisan serve --host=0.0.0.0 --port=10000

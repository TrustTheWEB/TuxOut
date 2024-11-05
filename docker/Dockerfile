# Usar la imagen base de PHP con Apache
FROM php:8.2-apache

# Instalar extensiones necesarias (por ejemplo, pdo)
RUN docker-php-ext-install pdo pdo_mysql

RUN apt-get update -y && apt-get install -y libpng-dev

RUN apt-get update && \
    apt-get install -y \
        zlib1g-dev 

RUN docker-php-ext-install gd

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /var/www/html

# Copiar todo el contenido desde el contexto del Dockerfile al directorio de trabajo en el contenedor
COPY . .
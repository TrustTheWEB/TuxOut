#!/bin/bash

# Configuraciones
DESTINO="/home/tuxout/respaldosSQL" 
FECHA=$(date +"%Y%m%d_%H%M%S")  # Incluyendo hora en el formato YYYYMMDD_HHMMSS

# Crear directorio de destino
mkdir -p "$DESTINO/$FECHA"

# Respaldo de base de datos
DB_USER="root"          
DB_PASSWORD="root"  
DB_NAME="tuxout"
DB_NAME_BO="tuxout_backoffice"

# Obtener la IP del contenedor de la base de datos
HOST=$(docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}')

# Realizar el respaldo de la base de datos
mysqldump -v --opt -h "$HOST" -P 33060 --compress --events --routines --triggers --default-character-set=utf8 -u "$DB_USER" -p"$DB_PASSWORD" --databases "$DB_NAME" "$DB_NAME_BO" > "$DESTINO/respaldo_db_$FECHA.sql"

echo "Respaldo de la base de datos completado: $$DESTINO/respaldo_db_$FECHA.sql"


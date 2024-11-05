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

function respaldo_completo {
    echo "Respaldando todas las bases de datos en un archivo completo..."
    mysqldump -v --opt -h "$HOST" -P 33060 --compress --events --routines --triggers --default-character-set=utf8 -u "$DB_USER" -p"$DB_PASSWORD" --databases "$DB_NAME" "$DB_NAME_BO" > "$DESTINO/respaldo_db_$FECHA.sql"
    if [ $? -eq 0 ]; then
        echo "Respaldo completo guardado en $DESTINO"
    else
        echo "Error al hacer el respaldo completo. Revisa el archivo backup_error.log para detalles."
    fi
}

function respaldo_estructura {
    echo "Respaldando todas las bases de datos en un archivo completo..."
    mysqldump -v --opt -h "$HOST" -P 33060 --compress --events --no-data --routines --triggers --default-character-set=utf8 -u "$DB_USER" -p"$DB_PASSWORD" --databases "$DB_NAME" "$DB_NAME_BO" > "$DESTINO/respaldo_estructura_$FECHA.sql"
    if [ $? -eq 0 ]; then
        echo "Respaldo completo guardado en $DESTINO"
    else
        echo "Error al hacer el respaldo completo. Revisa el archivo backup_error.log para detalles."
    fi
}

function restaurar_bd {
    read -p "Ingrese el nombre del archivo de respaldo que quieres restaurar (ej: respaldo_db_YYYYmmdd_HHMMSS.sql): " respaldo
    if [ -f "$DESTINO/$respaldo" ]; then
        mysql -h "$HOST" -P 33060 -u $DB_USER -p$DB_PASSWORD < "$DESTINO/$respaldo" 2>> "$DESTINO/restore_error.log"
        if [ $? -eq 0 ]; then
            echo "Base de datos restaurada desde $respaldo"
        else
            echo "Error al restaurar la base de datos. Revisa el archivo restore_error.log para detalles."
        fi
    else
        echo "Archivo de respaldo no encontrado en $DESTINO"
    fi
}

function realizar_consulta {
    read -p "Escribe la consulta SQL que quieres ejecutar: " consulta
    resultado=$(mysql -h "$HOST" -P 33060 -u "$DB_USER" -p"$DB_PASSWORD" -e "$consulta" 2>> "$DESTINO/query_error.log")
    if [ $? -eq 0 ]; then
        echo "Consulta ejecutada con éxito."
        echo "$resultado"
    else
        echo "Error al ejecutar la consulta. Revisa el archivo query_error.log para detalles."
    fi
}

function salir {
    echo "Saliendo..."
    exit
}

while true; do
    echo "============Menú Principal============="
    echo "1) Respaldo completo de la BD"
    echo "2) Respaldar la estructura de la BD"
    echo "3) Restaurar la base de datos"
    echo "4) Realizar consulta"
    echo "0) Salir"

    read -p "Selecciona una opción: " opcion

    case $opcion in
        1) respaldo_completo ;;
        2) respaldo_estructura ;;
        3) restaurar_bd ;;
        4) realizar_consulta ;;
        0) salir ;;
        *) echo "Opción no válida. Intenta de nuevo." ;;
    esac
done

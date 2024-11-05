#!/bin/bash

read -p "Ingrese el nombre del grupo a modificar: " grupo
read -p "Ingrese el nuevo nombre del grupo: " nuevo_grupo

if sudo groupmod -n "$nuevo_grupo" "$grupo"; then
    echo "Grupo '$grupo' modificado a '$nuevo_grupo' con éxito."
else
    echo "Error al modificar el grupo '$grupo'. Puede que no exista."
fi

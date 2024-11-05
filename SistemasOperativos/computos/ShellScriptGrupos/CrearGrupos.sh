#!/bin/bash

read -p "Ingrese el nombre del nuevo grupo: " grupo

if sudo groupadd "$grupo"; then
    echo "Grupo '$grupo' creado con éxito."
else
    echo "Error al crear el grupo '$grupo'. Puede que ya exista."
fi


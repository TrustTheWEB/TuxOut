#!/bin/bash

read -p "Ingrese el nombre del grupo a borrar: " grupo

if sudo groupdel "$grupo"; then
    echo "Grupo '$grupo' borrado con éxito."
else
    echo "Error al borrar el grupo '$grupo'. Puede que no exista."
fi


#!/bin/bash

read -p "Ingrese el nombre del grupo a buscar: " grupo

if getent group "$grupo" > /dev/null; then
    echo "El grupo '$grupo' existe."
else
    echo "El grupo '$grupo' no existe."
fi


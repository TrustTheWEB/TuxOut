#!/bin/bash

read -p "Ingrese el nombre de usuario a buscar: " username
if id "$username" &>/dev/null;then
	echo "El usuario $username existe en el sistema."
else
	echo "El usuario $username no existe."
fi

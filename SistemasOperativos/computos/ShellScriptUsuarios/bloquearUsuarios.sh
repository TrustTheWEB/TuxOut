#!/bin/bash

read -p "Ingrese el nombre de usuario a bloquear: " username
sudo passwd -l "$username" && echo "Usuario $username bloqueado." || echo "Error al bloquear el usuario."


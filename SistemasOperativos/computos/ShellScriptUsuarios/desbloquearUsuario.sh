#!/bin/bash

read -p "Ingrese el nombre de usuario a desbloquear: " username
sudo passwd -u "$username" && echo "Usuario $username desbloqueado." || echo  "Error al desbloquear al usuario."


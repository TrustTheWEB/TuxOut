#!/bin/bash

read -p "Ingrese el nombre a borrar: " username
sudo userdel "$username" && echo "Usuario $username eliminado." || echo "Error al eliminar usuario."


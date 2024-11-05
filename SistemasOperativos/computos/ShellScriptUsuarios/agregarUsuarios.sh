#!/bin/bash

read -p "Ingrese el nombre de usuario: " username
clear
sudo useradd "$username" && echo "Usuario $username agregado." || echo "Error al agregar usuario."

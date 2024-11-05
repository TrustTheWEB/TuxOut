#!/bin/bash

read -p "Ingrese el nombre de usuario para cambiar la contraseña: " username
sudo passwd "$username"

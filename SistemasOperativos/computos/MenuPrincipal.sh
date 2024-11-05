#!/bin/bash

base_path="/home/tuxout/SistemasOperativos/computos"

if [[ ! -d "$base_path" ]]; then
	echo "La ruta base $base_path no existe. Por favor, verifícala."
	exit 1
fi

function mostrar_menu_principal {
	clear
	echo "=============Menú Principal============="
	echo "1) Administrar los Usuarios"
	echo "2) Administrar Grupos"
	echo "3) Logins"
	echo "4) Respaldos DB"
	echo "5) Salir"
	echo ""
}

function ejecutar_menu {
	local carpeta=$1
	if [[ -f "$base_path/$carpeta/Menu.sh" ]];then
	bash "$base_path/$carpeta/Menu.sh"
	else
	echo "El menú de $carpeta no se encontró."
	fi
}

while true; do
	mostrar_menu_principal
	read -p "Seleccione una opción: " opcion
	case $opcion in
	1)
	ejecutar_menu "ShellScriptUsuarios"
	;;
	2)
	ejecutar_menu "ShellScriptGrupos"
	;;
	3)
	ejecutar_menu "LoginsScript"
	;;
	4)
	ejecutar_menu "DataBaseScript"
	;;
	5)
	echo "Saliendo..."
	exit 0
	;;
*)
	esac
done

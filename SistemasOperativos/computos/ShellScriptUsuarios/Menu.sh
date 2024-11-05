#!/bin/bash

ADD_USER_SCRIPT="/var/www/html/MenúPrincipal/ShellScriptUsuarios/agregarUsuarios.sh"
LIST_USERS_SCRIPT="/var/www/html/MenúPrincipal/ShellScriptUsuarios/listarUsuarios.sh"
SEARCH_USER_SCRIPT="/var/www/html/MenúPrincipal/ShellScriptUsuarios/buscarUsuarios.sh"
DELETE_USER_SCRIPT="/var/www/html/MenúPrincipal/ShellScriptUsuarios/borrarUsuarios.sh"
BLOCK_USER_SCRIPT="/var/www/html/MenúPrincipal/ShellScriptUsuarios/bloquearUsuarios.sh"
UNBLOCK_USER_SCRIPT="/var/www/html/MenúPrincipal/ShellScriptUsuarios/desbloquearUsuario.sh"
CHANGE_PASS_SCRIPT="/var/www/html/MenúPrincipal/ShellScriptUsuarios/cambiarContraseña.sh"

while true; do
	echo "================================="
	echo "	Menú de Usuarios"
	echo "================================="
	echo "1) Agregar usuario"
	echo "2) Listar usuarios"
	echo "3) Buscar usuario"
	echo "4) Borrar usuario"
	echo "5) Bloquear usuario"
	echo "6) Desbloquear usuario"
	echo "7) Agregar o cambiar contraseña"
	echo "8) Atrás"
	echo "================================="
	read -p "Seleccione una opción: " option

	case $option in
	1)
	bash "$ADD_USER_SCRIPT"
	;;
	2)
	bash "$LIST_USERS_SCRIPT"
	;;
	3)
	bash "$SEARCH_USER_SCRIPT"
	;;
	4)
	bash "$DELETE_USER_SCRIPT"
	;;
	5)
	bash "$BLOCK_USER_SCRIPT"
	;;
	6)
	bash "$UNBLOCK_USER_SCRIPT"
	;;
	7)
	bash "$CHANGE_PASS_SCRIPT"
	;;
	8)
	echo "Saliendo del programa."
	break
	;;
*)
	echo "Opción no válida. Intente de nuevo."
	;;
	esac
done

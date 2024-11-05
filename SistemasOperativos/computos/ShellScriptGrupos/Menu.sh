#!/bin/bash

CREAR_GRUPO_SCRIPT="./CrearGrupos.sh"
BORRAR_GRUPO_SCRIPT="./BorrarGrupos.sh"
LISTAR_GRUPOS_SCRIPT="./listarGrupos.sh"
BUSCAR_GRUPOS_SCRIPT="./BuscarGrupos.sh"
MODIFICAR_GRUPOS_SCRIPT="./ModificarGrupos.sh"

while true; do
	echo "============================="
	echo "	Menú de Grupos"
	echo "============================="
	echo "1) Crear grupo"
	echo "2) Borrar grupo"
	echo "3) Listar grupos"
	echo "4) Buscar grupo"
	echo "5) Modificar Grupos"
	echo "6) Salir"
	echo "============================="
	read -p "Seleccione una opción: " opcion

	case $opcion in
	1)
	bash "$CREAR_GRUPO_SCRIPT"
	;;
	2)
	bash "$BORRAR_GRUPO_SCRIPT"
	;;
	3)
	bash "$LISTAR_GRUPOS_SCRIPT"
	;;
	4)
	bash "$BUSCAR_GRUPOS_SCRIPT"
	;;
	5)
	bash "$MODIFICAR_GRUPOS_SCRIPT"
	;;
	6)
	break
	;;
*)
	echo "Opción no válida. Intente de nuevo."
	;;
	esac
done

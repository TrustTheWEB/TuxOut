#!/bin/bash

SUCCESS_SCRIPT="./success.sh"
FAILURE_SCRIPT="./failure.sh"
REPORT_SCRIPT="./report.sh"

while true; do
	echo "========================================"
	echo "	    Menú de Registro"
	echo "========================================"
	echo "1) Registrar logins exitosos"
	echo "2) Registrar logins fallidos"
	echo "3) Generar reportes de logs"
	echo "4) Salir"
	echo "========================================"
	read -p "Seleccione una opción: " option

	case $option in
	1)
	read -p "Ingrese el nombre de usuario para el login exitoso: " username
	bash "$SUCCESS_SCRIPT" "$username"
	echo "Login exitoso registrado para $username."
	;;
	2)
	read -p "Ingrese el nombre de usuario para el login fallido: " username
	bash "$FAILURE_SCRIPT" "$username"
	echo "Login fallido registrado para $username."
	;;
	3)
	bash "$REPORT_SCRIPT"
	echo "reporte generado y guardado en report.txt."
	;;
	4)
	echo "saliendo del programa."
	break
	;;
	*)
	echo "Opción no válida. Intente de nuevo."
	;;
	esac
done

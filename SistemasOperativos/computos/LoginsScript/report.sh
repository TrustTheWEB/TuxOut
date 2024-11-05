#!/bin/bash

generate_report(){
echo "Generando reporte de logs..."
echo "Logs de login exitoso:" > report.txt
grep "session opened for user" /var/log/auth.log >> report.txt
echo "" >> report.txt
echo "Logs de login fallidos:" >> report.txt
grep "Failed password" /var/log/auth.log >> report.txt
echo "Reporte guardado en report.txt"
}

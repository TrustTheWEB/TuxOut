#!/bin/bash

LOG_FILE="/var/log/login_success.log"

if [! -f"$LOG_FILE"];then
	touch "$LOG_FILE"
fi
echo "$(date)-Usuario: $1 - Login exitoso" >> "$LOG_FILE"

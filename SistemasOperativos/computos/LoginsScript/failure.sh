#!/bin/bash

LOG_FILE="/var/log/login_failure.log"

if[! -f"$LOG_FILE"];then
	touch"$LOG_FILE"
fi

echo "$(date) - Usuario: $1 - login fallido" >> "$LOG_FILE"

#!/bin/bash

echo "Usuarios en el sistema:"
cut -d: -f1 /etc/passwd

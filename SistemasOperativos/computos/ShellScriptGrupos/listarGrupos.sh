#!/bin/bash

echo "Lista de grupos:"
getent group | cut -d: -f1


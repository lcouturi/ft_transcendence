#!/bin/bash

echo "Waiting for postgres..."
sleep 5
echo "PostgreSQL started"

echo "Migrating database..."
python manage.py makemigrations --noinput
python manage.py migrate --noinput
echo "Migration done"

echo "Creating superuser"
python manage.py createsuperuser --noinput

echo "Collecting static files"

exec $@

#!/bin/bash

echo "Waiting for postgres..."
sleep 5
echo "PostgreSQL started"

echo "Migrating database..."
python manage.py makemigrations --noinput
python manage.py migrate --noinput
python manage.py collectstatic --noinput
echo "Migration done"

echo "Creating superuser"
python manage.py createsuperuser --username bob --email bob@gmail.com --noinput

echo "Collecting static files"

# Not ideal for production? What replacement?
python manage.py runserver 0.0.0.0:8000
# exec $@

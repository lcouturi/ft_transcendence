#!/bin/bash

while true; do
    if nc -z -w 2 $POSTGRES_HOST $POSTGRES_PORT; then
        echo -e "Postgres is up!"
        break
    else
        echo -e "Postgres isn't up...waiting..."
        sleep 2
    fi
done

echo "Migrating database..."
python manage.py makemigrations --noinput
python manage.py migrate --noinput
python manage.py collectstatic --noinput
echo "Migration done"

echo "Creating superuser"
python manage.py createsuperuser --username bob --email bob@gmail.com --noinput

echo "Collecting static files"

# Not ideal for production?
python manage.py runserver 0.0.0.0:8000

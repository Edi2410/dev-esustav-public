# eSustav

## Backend

(potrebno imati [python](https://www.python.org/downloads/) i [pip](https://www.geeksforgeeks.org/how-to-install-pip-on-windows/))
Pozicionirat se u backend folder:

`cd backend`

Kreiranje python virtualnog env za aplikaciju ([docs](https://docs.python.org/3/tutorial/venv.html)):

`python -m venv env `

Ulazak u environment:

windows: `./env/scripts/activate`
mac: `source ./env/bin/activate`

Instaliranje requirements-a

`pip install -r requirements.txt`

Kreairanje migracija i pokretanje migracija da bi se kreirala baza. (Lokalna baza je podignuta na repo. Ovaj korak možda neće imat nekog efekta):

`python manage.py makemigrations`
`python manage.py migrate`

Kreiranje superusera za pristup admin pagu:

`python manage.py createsuperuser`

Pokretanje localnog servera:

`python manage.py runserver`

## Frontend 

(potrebno imati instaliran [NodeJs](https://nodejs.org/en/download/current))

Pozicioniranje u frontend folder

`cd frontend`

Instalirati requirements:

`npm install`

Pokretanje lokalnog servera:

`npm start`


Ulazak u bazu "psql -U {dbname}"

"tesdf"
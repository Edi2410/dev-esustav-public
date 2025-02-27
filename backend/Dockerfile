FROM python:3.10

ENV PYTHONUNBUFFERED=1
WORKDIR /app/backend

RUN apt-get update 

# install dependencies
COPY ./requirements.txt .
RUN pip install gunicorn
RUN pip install -r requirements.txt
RUN pip install 'django-allauth[socialaccount]'

COPY . .
RUN ["chmod", "+x", "wsgi-entrypoint.sh"]
ENTRYPOINT ["sh", "wsgi-entrypoint.sh"]

FROM node:19-alpine

WORKDIR /app

COPY package.json package-lock.json /

RUN apk add -q --no-cache bash

RUN npm ci

COPY . /app

ENTRYPOINT ["/bin/bash", "/app/run.sh"]
CMD ["start"]

FROM node:16

WORKDIR /app


COPY ./package.json ./

COPY ./package-lock.json ./

COPY ./.env ./

RUN npm install 

COPY . .

EXPOSE 8000

CMD [ "npm", "run", "start" ]
FROM node:alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run compile

EXPOSE 4000

CMD npm run compile && node ./dist/index.js

FROM node:alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN chmod +x /usr/src/app/start.sh

EXPOSE 4000

CMD ["./start.sh"]

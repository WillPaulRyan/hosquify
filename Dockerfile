FROM node:12

WORKDIR /home/node/hosquify

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
FROM node:22-alpine

RUN npm install -g nodemon

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 5000
# required for docker desktop port mapping

CMD ["node", "app.js"]
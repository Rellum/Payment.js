FROM node

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install && npm i typescript && cat package.json

COPY . .

RUN npm run build:server && npm run build:client

CMD [ "npm", "run", "build:and:start" ]
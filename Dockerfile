FROM node:16.18.0-alpine

ARG PORT
ENV ENV_PORT=$PORT

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install

COPY --chown=node:node . .

RUN npm run build

USER node

EXPOSE $ENV_PORT

CMD ["node", "build/app.js"]

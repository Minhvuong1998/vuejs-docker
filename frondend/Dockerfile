FROM node:lts

WORKDIR /app

# EXPOSE 5000

COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock

COPY . /app

RUN yarn install



RUN yarn build
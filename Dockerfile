FROM node
RUN mkdir -p /usr/src
WORKDIR /usr/src
COPY . /usr/src
RUN npm install
EXPOSE 3000
ENTRYPOINT node target/server.js

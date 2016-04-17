FROM node
RUN mkdir -p /usr/src
WORKDIR /usr/src
EXPOSE 3000
ENTRYPOINT node src/server.js

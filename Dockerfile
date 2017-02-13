FROM node
EXPOSE 3000
RUN mkdir -p /usr/src
WORKDIR /usr/src
ENTRYPOINT npm install

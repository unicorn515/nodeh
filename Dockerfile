FROM node
RUN mkdir -p /usr/src
WORKDIR /usr/src
COPY . /usr/src
RUN npm install webpack-dev-server -g
RUN npm install
EXPOSE 3000
ENTRYPOINT webpack-dev-server

FROM node:8.1.2 
EXPOSE 7777

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install

COPY .babelrc /usr/src/app/
CMD ["npm", "start"]

VOLUME /usr/src/app/src/
FROM node:carbon

#Create working directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install

COPY . . 

EXPOSE 8080

CMD ["npm", "start"]
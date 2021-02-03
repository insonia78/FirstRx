FROM node:alpine

WORKDIR /location
COPY package.json .
RUN npm install
RUN npm install first-rx-common-lib  
COPY . .

CMD ["npm", "start"]
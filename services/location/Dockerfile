FROM node:alpine

WORKDIR /location
COPY package.json .
RUN npm install  
COPY . .

CMD ["npm", "start"]
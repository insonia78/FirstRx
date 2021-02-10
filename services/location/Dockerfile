FROM 658310991765.dkr.ecr.us-east-1.amazonaws.com/node:alpine

WORKDIR /location
COPY package.json .
RUN npm install
RUN npm install first-rx-common-lib  
COPY . .

EXPOSE 5000

CMD ["npm", "start"]
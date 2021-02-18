FROM 658310991765.dkr.ecr.us-east-1.amazonaws.com/node:alpine

WORKDIR /coupon
COPY package.json .
RUN npm install 
COPY . .

EXPOSE 6000

CMD ["npm", "start"]
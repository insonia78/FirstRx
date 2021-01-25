FROM 658310991765.dkr.ecr.us-east-1.amazonaws.com/node:alpine

WORKDIR /app
COPY package.json .
RUN npm install --only=prod
COPY . .

EXPOSE 4000

CMD ["npm", "start"]
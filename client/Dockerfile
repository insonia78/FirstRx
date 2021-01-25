FROM 658310991765.dkr.ecr.us-east-1.amazonaws.com/node:alpine

WORKDIR /app
COPY package.json .
RUN npm install --legacy-peer-deps
COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
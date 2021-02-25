FROM 658310991765.dkr.ecr.us-east-1.amazonaws.com/node:alpine

WORKDIR /text-messages
ARG TWILLO_PHONENUMBER_ARG=+17792446842
ENV TWILLO_PHONENUMBER $TWILLO_PHONENUMBER_ARG
COPY package.json .
RUN npm install  
COPY . .

EXPOSE 7000

CMD ["npm", "start"]
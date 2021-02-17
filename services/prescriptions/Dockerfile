FROM node:alpine

WORKDIR /prescriptions

ARG MEDIMPACT_URL_ARGS=https://rxsavings-ws.medimpact.com/cashcard-ws-v1_0/soap/cashcard

ENV MEDIMPACT_URL $MEDIMPACT_URL_ARGS

COPY package.json .
RUN npm install 
COPY . .

CMD ["npm", "start"]
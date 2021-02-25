FROM 658310991765.dkr.ecr.us-east-1.amazonaws.com/node:alpine

WORKDIR /prescriptions
ARG MEDIMPACT_CLIENT_CODE_ARG=MIC61
ARG MEDIMPACT_URL_ARGS=https://rxsavings-ws.medimpact.com/cashcard-ws-v1_0/soap/cashcard

ENV MEDIMPACT_URL $MEDIMPACT_URL_ARGS
ENV MEDIMPACT_APIKEY = $APIKEYS
ENV MEDIMPACT_CLIENT_CODE=$MEDIMPACT_CLIENT_CODE_ARG 
RUN echo 'APY=${MEDIMPACT_APIKEY}}'
COPY package.json .
RUN npm install 
COPY . .

EXPOSE 4000

CMD ["npm", "start"]
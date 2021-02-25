FROM node:alpine
WORKDIR /location
ARG GOOGLE_GEOCODE_URL_ARGS=https://maps.googleapis.com/maps/api/geocode/json
ARG GOOGLE_PLACE_URL_ARGS=https://maps.googleapis.com/maps/api/place/autocomplete/json
ARG NATS_URL_ARG=""
ARG NATS_CLIENT_ID_ARGS=""
ARG NATS_CLUSTER_ID_ARG=location


ENV NATS_URL $NATS_URL_ARG
ENV NATS_CLIENT_ID $NATS_CLIENT_ID_ARGS
ENV NATS_CLUSTER_ID $NATS_CLUSTER_ID_ARG

ENV GOOGLE_GEOCODE_URL $GOOGLE_GEOCODE_URL_ARGS
ENV GOOGLE_PLACE_URL $GOOGLE_PLACE_URL_ARGS

COPY package.json .
RUN npm install
RUN npm install first-rx-common-lib  
COPY . .

EXPOSE 5000

CMD ["npm", "start"]
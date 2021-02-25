FROM 658310991765.dkr.ecr.us-east-1.amazonaws.com/node:alpine

ARG GOOGLE_GEOCODE_URL_ARGS=https://maps.googleapis.com/maps/api/geocode/json
ARG GOOGLE_PLACE_URL_ARGS=https://maps.googleapis.com/maps/api/place/autocomplete/json

ENV GOOGLE_GEOCODE_URL $GOOGLE_GEOCODE_URL_ARGS
ENV GOOGLE_PLACE_URL $GOOGLE_PLACE_URL_ARGS
WORKDIR /location
COPY package.json .
RUN npm install
RUN npm install first-rx-common-lib  
COPY . .

EXPOSE 5000

CMD ["npm", "start"]
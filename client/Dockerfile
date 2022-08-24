#Specify a base image
#FROM node:alpine
FROM node:18.0.0-alpine



#Install some dependencies

WORKDIR /usr/app/shopee_be
COPY ./package.json ./

RUN npm install -f
COPY ./ ./


# Default command

CMD ["npm","start"]
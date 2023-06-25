FROM node:alpine
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
# CMD runs when the image is built
CMD [ "npm", "start" ] 
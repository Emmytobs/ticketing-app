FROM node:alpine
WORKDIR /app
COPY package.json .
RUN npm install --omit=dev
COPY . .
# CMD runs when the image is built
CMD [ "npm", "start" ] 
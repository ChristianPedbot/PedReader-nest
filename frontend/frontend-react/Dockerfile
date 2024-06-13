FROM node:18.17.1

WORKDIR /usr/src/app/frontend/frontend-react

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8000

CMD ["npm", "start"]

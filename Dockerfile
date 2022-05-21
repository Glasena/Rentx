<<<<<<< HEAD
FROM node

WORKDIR /usr/app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3333

=======
FROM node

WORKDIR /usr/app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3333

>>>>>>> ff3272bc2d6b8c57412e88a2a89dea0e91dce09f
CMD ["npm","run","dev"]
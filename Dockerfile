FROM node:argon
RUN mkdir /app
COPY . /app
WORKDIR /app
RUN npm install
EXPOSE 1198 
CMD ["npm", "start"]

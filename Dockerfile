FROM node:8.11.1-alpine

WORKDIR /usr/src/app

VOLUME [ "/usr/src/app" ]

RUN npm install -g nodemon

ENV NODE_ENV=development
ENV DATABASE=mongodb://mongodb:27017/playground
ENV PORT=3000
ENV TOKEN_SECRET=0950388978644ECB97EADA99420820FE5C009C1539FB448E855CD76D45534B69

EXPOSE 3000

CMD [ "nodemon", "-L", "src/index.js" ]

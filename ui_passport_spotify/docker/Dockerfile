FROM node:21-alpine
RUN mkdir -p /spotify-insights/ui_passport_spotify
WORKDIR /spotify-insights/ui_passport_spotify
COPY app.js app.js
#COPY config.env config.env
COPY passport.js passport.js
COPY server.js server.js
COPY package.json package.json
RUN npm install
COPY controllers controllers
COPY routers routers
COPY docker/entrypoint.sh entrypoint.sh
CMD [ "/spotify-insights/ui_passport_spotify/entrypoint.sh" ]

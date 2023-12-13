FROM node:21-alpine
RUN mkdir -p /spotify-insights/ui_frontend
WORKDIR /spotify-insights/ui_frontend
COPY package.json package.json
RUN npm install
COPY src src
COPY public public
COPY postcss.config.js postcss.config.js
COPY tailwind.config.js tailwind.config.js
COPY docker/entrypoint.sh entrypoint.sh
CMD [ "/spotify-insights/ui_frontend/entrypoint.sh" ]

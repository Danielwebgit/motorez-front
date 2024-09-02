FROM node:18-alpine AS build

ARG user=DanielSystem&motorez
ARG uid=1000

RUN apk update && rm -rf /var/cache/apk/*

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:18-alpine AS runtime

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

COPY --from=build /app/.next ./.next

COPY --from=build /app/public ./public

ENV HOST=141.147.82.217
USER node
CMD ["npm", "start"]
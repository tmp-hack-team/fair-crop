FROM node:20-alpine AS base
RUN npm i --global pnpm
COPY ./package.json pnpm-lock.yaml /app/
WORKDIR /app
RUN pnpm install
COPY . /app/
RUN pnpm run build
CMD ["pnpm", "run", "start"]

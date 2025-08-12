FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

# Cài pnpm trước
RUN npm install -g pnpm

# Cài dependencies
RUN pnpm install

COPY . .

RUN pnpm build

EXPOSE 3000

CMD ["pnpm", "start"]

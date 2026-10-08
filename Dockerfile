FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

FROM deps AS build
COPY . .
RUN npm run build

FROM node:22-alpine AS production
ENV NODE_ENV=production
ENV PORT=80
ENV HOSTNAME=0.0.0.0
WORKDIR /app
# Owned by `node` so the runtime can write .next/cache (image optimizer, ISR).
COPY --from=build --chown=node:node /app/.next/standalone ./
COPY --from=build --chown=node:node /app/.next/static ./.next/static
COPY --from=build --chown=node:node /app/public ./public
# Unprivileged; Docker sets ip_unprivileged_port_start=0, so :80 still binds.
USER node
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
  CMD node -e "require('http').get('http://localhost:80/',r=>process.exit(r.statusCode<500?0:1)).on('error',()=>process.exit(1))"
CMD ["node", "server.js"]

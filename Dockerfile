FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

FROM deps AS build
# The subscribe form's provider endpoint. Needed here rather than in the runtime
# stage because the homepage is prerendered, so `next build` is what bakes it in;
# an env var supplied to the running container arrives long after the HTML exists.
# Left empty the box renders disabled, which is a valid state, so this is not a
# required argument.
ARG NEWSLETTER_ENDPOINT=""
ENV NEWSLETTER_ENDPOINT=$NEWSLETTER_ENDPOINT
COPY . .
RUN npm run build

FROM node:20-alpine AS production
ENV NODE_ENV=production
ENV PORT=80
ENV HOSTNAME=0.0.0.0
WORKDIR /app
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
  CMD node -e "require('http').get('http://localhost:80/',r=>process.exit(r.statusCode<500?0:1)).on('error',()=>process.exit(1))"
CMD ["node", "server.js"]

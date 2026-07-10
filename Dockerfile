FROM node:20-slim AS build
WORKDIR /app

COPY ecommerce-client/package*.json ecommerce-client/
RUN cd ecommerce-client && npm ci

COPY ecommerce-client/ ecommerce-client/
# create-react-app treats lint warnings as errors when CI=true.
RUN cd ecommerce-client && CI=false npm run build


FROM node:20-slim
WORKDIR /app

ENV NODE_ENV=production \
    PORT=5000

COPY ecommerce-server/package*.json ecommerce-server/
RUN cd ecommerce-server && npm ci --omit=dev

COPY ecommerce-server/ ecommerce-server/
COPY --from=build /app/ecommerce-client/build ecommerce-client/build

EXPOSE 5000

CMD ["node", "ecommerce-server/index.js"]

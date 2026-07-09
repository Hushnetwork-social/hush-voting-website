# syntax=docker/dockerfile:1

FROM node:22-alpine AS deps
WORKDIR /app
RUN corepack enable
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

FROM deps AS build
WORKDIR /app
COPY . .
ARG APP_VERSION=local
ARG NEXT_PUBLIC_SITE_URL=https://www.hushvoting.com
ARG NEXT_PUBLIC_APP_BASE_URL=https://app.hushvoting.com
ARG NEXT_PUBLIC_MARKETING_BASE_URL=https://www.hushvoting.com
ARG NEXT_PUBLIC_GRPC_URL=https://api.hushnetwork.social
ENV APP_VERSION=${APP_VERSION}
ENV NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL}
ENV NEXT_PUBLIC_APP_BASE_URL=${NEXT_PUBLIC_APP_BASE_URL}
ENV NEXT_PUBLIC_MARKETING_BASE_URL=${NEXT_PUBLIC_MARKETING_BASE_URL}
ENV NEXT_PUBLIC_GRPC_URL=${NEXT_PUBLIC_GRPC_URL}
RUN pnpm build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=80
ENV NITRO_HOST=0.0.0.0
ENV NITRO_PORT=80
COPY --from=build /app/.output ./.output
EXPOSE 80
CMD ["node", ".output/server/index.mjs"]

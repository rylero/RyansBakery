FROM node:22-bookworm-slim AS build
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package.json .
COPY pnpm-lock.yaml .
COPY tsconfig.json .
COPY svelte.config.js .
COPY vite.config.ts .

# Install dependencies
RUN pnpm install

# Copy the rest of the app files
COPY . .

# Build the SvelteKit app
RUN pnpm run build

# Expose the port for Cloud Run
EXPOSE 3000

CMD ["pnpm", "run", "start"]
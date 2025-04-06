# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
docker run -it --rm -v $(pwd):/nuxt -u $(id -u):$(id -g) -w /nuxt node:20 npm install
```

## Development Server

Start the development server on `http://0.0.0.0:3000`:

```bash
# npm
docker run -it --rm -v $(pwd):/nuxt -u $(id -u):$(id -g) --network=swp_network --env TZ=$(cat /etc/timezone) --name nuxt -w /nuxt -p 3000:3000 node:20 npm run dev -- --host 0.0.0.0
```

## SSG

```bash
# npm
docker run -it --rm -v $(pwd):/nuxt -u $(id -u):$(id -g) --name nuxt -w /nuxt node:20 npm run generate
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

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
docker run -it --rm -v $(pwd):/nuxt -u $(id -u):$(id -g) --env TZ=$(cat /etc/timezone) --name nuxt -w /nuxt -p 3000:3000 node:20 npm run dev -- --host 0.0.0.0
```

## SSG

```bash
docker run -it --rm -v $(pwd):/nuxt -u $(id -u):$(id -g) --name nuxt -w /nuxt node:20 npm run generate
```

# Serve static with Nginx

```aiignore
docker run --rm \
  -v $(pwd)/.output:/var/lib/html/.output:ro \
  -v $(pwd)/.nuxt:/var/lib/html/.nuxt:ro \
  -v $(pwd)/default.conf:/etc/nginx/conf.d/default.conf:ro \
  -p 80:80 \
  -w /var/lib/html \
  nginx
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

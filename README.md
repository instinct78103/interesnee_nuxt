# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
docker run -it --rm \
  -e HOME=/nuxt \
  -v $(pwd):/nuxt \
  -u $(id -u):$(id -g) -w /nuxt \
  node:22 npm install
```

## Development Server

Start the development server on `http://0.0.0.0:3000`:

```bash
docker run -it --rm \
  -v $(pwd):/nuxt \
  -v $(pwd)/.npm:/nuxt/.npm \
  -u $(id -u):$(id -g) \
  -e HOME=/nuxt \
  -e API_BASE_URL=http://192.168.88.113:81 \
  --env TZ=$(cat /etc/timezone) \
  --name nuxt -w /nuxt -p 3000:3000 \
  node:22 npm run dev -- --host 0.0.0.0
```

## SSG

```bash
docker run -it --rm -e HOME=/nuxt \
  -v $(pwd):/nuxt \
  -u $(id -u):$(id -g) --name nuxt \
  -e API_BASE_URL=http://192.168.88.113:81 \
  -w /nuxt \
  node:22 npm run generate
```

# Serve static with Nginx

```aiignore
docker run --rm \
  -v $(pwd)/.output:/var/lib/html/.output:ro \
  -v $(pwd)/.nuxt:/var/lib/html/.nuxt:ro \
  -v $(pwd)/public:/var/lib/html/public:ro \
  -v $(pwd)/default.conf:/etc/nginx/conf.d/default.conf:ro \
  -e API_URL=http://php_simple \
  --network=interesnee_network \
  -p 80:80 \
  -w /var/lib/html \
  nginx
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

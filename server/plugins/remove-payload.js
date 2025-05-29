//todo: this code doesn't work (somewhere in the if-condition)

export default defineNitroPlugin((nitroApp) => {
    nitroApp.hooks.hook('render:html', (html, { event }) => {
        const route = event.path

        if (route.startsWith('/board/')) {
            html.body = html.body.filter((tag) => {
                // Skip non-script tags
                if (tag.tag !== 'script') return true

                // Remove inline window.__NUXT__ = ...
                if (typeof tag.children === 'string' && tag.children.includes('window.__NUXT__')) {
                    return false
                }

                // Remove JSON payload script
                return !(tag.attrs?.id === '__NUXT__' && tag.attrs?.type === 'application/json');
            })
        }
    })
})
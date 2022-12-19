import { loadState } from "./localStorage"

export const authorizedFetch = (url, options) => {
    if (!options) { options = {} }
    if (!options.headers) { options.headers = {} }
    if (!options.headers.Authorization) {
        options.headers['Content-Type'] = 'application/json'
        options.headers.Authorization = loadState('session') ? `Bearer ${loadState('session')?.jwtToken}` : undefined
    }
    return fetch(url, options)
}
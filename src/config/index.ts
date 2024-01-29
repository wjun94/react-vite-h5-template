const config = {
  cdn: import.meta.env.VITE_STATIC_PATH,
  prefix: import.meta.env.DEV ? import.meta.env.VITE_API_HOST : import.meta.env.VITE_HTTP_API
}

export default config
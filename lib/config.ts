//this file is just to make the env variables from the  env file easily reuable since they are soo... big

const config = {
  env: {
    apiEndpoint: process.env.NEXT_PUBLIC_API_ENDPOINT!, //this is your backends endpoint, all requests from frontend are made to this and then are rerouted to their respective stuff.

    prodApiEndpoint: process.env.NEXT_PUBLIC_PROD_API_ENDPOINT!,

    imagekit: {
      urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
      publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
    },

    databaseUrl: process.env.DATABASE_URL!,

    upstash: {
      redisUrl: process.env.UPSTASH_REDIS_URL!,
      redisToken: process.env.UPSTASH_REDIS_TOKEN!,
      qstashUrl: process.env.QSTASH_URL!,
      qstashToken: process.env.QSTASH_TOKEN!,
    },

    resendToken: process.env.RESEND_TOKEN!,
  },
};

export default config;

//this file is just to make the env variables from the  env file easily reuable since they are soo... big

const config = {
  env: {
    apiEndpoint: process.env.NEXT_PUBLIC_API_ENDPOINT!, //this is your backends endpoint, all requests from frontend are made to this and then are rerouted to their respective stuff.
    imagekit: {
      urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
      publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
    },

    databaseUrl: process.env.DATABASE_URL!,
  },
};

export default config;

import { AppDataSource } from "./data-source"
import Fastify from "fastify"
import routes from './routes/root'
import auth from './plugins/auth'

const fastify = Fastify({
    logger: true
});

fastify.register(require('@fastify/jwt'), {
    secret: 'supersecret'
});
fastify.register(auth)
fastify.register(routes)

AppDataSource.initialize().then(async () => {
    console.log("App datasource initialized.");
    fastify.listen({ port: 3000 }, (err, address) => {
        if (err) {
            console.error(err)
            process.exit(1)
        }
        console.log(`Server listening at ${address}`)

    })
}).catch(error => console.log(error))


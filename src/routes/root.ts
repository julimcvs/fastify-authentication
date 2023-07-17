import { AuthService } from "../service/authService"

const routes = async (fastify) => {
    const authService = new AuthService;

    fastify.post('/login', { preHandler: [fastify.login] }, (req, reply) => {
    })

    fastify.get('/protected', { preHandler: [fastify.authenticate] }, async function (request, reply) {
    })

    fastify.post('/register', (req, reply) => {
        authService.register(req, reply, fastify);
    })
}

export default routes;
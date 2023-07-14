const routes = async (fastify) => {
    console.log('routing');
    
    fastify.post('/login', {onRequest: [fastify.login]}, (req, reply) => {
    })

    fastify.get('/protected', {onRequest: [fastify.authenticate]}, async function (request, reply) {
    })
}

export default routes;

import { User } from "../entity/User"
import { UserDTO } from "../model/UserDTO"

const fp = require("fastify-plugin")

export default fp(async function (fastify, opts) {
    fastify.decorate("authenticate", async function(request, reply) {
        try {
          await request.jwtVerify()
        } catch (err) {
          reply.send(err)
        }
      })

      
      fastify.decorate("login", async function(req, reply) {
        const userDto: UserDTO = req.body;
        console.log(req.body);
        try {
            const user: User | undefined = await User.findOneBy({email: userDto.email});
            if (user) {
              const token = fastify.jwt.sign({
                "email": userDto.email,
                "password": userDto.password
              })
              reply.send({ token })
            }
            reply.status(401).send("Invalid username or password")
        } catch (err) {
          reply.send(err)
        }
      })
})

import { User } from "../entity/User"

import bcrypt from 'bcrypt'
import { UserRegisterDTO } from "../model/userRegisterDTO"
import { UserDTO } from "../model/userDTO"

const fp = require("fastify-plugin")

export default fp(async function (fastify, opts) {
  fastify.decorate("authenticate", async function (request, reply) {
    try {
      await request.jwtVerify()
    } catch (err) {
      reply.send(err)
    }
  })


  fastify.decorate("login", async function (req, reply) {
    const userDto: UserDTO = req.body;
    try {
      const user: User | undefined = await User.findOneBy({ email: userDto.email });
      if (user && await bcrypt.compare(user.password && userDto.password)) {
        const token = fastify.jwt.sign({
          "email": userDto.email,
          "password": userDto.password
        })
        reply.send({ token })
      }
      reply.status(401).send({ message: "Invalid username or password" })
    } catch (err) {
      reply.send(err)
    }
  })

})
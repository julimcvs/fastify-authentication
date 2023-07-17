import { User } from "../entity/User";
import { UserRegisterDTO } from "../model/userRegisterDTO";
const bcrypt = require('bcrypt')

export class AuthService {
    async register(req, reply, fastify) {
        const userDto: UserRegisterDTO = req.body;
        if (await this.validateUser(userDto, reply)) {
            const salt = await bcrypt.genSaltSync(12);
            const hash = await bcrypt.hashSync(userDto.password, salt);
            const user = new User();
            user.email = userDto.email;
            user.name = userDto.name;
            user.password = hash;
            await user.save();
            const token = fastify.jwt.sign({
                "email": userDto.email,
                "password": userDto.password
            })
            reply.status(201).send({ token: token })
        }
    }

    private async validateUser(userDto: UserRegisterDTO, reply) {
        if (userDto.password !== userDto.confirmPassword) {
            reply.status(400).send({ message: "Informed passwords do not match." })
            return false
        }
        const existingUser = await User.findOneBy({ email: userDto.email });
        if (existingUser) {
            reply.status(400).send({ message: "This user is already registered." })
            return false
        }
        return true
    }
}
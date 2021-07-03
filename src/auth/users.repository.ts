import { BadRequestException, NotFoundException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { User } from "./user.entity";
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentialsDto: AuthCredentialsDto) : Promise<User>{
    const { username, password } = authCredentialsDto;

    const existedUser = await this.findOne({ username });

    if (existedUser) {
      throw new BadRequestException('Username already exists'); 
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User();
    user.username = username;
    user.password = hashedPassword;

    await user.save();

    delete user.password;

    return user;
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<User>{
    const { username, password } = authCredentialsDto;
    
    const user = await this.findOne({ username });

    if (user && await user.validatePassword(password)) { 
      return user;
    }

    return null;
  }
}
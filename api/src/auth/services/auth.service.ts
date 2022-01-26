import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { from, map, Observable } from 'rxjs';
import { User } from 'src/user/models/user.interface';
import { UserService } from 'src/user/service/user.service';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
  ) // private userService: UserService,
  {}

  generateJwt(user: User): Observable<string> {
    return from(this.jwtService.signAsync({ user }));
  }

  hashPassword(password: string): Observable<string> {
    return from<string>(bcrypt.hash(password, 12));
  }

  comparePasswords(newPassword: string, passwortHash: string): Observable<any> {
    return from(bcrypt.compare(newPassword, passwortHash));
  }
  // async validateUser(email: string, password: string): Promise<any> {
  //   const user = await this.userService.findUser(email).pipe(
  //     map((user: User) => {
  //       if (user && user.password === password) {
  //         const { password, ...resualt } = user;
  //         return resualt;
  //       }
  //       return null;
  //     }),
  //   );
  // }
}

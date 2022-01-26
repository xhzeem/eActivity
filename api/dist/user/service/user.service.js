"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const auth_service_1 = require("../../auth/services/auth.service");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../models/user.entity");
const nestjs_typeorm_paginate_1 = require("nestjs-typeorm-paginate");
let UserService = class UserService {
    constructor(userRepository, authService) {
        this.userRepository = userRepository;
        this.authService = authService;
    }
    create(user) {
        return this.authService.hashPassword(user.password).pipe(operators_1.switchMap((passwordHash) => {
            const newUser = new user_entity_1.UserEntity();
            newUser.name = user.name;
            newUser.username = user.username;
            newUser.email = user.email;
            newUser.password = passwordHash;
            newUser.role = user.role;
            return rxjs_1.from(this.userRepository.save(newUser)).pipe(operators_1.map((user) => {
                const { password } = user, result = __rest(user, ["password"]);
                return result;
            }), operators_1.catchError((err) => rxjs_1.throwError(err)));
        }));
    }
    findOne(id) {
        return rxjs_1.from(this.userRepository.findOne({ id })).pipe(operators_1.map((user) => {
            const { password } = user, result = __rest(user, ["password"]);
            return result;
        }));
    }
    findUser(email) {
        return rxjs_1.from(this.userRepository.findOne({ email })).pipe(operators_1.map((user) => {
            return user;
        }));
    }
    findAll() {
        return rxjs_1.from(this.userRepository.find()).pipe(operators_1.map((users) => {
            users.forEach(function (v) {
                delete v.password;
            });
            return users;
        }));
    }
    paginate(options) {
        return rxjs_1.from(nestjs_typeorm_paginate_1.paginate(this.userRepository, options)).pipe(operators_1.map((usersPageable) => {
            usersPageable.items.forEach(function (v) {
                delete v.password;
            });
            return usersPageable;
        }));
    }
    deleteOne(id) {
        return rxjs_1.from(this.userRepository.delete(id));
    }
    updateOne(id, user) {
        delete user.email;
        delete user.password;
        delete user.role;
        return rxjs_1.from(this.userRepository.update(id, user)).pipe(operators_1.switchMap(() => this.findOne(id)));
    }
    updateRoleOfUser(id, user) {
        return rxjs_1.from(this.userRepository.update(id, user));
    }
    login(user) {
        return this.validateUser(user.email, user.password).pipe(operators_1.switchMap((user) => {
            if (user) {
                return this.authService
                    .generateJwt(user)
                    .pipe(operators_1.map((jwt) => jwt));
            }
            else {
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Email, Or Password is Wrong',
                }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }));
    }
    validateUser(email, password) {
        return rxjs_1.from(this.userRepository.findOne({ email }, {
            select: [
                'id',
                'name',
                'bio',
                'username',
                'email',
                'password',
                'role',
                'avatar',
            ],
        })).pipe(operators_1.switchMap((user) => this.authService.comparePasswords(password, user.password).pipe(operators_1.map((match) => {
            if (match) {
                const { password } = user, result = __rest(user, ["password"]);
                return result;
            }
            else {
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Credentials incorrect',
                }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }))));
    }
    findByMail(email) {
        return rxjs_1.from(this.userRepository.findOne({ email }));
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        auth_service_1.AuthService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map
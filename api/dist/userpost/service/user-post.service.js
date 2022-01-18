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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPostService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const rxjs_1 = require("rxjs");
const user_service_1 = require("../../user/service/user.service");
const post_entry_entity_1 = require("../model/post-entry.entity");
const typeorm_2 = require("typeorm");
const operators_1 = require("rxjs/operators");
const nestjs_typeorm_paginate_1 = require("nestjs-typeorm-paginate");
let UserPostService = class UserPostService {
    constructor(postRepository, userService) {
        this.postRepository = postRepository;
        this.userService = userService;
    }
    create(user, postEntry) {
        postEntry.author = user;
        return rxjs_1.from(this.postRepository.save(postEntry));
    }
    paginateAll(options) {
        return rxjs_1.from(nestjs_typeorm_paginate_1.paginate(this.postRepository, options, {
            relations: ['author'],
            order: { id: 'DESC' },
        })).pipe(operators_1.map((postEntry) => postEntry));
    }
    findAll() {
        return rxjs_1.from(this.postRepository.find({
            relations: ['author'],
            order: { id: 'DESC' },
        }));
    }
    findOne(id) {
        return rxjs_1.from(this.postRepository.findOne({ id }, { relations: ['author'] }));
    }
    updateOne(id, postEntry) {
        return rxjs_1.from(this.postRepository.update(id, postEntry)).pipe(operators_1.switchMap(() => this.findOne(id)));
    }
    deleteOne(id) {
        return rxjs_1.from(this.postRepository.delete(id));
    }
    addlike() {
    }
};
UserPostService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(post_entry_entity_1.PostEntryEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        user_service_1.UserService])
], UserPostService);
exports.UserPostService = UserPostService;
//# sourceMappingURL=user-post.service.js.map
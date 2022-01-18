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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserIsAuthorGuard = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
const user_interface_1 = require("../../user/models/user.interface");
const user_service_1 = require("../../user/service/user.service");
const user_post_service_1 = require("../service/user-post.service");
let UserIsAuthorGuard = class UserIsAuthorGuard {
    constructor(userService, postService) {
        this.userService = userService;
        this.postService = postService;
    }
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const params = request.params;
        const blogEntryId = Number(params.id);
        const user = request.user;
        return this.userService.findOne(user.id).pipe(operators_1.switchMap((user) => this.postService.findOne(blogEntryId).pipe(operators_1.map((postEntry) => {
            let hasPermission = false;
            if (user.id === postEntry.author.id) {
                hasPermission = true;
            }
            else if (user_interface_1.UserRole.ADMIN == user.role) {
                hasPermission = true;
            }
            return user && hasPermission;
        }))));
    }
};
UserIsAuthorGuard = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        user_post_service_1.UserPostService])
], UserIsAuthorGuard);
exports.UserIsAuthorGuard = UserIsAuthorGuard;
//# sourceMappingURL=userIsAuthor.guard.js.map
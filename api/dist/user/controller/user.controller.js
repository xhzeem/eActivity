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
exports.UserController = exports.storage = void 0;
const common_1 = require("@nestjs/common");
const user_interface_1 = require("../models/user.interface");
const user_service_1 = require("../service/user.service");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const roles_decorator_1 = require("../../auth/decorator/roles.decorator");
const jwt_guard_1 = require("../../auth/guards/jwt-guard");
const roles_guard_1 = require("../../auth/guards/roles.guard");
const common_2 = require("@nestjs/common");
const common_3 = require("@nestjs/common");
const common_4 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const uuid_1 = require("uuid");
const path = require("path");
const path_1 = require("path");
const userIsUser_guard_1 = require("../../auth/guards/userIsUser.guard");
exports.storage = {
    storage: multer_1.diskStorage({
        destination: './uploads/Avatars',
        filename: (req, file, cb) => {
            const filename = path.parse(file.originalname).name.replace(/[a-zA-Z0-9_\s]/g, '') +
                uuid_1.v4();
            const extention = path.parse(file.originalname).ext;
            cb(null, `${filename}${extention}`);
        },
    }),
};
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    create(user) {
        return this.userService.create(user).pipe(operators_1.map((user) => user), operators_1.catchError((err) => rxjs_1.of({ error: err.message })));
    }
    login(user) {
        return this.userService.login(user).pipe(operators_1.map((jwt) => {
            return {
                access_token: jwt,
            };
        }));
    }
    findOne(params) {
        return this.userService.findOne(params.id);
    }
    index(page = 1, limit = 10) {
        limit = limit > 100 ? 100 : limit;
        return this.userService.paginate({
            page: Number(page),
            limit: Number(limit),
            route: 'http://localhost:3000/api/user',
        });
    }
    deleteOne(id) {
        return this.userService.deleteOne(Number(id));
    }
    updateOne(id, user) {
        return this.userService.updateOne(Number(id), user);
    }
    updateRoleOfUser(id, user) {
        return this.userService.updateRoleOfUser(Number(id), user);
    }
    uploadFile(file, req) {
        const user = req.user;
        return this.userService
            .updateOne(user.id, { avatar: file.filename })
            .pipe(operators_1.map((user) => ({ Avatar: user.avatar })));
    }
    findAvatar(imagename, res) {
        return rxjs_1.of(res.sendFile(path_1.join(process.cwd(), 'uploads/avatars/' + imagename)));
    }
};
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], UserController.prototype, "create", null);
__decorate([
    common_1.Post('login'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], UserController.prototype, "login", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], UserController.prototype, "findOne", null);
__decorate([
    common_1.Get(),
    __param(0, common_2.Query('page', new common_3.DefaultValuePipe(1), common_4.ParseIntPipe)),
    __param(1, common_2.Query('limit', new common_3.DefaultValuePipe(10), common_4.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", rxjs_1.Observable)
], UserController.prototype, "index", null);
__decorate([
    roles_decorator_1.hasRoles(user_interface_1.UserRole.ADMIN),
    common_1.UseGuards(jwt_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", rxjs_1.Observable)
], UserController.prototype, "deleteOne", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtAuthGuard, userIsUser_guard_1.UserIsUserGuard),
    common_1.Put(':id'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], UserController.prototype, "updateOne", null);
__decorate([
    roles_decorator_1.hasRoles(user_interface_1.UserRole.ADMIN),
    common_1.UseGuards(jwt_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    common_1.Put(':id/role'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], UserController.prototype, "updateRoleOfUser", null);
__decorate([
    common_1.Post('avatar'),
    common_1.UseGuards(jwt_guard_1.JwtAuthGuard),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('file', exports.storage)),
    __param(0, common_1.UploadedFile()),
    __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], UserController.prototype, "uploadFile", null);
__decorate([
    common_1.Get('profile-avatar/:imagename'),
    __param(0, common_1.Param('imagename')),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], UserController.prototype, "findAvatar", null);
UserController = __decorate([
    common_1.Controller('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map
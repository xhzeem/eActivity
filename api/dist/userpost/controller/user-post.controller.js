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
exports.UserPostController = exports.storage = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const rxjs_1 = require("rxjs");
const jwt_guard_1 = require("../../auth/guards/jwt-guard");
const userIsAuthor_guard_1 = require("../guards/userIsAuthor.guard");
const user_post_service_1 = require("../service/user-post.service");
const multer_1 = require("multer");
const path_1 = require("path");
const path = require("path");
const uuid_1 = require("uuid");
exports.storage = {
    storage: multer_1.diskStorage({
        destination: './uploads/post-images',
        filename: (req, file, cb) => {
            const filename = path.parse(file.originalname).name.replace(/[a-zA-Z0-9_\s]/g, '') +
                uuid_1.v4();
            const extention = path.parse(file.originalname).ext;
            cb(null, `${filename}${extention}`);
        },
    }),
};
let UserPostController = class UserPostController {
    constructor(postService) {
        this.postService = postService;
    }
    create(postEntry, req) {
        const user = req.user;
        return this.postService.create(user, postEntry);
    }
    findBlogEntries() {
        return this.postService.findAll();
    }
    findOne(id) {
        return this.postService.findOne(id);
    }
    updateOne(id, postEntry) {
        return this.postService.updateOne(Number(id), postEntry);
    }
    deleteOne(id) {
        return this.postService.deleteOne(id);
    }
    uploadFile(file, req) {
        return rxjs_1.of(file);
    }
    findImage(imagename, res) {
        return rxjs_1.of(res.sendFile(path_1.join(process.cwd(), 'uploads/post-images/' + imagename)));
    }
};
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtAuthGuard),
    common_1.Post(),
    __param(0, common_1.Body()),
    __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], UserPostController.prototype, "create", null);
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", rxjs_1.Observable)
], UserPostController.prototype, "findBlogEntries", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", rxjs_1.Observable)
], UserPostController.prototype, "findOne", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtAuthGuard, userIsAuthor_guard_1.UserIsAuthorGuard),
    common_1.Put(':id'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], UserPostController.prototype, "updateOne", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtAuthGuard, userIsAuthor_guard_1.UserIsAuthorGuard),
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", rxjs_1.Observable)
], UserPostController.prototype, "deleteOne", null);
__decorate([
    common_1.Post('image/upload'),
    common_1.UseGuards(jwt_guard_1.JwtAuthGuard),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('file', exports.storage)),
    __param(0, common_1.UploadedFile()),
    __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], UserPostController.prototype, "uploadFile", null);
__decorate([
    common_1.Get('image/:imagename'),
    __param(0, common_1.Param('imagename')),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], UserPostController.prototype, "findImage", null);
UserPostController = __decorate([
    common_1.Controller('post'),
    __metadata("design:paramtypes", [user_post_service_1.UserPostService])
], UserPostController);
exports.UserPostController = UserPostController;
//# sourceMappingURL=user-post.controller.js.map
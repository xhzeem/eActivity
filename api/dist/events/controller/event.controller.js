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
exports.EventController = exports.storage = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const jwt_guard_1 = require("../../auth/guards/jwt-guard");
const event_service_1 = require("../service/event.service");
const multer_1 = require("multer");
const path_1 = require("path");
const path = require("path");
const uuid_1 = require("uuid");
const platform_express_1 = require("@nestjs/platform-express");
exports.storage = {
    storage: multer_1.diskStorage({
        destination: './uploads/event-images',
        filename: (req, file, cb) => {
            const filename = path.parse(file.originalname).name.replace(/[a-zA-Z0-9_\s]/g, '') +
                uuid_1.v4();
            const extention = path.parse(file.originalname).ext;
            cb(null, `${filename}${extention}`);
        },
    }),
};
let EventController = class EventController {
    constructor(eventService) {
        this.eventService = eventService;
    }
    create(eventEntry, req) {
        const user = req.user;
        return this.eventService.create(user, eventEntry);
    }
    index(page = 1, limit = 10) {
        limit = limit > 100 ? 100 : limit;
        return this.eventService.paginateAll({
            limit: Number(limit),
            page: Number(page),
            route: 'http://localhost:3000/api/event',
        });
    }
    findOne(id) {
        return this.eventService.findOne(id);
    }
    updateOne(id, eventEntry) {
        return this.eventService.updateOne(Number(id), eventEntry);
    }
    deleteOne(id) {
        return this.eventService.deleteOne(id);
    }
    uploadFile(file, req) {
        return rxjs_1.of(file);
    }
    findImage(imagename, res) {
        return rxjs_1.of(res.sendFile(path_1.join(process.cwd(), 'uploads/event-images/' + imagename)));
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
], EventController.prototype, "create", null);
__decorate([
    common_1.Get(''),
    __param(0, common_1.Query('page')),
    __param(1, common_1.Query('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], EventController.prototype, "index", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", rxjs_1.Observable)
], EventController.prototype, "findOne", null);
__decorate([
    common_1.Put(':id'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], EventController.prototype, "updateOne", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtAuthGuard),
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", rxjs_1.Observable)
], EventController.prototype, "deleteOne", null);
__decorate([
    common_1.Post('image/upload'),
    common_1.UseGuards(jwt_guard_1.JwtAuthGuard),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('file', exports.storage)),
    __param(0, common_1.UploadedFile()),
    __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], EventController.prototype, "uploadFile", null);
__decorate([
    common_1.Get('image/:imagename'),
    __param(0, common_1.Param('imagename')),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], EventController.prototype, "findImage", null);
EventController = __decorate([
    common_1.Controller('event'),
    __metadata("design:paramtypes", [event_service_1.EventService])
], EventController);
exports.EventController = EventController;
//# sourceMappingURL=event.controller.js.map
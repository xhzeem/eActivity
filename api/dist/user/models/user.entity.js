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
exports.UserEntity = void 0;
const blog_entry_entity_1 = require("../../blog/model/blog-entry.entity");
const event_entry_entity_1 = require("../../events/model/event-entry.entity");
const post_entry_entity_1 = require("../../userPost/model/post-entry.entity");
const typeorm_1 = require("typeorm");
const user_interface_1 = require("./user.interface");
let UserEntity = class UserEntity {
    emailToLowerCase() {
        this.email = this.email.toLowerCase();
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], UserEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], UserEntity.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "bio", void 0);
__decorate([
    typeorm_1.Column({ unique: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "username", void 0);
__decorate([
    typeorm_1.Column({ unique: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "email", void 0);
__decorate([
    typeorm_1.Column({ select: false }),
    __metadata("design:type", String)
], UserEntity.prototype, "password", void 0);
__decorate([
    typeorm_1.Column({ type: 'enum', enum: user_interface_1.UserRole }),
    __metadata("design:type", String)
], UserEntity.prototype, "role", void 0);
__decorate([
    typeorm_1.Column({ nullable: true, default: 'default.png' }),
    __metadata("design:type", String)
], UserEntity.prototype, "avatar", void 0);
__decorate([
    typeorm_1.OneToMany((type) => blog_entry_entity_1.BlogEntryEntity, (blogEntryEntity) => blogEntryEntity.author),
    __metadata("design:type", Array)
], UserEntity.prototype, "blogEntries", void 0);
__decorate([
    typeorm_1.OneToMany((type) => event_entry_entity_1.EventEntryEntity, (eventEntryEntity) => eventEntryEntity.author),
    __metadata("design:type", Array)
], UserEntity.prototype, "eventEntries", void 0);
__decorate([
    typeorm_1.OneToMany((type) => post_entry_entity_1.PostEntryEntity, (postEntryEntity) => postEntryEntity.author),
    __metadata("design:type", Array)
], UserEntity.prototype, "postEntries", void 0);
__decorate([
    typeorm_1.BeforeInsert(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserEntity.prototype, "emailToLowerCase", null);
UserEntity = __decorate([
    typeorm_1.Entity()
], UserEntity);
exports.UserEntity = UserEntity;
//# sourceMappingURL=user.entity.js.map
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
exports.BlogEntryEntity = void 0;
const user_entity_1 = require("../../user/models/user.entity");
const typeorm_1 = require("typeorm");
let BlogEntryEntity = class BlogEntryEntity {
    updateTimestamp() {
        this.updatedDate = new Date();
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], BlogEntryEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], BlogEntryEntity.prototype, "articleTitle", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], BlogEntryEntity.prototype, "slug", void 0);
__decorate([
    typeorm_1.Column({ default: '' }),
    __metadata("design:type", String)
], BlogEntryEntity.prototype, "articleDescription", void 0);
__decorate([
    typeorm_1.Column({ default: '' }),
    __metadata("design:type", String)
], BlogEntryEntity.prototype, "articleBody", void 0);
__decorate([
    typeorm_1.Column('date', { default: () => 'CURRENT_DATE::text::date' }),
    __metadata("design:type", Date)
], BlogEntryEntity.prototype, "creationDate", void 0);
__decorate([
    typeorm_1.Column('date', { default: () => 'CURRENT_DATE::text::date' }),
    __metadata("design:type", Date)
], BlogEntryEntity.prototype, "updatedDate", void 0);
__decorate([
    typeorm_1.BeforeUpdate(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BlogEntryEntity.prototype, "updateTimestamp", null);
__decorate([
    typeorm_1.Column({ default: 0 }),
    __metadata("design:type", Number)
], BlogEntryEntity.prototype, "articleLikes", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], BlogEntryEntity.prototype, "headerImage", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Date)
], BlogEntryEntity.prototype, "articlePublishDate", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Boolean)
], BlogEntryEntity.prototype, "isPublished", void 0);
__decorate([
    typeorm_1.ManyToOne(type => user_entity_1.UserEntity, user => user.blogEntries),
    __metadata("design:type", user_entity_1.UserEntity)
], BlogEntryEntity.prototype, "author", void 0);
BlogEntryEntity = __decorate([
    typeorm_1.Entity('blog_entry')
], BlogEntryEntity);
exports.BlogEntryEntity = BlogEntryEntity;
//# sourceMappingURL=blog-entry.entity.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasRoles = void 0;
const common_1 = require("@nestjs/common");
const hasRoles = (...hasRoles) => common_1.SetMetadata('roles', hasRoles);
exports.hasRoles = hasRoles;
//# sourceMappingURL=roles.decorator.js.map
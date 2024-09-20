import { UseGuards, applyDecorators } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { UserTypeEnum } from "src/types/enums";
import { RoleProtected } from "./role-protected.decorator";
import { UserRoleGuard } from "../guards/user-role.guard";

export function Auth(...roles: UserTypeEnum[]) {
    return applyDecorators( 
        RoleProtected(...roles),
        UseGuards( AuthGuard('jwt'), UserRoleGuard)
     );
}
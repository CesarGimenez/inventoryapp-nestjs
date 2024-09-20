import { SetMetadata } from '@nestjs/common';
import { UserTypeEnum } from 'src/types/enums';

export const META_ROLES = 'roles';

export const RoleProtected = (...args: UserTypeEnum[]) => SetMetadata(META_ROLES, args);

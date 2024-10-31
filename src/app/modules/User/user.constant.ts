export const USER_ROLE = {
    ADMIN: 'ADMIN',
    BUYER: 'BUYER',
    SELLER:'SELLER'

  } as const;
  
  export const USER_STATUS = {
    ACTIVE: 'ACTIVE',
    BLOCKED: 'BLOCKED',
  } as const;
  
  export const UserSearchableFields = [
    'name',
    'email',
    'phone',
    'role',
    'status',
  ];
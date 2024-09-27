export class BlogEntryDTO {
    id?: number;
    title!: string;
    content!: string;
    publicationDate!: Date;
    authorId!: number;
    author!: UserDTO;
    categories!: CategoryDTO[];
  }

  export class UserDTO{
    id?: number;
    firstName!: string;
    lastName!: string;
    email!: string;
  }
  
  export class LoginRequestDto {
    email!: string;
    password!: string;
  }
  
  export class RegisterRequestDto {
    firstName!: string;
    lastName!: string;
    email!: string;
    password!: string;
  }

  export class CategoryDTO{
    id?: number;
    name!: string;
    description!: string;
  }
  
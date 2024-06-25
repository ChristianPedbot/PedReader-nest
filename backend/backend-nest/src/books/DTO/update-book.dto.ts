import { AuthorEntity } from "../../authors/entities/author.entity";
import { CategoryEntity } from "../../categories/entities/category.entity";

export class UpdateBookDto {
  title?: string;
  description?: string;
  availability?: number;
  date?: Date;
  img?: string;
  author?: AuthorEntity;
  categorie?: CategoryEntity; 
}

export class CreateBookDto {
  title: string;
  description: string;
  availability: number;
  date: Date;
  img: string;
  author_id: number;
  categorie_id: number;
}

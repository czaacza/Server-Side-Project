import { Book } from './Book';

interface Cart {
  userId?: string;
  books: {
    book: Book;
    quantity: number;
  }[];
}

export type { Cart };

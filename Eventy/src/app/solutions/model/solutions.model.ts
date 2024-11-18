import { Category } from "./category.model"

export interface Solution {
   name: string,
   category: Category,
   description: string,
   price: number,
   discount: number,
   imageUrls: string[],
   isDeleted: boolean,
   isVisible: boolean,
   isAvailable: boolean,
   specifics: string,
}
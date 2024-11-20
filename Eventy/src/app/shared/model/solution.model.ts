export interface Solution {
    id: number;
    pupId: number;
    name: string;
    description: string;
    price: number;
    discount: number;
    imageURLs: string[];
    isDeleted: boolean;
    isVisible: boolean;
    isAvailable: boolean;
}
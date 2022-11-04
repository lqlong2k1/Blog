export interface IBlog {
    readonly blog_id?: number;
    author_id?: number;
    title: string;
    content: string;
    image?: string;
    category_id: number;
    total_rate?: number;
    date_created?: Date;  
}

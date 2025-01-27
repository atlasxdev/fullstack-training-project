export type Articles = {
    articles: Article[];
};

export type Article = {
    content: string;
    date_created: string;
    date_updated: null | string;
    id: string;
    title: string;
    user_id: string;
};

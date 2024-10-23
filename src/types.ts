/**
 * 書籍情報の型定義
 */
export interface Book {
    book_id: number;
    isbn: string;
    storage_location: string;
    label_type: string;
    label_spec: string;
    attachment_location_spec: string;
    notes: string;
}

/**
 * Google Books APIのレスポンス型定義
 */
export interface GoogleBooksVolumeInfo {
    title: string;
    categories?: string[];
}

export interface GoogleBooksItem {
    volumeInfo: GoogleBooksVolumeInfo;
}

export interface GoogleBooksAPIResponse {
    totalItems: number;
    items?: GoogleBooksItem[];
}
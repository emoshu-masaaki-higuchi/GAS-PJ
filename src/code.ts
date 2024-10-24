/**
 * 書籍情報の型定義
 */
interface Book {
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
interface GoogleBooksVolumeInfo {
    title: string;
    categories?: string[];
}

interface GoogleBooksItem {
    volumeInfo: GoogleBooksVolumeInfo;
}

interface GoogleBooksAPIResponse {
    totalItems: number;
    items?: GoogleBooksItem[];
}


/**
 * Google Books APIと書籍管理APIを使用して、書籍情報を取得し、スプレッドシートに書き込む関数。
 *
 * - 指定したスプレッドシートのシートに、書籍管理APIから取得した書籍情報をGoogle Books APIを通じて拡張し、
 *   タイトルやジャンル情報をスプレッドシートに反映する。
 *
 * @throws {Error} - 指定されたスプレッドシートが見つからない場合、またはAPIから不正なレスポンスを受け取った場合にエラーをスローする。
 * @example
 * fetchBooks();
 *
 * // スプレッドシート「書籍 -- 試験用」に書籍情報をセット
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const fetchBooks = (): void => {

    const YOUR_API_KEY: string = "AIzaSyCQaGCn8DYh-_9FTyjNPKHszSa56ORdFvM";
    const API_URL: string = "https://book-management-api-phi.vercel.app/api/v1/books";

    const sheetName: string = "書籍 --　試験用"; // シート名の型を string に指定
    const sheet: GoogleAppsScript.Spreadsheet.Sheet | null = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);


    // sheet が null でないことを確認
    if (!sheet) {
        throw new Error(`指定されたシートが見つかりません: ${sheetName}`);
    }

    try {
        const response: GoogleAppsScript.URL_Fetch.HTTPResponse = UrlFetchApp.fetch(API_URL);
        if (response.getResponseCode() !== 200) throw new Error("書籍管理APIからのレスポンスが不正です");
        const books: Book[] = JSON.parse(response.getContentText());


        books.forEach((book, index) => {
            if (!book.isbn) return;

            const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${book.isbn}&country=JP&key=${YOUR_API_KEY}`;
            const bookResponse: GoogleAppsScript.URL_Fetch.HTTPResponse = UrlFetchApp.fetch(url);

            // Google Books APIレスポンス型を適用
            const bookData: GoogleBooksAPIResponse = JSON.parse(bookResponse.getContentText());

            if (bookData.totalItems > 0 && bookData.items && bookData.items.length > 0) {
                const volumeInfo = bookData.items[0].volumeInfo;
                const title: string = volumeInfo?.title || "タイトルなし!";
                const categories: string = volumeInfo.categories?.join(", ") || "ジャンル情報なし!";

                // スプレッドシートに書籍データをセット
                setSheetRow(sheet, index + 3, book, title, categories);
            }
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            // errorがErrorオブジェクトであることを確認した上でメッセージをログに出力
            Logger.log("書籍管理APIリクエスト中にエラーが発生しました: " + error.message);
        } else {
            // エラーがErrorオブジェクトでない場合の対応（型安全にエラーメッセージを出力）
            Logger.log("書籍管理APIリクエスト中に予期しないエラーが発生しました");
        }
    }
};

/**
 * スプレッドシートに書籍データをセットする関数
 */
const setSheetRow = (
    sheet: GoogleAppsScript.Spreadsheet.Sheet,
    rowIndex: number,
    book: Book,
    title: string,
    categories: string
): void => {
    sheet.getRange(rowIndex, 2).setValue(book.book_id);                                     // No
    sheet.getRange(rowIndex, 3).setValue(title);                                            // タイトル
    sheet.getRange(rowIndex, 4).setValue(categories);                                       // ジャンル
    sheet.getRange(rowIndex, 5).setValue(book.attachment_location_spec);                    // 保管場所
    sheet.getRange(rowIndex, 6).setValue(`Book-${String(book.book_id).padStart(3, '0')}`);  // 管理番号
    sheet.getRange(rowIndex, 7).setValue(book.label_type);                                  // テプラ種類
    sheet.getRange(rowIndex, 8).setValue(book.label_spec);                                  // テプラ仕様
    sheet.getRange(rowIndex, 9).setValue(book.storage_location);                            // 貼り付け場所
    sheet.getRange(rowIndex, 10).setValue(book.notes);                                      // 備考
};

// Baserow API Types

/**
 * Generic Baserow list response wrapper
 */
export interface BaserowListResponse<T> {
    count: number
    next: string | null
    previous: string | null
    results: T[]
}
export interface LinkData {
    id: string,
    order?: string | null,
    value: string | null,
}
/**
 * Author from Baserow (table 772588)
 */
export interface BaserowAuthor {
    id: string,
    order: string,
    author_id: string | null,
    name: string,
    books: LinkData[]
}

/**
 * Publisher from Baserow (table 772593)
 */
export interface BaserowPublisher {
    id: string
    order: string
    publisher_id: string | null,
    name: string,
    books: LinkData[]
}

/**
 * Book from Baserow (table 772570)
 * Field names match actual Baserow table columns
 */
export interface BaserowBook {
    id: string
    order: string
    book_id?: string | null
    author_name?: string | LinkData[] | null
    title: string
    language: string | null
    place_of_publication?: string | null
    publisher_name?: string | LinkData[] | null
    year_of_publication?: number | null
    edition?: string | null  // Note: typo in original field name
    price?: number | null
    class_number?: string | null
    source?: string | null
    notes?: string | null
    lost_damage?: string | null
    note?: string | null
}

/**
 * User from Baserow (table 772601)
 */
export interface BaserowUser {
    id: string
    order: string
    user_id: string
    username: string
    email: string
    password: string
    is_admin: boolean
}

/**
 * Borrowed Book from Baserow (table 772607)
 */
export interface BaserowBorrowedBook {
    id: string
    order: string
    borrow_id: string
    book_id?: LinkData[] | null
    user_id?: LinkData[] | null
    borrowed_at: string
    due_date: string
    returned_at?: string | null
    status: "borrowed" | "returned" | "overdue"
}

/**
 * Session user (stored in cookie/localStorage)
 */
export interface SessionUser {
    id: string
    user_id: string
    email: string
    username: string
    isAdmin: boolean
}

/**
 * Mapped types for frontend consumption
 */
export interface Author {
    id: string
    author_id: string | null
    name: string
    books: LinkData[]
}

export interface Publisher {
    id: string
    publisher_id: string | null
    name: string
    books: LinkData[]
}

export interface Book {
    id: string
    book_id: string | null
    title: string
    author_name: string | null
    language: string | null
    author_id?: string | null
    publisher_name: string | null
    place_of_publication: string | null
    published_year: number | null
    edition: string | null
    price: number | null
    class_number: string | null
    source: string | null
    notes: string | null
    created_at: string
}

export interface BorrowedBook {
    id: string
    borrow_id: string
    book_id?: string | null
    user_id?: string | null
    borrowed_at: string
    due_date: string
    returned_at: string | null
    status: "borrowed" | "returned" | "overdue"
}

export interface UserProfile {
    id: string
    user_id: string | null
    username: string | null
    email: string | null
    is_admin: boolean
    created_at?: string
    updated_at?: string
}

/**
 * Mapper functions to convert Baserow types to frontend types
 */
export function mapBaserowAuthorToAuthor(author: BaserowAuthor): Author {
    return {
        id: author.id,
        author_id: author.author_id,
        name: author.name,
        books: author.books,
    }
}

export function mapBaserowBookToBook(book: BaserowBook): Book {
    const authorName = Array.isArray(book.author_name) && book.author_name.length > 0
        ? book.author_name[0].value
        : (typeof book.author_name === 'string' ? book.author_name : null);

    return {
        id: book.id,
        book_id: book.book_id ?? null,
        title: book.title,
        author_name: authorName ?? null,
        language: book.language ?? null,
        publisher_name: Array.isArray(book.publisher_name) && book.publisher_name.length > 0 ? book.publisher_name[0].value : null,
        place_of_publication: book.place_of_publication ?? null,
        published_year: book.year_of_publication ?? null,
        edition: book.edition ?? null,
        price: book.price ?? null,
        class_number: book.class_number ?? null,
        source: book.source ?? null,
        notes: book.notes ?? null,
        created_at: new Date().toISOString(),
    }
}

export function mapBaserowUserToProfile(user: BaserowUser): UserProfile {
    return {
        id: user.id,
        user_id: user.user_id ?? null,
        username: user.username ?? null,
        email: user.email,
        is_admin: user.is_admin,
    }
}

export function mapBaserowBorrowedBook(borrowed: BaserowBorrowedBook): BorrowedBook {
    return {
        id: borrowed.id,
        borrow_id: borrowed.borrow_id,
        book_id: borrowed.book_id?.[0].value,
        user_id: borrowed.user_id?.[0].value,
        borrowed_at: borrowed.borrowed_at,
        due_date: borrowed.due_date,
        returned_at: borrowed.returned_at ?? null,
        status: borrowed.status,
    }
}

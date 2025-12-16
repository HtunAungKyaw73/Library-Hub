module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/lib/baserow/types.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Baserow API Types
/**
 * Generic Baserow list response wrapper
 */ __turbopack_context__.s([
    "mapBaserowAuthorToAuthor",
    ()=>mapBaserowAuthorToAuthor,
    "mapBaserowBookToBook",
    ()=>mapBaserowBookToBook,
    "mapBaserowBorrowedBook",
    ()=>mapBaserowBorrowedBook,
    "mapBaserowUserToProfile",
    ()=>mapBaserowUserToProfile
]);
function mapBaserowAuthorToAuthor(author) {
    return {
        id: String(author.id),
        name: author.Name,
        bio: author.Bio ?? null,
        birth_year: author.Birth_Year ?? null,
        created_at: new Date().toISOString()
    };
}
function mapBaserowBookToBook(book) {
    return {
        id: String(book.id),
        book_id: book.book_id ?? null,
        title: book.title,
        author_name: book.author_name ?? null,
        author_id: "",
        publisher_name: book.publisher_name ?? null,
        place_of_publication: book.place_of_publication ?? null,
        published_year: book.year_of_publication ?? null,
        edition: book.editon ?? null,
        price: book.price ?? null,
        class_number: book.class_number ?? null,
        source: book.source ?? null,
        notes: book.notes ?? null,
        created_at: new Date().toISOString(),
        // Additional fields for UI components - using defaults since not in Baserow
        genre: null,
        isbn: null,
        description: book.notes ?? null,
        available_copies: 1,
        total_copies: 1,
        author: book.author_name ? {
            id: "",
            name: book.author_name,
            bio: null,
            birth_year: null,
            created_at: new Date().toISOString()
        } : null
    };
}
function mapBaserowUserToProfile(user) {
    return {
        id: String(user.id),
        user_id: user.user_id ?? null,
        username: user.username ?? null,
        email: user.email,
        is_admin: user.is_admin,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    };
}
function mapBaserowBorrowedBook(borrowed) {
    const book = borrowed.Book?.[0];
    const user = borrowed.User?.[0];
    return {
        id: String(borrowed.id),
        book_id: book ? String(book.id) : "",
        user_id: user ? String(user.id) : "",
        borrowed_at: borrowed.Borrowed_At,
        due_date: borrowed.Due_Date,
        returned_at: borrowed.Returned_At ?? null,
        status: borrowed.Status,
        book: book ? mapBaserowBookToBook(book) : null
    };
}
}),
"[project]/lib/baserow/client.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Baserow API Client
__turbopack_context__.s([
    "createBorrowRecord",
    ()=>createBorrowRecord,
    "createUser",
    ()=>createUser,
    "getAuthors",
    ()=>getAuthors,
    "getBook",
    ()=>getBook,
    "getBooks",
    ()=>getBooks,
    "getBorrowedBooks",
    ()=>getBorrowedBooks,
    "getUserByEmail",
    ()=>getUserByEmail,
    "getUserById",
    ()=>getUserById,
    "updateBookCopies",
    ()=>updateBookCopies,
    "updateBorrowRecord",
    ()=>updateBorrowRecord
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$baserow$2f$types$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/baserow/types.ts [app-route] (ecmascript)");
;
const BASEROW_API_URL = ("TURBOPACK compile-time value", "https://api.baserow.io") || "https://api.baserow.io";
const BASEROW_API_TOKEN = ("TURBOPACK compile-time value", "4z2b3p6kYWxiDbSdAcKGkb1iQzSo7G5z") || "";
// Table IDs
const TABLE_BOOKS = ("TURBOPACK compile-time value", "772570") || "772570";
const TABLE_AUTHORS = ("TURBOPACK compile-time value", "772588") || "772588";
const TABLE_PUBLISHERS = ("TURBOPACK compile-time value", "772593") || "772593";
const TABLE_USERS = ("TURBOPACK compile-time value", "772601") || "772601";
const TABLE_BORROW_BOOKS = ("TURBOPACK compile-time value", "772607") || "772607";
/**
 * Base fetch function for Baserow API
 */ async function baserowFetch(endpoint, options = {}) {
    const url = `${BASEROW_API_URL}${endpoint}`;
    const response = await fetch(url, {
        ...options,
        headers: {
            "Authorization": `Token ${BASEROW_API_TOKEN}`,
            "Content-Type": "application/json",
            ...options.headers
        }
    });
    if (!response.ok) {
        const error = await response.text();
        throw new Error(`Baserow API error: ${response.status} - ${error}`);
    }
    return response.json();
}
async function getBooks() {
    const response = await baserowFetch(`/api/database/rows/table/${TABLE_BOOKS}/?user_field_names=true&size=200`);
    return response.results.map(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$baserow$2f$types$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["mapBaserowBookToBook"]);
}
async function getBook(id) {
    try {
        const book = await baserowFetch(`/api/database/rows/table/${TABLE_BOOKS}/${id}/?user_field_names=true`);
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$baserow$2f$types$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["mapBaserowBookToBook"])(book);
    } catch  {
        return null;
    }
}
async function getAuthors() {
    const response = await baserowFetch(`/api/database/rows/table/${TABLE_AUTHORS}/?user_field_names=true`);
    return response.results;
}
async function getUserByEmail(email) {
    try {
        const response = await baserowFetch(`/api/database/rows/table/${TABLE_USERS}/?user_field_names=true&filter__email__equal=${encodeURIComponent(email)}`);
        return response.results[0] || null;
    } catch  {
        return null;
    }
}
async function getUserById(id) {
    try {
        const user = await baserowFetch(`/api/database/rows/table/${TABLE_USERS}/${id}/?user_field_names=true`);
        return user;
    } catch  {
        return null;
    }
}
async function getBorrowedBooks(userId) {
    try {
        const response = await baserowFetch(`/api/database/rows/table/${TABLE_BORROW_BOOKS}/?user_field_names=true&filter__User__link_row_has=${userId}`);
        return response.results.map(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$baserow$2f$types$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["mapBaserowBorrowedBook"]);
    } catch  {
        return [];
    }
}
async function createBorrowRecord(data) {
    try {
        const response = await baserowFetch(`/api/database/rows/table/${TABLE_BORROW_BOOKS}/?user_field_names=true`, {
            method: "POST",
            body: JSON.stringify({
                Book: [
                    data.bookId
                ],
                User: [
                    data.userId
                ],
                Borrowed_At: new Date().toISOString(),
                Due_Date: data.dueDate,
                Status: "borrowed"
            })
        });
        return response;
    } catch  {
        return null;
    }
}
async function updateBorrowRecord(id, data) {
    try {
        const response = await baserowFetch(`/api/database/rows/table/${TABLE_BORROW_BOOKS}/${id}/?user_field_names=true`, {
            method: "PATCH",
            body: JSON.stringify(data)
        });
        return response;
    } catch  {
        return null;
    }
}
async function updateBookCopies(bookId, availableCopies) {
    try {
        const response = await baserowFetch(`/api/database/rows/table/${TABLE_BOOKS}/${bookId}/?user_field_names=true`, {
            method: "PATCH",
            body: JSON.stringify({
                Available_Copies: availableCopies
            })
        });
        return response;
    } catch  {
        return null;
    }
}
async function createUser(data) {
    try {
        const response = await baserowFetch(`/api/database/rows/table/${TABLE_USERS}/?user_field_names=true`, {
            method: "POST",
            body: JSON.stringify({
                email: data.email,
                password: data.password,
                username: data.fullName || null,
                is_admin: false
            })
        });
        return response;
    } catch  {
        return null;
    }
}
}),
"[project]/app/api/auth/signup/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$baserow$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/baserow/client.ts [app-route] (ecmascript)");
;
;
async function POST(request) {
    try {
        const { email, password, fullName } = await request.json();
        if (!email || !password) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: "Email and password are required"
            }, {
                status: 400
            });
        }
        // Check if user already exists
        const existingUser = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$baserow$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getUserByEmail"])(email);
        if (existingUser) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: "A user with this email already exists"
            }, {
                status: 400
            });
        }
        // Create new user
        const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$baserow$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createUser"])({
            email,
            password,
            fullName
        });
        if (!user) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: "Failed to create user"
            }, {
                status: 500
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            user
        });
    } catch (error) {
        console.error("Sign-up API error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: "Internal server error"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1e931fe8._.js.map
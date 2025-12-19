import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import {
    Book,
    Author,
    BorrowedBook,
    SessionUser,
    BaserowAuthor,
    mapBaserowAuthorToAuthor,
    ApiResponse,
} from "../../baserow/types"
import { setCredentials, logout } from "../slices/authSlice"

// Define a service using a base URL and expected endpoints
export const baserowApi = createApi({
    reducerPath: "baserowApi",
    baseQuery: fetchBaseQuery({ baseUrl: "/" }),
    tagTypes: ["Book", "BorrowedBook", "User"],
    endpoints: (builder) => ({
        // Books
        getBooks: builder.query<Book[], void>({
            query: () => "api/books",
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: "Book" as const, id })),
                        { type: "Book", id: "LIST" },
                    ]
                    : [{ type: "Book", id: "LIST" }],
        }),
        getBookById: builder.query<Book, string>({
            query: (id) => `api/books/${id}`,
            providesTags: (result, error, id) => [{ type: "Book", id }],
        }),
        getAuthors: builder.query<Author[], void>({
            query: () => "api/authors",
            transformResponse: (response: BaserowAuthor[]) =>
                response.map(mapBaserowAuthorToAuthor),
        }),

        // Borrowing
        borrowBook: builder.mutation<BorrowedBook, { bookId: string; userId: string; dueDate: string }>({
            query: (body) => ({
                url: "api/borrow",
                method: "POST",
                body,
            }),
            invalidatesTags: (result, error, { bookId }) => [
                { type: "Book", id: bookId },
                { type: "BorrowedBook", id: "LIST" }, // Invalidate user's borrowed list
            ],
        }),
        returnBook: builder.mutation<void, { borrowId: string; bookId: string; availableCopies: number }>({
            query: (body) => ({
                url: "api/return",
                method: "POST",
                body,
            }),
            invalidatesTags: (result, error, { bookId }) => [
                { type: "Book", id: bookId },
                { type: "BorrowedBook", id: "LIST" },
            ],
        }),
        getBorrowedBooksByUserId: builder.query<BorrowedBook[], string>({
            queryFn: async (userId) => {
                const { getBorrowedBooksByUserId } = await import("../../baserow/client")
                const data = await getBorrowedBooksByUserId(userId)
                return { data }
            },
            providesTags: [{ type: "BorrowedBook", id: "LIST" }],
        }),
        getAllBooksByStatus: builder.query<BorrowedBook[], string>({
            queryFn: async (status) => {
                const { getAllBooksByStatus } = await import("../../baserow/client")
                const data = await getAllBooksByStatus(status)
                return { data }
            },
            providesTags: [{ type: "BorrowedBook", id: "LIST" }],
        }),
        isBookBorrowed: builder.query<boolean, string>({
            queryFn: async (bookId) => {
                const { isBookBorrowed } = await import("../../baserow/client")
                const data = await isBookBorrowed(bookId)
                return { data }
            },
            providesTags: [{ type: "BorrowedBook", id: "LIST" }],
        }),

        // Auth
        login: builder.mutation<ApiResponse<SessionUser>, { email: string; password: string }>({
            query: (credentials) => ({
                url: "api/auth/login",
                method: "POST",
                body: credentials,
            }),
            // transformResponse: (response: { success: boolean; user: SessionUser }) => response.user,
            // Use onQueryStarted to dispatch setCredentials
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    dispatch(setCredentials({ user: data.user }))
                } catch (err) {
                    // Login failed
                }
            },
        }),
        signUp: builder.mutation<ApiResponse<SessionUser>, { username: string; email: string; password: string }>({
            query: (credentials) => ({
                url: "api/auth/signup",
                method: "POST",
                body: credentials,
            }),
            // transformResponse: (response: { success: boolean; user: SessionUser }) => response.user,
            // Use onQueryStarted to dispatch setCredentials
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    dispatch(setCredentials({ user: data.user }))
                } catch (err) {
                    // Login failed
                }
            },
        }),
        logout: builder.mutation<void, void>({
            query: () => ({
                url: "api/auth/logout",
                method: "POST",
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled
                    dispatch(logout())
                } catch (err) { }
            },
        }),
    }),
})

export const {
    useGetBooksQuery,
    useGetBookByIdQuery,
    useGetAuthorsQuery,
    useBorrowBookMutation,
    useReturnBookMutation,
    useGetBorrowedBooksByUserIdQuery,
    useIsBookBorrowedQuery,
    useGetAllBooksByStatusQuery,
    useLoginMutation,
    useLogoutMutation,
    useSignUpMutation,
} = baserowApi

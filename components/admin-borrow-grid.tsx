"use client"

import { useMemo, useState, useCallback } from "react"
import { AgGridReact } from "ag-grid-react"
import { AllCommunityModule, ModuleRegistry, themeQuartz } from "ag-grid-community"
import type { ColDef } from "ag-grid-community"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Download } from "lucide-react"

ModuleRegistry.registerModules([AllCommunityModule])

interface BorrowRecord {
  id: string
  user_id: string
  book_id: string
  status: string
  borrowed_at: string
  due_date: string
  returned_at: string | null
  book: {
    id: string
    title: string
    isbn: string
    genre: string
    cover_image: string | null
    author: { name: string } | null
  } | null
  user_profile: {
    email: string
    full_name: string | null
  } | null
}

interface AdminBorrowGridProps {
  borrowedBooks: BorrowRecord[]
}

export function AdminBorrowGrid({ borrowedBooks }: AdminBorrowGridProps) {
  const [quickFilterText, setQuickFilterText] = useState("")
  const [gridApi, setGridApi] = useState<any>(null)

  const columnDefs = useMemo<ColDef[]>(
    () => [
      {
        headerName: "User",
        field: "user_profile",
        valueGetter: (params: any) => {
          const profile = params.data?.user_profile
          return profile?.full_name || profile?.email || "Unknown"
        },
        filter: "agTextColumnFilter",
        flex: 1.5,
        minWidth: 150,
      },
      {
        headerName: "Email",
        field: "user_profile.email",
        valueGetter: (params: any) => params.data?.user_profile?.email || "N/A",
        filter: "agTextColumnFilter",
        flex: 1.5,
        minWidth: 180,
      },
      {
        headerName: "Book Title",
        field: "book.title",
        valueGetter: (params: any) => params.data?.book?.title || "Unknown",
        filter: "agTextColumnFilter",
        flex: 2,
        minWidth: 200,
      },
      {
        headerName: "Author",
        field: "book.author",
        valueGetter: (params: any) => params.data?.book?.author?.name || "Unknown",
        filter: "agTextColumnFilter",
        flex: 1.5,
        minWidth: 150,
      },
      {
        headerName: "Genre",
        field: "book.genre",
        valueGetter: (params: any) => params.data?.book?.genre || "N/A",
        filter: "agTextColumnFilter",
        flex: 1,
        minWidth: 100,
      },
      {
        headerName: "Status",
        field: "status",
        filter: "agTextColumnFilter",
        flex: 1,
        minWidth: 100,
        cellRenderer: (params: any) => {
          const status = params.value
          if (status === "borrowed") {
            const dueDate = new Date(params.data?.due_date)
            const isOverdue = dueDate < new Date()
            return `<span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
              isOverdue
                ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                : "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200"
            }">${isOverdue ? "Overdue" : "Borrowed"}</span>`
          }
          return `<span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">Returned</span>`
        },
      },
      {
        headerName: "Borrowed Date",
        field: "borrowed_at",
        filter: "agDateColumnFilter",
        flex: 1,
        minWidth: 120,
        valueFormatter: (params: any) => {
          if (!params.value) return "N/A"
          return new Date(params.value).toLocaleDateString()
        },
        sort: "desc",
      },
      {
        headerName: "Due Date",
        field: "due_date",
        filter: "agDateColumnFilter",
        flex: 1,
        minWidth: 120,
        valueFormatter: (params: any) => {
          if (!params.value) return "N/A"
          return new Date(params.value).toLocaleDateString()
        },
      },
      {
        headerName: "Returned Date",
        field: "returned_at",
        filter: "agDateColumnFilter",
        flex: 1,
        minWidth: 120,
        valueFormatter: (params: any) => {
          if (!params.value) return "-"
          return new Date(params.value).toLocaleDateString()
        },
      },
    ],
    [],
  )

  const defaultColDef = useMemo<ColDef>(
    () => ({
      sortable: true,
      resizable: true,
    }),
    [],
  )

  const onGridReady = useCallback((params: any) => {
    setGridApi(params.api)
  }, [])

  const exportToCsv = useCallback(() => {
    if (gridApi) {
      gridApi.exportDataAsCsv({
        fileName: `borrow-records-${new Date().toISOString().split("T")[0]}.csv`,
      })
    }
  }, [gridApi])

  const customTheme = themeQuartz.withParams({
    backgroundColor: "var(--card)",
    foregroundColor: "var(--card-foreground)",
    headerBackgroundColor: "var(--muted)",
    headerTextColor: "var(--muted-foreground)",
    oddRowBackgroundColor: "var(--card)",
    rowHoverColor: "var(--accent)",
    borderColor: "var(--border)",
    fontFamily: "var(--font-sans)",
    headerFontWeight: 600,
    rowBorder: true,
    wrapperBorder: true,
    wrapperBorderRadius: "0.5rem",
  })

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search records..."
            value={quickFilterText}
            onChange={(e) => setQuickFilterText(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button variant="outline" size="sm" onClick={exportToCsv}>
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
      </div>

      <div className="h-150 w-full">
        <AgGridReact
          theme={customTheme}
          rowData={borrowedBooks}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          quickFilterText={quickFilterText}
          pagination={true}
          paginationPageSize={20}
          paginationPageSizeSelector={[10, 20, 50, 100]}
          onGridReady={onGridReady}
          animateRows={true}
          rowSelection="multiple"
        />
      </div>
    </div>
  )
}

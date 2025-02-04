import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps {
  currentPage: number
  totalPages: number
  paginate: (pageNumber: number) => void
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, paginate }) => {
  const maxVisibleButtons = 5
  const halfVisibleButtons = Math.floor(maxVisibleButtons / 2)

  let startPage = Math.max(currentPage - halfVisibleButtons, 1)
  const endPage = Math.min(startPage + maxVisibleButtons - 1, totalPages)

  if (endPage - startPage + 1 < maxVisibleButtons) {
    startPage = Math.max(endPage - maxVisibleButtons + 1, 1)
  }

  const pageNumbers = []
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i)
  }

  return (
    <nav className="flex items-center space-x-2">
      <Button
        variant="outline"
        size="icon"
        onClick={() => paginate(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      {startPage > 1 && (
        <>
          <Button variant="outline" onClick={() => paginate(1)}>
            1
          </Button>
          {startPage > 2 && <span className="px-2">...</span>}
        </>
      )}
      {pageNumbers.map((number) => (
        <Button key={number} variant={currentPage === number ? "default" : "outline"} onClick={() => paginate(number)}>
          {number}
        </Button>
      ))}
      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className="px-2">...</span>}
          <Button variant="outline" onClick={() => paginate(totalPages)}>
            {totalPages}
          </Button>
        </>
      )}
      <Button
        variant="outline"
        size="icon"
        onClick={() => paginate(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </nav>
  )
}

export default Pagination
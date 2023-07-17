import React, { useEffect, useState } from "react";

interface PaginationProps {
  totalPages: number;
  handlecurrentpage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  handlecurrentpage,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  function goToPage(pageNumber: number) {
    setCurrentPage(pageNumber);
  }

  function goToFirstPage() {
    goToPage(1);
  }

  function goToLastPage() {
    goToPage(totalPages);
  }

  useEffect(() => {
    handlecurrentpage(currentPage);
  }, [currentPage]);

  const pageRange = Math.min(7, totalPages); 
  const halfRange = Math.floor(pageRange / 2);
  let startPage = currentPage - halfRange;
  startPage = Math.max(startPage, 1);
  startPage = Math.min(startPage, totalPages - pageRange + 1); 

  const endPage = startPage + pageRange - 1;

  return (
    <div id="pageCounter">
      {currentPage > 1 && (
        <>
          <div onClick={goToFirstPage}>
            <span className="d-flex p-12px cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="11.414"
                height="6.829"
                viewBox="-3 0 17.414 12.829"
                style={{ transform: "rotate(180deg)" }}
              >
                <g transform="translate(-1134.586 -2682.586)">
                  <path
                    d="M9,12l3-3L9,6"
                    transform="translate(1127 2678)"
                    style={{
                      fill: "none",
                      stroke: "rgb(253, 65, 0)",
                      strokeLinecap: "round",
                      strokeWidth: "2px",
                      strokeLinejoin: "round",
                    }}
                  ></path>
                  <path
                    d="M9,12l3-3L9,6"
                    transform="translate(1132 2678)"
                    style={{
                      fill: "none",
                      stroke: "rgb(253, 65, 0)",
                      strokeLinecap: "round",
                      strokeWidth: "2px",
                      strokeLinejoin: "round",
                    }}
                  ></path>
                  <line
                    y2="6"
                    transform="translate(1147 2684)"
                    style={{
                      fill: "none",
                      stroke: "rgb(253, 65, 0)",
                      strokeLinecap: "round",
                      strokeWidth: "2px",
                    }}
                  ></line>
                </g>
              </svg>
            </span>
          </div>

          <div onClick={() => goToPage(currentPage - 1)}>
            <span className="d-flex p-12px cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="11.414"
                height="6.829"
                viewBox="-3 -1 17.414 12.829"
                style={{ transform: "rotate(180deg)" }}
              >
                <path
                  d="M6,8l3-3L6,2"
                  transform="translate(-5 -2)"
                  style={{
                    fill: "none",
                    stroke: "rgb(253, 65, 0)",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: "2px",
                  }}
                ></path>
              </svg>
            </span>
          </div>
        </>
      )}

      {Array.from({ length: pageRange }, (_, index) => startPage + index).map(
        (pageNumber) => (
          <div
            key={pageNumber}
            onClick={() => goToPage(pageNumber)}
            className={`pageNumber ${
              currentPage === pageNumber ? "orange" : ""
            }`}
          >
            {pageNumber}
          </div>
        )
      )}

      {currentPage < totalPages && (
        <>
          <div onClick={() => goToPage(currentPage + 1)}>
            <span className="d-flex p-12px cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="11.414"
                height="6.829"
                viewBox="-4 -5 17.414 12.829"
              >
                <path
                  d="M6,8l3-3L6,2"
                  transform="translate(-5 -2)"
                  style={{
                    fill: "none",
                    stroke: "rgb(253, 65, 0)",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: "2px",
                  }}
                ></path>
              </svg>
            </span>
          </div>
          <div onClick={goToLastPage}>
            <span className="d-flex p-12px cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="11.414"
                height="6.829"
                viewBox="-3 -4 17.414 12.829"
              >
                <g transform="translate(-1134.586 -2682.586)">
                  <path
                    d="M9,12l3-3L9,6"
                    transform="translate(1127 2678)"
                    style={{
                      fill: "none",
                      stroke: "rgb(253, 65, 0)",
                      strokeLinecap: "round",
                      strokeWidth: "2px",
                      strokeLinejoin: "round",
                    }}
                  ></path>
                  <path
                    d="M9,12l3-3L9,6"
                    transform="translate(1132 2678)"
                    style={{
                      fill: "none",
                      stroke: "rgb(253, 65, 0)",
                      strokeLinecap: "round",
                      strokeWidth: "2px",
                      strokeLinejoin: "round",
                    }}
                  ></path>
                  <line
                    y2="6"
                    transform="translate(1147 2684)"
                    style={{
                      fill: "none",
                      stroke: "rgb(253, 65, 0)",
                      strokeLinecap: "round",
                      strokeWidth: "2px",
                    }}
                  ></line>
                </g>
              </svg>
            </span>{" "}
          </div>
        </>
      )}
    </div>
  );
};

export default Pagination;

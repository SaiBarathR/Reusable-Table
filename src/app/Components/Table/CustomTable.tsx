'use client'

import { IconButton, Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from "@chakra-ui/react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

import "./customTable.css"
import Paginations from "./Pagination";

type tableProps = {
    headers: any;
    row: any;
    sortable: boolean;
    defaultRowsPerPage: number;
    defaultPaginationLength: 5
}

type columnProps = {
    columns: any
}

type rowProps = {
    rows: any
}

export default function CustomTable({ headers, row, sortable = false, defaultRowsPerPage = 6, defaultPaginationLength = 5 }: tableProps) {
    const [rows, setRows] = useState([]);
    const [currentRow, setCurrentRow] = useState([]);
    const cellRenderList = useMemo(() => headers.map((header: any, index: number) => header.cellRenderer ? header.label : false), [headers])
    const [isDisplaySmall, setIsDisplaySmall] = useState(false);
    const [sortField, setSortField] = useState("");
    const [order, setOrder] = useState("asc");

    useEffect(() => {
        const isDisplaySmall = window.matchMedia('(max-width: 1096px)');
        isDisplaySmall.addEventListener("change", handleResize);
        function handleResize(resizeEvent: any) {
            setIsDisplaySmall(resizeEvent.matches)
        }
        return () => {
            isDisplaySmall.removeEventListener("change", handleResize);
        }
    }, []);

    useEffect(() => {
        setRows(row)
    }, [row])

    const handleSortingByColumn = (sortField: any, sortOrder: String) => {
        if (sortField) {
            const sorted = [...rows].sort((a: any, b: any) => {
                return (
                    a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
                        numeric: true,
                    }) * (sortOrder === "asc" ? 1 : -1)
                );
            });
            setRows(sorted);
        }
    };

    function handleClickColumnName(columnName: string) {
        return () => { const sortOrder = columnName === sortField && order === "asc" ? "desc" : "asc";
            setSortField(columnName);
            setOrder(sortOrder);
            handleSortingByColumn(columnName, sortOrder);
        }
    }

    function ColumnRenderer({ columns }: columnProps) {
        return (
            <Thead >
                <Tr className="bg-gray-300 border-radius-table-row h-[52px]">
                    {columns.map((column: any, index: number) => <Th onClick={(sortable && !column.cellRenderer) ? handleClickColumnName(column.label) : () => console.log(`'Column: ${column.label} doesn't support sorting`)} cursor={sortable ? "pointer" : "auto"} key={column.label}>
                        <div className="flex gap-2 items-center">
                            {column.name}
                            {sortable && sortField === column.label && !column.cellRenderer && <IconButton aria-label="sort" size={"xs"} transform={order === 'asc' ? "rotate(0deg)" : "rotate(180deg)"}
                                icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M4.16797 7L10.0013 13.6667L15.8346 7" stroke="#99A0A8" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>}
                            />}
                        </div>
                    </Th>)
                    }
                </Tr>
            </Thead>
        )
    }

    function RowRenderer({ rows }: rowProps) {
        return (
            <Tbody>
                {rows.map((row: any, index: number) => <Tr className={`${index % 2 !== 0 && 'bg-gray-200'} border-radius-table-row`} key={index}>
                    {Object.entries(row).map((value, subIndex) => <Td whiteSpace={"initial"} wordBreak={"break-all"} key={value[0] + subIndex}> {cellRenderList.includes(value[0]) ? headers[cellRenderList.indexOf(value[0])].cellRenderer(value) : value[1]}</Td>)}
                </Tr>)
                }
            </Tbody>
        )
    }

    return (
        <div className="flex flex-col gap-5">
            <TableContainer className="custom-table-container">
                <Table variant={"unstyled"} size={isDisplaySmall ? "sm" : "md"}>
                    <ColumnRenderer columns={headers} />
                    <RowRenderer rows={currentRow} />
                </Table>
            </TableContainer>
            <Paginations rows={rows} defaultRowsPerPage={defaultRowsPerPage} setCurrentRow={setCurrentRow} defaultPaginationLength={defaultPaginationLength} />
        </div>
    )
};


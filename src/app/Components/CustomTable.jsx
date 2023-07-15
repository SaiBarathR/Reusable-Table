'use client'

import { Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";

export default function CustomTable({ headers, row, sortable }) {
    const [rows, setRows] = useState([]);
    const cellRenderList = useMemo(() => headers.map((header, index) => header.cellRenderer ? header.label : false), [headers])

    useEffect(() => {
        setRows(row)
    }, [row])


    function ColumnRenderer({ columns }) {
        return (
            <Thead >
                <Tr className="bg-gray-300 border-radius-table-row h-[52px]">
                    {columns.map((column, index) => <Th className="cursor-pointer" key={column.label}>
                        {column.label}
                    </Th>)
                    }
                </Tr>
            </Thead>
        )
    }

    function RowRenderer({ rows }) {
        return (
            <Tbody>
                {rows.map((row, index) => <Tr className={`${index % 2 !== 0 && 'bg-gray-200'} border-radius-table-row`} key={index}>
                    {Object.entries(row).map((value, subIndex) => <Td key={value + subIndex}> {cellRenderList.includes(value[0]) ? headers[cellRenderList.indexOf(value[0])].cellRenderer(value) : value[1]}</Td>)}
                </Tr>)
                }
            </Tbody>
        )
    }


    return (
        <TableContainer className="custom-table-container">
            <Table variant={"unstyled"}>
                <ColumnRenderer columns={headers} />
                <RowRenderer rows={rows} />
            </Table>
        </TableContainer>
    )

};
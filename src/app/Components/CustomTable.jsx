'use client'

import { Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from "@chakra-ui/react";

export default function CustomTable({ headers, rows }) {

    function ColumnRenderer({ columns }) {
        return (
            <Thead >
                <Tr className="bg-gray-300 border-radius-table-row h-[52px]">
                    {columns.map((column, index) => <Th key={column}>
                        {column}
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
                    {Object.entries(row).map((value, subIndex) => <Td key={value + subIndex}> {value[1]}</Td>)}
                </Tr>)
                }
            </Tbody>
        )
    }

    console.log(headers, rows)


    return (
        <TableContainer className="custom-table-container">
            <Table variant={"unstyled"}>
                <ColumnRenderer columns={headers} />
                <RowRenderer rows={rows} />
            </Table>
        </TableContainer>
    )

};
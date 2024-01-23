import { Box, IconButton, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import HeaderComponent from "./HeaderComponent";
import Pagination from "./Pagination";
import "./customTable.css"
import { useMediaQuery } from '@chakra-ui/react'

type tableProps = {
    headers: any;
    row: any;
    sortable: boolean;
    defaultRowsPerPage: number;
    defaultPaginationLength: 5;
    caption: string;
    pagination: boolean;
    filterRowsByColumnGroup: any;
    error: any;
}

type columnProps = {
    columns: any
}

type rowProps = {
    rows: any
}

export default function CustomTable({ headers, error, row, filterRowsByColumnGroup = [], sortable = false, defaultRowsPerPage = 6, defaultPaginationLength = 5, caption = "empty", pagination = false }: tableProps) {
    const [rows, setRows] = useState([]);
    //seperate list for searching and filtering purposes
    const [filteredRows, setFilteredRows] = useState([])
    //pagination row data for the current page
    const [currentRow, setCurrentRow] = useState([]);
    //names of the column who has cellrender instead of a normal value
    const cellRenderList = useMemo(() => headers.map((header: any, index: number) => header.cellRenderer ? header.label : false), [headers])
    const stylesList = useMemo(() => headers.map((header: any, index: number) => header.styles ? header.label : false), [headers])
    const getStyles = (value: any[]) => stylesList.includes(value[0]) ? headers[stylesList.indexOf(value[0])].styles : {};
    //name of the column to sort by    
    const [sortField, setSortField] = useState("");
    //type of sort for the column
    const [order, setOrder] = useState("asc");
    const headerKeys = useMemo(() => headers.map((item: { label: any; }) => item.label), [headers])
    const [isLargerThan1850] = useMediaQuery('(min-width: 1850px)')
    const [isLargerThan1500] = useMediaQuery('(min-width: 1500px)')

    useEffect(() => {
        setFilteredRows(rows)
    }, [rows])

    useEffect(() => {
        setRows(row)
    }, [row])

    //sort the column based on sortfield  and sortorder and set the new values
    const handleSortingByColumn = (sortField: any, sortOrder: String) => {
        if (sortField) {
            const sorted = [...filteredRows].sort((a: any, b: any) => {
                return (
                    a[sortField]?.toString()?.localeCompare(b[sortField]?.toString(), "en", {
                        numeric: true,
                    }) * (sortOrder === "asc" ? 1 : -1)
                );
            });
            setFilteredRows(sorted);
        }
    };

    //calls the sort function after determining sort order and sortfiel which needs to be sorted
    function handleClickColumnName(columnName: string) {
        return () => {
            const sortOrder = columnName === sortField && order === "asc" ? "desc" : "asc";
            setSortField(columnName);
            setOrder(sortOrder);
            handleSortingByColumn(columnName, sortOrder);
        }
    }

    //renders columns
    function ColumnRenderer({ columns }: columnProps) {
        return (
            <Thead >
                <Tr className="bg-[#F0F1F2] border-radius-table-row h-[36px]">
                    {columns.map((column: any, index: number) => <Th onClick={(sortable && !column.cellRenderer) ? handleClickColumnName(column.label) : () => console.log(`'Column: ${column.label} doesn't support sorting`)} cursor={sortable ? "pointer" : "auto"} key={column.label}>
                        <div className="flex gap-2 items-center">
                            {column.name}
                            {/* //only column with string or number values are allowed to sort based on the sortfield */}
                            {sortable && sortField === column.label && !column.cellRenderer && <IconButton aria-label="sort" size={"xs"} transform={order === 'asc' ? "rotate(0deg)" : "rotate(180deg)"}
                                icon={<ChevronDownIcon boxSize={5} />}
                            />}
                        </div>
                    </Th>)
                    }
                </Tr>
            </Thead>
        )
    }

    //renders rows
    function RowRenderer({ rows }: rowProps) {
        return (
            <Tbody>
                {rows.map((row: any, index: number) => <Tr className={`${index % 2 !== 0 && 'bg-[#EDF0F2]'} border-radius-table-row`} key={index}>
                    {/* //if cellRenderer is present then a callback of cellrender is fired to provide the cuurent row value to the cell renderer present in flow component to render component based on row values*/}
                    {Object.entries(row).map((value, subIndex) => {
                        return headerKeys.includes(value[0]) && <Td sx={getStyles(value)} whiteSpace={"initial"} key={value[0] + subIndex}> {cellRenderList.includes(value[0]) ? headers[cellRenderList.indexOf(value[0])].cellRenderer(row) : value[1]}</Td>
                    })}
                </Tr>)
                }
            </Tbody>
        )
    }

    return (
        <Box className="flex flex-col w-full h-screen gap-5 items-center justify-center">
            <Box className="custom-table-container">
                {caption !== "empty" && <HeaderComponent total={rows.length} onlyFilteredDatas={filteredRows} caption={caption} rowData={rows} filterRows={setFilteredRows} filterRowsByColumnGroup={filterRowsByColumnGroup} />}
                {filteredRows.length > 0 ? <TableContainer className="max-h-[65vh] lg:max-h-[70vh]" overflowY={'auto'} minW={'none'} >
                    <Table variant={"unstyled"}
                        size={isLargerThan1850 ? "lg" : isLargerThan1500 ? 'md' : 'sm'} minW={'none'}
                    >
                        <ColumnRenderer columns={headers} />
                        <RowRenderer rows={pagination ? currentRow : filteredRows} />
                    </Table>
                </TableContainer> :
                    <Box className="w-full min-h-[250px] p-2  flex items-center justify-center text-2xl font-medium mb-12">
                        {error || 'No rows data is available to display'}
                    </Box>
                }
            </Box>
            <Box width={'100%'} maxW={'100%'}>
                {/* Display pagination only if has pagination props and rows list should not be empty and rows list with length more than defaultPaginationLength*/}
                {pagination && filteredRows.length > 0 && defaultPaginationLength > 1 && <Pagination rows={filteredRows} defaultRowsPerPage={defaultRowsPerPage} setCurrentRow={setCurrentRow} defaultPaginationLength={defaultPaginationLength} />}
            </Box>
        </Box>
    )
};


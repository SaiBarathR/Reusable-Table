'use client'

import { SearchIcon } from "@chakra-ui/icons"
import { Checkbox, IconButton, Input, InputGroup, InputRightElement, Menu, MenuButton, MenuList } from "@chakra-ui/react"
import { useEffect, useState } from "react";

type headerProps = {
    total: number;
    caption: string;
    rowData: any;
    filterRows: any;
    filterRowsByColumnGroup: any;
    onlyFilteredDatas: any;
}

export default function HeaderComponent({ total, caption, rowData, filterRows, filterRowsByColumnGroup, onlyFilteredDatas }: headerProps) {

    const [filterRowsByColumn, setFilteredRowsByColumn] = useState<any>([])
    useEffect(() => {
        resetFilters()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterRowsByColumnGroup])

    function resetFilters() {
        setFilteredRowsByColumn(filterRowsByColumnGroup.map((filterValues: any) => filterValues.values.map((item: any) => ({ [item]: false, column: filterValues.column, filterVal: item }))))
    }

    function filterRowDatas(event: React.ChangeEvent<HTMLInputElement>) {
        const filteredList = rowData.filter((rowObj: any) => Object.values(rowObj).filter((value: any) => value.toString().toLowerCase().includes(event.target.value)).length > 0)
        filterRows(filteredList);
        resetFilters()
    }

    function getUniqueValuesInAllArrays(arrays: any[][]): any[] {
        const commonValues: any[] = [];
        const counts = arrays.reduce((obj: any, arr) => {
            for (const item of arr) {
                const key = JSON.stringify(item);
                obj[key] = (obj[key] || 0) + 1;
                if (obj[key] === arrays.length) {
                    commonValues.push(JSON.parse(key));
                }
            }
            return obj;
        }, {});
        return commonValues;
    }

    function handleAddFilterValues(localFileterdColumnGroup: any) {
        let localFilterList: any[] = []
        filterRowsByColumnGroup.map((value: any, index: number) => {
            let localTemp: any[] = []
            value.values.map((item: any, subIndex: number) => {
                let localFilterObj = localFileterdColumnGroup[index][subIndex]
                if (localFilterObj[item]) {
                    localTemp = [...rowData.filter((rowObj: any) => rowObj[value.column].toString().toLowerCase() === (localFilterObj.filterVal).toString().toLowerCase()), ...localTemp]
                }
            })
            if (localTemp.length > 0) {
                localFilterList.push(localTemp)
            }
        })
        filterRows(getUniqueValuesInAllArrays(localFilterList))
    }

    function handleClickFilterCheckbox(event: any, value: string, column: string, index: number, subIndex: number) {
        let localFileterdColumnGroup = structuredClone(filterRowsByColumn);
        localFileterdColumnGroup[index][subIndex][value] = event.target.checked
        if (event.target.checked) {
            handleAddFilterValues(localFileterdColumnGroup)
        }
        else {
            let filteredList = onlyFilteredDatas.filter((rowObj: any) => !(rowObj[column].toString().toLowerCase() === (value.toString().toLowerCase())))
            console.log(filteredList)
            filterRows((filteredList.length > 0 ? filteredList : rowData));
            handleAddFilterValues(localFileterdColumnGroup)
        }
        setFilteredRowsByColumn(localFileterdColumnGroup)
    }

    return (
        <div className=" border-b-gray-300 border-b ">
            <div className="flex items-center p-5 pt-2 pb-2 pl-6 gap-2 h-max">
                <h1 className="font-semibold text-base">{caption}</h1>
                <p className="text-[#99A0A8] text-sm mt-[2px] flex-grow">Total : {total}</p>
                {onlyFilteredDatas.length <= total && <p className="text-[#99A0A8] text-sm mt-[2px] mr-2">Filered Rows : {onlyFilteredDatas.length}</p>}
                <InputGroup width={"max-content"} >
                    <Input placeholder='Search' onChange={filterRowDatas} />
                    <InputRightElement width='2.5rem'> <SearchIcon color={"gray"} /></InputRightElement>
                </InputGroup>
                {filterRowsByColumn.length > 0 && <Menu>
                    <MenuButton as={IconButton} aria-label='filter'
                        icon={<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 1H1L6.6 8.35778V13.4444L9.4 15V8.35778L15 1Z" stroke="#536580" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                    />
                    <MenuList>
                        <div className="flex- flex-col justify-start text-base ">
                            <div className="flex justify-between items-center w-full border-b border-[#D9D9D9] p-2 pt-0">
                                <p className="font-medium text-sm">Filter by</p>
                                <button onClick={() => { resetFilters(); filterRows(rowData); }} className="text-[#3D8BF8] text-sm hover:text-white hover:bg-[#3D8BF8] p-1 rounded">Reset Filters</button>
                            </div>
                            {filterRowsByColumnGroup.map((filterValues: any, index: number) => <div key={filterValues.column}>
                                <div className="capitalize w-full p-2 pb-0">
                                    <label className="text-[#6B778C] text-sm font-medium">{filterValues.column}</label>
                                    <div className="flex flex-col p-2">
                                        {filterValues.values.map((value: any, subIndex: number) => <div className="text-sm m-1" key={value + subIndex}>
                                            <Checkbox size='sm' colorScheme="linkedin" onChange={(e) => { handleClickFilterCheckbox(e, value, filterValues.column, index, subIndex) }}
                                                isChecked={filterRowsByColumn[index][subIndex][value]}
                                            >
                                                {value}
                                            </Checkbox>
                                        </div>)}
                                    </div>
                                </div>
                            </div>
                            )}
                        </div>
                    </MenuList>
                </Menu>}
            </div>
        </div>
    )
}
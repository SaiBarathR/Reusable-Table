This is a [Next-js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Feature List / Optional Props

**sortable**: Boolean, To sort columns by ascending or descending when clicking the column name. This won't work for cell renderer components inside a column. Only for string and numbers


**caption**: String, This is the header props for the table, default behaviour has no header so headers are visible only when a caption is provided. It displays search, total rows, total filtered rows and filter.


**Search** Bar: Default disabled. Search will be enabled once captions are provided so its default behaviour depends on captions that enable headers.


**pagination**: Boolean, Default: Pagination is turned off by default so this prop is required if you want to enable the pagination.


**defaultRowsPerPage**: Number, By default the rows per page is enabled when pagination is enabled. Default rows per page are 6 if no value is provided.


**defaultPaginationLength**: Number, these set the limit for pagination numbers range for example a value of 5 will limit displaying 1-5 with next and previous buttons to jump to 6-10 and thus by it goes on till the rows end. The default pagination length is 5 if no value is provided.


**filterRowsByColumnGroup**: Array of Objects.

**Format**: ```[ { column: 'name of column 1', values: [ 'filter list of this column 1', 'multi filters for same columns' ] },  { column: 'name of column 2', values: [ 'filter list of this column 2', 'multi filters for same columns' ] } ]```.

The default behaviour of filters is disabled if filterRowsByColumnGroup is not provided. 

``` Example: filterRowsByColumnGroup={[{ column: 'status', values: ['failed', 'waiting', 'paid'] }, { column: 'name', values: ['Sai Barath', 'Lokesh'] }, { column: 'purchaseId', values: ['25602'] }]}```


**row**: Arrays of Objects, Rows Data. Format: ```[ { columnName: value }, { columnName: value }, { columnName: value } ] ```.


**headers**: Arrays of Objects, List of columns;

**Format**: ```[ { label: 'API name or local name', name: 'display name for header', cellRenderer: <react component>, optional, use only if you need to add components in row  }, { label: 'API name or local name', name: 'display name for header'} ]```

**cellRenderer**: React Component, the Default behaviour is to render a normal row value but if cellRenderer is provided then a callback function will return an array with array[0]: column name & array[1]: row value. For every single row, this cellRenderer will be called with new row values to give options to render different options based on row values instead of the same component.

**Example**:

```
const columnsData = useMemo<any>(() => [ { label: 'timeStamp', name: 'TimeStamp' }, { label: 'status', name: 'Status', cellRenderer: StatusRenderer }], []);

  function StatusRenderer(value: any[]) {
        const backgroundColor = value[1] === 'failed' ? 'bg-red-200' : value[1] === 'waiting' ? 'bg-yellow-100' : 'bg-green-200';
        return <div className={`flex items-center p-1 capitalize text-gray-800 font-medium text-sm rounded-lg justify-center min-w-[60px] ${backgroundColor}`}>{value[1]}</div>
    }

//Now the status renderer can provide different chips based on the row values

```
## Sample Table Pics

![Sample Table](https://github.com/SaiBarathR/Custom-Table/assets/58382813/8bea2f71-a85f-4405-bdfc-d4a816c48b89)

## Filter Pics

![Filter Example](https://github.com/SaiBarathR/Custom-Table/assets/58382813/d9907af6-1461-4874-8db9-2babf5908120)

## Search Pics

![Search Example](https://github.com/SaiBarathR/Custom-Table/assets/58382813/5d9574dc-ca1d-4aa0-9e40-51f31d3386cf)

## Libraries Used other than Next.js defaults: Chakra-Ui Chakra-icons

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
npm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

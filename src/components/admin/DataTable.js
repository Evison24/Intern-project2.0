import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import { useTable, useSortBy } from 'react-table';
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';

const DataTable = ({ columns, data }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns: columns,
        data: data,
      },
      useSortBy
    );

  return (
    <>
      <Table
        {...getTableProps()}
        borderRadius={'20px'}
        overflow={'hidden'}
        bgColor={'blackAlpha.200'}
        colorScheme={'blackAlpha'}
      >
        <Thead bgColor={'orange.400'}>
          {headerGroups.map(headerGroup => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <Th
                  userSelect="none"
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render('Header')}
                  {column.isSorted ? (
                    column.isSortedDesc ? (
                      <TriangleDownIcon ml={1} w={4} h={4} />
                    ) : (
                      <TriangleUpIcon ml={1} w={4} h={4} />
                    )
                  ) : (
                    ''
                  )}
                </Th>
              ))}
            </Tr>
          ))}
          {/* */}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </>
  );
};

export default DataTable;

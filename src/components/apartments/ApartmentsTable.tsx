import { Apartment } from '@/domain';

export interface IApartmentsTableProps {
  data: Apartment[];
}

export function ApartmentsTable(props: IApartmentsTableProps) {
  return null;
  // const instance = useTableInstance(apartmentsTable, {
  //   data: props.data,
  //   columns,
  //   getCoreRowModel: getCoreRowModel(),
  // });
  // return (
  //   <table>
  //     <thead>
  //       {instance.getHeaderGroups().map((headerGroup) => (
  //         <tr key={headerGroup.id}>
  //           {headerGroup.headers.map((header) => (
  //             <th key={header.id} colSpan={header.colSpan}>
  //               {header.isPlaceholder ? null : header.renderHeader()}
  //             </th>
  //           ))}
  //         </tr>
  //       ))}
  //     </thead>
  //     <tbody>
  //       {instance.getRowModel().rows.map((row) => (
  //         <tr key={row.id}>
  //           {row.getVisibleCells().map((cell) => (
  //             <td key={cell.id}>{cell.renderCell()}</td>
  //           ))}
  //         </tr>
  //       ))}
  //     </tbody>
  //   </table>
  // );
}

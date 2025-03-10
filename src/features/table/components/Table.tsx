import React, { ReactNode } from "react";

interface TableProps {
  data: Record<string, ReactNode>[];
}

const Table: React.FC<TableProps> = ({ data }) => {
  return (
    <div className="w-full border rounded-lg overflow-hidden">
      <table className="w-full border-collapse">
        {/* Table Header */}
        <thead className="bg-gray-200">
          <tr>
            {data.length > 0 &&
              Object.keys(data[0]).map((key) => (
                <th key={key} className="p-3 text-left border">
                  {key.toUpperCase()}
                </th>
              ))}
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b even:bg-gray-50">
              {Object.values(row).map((value, colIndex) => (
                <td key={colIndex} className="p-3 border">
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Loader Placeholder */}
      {data.length === 0 && (
        <div className="p-4 text-center text-gray-500">No Data Available</div>
      )}
    </div>
  );
};

export default Table;

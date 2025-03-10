import React, { ReactNode } from "react";
import "./index.css"; // Import CSS file

interface TableProps {
  data: Record<string, ReactNode>[];
}

const Table: React.FC<TableProps> = ({ data }) => {
  return (
    <div className="table-container">
      <table className="table">
        {/* Table Header */}
        <thead>
          <tr>
            {data.length > 0 &&
              Object.keys(data[0]).map((key) => (
                <th key={key}>{key.toUpperCase()}</th>
              ))}
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {Object.values(row).map((value, colIndex) => (
                <td key={colIndex}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Loader Placeholder */}
      {data.length === 0 && <div className="no-data">No Data Available</div>}
    </div>
  );
};

export default Table;

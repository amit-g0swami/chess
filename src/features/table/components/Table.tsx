import React, { ReactNode } from "react";
import "./index.css";

interface TableProps {
  data: Record<string, ReactNode>[];
}

const Table: React.FC<TableProps> = React.memo(({ data }) => {
  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            {data.length > 0 &&
              Object.keys(data[0]).map((key) => (
                <th key={key}>{key.toUpperCase()}</th>
              ))}
          </tr>
        </thead>
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
      {data.length === 0 && <div className="no-data">No Data Available</div>}
    </div>
  );
});

export default Table;

import React, { useState, useEffect, useContext } from "react";
import data from "../tempData.json";
import ScriptReader from "./ScriptReader";
import { ChannelContext } from "../Contexts/ChannelContext";

const MainScreen = () => {
  const { currentTopic, setCurrentTopic } = useContext(ChannelContext);
  console.log(currentTopic);
  return (
    <div className="h-full w-9/12">
      {/* Main display area */}
      <div className="bg-red-600 h-5/6 p-4">
        <h2 className="text-xl font-bold">Summary</h2>
        <ul className="list-disc ml-6">
          {currentTopic?.notes.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
        <h2 className="text-xl font-bold">Tables</h2>
        <div className="w-full flex">
          {currentTopic?.tables?.map((table, index) => (
            <TableMapper table={table} />
          ))}
        </div>
      </div>
      <ScriptReader script={currentTopic?.transcript || ""} />
    </div>
  );
};

const TableMapper = ({ table }) => {
  return (
    <div className="h-64 w-64 bg-green-800">
      <h3 className=" text-purple-800">{table.tableName}</h3>
      <table>
        <thead>
          <tr>
            {table.columns.map((column) => (
              <th key={column.colName} className="text-yellow-400">
                {column.colName}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.columns[0].data.map((_, rowIndex) => (
            <tr key={rowIndex}>
              {table.columns.map((column) => (
                <td key={`${column.colName}-${rowIndex}`}>
                  {column.data[rowIndex]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MainScreen;

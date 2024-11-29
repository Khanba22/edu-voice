import React, { useState, useEffect, useContext } from "react";
import data from "../tempData.json";
import ScriptReader from "./ScriptReader";
import { ChannelContext } from "../Contexts/ChannelContext";

const MainScreen = () => {
  const { currentTopic, setCurrentTopic } = useContext(ChannelContext);
  console.log(currentTopic);
  return (
    <div className="h-full w-9/12 flex flex-col justify-between">
      {/* Main display area */}
      <div className="bg-neutral-800 text-white h-5/6 p-4 overflow-y-scroll">
        <div>
          <h2 className="text-xl font-bold">{currentTopic && "Tables"}</h2>
          <div className="w-full flex">
            {currentTopic?.tables?.map((table, index) => (
              <TableMapper table={table} />
            ))}
          </div>
        </div>
        <div className="bg-yellow h-1/2 w-3/4">
          <h2 className="text-3xl font-bold">{currentTopic && "Summary"}</h2>
          <ul className="list-disc py-4 ml-6">
            {currentTopic?.notes.map((point, index) => (
              <p className="text-lg" key={index}>
                {point}
              </p>
            ))}
          </ul>
        </div>
      </div>
      <ScriptReader script={currentTopic?.transcript || ""} />
    </div>
  );
};

const TableMapper = ({ table }) => {
  return (
    <div className="max-h-1/2 flex items-center flex-col p-4 rounded-lg">
      <h3 className="text-white text-lg font-semibold mb-4">
        {table.tableName}
      </h3>
      <div className="overflow-auto">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-700">
              {table.columns.map((column) => (
                <th
                  key={column.colName}
                  className="px-4 font-bold text-lg py-2 border-b border-gray-600"
                >
                  {column.colName}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.columns[0].data.map((_, rowIndex) => (
              <tr
                key={rowIndex}
                className={`${
                  rowIndex % 2 === 0 ? "bg-gray-800" : "bg-gray-700"
                } hover:bg-gray-600`}
              >
                {table.columns.map((column) => (
                  <td
                    key={`${column.colName}-${rowIndex}`}
                    className="text-white px-4 py-2 border-b border-gray-600 text-left"
                  >
                    {column.data[rowIndex]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MainScreen;

import React, { useEffect, useState } from "react";

const TopicMapper = ({ documents }) => {
  return (
    <div>
      {documents.map((document) => (
        <TopicView document={document} />
      ))}
    </div>
  );
};

const TopicView = ({ document }) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <div
        className="w-full bg-gray-200"
        onClick={(e) => {
          e.stopPropagation();
          setShow(true);
        }}
      >
        <div className="flex justify-between px-6">
          <h1>{document.title}</h1>
          <button
            className={`${show && "rotate-180"}`}
            onClick={(e) => {
              e.stopPropagation();
              setShow(!show);
            }}
          >
            {"V"}
          </button>
        </div>
        <div className={`${!show && "hidden"}`}>
          {document.topics.map((topic) => (
            <>
              <p>{topic.topicName}</p>
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default TopicMapper;

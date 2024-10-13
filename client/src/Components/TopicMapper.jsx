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
          setShow(!show);
        }}
      >
        <div className="flex justify-between px-6">
          <h1>{document.title}</h1>
          <p className={`${show && "rotate-180"}`}> {"V"}</p>
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

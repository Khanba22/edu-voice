import React, { useContext, useEffect, useState } from "react";
import { ChannelContext } from "../Contexts/ChannelContext";

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
  const { currentTopic, setCurrentTopic } = useContext(ChannelContext);
  const [show, setShow] = useState(false);
  const getTopicData = async (topicId) => {
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/document/get-topic`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ topicId }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setCurrentTopic(data)
      });
  };

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
              <p
                onClick={() => {
                  getTopicData(topic.topicId);
                }}
              >
                {topic.topicName}
              </p>
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default TopicMapper;

import React, { useContext, useEffect, useState } from "react";
import { ChannelContext } from "../Contexts/ChannelContext";
import downArrow from "../Assets/down-arrow.png"

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
        setCurrentTopic(data);
      });
  };

  return (
    <>
      <div
        className="w-full border-neutral-700 bg-gray-100 hover:bg-gray-200 shadow-md rounded-lg"
        onClick={(e) => {
          e.stopPropagation();
          setShow(true);
        }}
      >
        <div className="flex border-x-2 justify-between items-center px-6 py-2 bg-gray-300 my-1 rounded-lg">
          <h1 className="text-md font-semibold text-gray-800">
            {document.title}
          </h1>
          <button
            className={` h-5 w-5 transition-transform duration-300 transform ${
              show && "rotate-180"
            } text-gray-600 focus:outline-none`}
            onClick={(e) => {
              e.stopPropagation();
              setShow(!show);
            }}
          >
            <img className="h-full w-full" src={downArrow} alt="" />
          </button>
        </div>
        <div className={`px-6 py-2 bg-white rounded-b-lg ${!show && "hidden"}`}>
          {document.topics.map((topic) => (
            <p
              key={topic.topicId}
              className="text-gray-700 hover:text-blue-600 cursor-pointer mb-2"
              onClick={() => {
                getTopicData(topic.topicId);
              }}
            >
              {topic.topicName}
            </p>
          ))}
        </div>
      </div>
    </>
  );
};

export default TopicMapper;

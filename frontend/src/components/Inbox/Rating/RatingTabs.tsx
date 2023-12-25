import React, { useState, useEffect } from "react";
import { Tab, Tabs, Pagination } from "react-bootstrap";
import RatingBlock from "./RatingBlock";
import { useRecoilValue } from "recoil";
import { authenticatedUserState } from "../../../app/store/AuthStore";
import axios from "axios";
import { RatingType } from "../../../app/types/Rating";

interface RatingTabsProps {
  activeTab: string;
}

function RatingTabs({ activeTab }: RatingTabsProps) {
  const [rating, setRating] = useState<RatingType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const getUser = useRecoilValue(authenticatedUserState);

  const getRating = async () => {
    try {
      const response = await axios.get(`/api/rating/${getUser.id}`);
      setRating(response.data);
    } catch (e) {
      console.error("Internal error", e);
    }
  };

  useEffect(() => {
    getRating();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = rating.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Tabs
        defaultActiveKey="home"
        id="fill-tab-example"
        className="mb-3"
        fill
      >
        <Tab eventKey="home" title="Your Feedback" className="p-3">
          {currentItems.map((r) => (
            <RatingBlock key={r.id} rating={r} />
          ))}
          <Pagination>
            {[...Array(Math.ceil(rating.length / itemsPerPage)).keys()].map(
              (number) => (
                <Pagination.Item
                  key={number + 1}
                  active={number + 1 === currentPage}
                  onClick={() => paginate(number + 1)}
                >
                  {number + 1}
                </Pagination.Item>
              )
            )}
          </Pagination>
        </Tab>
        <Tab eventKey="profile" title="Profile">
          Tab content for Profile
        </Tab>
      </Tabs>
    </div>
  );
}

export default RatingTabs;

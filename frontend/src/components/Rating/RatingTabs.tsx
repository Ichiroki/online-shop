import { Tab, Tabs } from "react-bootstrap";
import RatingBlock from "./RatingBlock";
import { useRecoilValue } from "recoil";
import { authenticatedUserState } from "../../app/store/AuthStore";
import axios from "axios";
import { useEffect, useState } from "react";

function RatingTabs() {

    const [rating, setRating] = useState([])

    const getUser = useRecoilValue(authenticatedUserState)
    const getRating = async () => {
        try {
            const response = await axios.get(`/api/rating/${getUser.id}`)
            setRating(response.data)
        } catch(e) {
            console.error('internal error', e)
        }
    }

    useEffect(() => {
        getRating()
    }, [])

    console.log(rating)

    return (
        <Tabs
        defaultActiveKey="profile"
        id="fill-tab-example"
        className="mb-3"
        fill
        >
        <Tab eventKey="home" title="Your Feedback" className="p-3">
            {rating.map((r) => (
                <RatingBlock rating={r}/>
            ))}
        </Tab>
        <Tab eventKey="profile" title="Profile">
            Tab content for Profile
        </Tab>
    </Tabs>
    );
}

export default RatingTabs;
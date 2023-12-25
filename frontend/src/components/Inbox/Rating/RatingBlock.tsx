import { Stack } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import diffForHumans from "../../../app/utilities/timeFormat";

function RatingBlock({rating}) {

    return (
        <>
            <Stack className="bg-light-subtle p-3 rounded border mb-3" id="feedback">
                <Stack direction="horizontal">
                    <span>Your Feedback At {rating.products.name}</span>
                    <small className="ms-auto">{diffForHumans(rating.created_at)}</small>
                </Stack>
                <div className="mt-2">
                    {[...Array(5)].map((_, index) => (
                    <FaStar
                    key={index}
                    size={24}
                    style={{
                        color:
                        index < rating.rating                    
                            ? "#ffc107"
                            : "#e4e5e9",
                    }}
                    />
                ))}
                </div>
                <p className="mt-3">{rating.feedback}</p>
            </Stack> 
            
        </>
    );
}

export default RatingBlock;
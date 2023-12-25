import { Button, Card } from "react-bootstrap";
import diffForHumans from "../../app/utilities/timeFormat";
import { NavLink } from "react-router-dom";
import { FaStar } from "react-icons/fa";

function FeedbackUser({rating}) {
  
    const renderStars = (numStars) => {
        const stars: any = [];
        for (let i = 1; i <= 5; i++) {
          stars.push(
            <FaStar
              key={i}
              size={24}
              style={{
                color: i <= numStars ? "#ffc107" : "#e4e5e9",
              }}
            />
          );
        }
        return stars;
    };

    return (
        <>
            <Card className="mb-3">
                <Card.Header>{diffForHumans(rating.created_at)}</Card.Header>
                <Card.Body>
                    <Card.Title>{rating.products.name}</Card.Title>
                    <Card.Text>
                    <div className="mt-2">{renderStars(rating.rating)}</div>
                    <p className="mt-3">{rating.feedback}</p>
                    </Card.Text>
                    <Button to={`/menu/${rating.products.slug}`} variant="primary" as={NavLink}>See the feedback</Button>
                </Card.Body>
            </Card>
        </>
    );
}

export default FeedbackUser;
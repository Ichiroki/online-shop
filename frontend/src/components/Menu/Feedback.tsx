import { Card, Stack } from "react-bootstrap"
import { FaStar } from "react-icons/fa"
import diffForHumans from "../../app/utilities/timeFormat"

function Feedback(props) {
    const {rating} = props
    return (
        <>
            <Card className="mb-3">
                <Card.Body>
                    <Stack>
                        {' '}
                            <Stack direction="horizontal">
                                <h5>
                                    {rating.users.name}
                                </h5>
                                <p className="ms-auto">
                                    {diffForHumans(rating.created_at)}
                                </p>
                            </Stack>
                            <Stack direction="horizontal">
                                {[...Array(5)].map((_,index) => {
                                    return (
                                        <FaStar
                                        key={index}
                                        size={18}
                                        style={{ color: index < rating.rating ? '#ffc107' : '#e4e5e9' }}
                                        />
                                    )
                                })}
                                <span className="ms-3">
                                    {rating.rating}
                                </span>
                            </Stack>
                            {rating.feedback}
                        {' '}
                    </Stack>
                </Card.Body>
            </Card>
        </>
    );
}

export default Feedback;
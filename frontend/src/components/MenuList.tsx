import { Button, Card, Col, Row } from "react-bootstrap";
import { useMenu } from "../store/MenuStore";

function MenuList() {
    const {menu} = useMenu()
    return (
        <Row md={2} xs={1} lg={4} className="g-3">
            {menu.map((item) => (
                    <>
                        <Col key={item.id}>
                            <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src='public/imgs/{item.image}' />
                            <Card.Body>
                                <Card.Title>{item.name}</Card.Title>
                                <Card.Text>
                                {item.desc}
                                </Card.Text>
                                <Button variant="primary">Go somewhere</Button>
                            </Card.Body>
                            </Card>
                        </Col>
                    </>
                )
            )}
        </Row>
    );
}

export default MenuList;
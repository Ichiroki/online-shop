import { Button, Col, Row, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";
import { totalPrice } from "../store/ShoppingCartStore";
import useCart from "../function/CartFunction";
import formatCurrency from "../utilities/formatCurrency";

function MenuInCart({menu}) {
    const { handleAddToCart, handleDeleteFromCart } = useCart()
    const total = useRecoilValue(totalPrice)
    return (
        <>
            {menu.map((m) => (
                <Row key={m.id}>
                    <Col md={4}>
                        <img src={`public/imgs/${m.products.image}`} width='105' />
                    </Col>
                    <Col md={4}>
                        <p style={{ fontSize: ".9rem", marginBottom: ".3rem" }}>
                        {m.products.name}
                        </p>
                        <p style={{ fontSize: ".9rem", marginBottom: ".3rem" }}>
                        {m.quantity} x
                        </p>
                        <p style={{ fontSize: ".9rem", marginBottom: ".3rem" }}>
                        {m.products.price * m.quantity}
                        </p>
                    </Col>
                    <Col md={4} gap={2}>
                        <Button
                        type='button'
                        variant='danger'
                        style={{ marginLeft: ".5rem" }}
                        onClick={() => handleDeleteFromCart(m.users.id, m.products.id)}
                        title={`Decrease ${m.products.name} in ${m.users.name}'\s quantity`}>
                        -
                        </Button>
                        <Button
                        type='button'
                        variant='success'
                        style={{ marginLeft: ".5rem" }}
                        onClick={() => handleAddToCart(m.users.id, m.products.id, m.quantity)}
                        title={`Increase ${m.products.name} in ${m.users.name}'\s quantity`}>
                        +
                        </Button>
                    </Col>
                </Row>
            ))}
            <hr />
            <Stack>
                <Row style={{ fontSize: "1.4rem" }}>
                <Col md={9}>Total : {formatCurrency(total)}</Col>
                <Col md={2}>
                    <Button variant='primary'>Order</Button>
                </Col>
                </Row>
            </Stack>
        </>
    );
}

export default MenuInCart;
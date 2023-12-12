import { Container, Stack } from "react-bootstrap";
import useCart from "../app/function/CartFunction";
import TopNavbar from "../components/Layout/TopNavbar";
import MenuUserCart from "../components/Menu/MenuUserCart";

function UserCart() {
    const {carts} = useCart()

    return (
        <>
            <TopNavbar/>
            <Container>
                <h1>Your Cart Detail</h1>
                <hr/>
                <Stack>
                    <MenuUserCart menu={carts}/>
                </Stack>
            </Container>
        </>
    );
}

export default UserCart;
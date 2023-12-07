import { Col, FloatingLabel, Form, Row, Stack } from "react-bootstrap";

function FilterMenu({selectedCategory, setSelectedCategory, maxPrice, setMaxPrice, show, setBestSeller, setAvail, setBestProduct, setMaxRating, highestRating, setHighestRating}) {

    const handleMaxPriceChange = (e) => {
        setMaxPrice(e.target.value)
    }

    const handleBestSellerChange = (e) => {
        setBestSeller(e.target.checked)
    }

    const handleBestProductChange = (e) => {
        setBestProduct(e.target.checked)
    }

    const handleAvailableChange = (e) => {
        setAvail(e.target.checked)
    }

    const handleHighestRatingChange = (e) => {
        setHighestRating(e.target.checked)
    }

    return (
        <>
            {show ? (
                <Row direction="vertical" className="mb-3 justify-content-between gap-3">
                    <Form.Label>Category</Form.Label>
                    <Col xs={12}>
                        <Form.Select aria-label="Select Category" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                        <option value="all">Category</option>
                        <option value="food">Food</option>
                        <option value="drink">Drink</option>
                        </Form.Select>
                    </Col>
                    <Col xs={12} md={12}>
                    <Row direction="horizontal" className="g-2">
                        <Col md={12}>
                        <FloatingLabel
                        controlId="maxPrice"
                        label="Max Price"
                        className="mb-3">
                            <Form.Control
                            type="number"
                            value={maxPrice}
                            onChange={handleMaxPriceChange}>
                            </Form.Control>
                        </FloatingLabel>
                        </Col>
                        <Col md={12}>
                            <input type="range" name="" id="" className="form-range" min="5000" max="10000" onChange={(e) => setMaxPrice(e.target.value)} step="1000"/>
                        </Col>
                        <Stack>
                            <Col md={2}>
                                <Form.Check type="checkbox" label="Best Seller" onChange={handleBestSellerChange}/>
                            </Col>
                            <Col md={2}>
                                <Form.Check type="checkbox" label="Best Product" onChange={handleBestProductChange}/>
                            </Col>
                            <Col md={2}>
                                <Form.Check type="checkbox" label="Available" onChange={handleAvailableChange}/>
                            </Col>
                            <Col md={2}>
                                <Form.Check type="checkbox" label="Highest Rating" onChange={handleHighestRatingChange}/>
                            </Col>
                        </Stack>
                    </Row>
                    </Col>
                </Row>
            ) : (
                <></>
            )}
            
        </>
    );
}

export default FilterMenu;
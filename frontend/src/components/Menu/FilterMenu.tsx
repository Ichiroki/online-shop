import { Col, FloatingLabel, Form, Row } from "react-bootstrap";

function FilterMenu({selectedCategory, setSelectedCategory, minPrice, maxPrice, setMinPrice, setMaxPrice, show, setBestSeller}) {
    const handleMinPriceChange = (e) => {
        setMinPrice(e.target.value)
    }
    
    const handleMaxPriceChange = (e) => {
        setMaxPrice(e.target.value)
    }

    const handleBestSellerChange = (e) => {
        setBestSeller(e.target.checked)
    }

    return (
        <>
            {show ? (
                <Row direction="vertical" className="mb-3 justify-content-between gap-3" >
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
                        <Col md={6}>
                        <FloatingLabel
                        controlId="minPrice"
                        label="Min Price"
                        className="mb-3">
                            <Form.Control
                                type="number"
                                value={minPrice}
                                onChange={handleMinPriceChange}>
                            </Form.Control>
                        </FloatingLabel>
                        </Col>
                        <Col md={6}>
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
                            <Form.Check type="checkbox" label="Best Seller" onChange={handleBestSellerChange}/>
                        </Col>
                        <Col md={12}>
                            <input type="range" name="" id="" className="form-range" min="5000" max="20000" onChange={(e) => setMaxPrice(e.target.value)} step="5000"/>
                        </Col>
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
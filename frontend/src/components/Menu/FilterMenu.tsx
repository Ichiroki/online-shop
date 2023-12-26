import { useState } from "react";
import { Button, Col, Collapse, FloatingLabel, Form, Row, Stack } from "react-bootstrap";

function FilterMenu(props) {

    const selectedCategory = props.selectedCategory
    const setSelectedCategory = props.setSelectedCategory
    const maxPrice = props.maxPrice
    const setMaxPrice = props.setMaxPrice
    const setBestSeller = props.setBestSeller
    const setAvail = props.setAvail
    const setBestProduct = props.setBestProduct
    const setHighestRating = props.setHighestRating
    const sortOrder = props.sortOrder
    const setSortOrder = props.setSortOrder

    const [show, setShow] = useState(false)

    const handleFilterButtonClick = () => {
      setShow(!show)
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

    const handleMaxPriceChange = (e) => {
        setMaxPrice(e.target.value)
    }

    const handleSortOptionChange = (e) => {
        setSortOrder(e.target.value)
    }

    const handleResetFilter = () => {
        setShow(false)
        setSelectedCategory("all")
        setMaxPrice("10000")
        setBestSeller(false)
        setBestProduct(false)
        setAvail(false)
        setHighestRating(false)
    }

    return (
        <>
            <Button variant="outline-primary" onClick={handleFilterButtonClick} className="rounded-0 rounded-start" aria-expanded={show} aria-controls="filter-menu">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-funnel" viewBox="0 0 16 16">
                    <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2z"/>
                </svg>
                <span className="ms-2">Filter</span>
            </Button>
            <Button variant="outline-primary" onClick={handleResetFilter} className="rounded-0 rounded-end">Clear Filter</Button>
            {show && (
                <>
                <Collapse in={show}>
                    <Row direction="vertical" className="mt-3 justify-content-between g-2 border rounded" id="filter-menu">
                            <Col xs={12}>
                                <Form.Select aria-label="Select Category" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                                <option value="all">Category</option>
                                <option value="food">Food</option>
                                <option value="drink">Drink</option>
                                </Form.Select>
                            </Col>
                                <Row className="mt-3">
                                    <Col xs={6}>
                                        <p>Sort By : </p>
                                    </Col>
                                    <Col xs={6}>
                                        <Form.Select aria-label="Select Category" onChange={handleSortOptionChange}>
                                            <option value="asc">A - Z</option>
                                            <option value="desc">Z - A</option>
                                        </Form.Select>
                                    </Col>
                                </Row>
                            <Col>
                            <Row direction="horizontal">
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
                                    <Col>
                                        <Form.Check type="checkbox" label="Best Seller" onChange={handleBestSellerChange}/>
                                    </Col>
                                    <Col>
                                        <Form.Check type="checkbox" label="Best Product" onChange={handleBestProductChange}/>
                                    </Col>
                                    <Col>
                                        <Form.Check type="checkbox" label="Available" onChange={handleAvailableChange}/>
                                    </Col>
                                    <Col>
                                        <Form.Check type="checkbox" label="Highest Rating" onChange={handleHighestRatingChange}/>
                                    </Col>
                                </Stack>
                            </Row>
                            </Col>
                    </Row>
                </Collapse>
                </>
            )}
        </>
    );
}

export default FilterMenu

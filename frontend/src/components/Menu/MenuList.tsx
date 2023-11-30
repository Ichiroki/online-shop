// MenuList.tsx
import React, { useEffect, useState } from "react"
import { Button, Card, Col, Form, Placeholder, Row, Stack } from "react-bootstrap"
import { FaStar } from 'react-icons/fa'
import { useRecoilState } from "recoil"
import useCart from "../../app/function/CartFunction"
import { useMenu } from "../../app/function/MenuFunction"
import { menuFilterState, selectedCategoryMenu } from "../../app/store/MenuStore"
import formatCurrency from "../../app/utilities/formatCurrency"

function MenuList({searchTerm}) {

  const getAuthUser = localStorage.getItem('authenticated')
  const {menus, setMenus, loading, rating, handleRatingChange} = useMenu()
  const { handleAddToCart } = useCart()
  const parsedUser = JSON.parse(getAuthUser ?? "null") 

  const [selectedCategory, setSelectedCategory] = useRecoilState(selectedCategoryMenu)
  const [filteredMenus, setFilteredMenus] = useRecoilState(menuFilterState)

  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(1000)

  const filterMenu = () => {
    const newFilteredMenus = menus
    .filter((menu) => selectedCategory === "all" || menu.category === selectedCategory)
    .filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    console.log(newFilteredMenus)
    setFilteredMenus(newFilteredMenus)
  }

  useEffect(() => {
    filterMenu()
  }, [selectedCategory, searchTerm, menus])

  return (
    <>
      <Row direction="vertical" className="mb-3 justify-content-between gap-3">
        <Col>
            <Form.Select aria-label="Select Category" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
              <option value="all">Category</option>
              <option value="food">Food</option>
              <option value="drink">Drink</option>
            </Form.Select>
            <Form.Control
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
            placeholder="Min Price">
            </Form.Control>
        </Col>
        <Col>
        <Form.Group>
            <Form.Control
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}>
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
      <Row md={2} xs={1} lg={4} className='g-3'>
        {loading ? (
          <>
            {[...Array(4)].map((_,index) => (
              <React.Fragment key={index}>
                <Col>
                  <Card>
                    <div style={{ width: "100%", height: "200px" }}></div>
                    <Card.Body>
                      <Placeholder as={Card.Title} animation="glow">
                        <Placeholder xs={6}/>
                      </Placeholder>
                      <Placeholder as={Card.Text} animation="glow">
                        <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                        <Placeholder xs={6} /> <Placeholder xs={8} />
                      </Placeholder>
                      <Placeholder.Button variant="primary" xs={6} />
                    </Card.Body>
                  </Card>
                </Col>
              </React.Fragment>
            ))}
          </>
        ) : (
          filteredMenus.map((item) => (
            <>
              <React.Fragment key={item.id}>
                <Col key={item.id}>
                  <Card>
                    <Card.Img variant='top' src={`public/imgs/${item.image}`} title={'Menu Image'}/>
                    <Card.Body>
                      <Card.Title>
                        <div>
                          <span className="fw-light">{item.name}</span>
                        </div>
                        <div>
                          <span className="fw-normal">{formatCurrency(item.price)}</span>
                        </div>
                        <div>
                          <span className="fw-light text-capitalize mt-2 d-block">{item.category}</span>
                        </div>
                        </Card.Title>
                      <Card.Text>
                      <Stack direction="horizontal">
                          {[...Array(5)].map((_, index) => (
                            <FaStar
                              key={index}
                              size={24}
                              style={{ color: index < rating ? '#ffc107' : '#e4e5e9' }}
                            />
                          ))}
                        </Stack>
                      </Card.Text>
                      <Stack gap={3}>
                        <Button
                        id="menuDetail"
                        type="button"
                        variant="success"
                        onClick={() => window.location.href = `/menu/${item.slug}`}>
                          See Detail
                        </Button>
                        <Button
                          id="addItemToOrder"
                          type="button"
                          variant='primary'
                          onClick={() => handleAddToCart(parsedUser.id, item.id, 1)}
                          value="Order"
                          title={`Add new items to auth user cart`}
                          >
                          Order
                        </Button>
                      </Stack>
                    </Card.Body>
                  </Card>
                </Col>
              </React.Fragment>
            </>
          ))
        )}
      </Row>
    </>
  )
}

export default MenuList

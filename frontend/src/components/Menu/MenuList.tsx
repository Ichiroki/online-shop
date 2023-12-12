// MenuList.tsx
import React, { useEffect, useState } from "react"
import { Button, Card, Col, Placeholder, Row, Stack } from "react-bootstrap"
import { FaStar } from 'react-icons/fa'
import { NavLink } from "react-router-dom"
import { useRecoilState } from "recoil"
import useCart from "../../app/function/CartFunction"
import { useMenu } from "../../app/function/MenuFunction"
import { menuFilterState, selectedCategoryMenu } from "../../app/store/MenuStore"
import formatCurrency from "../../app/utilities/formatCurrency"
import FilterMenu from "./FilterMenu"

function MenuList({searchTerm}) {

  const getAuthUser = localStorage.getItem('authenticated')
  const {menus, loading, rating} = useMenu()
  const { handleAddToCart } = useCart()
  const parsedUser = JSON.parse(getAuthUser ?? "null") 

  const [maxRating, setMaxRating] = useState(5)
  const [minRating, setMinRating] = useState(0)

  const [highestRating, setHighestRating] = useState(5)

  const [minPrice, setMinPrice] = useState("5000")
  const [maxPrice, setMaxPrice] = useState("10000")
  const [bestSeller, setBestSeller] = useState(false)
  const [bestProduct, setBestProduct] = useState(false)
  const [avail, setAvail] = useState(false)
  
  const [selectedCategory, setSelectedCategory] = useRecoilState(selectedCategoryMenu)
  const [filteredMenus, setFilteredMenus] = useRecoilState(menuFilterState)
    
  const filterByPrice = (menu) => {
    const menuPrice = menu.price
    const min = minPrice !== '' ? parseInt(minPrice) : Number.MIN_SAFE_INTEGER
    const max = maxPrice !== '' ? parseInt(maxPrice) : Number.MAX_SAFE_INTEGER

    return menuPrice >= min && menuPrice <= max
  }

  const filterMenu = async () => {
    const newFilteredMenus = await menus
    .filter((menu) => selectedCategory === "all" || menu.category === selectedCategory)
    .filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((item) => (!bestSeller || item.best_seller))
    .filter((item) => (!bestProduct || item.best_product))
    .filter((item) => (!avail || item.available))
    // .filter((item) => item.productrating.length > 0)
    .filter(filterByPrice)

    const sortedMenus = highestRating ? [...newFilteredMenus].sort((a,b) => {
      const avgRatingA = calculateAverageRating(a.productrating)
      const avgRatingB = calculateAverageRating(b.productrating)
      return avgRatingB - avgRatingA  
    }) : newFilteredMenus

    setFilteredMenus(sortedMenus)
  }

  const calculateAverageRating = (rating) => {
    const totalRating = rating.reduce((sum, rating) => sum + rating.rating, 0)
    const totalUsers = rating.length
    return totalRating / totalUsers
  }

  const ratingByProduct = {}

  rating.forEach((r) => {
    const productId = r.productId

    if(productId in ratingByProduct) {
      ratingByProduct[productId].totalRating += r.rating
      ratingByProduct[productId].totalUsers += 1
    } else {
      ratingByProduct[productId] = {
        totalRating: r.rating,
        totalUsers: 1
      }
    }
  })

  useEffect(() => {
    filterMenu()
  }, [
    selectedCategory, 
    searchTerm, 
    menus,
    minPrice, 
    maxPrice, 
    bestSeller, 
    bestProduct,
    // highestRating
  ])

  return (
    <>
    <Row>
      <Col>
        <Row className="g-4">
          <Col xs={12} xl={4}>
            <FilterMenu maxPrice={maxPrice} setMaxPrice={setMaxPrice} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} setBestSeller={setBestSeller} setAvail={setAvail} setBestProduct={setBestProduct} setMaxRating={setMaxRating} setHighestRating={setHighestRating} highestRating={highestRating}/>
          </Col>
          <Col xs={12} xl={8}>
            <Row md={2} xs={1} lg={3} className='g-3'>
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
              <React.Fragment key={item.id}>
                <Col key={item.id}>
                  <Card>
                    <Card.Img variant='top' src={`public/imgs/${item.image}`} title={'Menu Image'}/>
                    {/* {item.best_seller && (
                      <p style={{ position: "absolute", top: "1rem", color: "aliceblue", backgroundColor: "#F33", padding: '0 2.3rem',  }}>Best Seller</p>
                    )}
                    {item.best_product && (
                      <p style={{ position: "absolute", top: "3rem", color: "aliceblue", backgroundColor: "#3A3", padding: '0 2.3rem',  }}>Best Product</p>
                    )} */}
                    <Card.Body>
                      <Card.Title>
                        <div>
                          <span className="fw-light">{item.name}</span>
                          <br/>
                          <Stack direction="horizontal" gap={2}>
                            {item.best_seller && (
                              <span className="badge rounded-pill text-bg-success my-2">Best Seller</span>
                            )}
                            {item.best_product && (
                              <span className="badge rounded-pill text-bg-warning my-2">Best Product</span>
                            )}
                          </Stack>
                        </div>
                        <div>
                          <span className="fw-normal">{formatCurrency(item.price)}</span>
                        </div>
                        <div>
                          <span className="fw-light text-capitalize mt-2 d-block">{item.category}</span>
                        </div>
                        </Card.Title>
                      <Card.Text as={'div'} className="mb-3">
                        <Stack direction="horizontal">
                          {[...Array(5)].map((_, index) => (
                            <FaStar
                              key={index}
                              size={24}
                              style={{ color: index < (ratingByProduct[item.id]?.totalRating / ratingByProduct[item.id]?.totalUsers) ? '#ffc107' : '#e4e5e9' }}
                            />
                          ))}
                          <span className="ms-2">{ratingByProduct[item.id]?.totalRating / ratingByProduct[item.id]?.totalUsers || 0}</span>
                          <sub>({ratingByProduct[item.id]?.totalUsers || 0})</sub>
                        </Stack>
                      </Card.Text>
                      <Stack gap={3}>
                        <NavLink
                        id="menuDetail"
                        className="btn btn-success"
                        to={`/menu/${item.slug}`}>
                          See Detail
                        </NavLink>
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
            ))
          )}
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
    </>
  )
}

export default MenuList

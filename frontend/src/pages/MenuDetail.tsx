import axios from "axios"
import { useEffect, useState } from "react"
import { Button, Card, Col, Container, Row, Stack } from "react-bootstrap"
import { FaStar } from "react-icons/fa"
import { useParams } from "react-router-dom"
import { MenuDetails, MenuRating } from "../app/types/Menu"
import TopNavbar from "../components/Layout/TopNavbar"
import formatCurrency from "../app/utilities/formatCurrency"
import Feedback from "../components/Menu/Feedback"
import MenuRatingModal from "../components/Menu/MenuRatingModal"

function MenuDetail() {
  const { slug } = useParams()
  const [rating, setRating] = useState<MenuRating[]>([])
  const [menu, setMenu] = useState<MenuDetails | null>(null)
  const [modalShow, setModalShow] = useState(false)

  const getMenuDetails = async () => {
    try {
      const response = await axios.get(`/api/menu/${slug}`)
      setMenu(response.data)
    } catch (e) {
      console.log("Internal error, please wait " + e)
    }
  }

  const getRatingDetails = async () => {
    try {
      const response = await axios.get(`/api/rating/${slug}`)
      setRating(response.data)
    } catch (e) {
      console.log("Internal server error, please wait " + e)
    }
  }

  const totalRating = rating.reduce(
    (total, currVal) => total + currVal.rating,
    0,
  )

  const avgRating = totalRating / rating.length

  useEffect(() => {
    getMenuDetails()
    getRatingDetails()
  }, [])

  return (
    <>
      <TopNavbar />
      <Container>
        <Row className='d-flex justify-content-between'>
          <Col md={12} lg={4} xl={3}>
            <img src={`/imgs/${menu?.image}`} className='w-100 w-md-75' />
          </Col>
          <Col md={6} lg={4} xl={6} className='mt-5 mt-lg-0'>
            <h1>{menu?.name}</h1>
            <span>
              Category :{" "}
              <span className='text-capitalize'>{menu?.category}</span>
            </span>
            <br />
            <span>{menu?.desc}</span>
          </Col>
          <Col md={6} lg={4} xl={3} className='mt-5 mt-lg-0'>
            <Card className='shadow-sm'>
              <Card.Body>
                <Card.Header className='mb-3'>
                  <Card.Title className='text-center'>Details</Card.Title>
                </Card.Header>
                <Card.Text as={"div"} className='mb-3'>
                  <Row>
                    <Col xs={3}>Price</Col>
                    <Col xs={1} className='p-0'>
                      :
                    </Col>
                    {menu && (
                      <Col xs={6} className='p-0'>
                        {formatCurrency(menu.price)}
                      </Col>
                    )}
                  </Row>
                  <Row>
                    <Col xs={3}>Rating</Col>
                    <Col xs={1} className='p-0'>
                      :
                    </Col>
                    <Col xs={4} className='p-0'>
                      {[...Array(5)].map((_, index) => {
                        return (
                          <FaStar
                            key={index}
                            size={18}
                            style={{
                              color: index < avgRating ? "#ffc107" : "#e4e5e9",
                            }}
                          />
                        )
                      })}
                    </Col>
                    {avgRating && (
                      <Col xs={4} className='p-0'>
                        <>
                          <span>{avgRating}</span>
                          <sub>({rating.length})</sub>
                        </>
                      </Col>
                    )}
                  </Row>
                </Card.Text>
                <Card.Footer className='text-center'>
                  <Stack>
                    <Button
                      variant='primary'
                      className='w-100 mb-2'
                      onClick={() => setModalShow(true)}>
                      Give Rating
                    </Button>
                    <Button variant='success' className='w-100'>
                      Order
                    </Button>
                  </Stack>
                </Card.Footer>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <h1 className='display-6 mt-5'>What are they say about this menu ?</h1>
        <hr />
        {rating.map((item) => (
          <>
            {item.productId === menu?.id ? (
              <Feedback key={item.id} rating={item} />
            ) : (
              <></>
            )}
          </>
        ))}
      </Container>
      <MenuRatingModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        name={MenuDetail}
        menu={menu}
      />
    </>
  )
}

export default MenuDetail

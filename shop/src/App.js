// import logo from './logo.svg';
import './App.css';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { lazy, Suspense, createContext, useEffect, useState } from 'react';
import data from './data.js';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import axios from 'axios'
import { useQuery } from 'react-query'

const Detail = lazy(() => { import('./routes/Detail.js') })
const Cart = lazy(() => { import('./routes/Cart.js') })

// export let Context1 = createContext()

function App() {


  useEffect(() => {
    localStorage.setItem('watched', JSON.stringify([]))



  }, [])


  let [shoes, setShoes] = useState(data)
  let [btnCount, setBtnCount] = useState(0)
  let navigate = useNavigate();

  let result = useQuery('useName', () => {
    return axios.get('https://codingapple1.github.io/userdata.json').then((a) => {
      console.log('요청됨')
      return a.data
    }),
      { staleTime: 2000 }
  })

  console.log(result.data)


  return (
    <div className="App">

      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => { navigate('/') }}>Home</Nav.Link>
            <Nav.Link onClick={() => { navigate('/detail') }} >Detail</Nav.Link>
            <Nav.Link onClick={() => { navigate('/cart') }} >Cart</Nav.Link>
          </Nav>
          <Nav className='ms-auto'>
            {result.isLoading && '로딩중'}
            {result.error && '에러남'}
            {result.data && result.data.name}
          </Nav>
        </Container>
      </Navbar>

      <Suspense fallback={<div>로딩중임</div>}>
        <Routes>
          <Route path="/" element={<Main shoes={shoes} btnCount={btnCount} />} />
          <Route path="/about" element={<About />} />
          <Route path="/about" element={<About />} >
            <Route path="member" element={<div>member</div>} />
            <Route path="location" element={<div>location</div>} />
          </Route>
          <Route path="/detail/:id" element={<Detail shoes={shoes} />} />
          <Route path="/cart" element={<Cart />} />
          {/* 404 페이지 path에 * 표시 */}
          <Route path="/event" element={<Event />} >
            <Route path="one" element={<div><p>첫 주문시 양배추즙 서비스</p></div>} />
            <Route path="two" element={<div><p>생일기념 쿠폰받기</p></div>} />
          </Route>
          <Route path="*" element={<div>없는페이지요</div>} />
        </Routes>
      </Suspense>

    </div>
  );
}





function Event() {
  return (
    <div>
      <h4>오늘의 이벤트</h4>
      <Outlet></Outlet>
    </div>
  )
}

function About() {
  return (
    <div>
      <h4>회사정보페이지</h4>
      <Outlet></Outlet>
    </div>
  )
}

function Main(props, idx) {

  return (
    <>
      <div className='main-bg'></div>

      <div className="container">
        <div className="row">
          {
            props.shoes.map(function (idx, i) {
              return (
                <Item shoes={props.shoes} i={i} />
              )
            })
          }

        </div>

        {/* <button onClick={()=>{
        axios.get('https://codingapple1.github.io/shop/data2.json')
        .then((result)=>{  
          console.log(result.data)
          let plusData = [...props.shoes]
          plusData = plusData.concat(result.data)
          // console.log(plusData);
          props.setShoes(plusData);
          // console.log(plusShoes);
          console.log(props.shoes);
        })
        .catch(()=>{
          console.log('실패함')
        })
    

      }}>버튼</button> */}

        {
          props.btnCount < 3 ? <button onClick={(e) => {
            e.stopPropagation();
            let _link = ('https://codingapple1.github.io/shop/data' + (props.btnCount + 1) + '.json');

            props.setBtnCount(props.btnCount + 1)

            axios.get(_link)
              .then((result) => {
                console.log(result.data)
                let plusData = [...props.shoes, ...result.data]
                props.setShoes(plusData);
              })
              .catch(() => {
                console.log('실패함')
              })

          }}>버튼</button> : null
        }
      </div>
    </>
  )

}



// Main 상품 리스트
function Item(props, i) {
  return (

    <div className="col-md-4" key={i}>
      <a href={'/detail/' + (props.shoes[props.i].id)}>
        <img src={'https://codingapple1.github.io/shop/shoes' + (props.shoes[props.i].id + 1) + '.jpg'} width="80%" />
      </a>
      <h4>{props.shoes[props.i].title}</h4>
      <p>{props.shoes[props.i].content}</p>
      <p>{props.shoes[props.i].price}</p>
    </div>


  )
}

export default App;

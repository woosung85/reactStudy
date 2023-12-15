import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from 'styled-components';
import { Nav} from 'react-bootstrap';
import { useDispatch } from 'react-redux'
import { addItem } from './../store'

// 상세페이지
function Detail(props) {

  let [count, setCount] = useState(0)
  let [timeCount, setTimeCount] = useState(true)
  let [inputCount, setTinputCount] = useState('')
  let [tab, setTab] = useState(0)
  let [fadeOut, setFadeOut] = useState('')
  let { id } = useParams();
  let findItem = props.shoes.find(function (i) {
    return i.id == id
  })

  let dispatch = useDispatch()
  
  useEffect(()=>{

    // if( localStorage.watched === undefined){
    //   localStorage.setItem('watched', JSON.stringify([]));
    // }

    // let watched = JSON.parse(localStorage.getItem('watched'));
    // watched.unshift(id);
    // watched = [...new Set(watched)].slice(0,3);
    // localStorage.setItem('watched', JSON.stringify(watched));

    console.log(findItem)
    let outStorge = localStorage.getItem('watched')
    outStorge = JSON.parse(outStorge)
    outStorge.push(findItem.id)
    outStorge = new Set(outStorge)
    localStorage.setItem('watched', JSON.stringify(outStorge));
    console.log(outStorge)
    outStorge = Array.from(outStorge)

  },[])


  useEffect(() => {
    // 2초뒤에 alret 숨기기
    setTimeout(() => {
      setTimeCount(false)
    }, 2000);
    // isNaN(inputCount) == true ? alert('숫자만 입력해주세요!') : console.log('숫자!')
  })

  useEffect(() => {
    setFadeOut('end') 
    return ()=>{
      setFadeOut('')
    }

  }, [])




  return (
    <div className={"container start " + fadeOut}>

      {
        timeCount == true ? <div className="alert alert-waring">2초이내 구매시 할인</div> : null
      }

      {count}
      <button onClick={() => { setCount(count + 1) }}>버튼</button>
      <div className="row">

        <div className="col-md-6">
          <img src={'https://codingapple1.github.io/shop/shoes' + (findItem.id + 1) + '.jpg'} width="100%" />
        </div>
        {/* <input type="text" onChange={(e)=>{
          setTinputCount(e.target.value)
          console.log(inputCount)
        }}></input> */}
        <div className="col-md-6">
          <h4 className="pt-5">{findItem.title}</h4>
          <p>{findItem.content}</p>
          <p>{findItem.price}원</p>
          <button className="btn btn-danger" onClick={()=>{
            dispatch(addItem({ id : findItem.id, name : findItem.title, count : 1, }))
          }}>주문하기</button>
        </div>
        <Nav variant="tabs"  defaultActiveKey="link0">
            <Nav.Item>
              <Nav.Link onClick={()=>{setTab(0)}} eventKey="link0">버튼0</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={()=>{setTab(1)}} eventKey="link1">버튼1</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={()=>{setTab(2)}} eventKey="link2">버튼2</Nav.Link>
            </Nav.Item>
        </Nav>
        <TabContent shoes={props.shoes} tab={tab}/>
      </div>
    </div>
  )
}

function TabContent({tab, shoes}){

  let [fade, setFade] = useState('')

  useEffect(()=>{
    setTimeout(()=>{setFade('end')},100)
    return ()=>{
      setFade('')
    }
  }, [tab])

  return <div className= {"start " + fade}>
    {[ <div>{shoes[0].title}</div>, <div>내용1</div>, <div>내용2</div> ][tab]}
    </div>
}



export default Detail;
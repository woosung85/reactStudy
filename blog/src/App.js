// warring message lint 끄는 기능 - eslint-disable
/*  */

import './App.css';
import { useState } from 'react';

function App() {

  let [listTitle, listTitleChange] = useState(['남자 코트 추천', '강남 우동 맛집', '파이썬독학']);
  let [likeCount, likechange] = useState([0, 0, 0]);
  let [dday, setDDay] = useState([
    {mon : 2, day: 17},{mon : 3, day: 10}, {mon : 4, day: 5}
  ]);
  let [modal, setModal] = useState(false);
  let [title, setTitle] = useState(0);
  let [input, setInput] = useState('');

  // console.log(dday);
  function listTime(){
    let day = new Date();
    let mon = day.getMonth() + 1;
    let date = day.getDate();
    let ar = [{mon : mon, day: date}]
    console.log(ar);
    // console.log(date);
    let dayList = [...dday];
    dayList = dayList.push(mon);
    setDDay(dayList);
    console.log(dday);
  }

  return (
    <div className="App">
      <div className="black-nav">
        <h4>ReactBlog</h4>
      </div>
  
      {
        listTitle.map(function (index, i) {
          return (
            <div className="list" key={i}>
              <h4 onClick={ ()=>{ setModal(true); setTitle(i)}}>{ listTitle[i] } 
              <span onClick={(e)=>{
                // e.stopPropagation() - event 버블 현상 막아주기
                e.stopPropagation();
                let count = [...likeCount];
                count[i] = count[i]+1;
                likechange(count)
              }}>👍</span> {likeCount[i]} 
              </h4>
              <h4>{ dday[i].mon}월 {dday[i].day}일 발행</h4>
              <button onClick={()=>{
                let list = [...listTitle]
                list.splice(i, 1);
                listTitleChange(list);
                // console.log(list);
              }} >삭제</button>
            </div>
          )
        })
      }

      <input onChange={(e)=>{
        e.stopPropagation();
        setInput(e.target.value);
        // console.log(input);
      }}/>
      <button onClick={(e)=>{
          e.stopPropagation();
        // listTitleChange(listTitle.concat(input)); <-- 아래와 같이 똑같이 작동
        if( input !== ''){
          listTitleChange([...listTitle, input]);
          let count = [...likeCount]
          count[count.length] = 0;
          likechange(count);
          listTime();

        } else {
          alert('글을 입력하세요')
        }
        // console.log(listTitle)

        
      }} >글발행</button>


      {
        modal == true ? <Modal title={title} listTitleChange={listTitleChange} listTitle={listTitle}/> : null
      }


    </div>
  );
}



function Modal(props, i) {
  return (
    <div className='modal' key={i}>
      <h4>{props.listTitle[props.title]}</h4>
      <p>날짜</p>
      <p>상세내용</p>
      <button>글수정</button>
    </div>
  )
}

export default App;

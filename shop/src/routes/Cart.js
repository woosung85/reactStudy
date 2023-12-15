import {Table} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { changeName, increase} from './../store/userSlice'
import { addCount, DeleteItem } from './../store'


function Cart() {

    let state = useSelector((state)=>{ return state})
    console.log(state)

    let dispatch = useDispatch()

    return (
        <div>
            {state.user.name} {state.user.age} 의 바구니
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>변경하기</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        state.cart.map(function(idx, i){
                            return(
                                <tr key={i}>
                                    <td>{state.cart[i].id}</td>
                                    <td>{state.cart[i].name}</td>
                                    <td>{state.cart[i].count}</td>
                                    {/* <td>안녕</td> */}
                                    <td>
                                        <button onClick={()=>{
                                        dispatch(addCount(state.cart[i].id))
                                    }}>+</button>
                                      <button onClick={()=>{
                                        dispatch(DeleteItem(state.cart[i].id))
                                    }}>삭제</button>
                                    {/* <button onClick={()=>{
                                        dispatch(increase(1))
                                    }}>더하기</button>
                                    <button onClick={()=>{
                                        dispatch(increase(10))
                                    }}>10더하기</button> */}
                                    </td>
                                </tr>
                            )
                        })
                    }
                    
                </tbody>
            </Table>
        </div>
    )

}

export default Cart
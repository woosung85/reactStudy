import { configureStore, createSlice } from '@reduxjs/toolkit'
import user from './store/userSlice'

let cart = createSlice(
    {
        name: 'cart',
        initialState: [
            { id: 0, name: 'White and Black', count: 2 },
            { id: 2, name: 'Grey Yordan', count: 1 }
        ],
        reducers: {
            addCount(state, action) {
                let num = state.findIndex((a) => { return a.id == action.payload })
                state[num].count++
            },
            addItem(state, action) {
                let check = false;            
                state.map((x, i) => {
                    if (x.id == action.payload.id) {
                        check = true;
                        x.count++  
                        return state
                    } else {
                        // console.log('없다')
                    }
                    
                })
                if (check == false){
                    state.push(action.payload)
                    
                }
            },
            DeleteItem(state, action) {
                state.map((x, i) => {
                    if (x.id == action.payload) {
                        state.splice(x, 1)
                    }
                })
            }
        }
    }
)

{/* <button className="btn btn-danger" onClick={()=>{
            dispatch(addItem({ id : findItem.id, name : findItem.title, count : 1, }))
          }}>주문하기</button> */}

export let { addCount, addItem, DeleteItem } = cart.actions



export default configureStore({
    reducer: {

        user: user.reducer,
        cart: cart.reducer

    }
}) 
import { createSlice } from "@reduxjs/toolkit"

const initialState = 'Tämä on oletus viesti!'

const notificationSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        addMessage(state, action) {
            return action.payload
        }
    }
})

export const { addMessage } = notificationSlice.actions
export default notificationSlice.reducer
import { createSlice } from "@reduxjs/toolkit"

const initialState = ''

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
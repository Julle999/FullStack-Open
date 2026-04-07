import { create } from 'zustand'

const useFeedbackStore = create((set) => ({
    feedbacks: {
        good: 0,
        neutral: 0,
        bad: 0,
    },
    actions: {
        addGood: () => set(state => ({ feedbacks: { ...state.feedbacks, good: state.feedbacks.good + 1}})),
        addNeutral: () => set(state => ({ feedbacks: { ...state.feedbacks, neutral: state.feedbacks.neutral + 1}})),
        addBad: () => set(state => ({ feedbacks: { ...state.feedbacks, bad: state.feedbacks.bad + 1}}))
    }
}))

export const useFeedback = () => useFeedbackStore( state => state.feedbacks)
export const useFeedbackControls = () => useFeedbackStore( state => state.actions)
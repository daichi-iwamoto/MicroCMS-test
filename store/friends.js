export const state = () => ({
  ApiFlag: false,
  friend: ''
})

export const mutations = {
  FlagChange (state) {
    if (state.ApiFlag === false) {
      state.ApiFlag = true
    }
  },
  getFriends (state, res) { state.friend = res }
}

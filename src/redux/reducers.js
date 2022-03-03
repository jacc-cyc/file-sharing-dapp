function reducers(state, action) {
    switch (action.type) {
      case 'CONNECT_WALLET':
        return { ...state, walletIsConnected: action.payload }
      case 'UPDATE_ADDRESS':
        return { ...state, walletAddress: action.address }
      default:
        return state
    }
  }

export default reducers;
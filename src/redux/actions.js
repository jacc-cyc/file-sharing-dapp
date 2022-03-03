export const connectWallet = {
    type: "CONNECT_WALLET",
    payload: true
};

export const updateAddress = (address) => {
    return {
        type: "UPDATE_ADDRESS",
        address
    }
};
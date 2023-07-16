export const positiveStateChange = (request) => {

    const currentState = request.state;
    let newState;
    let newOwner;
    
    switch(currentState) {
        case "created":
            newState = "sent";
            newOwner = "cook";
            break;
        case "sent":
            newState = "accepted";
            newOwner = "user";
            break;
        case "accepted":
            newState = "confirmed";
            newOwner = "nobody"
            break;
        default:
            newState = "created";
            newOwner = "user";
    }

    return {state: newState, owner: newOwner};
};

export const negativeStateChange = (request) => {

    const currentState = request.state;
    let newState;
    let newOwner;
    
    switch(currentState) {
        case "sent":
            newState = "rejected";
            newOwner = "nobody";
            break;
        case "accepted":
            newState = "unconfirmed";
            newOwner = "nobody"
            break;
        default:
            newState = "created";
            newOwner = "user";
    }

    return {state: newState, owner: newOwner};

};
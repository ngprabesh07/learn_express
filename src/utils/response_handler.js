class ResponseHandler {
    constructor(status, data,message="success"){
        this.status=status
        this.data=data
        this.message=message
        this.sucess=status<400

    }
}

export {ResponseHandler}
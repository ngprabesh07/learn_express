class ErrorHandler extends Error{
     constructor(
        statusCode,
        message="something gonna wrong",
        error =[],
        stack=""
    ){
        super(message)
        this.statusCode=statusCode
        this.data=null
        this.message
        this.success =false
        this.error = error

        if(stack){
            this.stack= stack
        }
        // else{
        //     Error.captureStackTrace(this,this.constructor()
                
        // )
        // }
    }
}

export {ErrorHandler}
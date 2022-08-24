export interface ErrorResponseOptions{
    /**
     * If you want to use this attribute you most do something like this in order 
     * to mantain the scope of the component
     * @example const f = () = { functionToExecute() }
     * const options : ErrorResponseOptions = {
     *      methodReload: f
     * }
     */
    methodReload? : Function
    /**
     * This attribute is for customize error message
     */
    message? : string
    /**
     * If you want to use this attribute you most do something like this in order 
     * to mantain the scope of the component
     * @example const f = () = { functionToExecute() }
     * const options : ErrorResponseOptions = {
     *    method : f
     * }
     * 
     */
    method? : Function 

}
export default interface ModalOptions{
    image?: string
    imageClass?: string
    title? : string,
    message?: string
    color_message? : string
    color_title? : string
    modalWithButtons? : boolean
    affirmativeText? : string
    negativeText? : string
    affirmativeMethod? : Function
    negativeMethod? : Function,
    imageDivClass?:string
}
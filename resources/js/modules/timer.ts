import { ref, Ref } from "vue"

export default class{
    seconds: Ref<number>
    onEnd: Function
    timerTime: number
    interval
    constructor(seconds:number){
        this.seconds = ref(seconds)
        this.timerTime = seconds
        this.start()
    }

    start() {
        this.interval = setInterval(() => {
            this.seconds.value--
            if(this.seconds.value == 0) {
                clearInterval(this.interval)
                if(this.onEnd) this.onEnd()
            }
        }, 1000)
    }

    formatted(){
        const second = this.seconds.value%60
        const minut =  Math.floor(this.seconds.value/60) 
        
        const zeroSecond = second > 9 ? second : `0${second}`
        const zeroMinut = minut > 9 ? minut : `0${minut}`

        return `${zeroMinut}:${zeroSecond}`
    }

    restart(){
        this.seconds.value = this.timerTime
        this.start()
    }

    stop(){
        this.seconds.value = 0
        clearInterval(this.interval)
    }

}
import Moment from 'moment'

class Time {
    constructor(...args) {
        this.date = new Date(...args)
    }
    get when(){
        const now = new Date()
        const ms = now - this.date
 
        const d_year = Math.abs(now.getFullYear() - this.year)
        const d_month =Math.abs((this.date.getMonth() - now.getMonth() + (d_year*12)) ) 
        const d_day = Math.abs(Math.floor(ms/1000/60/60/24))
        const d_seconds = Math.abs(now.getSeconds()-this.date.getSeconds())
        const d_minutes = Math.abs(now.getMinutes()-this.date.getMinutes())
        const d_hours = Math.abs(Math.floor(d_minutes/60))
        console.log(d_year, d_month, d_day)

        var delta = 0
        if (d_year <1 & 0 === d_month & d_day >= 7) {
            return Moment(this.date).format('ll')
        } else if (d_year <1 & 0 === d_month & d_day < 7 & d_hours > 24) {
            delta = `${d_day} day${d_day > 2? 's' : ''}`
        } else if (d_year <1 & 0 === d_month & d_day < 7 & 0 < d_hours < 24) {
            delta = `${d_hours} hour${d_hours > 2? 's' : ''}`
        } else if (d_year <1 & 0 === d_month & d_day < 7 & d_hours < 1) {
            delta = `${d_minutes} minute${d_minutes > 2? 's' : ''}`
        } else if (d_year <1 & 0 === d_month & d_day < 7 & d_hours < 1 & d_minutes < 1) {
            delta = `${d_seconds} second${d_seconds > 2? 's' : ''}`
        }
        return (`${delta} ago`)
    }
}

export default Time


import Moment from 'moment'

function Time(date){
        const now = new Date()
        
        const ms = now - date
        // trying to fix time merge
        // const d_year = Math.abs(now.getFullYear() - date.getFullYear())
        // const d_month =Math.abs((date.getMonth() - now.getMonth() + (d_year*12)) ) 
        const d_day = Math.abs(Math.floor(ms/1000/60/60/24))
        const d_seconds = Math.abs(now.getSeconds()-date.getSeconds())
        const d_minutes = Math.abs(now.getMinutes()-date.getMinutes())
        const d_hours = Math.abs(Math.floor(d_minutes/60))
        console.log(d_day,d_hours,d_minutes,d_seconds)

        var delta = 0
        if (d_day >= 7) {
            return Moment(date).format('ll')
        } else if (d_day !== 0 && d_day < 7) {
            delta = `${d_day} day${d_day > 1? 's' : ''}`
            console.log('Hi')
        } else if (d_hours!== 0 && d_hours < 24) {
            delta = `${d_hours} hour${d_hours > 1? 's' : ''}`
        } else if (d_minutes!== 0 && d_minutes > 1) {
            delta = `${d_minutes} minute${d_minutes > 1? 's' : ''}`
        } else {
            delta = `${d_seconds} second${d_seconds > 1? 's' : ''}`
        }
        return (`${delta} ago`)
    }


export default Time


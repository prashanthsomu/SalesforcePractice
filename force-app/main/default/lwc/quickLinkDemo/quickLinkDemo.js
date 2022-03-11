import { LightningElement,track,api } from 'lwc';

export default class QuickLinkDemo extends LightningElement {

    @track time = '8:50 PM'
    @track greeting = 'Good Evening'

    connectedCallback() {
        this.getTime();

        setInterval(() => {
        this.getTime()
    }, 1000*60);
    }

    getTime() {
        const date = new Date();
        const hour = date.getHours();
        const minute = date.getMinutes();
        this.time = `${this.getHour(hour)}:${this.getMinutes(minute)}  ${this.getMidDay(hour)}`;
        this.greeting = `${this.setGreeting(hour)}`;
    }

    

    getHour(hour) {
        return hour === 0 ? '12' : hour > 12 ? (hour - 12) : hour; 
    }


    getMidDay(hour) {
        return hour >= 12 ? 'PM' : 'AM';
    }

    getMinutes(minute) {
        return minute < 10 ? '0' + minute : minute;
    }

    setGreeting(hour) {
        if (this.hour <= 12) {
            this.greeting = 'Good Morning'
        } else if (this.hour >= 12 && this.hour < 17){
            this.greeting = 'Good Afternoon'
        } else {
            this.greeting = 'Good Evening'
        }
    }

    addClick(event) {
        const tempTaskKeeper = this.template.querySelector('lightning-input');
        console.log('task is', tempTaskKeeper);
        this.tempTaskKeeper = '';
    
    }
}
class dateInput {
    constructor() {
        this.input = document.querySelector(".input");

        this.input.onChange = this.onChange;
    }

    onChange(event) {
        this.inputValue = event.srcElement.value;
        this.updateTime = new Date();
        return this.inputValue;
    }
}

class dateRange extends dateInput {
    constructor() {
        this.container = document.querySelector('.container-for-last-update-record-and-period-items');
    }

    createItems(period) {
        let dates = [];
        for (let i = +period.start; i < +period.end; i+= 3600000 * 168)
            dates.push(i)
        let periods = [];
        for(let i = 0;i < dates.length;i ++) {
            let date = new Date(dates[i]);
            if (date.getDay() == 1) period = `${date.toLocaleDateString()}` - `${date.setHours(168).toLocaleDateString()}`;
            else if (date.getDay() == 2) period[i] = `${date.setHours(-24).toLocaleDateString()}` - `${date.setHours(144).toLocaleDateString()}`;
            else if (date.getDay() == 3) period[i] = `${date.setHours(-48).toLocaleDateString()}` - `${date.setHours(120).toLocaleDateString()}`;
            else if (date.getDay() == 4) period[i] = `${date.setHours(-48).toLocaleDateString()}` - `${date.setHours(120).toLocaleDateString()}`;
            else if (date.getDay() == 5) period[i] = `${date.setHours(-72).toLocaleDateString()}` - `${date.setHours(96).toLocaleDateString()}`;
            else if (date.getDay() == 6) period[i] = `${date.setHours(-96).toLocaleDateString()}` - `${date.setHours(72).toLocaleDateString()}`;
            else if (date.getDay() == 0) period[i] = `${date.setHours(-120).toLocaleDateString()}` - `${date.setHours(48).toLocaleDateString()}`;

            let n = periods.length, a = periods.length;
            do { b = false;
                a /= 1.3;
                if (a == 9 || a == 10) a = 11;
                if (a < 1) a = 1;
                for (let i=0; i<n-a; ++i)
                { if (periods[ i ] > periods[i+a])
                { b = true;
                    let t = periods[i+a]; periods[i+a] = periods[ i ]; periods[ i ] = t;
                }
                }
            } while (a > 1 || b);
        }
        return periods;
    }

    renderItems(items) {
        this.container.appendChild(element = document.createElement('div'));
        element.innerText = `Последнее изменение: ${this.updateTime.getDate() + '.' + this.updateTime.getMonth()  + '0' + this.updateTime.getMonth() + this.updateTime.getMonth()}`;

        items.forEach(function(item) {
            let element = document.createElement('div', {innerText: item});
            this.container.appendChild(element)
        })
    }

    onChange() {
       renderItems(this.createItems(this.createPeriod(this.inputValue)));
    }

    createPeriod(date) {
        let newDate = date;
        newDate.year = newDate.year + 1;
        return {
            start: date,
            end: new Date
        }
    }
}

let range = Object.create(dateRange.prototype);
range.constructor();
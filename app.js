new Vue({
    el: '#app',
    data: {
        city: '',
        temperature: undefined,
        humidity: '',
        temp_min: undefined,
        temp_max: undefined,
        hum_min: undefined,
        hum_max: undefined,
        comment: '',
        icon: '',
        show: false,
    },
    methods: {
        getData: function(arg) {
            var self = this;
            axios.get('http://api.openweathermap.org/data/2.5/weather?q='+self.city+'&appid=32f7fe5bf30711970b03e45269c146f3')
            .then(response => {
                const kelvin =  response.data.main.temp;
                self.temperature = Math.round(kelvin - 272.15) ;
                self.humidity = response.data.main.humidity;
                const iconCode = response.data.weather[0].icon;
                var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
                self.icon = iconUrl;
            })
            .catch(error => {
                console.log(error) ;
            })
            
        },
        getNice: function(arg) {
            var temp_ok = undefined;
            var hum_ok = undefined;
            if(this.temp_min <= this.temperature && this.temp_max >= this.temperature){
               temp_ok = true;
            }
            if(this.hum_min <= this.humidity && this.hum_max >= this.humidity){
               hum_ok = true;
            }
            
            if(temp_ok && hum_ok){
                this.comment = 'The weather is Nice for you!';

                
            } else if(temp_ok || hum_ok){
                this.comment = 'Only one parameter matches!';

            } else {
                this.comment = 'None of the parameters is appropriate. Please try later!';

            }
        },
        everyThing: function(arg1, arg2) {
            this.getData(arg1);
            this.getNice(arg2);
        }
    }
});
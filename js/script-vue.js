
const difficultyItem = document.querySelector('#difficulty');



const {createApp} = Vue;

const app = createApp({
    data(){
        return{
            numCell : 0,
            playLand : []
        }
    },
    methods:{
        play(){
            let difficulty = difficultyItem.value;
            switch (difficulty) {
                case 'easy':
                    this.numCell = 100
                    break;
                case 'hard':
                    this.numCell = 81
                    break;
                case 'crazy':
                    this.numCell = 49
                    break;
            }
            //genero la lista delle posizioni delle bombe
            let listOfBombs = [];
            const COUNT_BOMBS = 16;
            while(listOfBombs.length < COUNT_BOMBS){
                const random = Math.floor(Math.random() * this.numCell) + 1;
                if(!listOfBombs.includes(random)){
                    listOfBombs.push(random);
                }
            }
            //genero l'array di tutte le celle con le proprità necessarie
            for(let i = 1; i <= this.numCell; i++){
                if(listOfBombs.includes(i)){
                    this.playLand.push({counter: 0,bomb : true, show : false});
                }else{
                    this.playLand.push({counter: 0,bomb : false, show : false});
                }
            }
            const row = Math.sqrt(this.numCell);
            for(let j = 0; j < listOfBombs.length; j++){
                const currentPosition = listOfBombs[j];
                let arrayPosition = [];
                let exception1 = [];
                let exception2 = [];
                
                {   
                    if(this.numCell == 100){
                    exception1 = [1,11,21,31,41,51,61,71,81,91];
                    exception2 = [10,20,30,40,50,60,70,80,90,100];
                    }else if(this.numCell == 81){
                    exception1 = [1,10,19,28,37,46,55,64,73];
                    exception2 = [9,18,27,36,45,54,63,72,81];
                    }else{
                    exception1 = [1,8,15,22,29,36,43];
                    exception2 = [7,14,21,28,35,42,49];
                    }
                }
                if(exception1.includes(currentPosition)){
                    arrayPosition = [currentPosition-row,currentPosition-row+1,currentPosition+1,currentPosition+row,currentPosition+row+1];
                }else if(exception2.includes(currentPosition)){
                    arrayPosition = [currentPosition-row-1,currentPosition-row,currentPosition-1,currentPosition+row-1,currentPosition+row];
                }else {
                    arrayPosition = [currentPosition-row-1,currentPosition-row,currentPosition-row+1,currentPosition-1,currentPosition+1,currentPosition+row-1,currentPosition+row,currentPosition+row+1];
                }
                // console.log(arrayPosition);
                for(let i = 0; i < arrayPosition.length; i++){
                    if(!listOfBombs.includes(arrayPosition[i])){
                        if(1 <= arrayPosition[i] && arrayPosition[i] <= this.numCell){
                            this.playLand[arrayPosition[i]-1].counter++;
                        }
                    }
                }
            }
            console.log(this.numCell);
            console.log(listOfBombs);
            console.log(this.playLand);
        }
    }
}).mount('#app')
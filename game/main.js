(() => {
    const arrayNumber = [];
    const cards = document.querySelectorAll('.list__item');
    let firstCard = null;
    let secondCard = null;
    const btn = document.querySelector('.btn')
    
    /* создаем массив из пар */
    function createArray(array) {
        for (let i = 1; i <= (cards.length / 2); ++i) {                                                  
            array.push(i, i);
        }
    }
    
    /* перемешиваем пары*/
    function shuffleArray(array) {                                                      
        for (let i = array.length - 1; i > 0; i--) {                                    
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    
    /*createArray(arrayNumber);
    shuffleArray(arrayNumber);*/
    
    
    function startGame(array) {
        createArray(array);
        shuffleArray(array)
    
        cards.forEach((element, index) => {
            element.textContent = array[index];
            element.addEventListener('click', () =>{
                if (!(element.classList.contains('open')) && !(element.classList.contains('open'))) {
                    element.classList.add('open');
                    if (firstCard != null && secondCard != null) {
                        if (firstCard.textContent != secondCard.textContent) {
                            firstCard.classList.remove('open');
                            secondCard.classList.remove('open');
                            firstCard = null;
                            secondCard = null;
                        }
                    }    
                    if (firstCard == null) {
                        firstCard = element;
                    } else {
                        if (secondCard == null) {
                            secondCard = element;
                        }
                    }
                    if (firstCard != null && secondCard != null) {
                        if (firstCard.textContent == secondCard.textContent) {
                            firstCard.classList.add('success');
                            secondCard.classList.add('success');
                            firstCard = null;
                            secondCard = null;
                            if (document.querySelectorAll('.success').length == array.length) {
                            newGame(array);
                            }
                        }
                    }
                }
            })
        })
    }
    startGame(arrayNumber)
    
    const newGame = (array) => {
        btn.classList.add('btn_reset')
        btn.addEventListener('click', () =>{
            cards.forEach((element) => {
                element.classList.remove('open')
                element.classList.remove('success')
            })
            array = [];
            console.log(array);
            startGame(array);
            console.log(array);
            btn.classList.remove('btn_reset')
        })
    }    
})();






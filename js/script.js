 window.addEventListener('DOMContentLoaded', () => {

    // табы
    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items')

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide')
            item.classList.remove('show', 'fade')
        })
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active')
        })
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade')
        tabsContent[i].classList.remove('hide')
        tabs[i].classList.add('tabheader__item_active')
    }

    hideTabContent()
    showTabContent()

    tabsParent.addEventListener('click', (event) => {
        const target = event.target

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent()
                    showTabContent(i)
                }
            })
        }
    })
    // работа с обратным таймером акции

    const deadline = '2022-03-11'

    function getTimeRemaining(endtime = '2023-03-11') {
        let days, hours, minutes, seconds
        const t = Date.parse(endtime) - Date.parse(new Date())
        if (t <= 0) {
            days = 0
            hours = 0
            minutes = 0
            seconds = 0
        } else {
            days = Math.floor(t/(1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60)) % 24),
            minutes = Math.floor((t / (1000 * 60)) % 60),
            seconds = Math.floor((t / 1000) % 60)
        }
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        }
    }

    function getZero(num) {
        if (num >=0 && num < 10) {
            return `0${num}`
        } else {
            return num
        }
    }
    
    function setTimer(selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),

              timeInterval = setInterval(updateTimer, 1000)

        updateTimer()
        
        function updateTimer() {
            const t = getTimeRemaining(endtime)

            days.innerHTML = getZero(t.days),
            hours.innerHTML = getZero(t.hours),
            minutes.innerHTML = getZero(t.minutes),
            seconds.innerHTML = getZero(t.seconds)
            
            if (t.total <= 0) {
                clearInterval(timeInterval)
            }
        }
    }
    setTimer('.timer', deadline)

    // вызов модального окна

    // const modalTimerId = setTimeout(openModal, 3000)

    function listener(event) {
        console.log('close')
        if (event.code === 'Escape' && modal.classList.contains('show')) {
            closeModal()
        }
    }

    const modalBtns = document.querySelectorAll('[data-modal]'),
          modalCloseBtn = document.querySelector('[data-close]'),
          modal = document.querySelector('.modal')
    
    function openModal() {
        // modal.classList.add('show')
        // modal.classList.remove('hide')
        modal.classList.toggle('show')
        document.body.style.overflow = 'hidden'
        clearInterval(modalTimerId)

        document.addEventListener('keydown', listener)
    }

    modalBtns.forEach(btn => {
        btn.addEventListener('click', openModal)
    })

    function closeModal() {

        // modal.classList.add('hide')
        // modal.classList.remove('show')
        modal.classList.toggle('show')
        document.body.style.overflow = ''

        document.removeEventListener('keydown', listener)
    }

    modalCloseBtn.addEventListener('click', closeModal)

    modal.addEventListener('click', (event)  => {
        console.log('click')
        if (event.target === modal) {
            closeModal()
        }
    })
    
    function showModelByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1) {
            openModal()
            window.removeEventListener('scroll', showModelByScroll)
        }
    }

    window.addEventListener('scroll', showModelByScroll)

    // классы для карточек



    class MenuCard {
        constructor(pic, alt, menuName, about, price, parentSelector,  ...classes) {
            this.pic = pic
            this.alt = alt
            this.menuName = menuName
            this.about = about
            this.price = price
            this.classes = classes
            this.parent = document.querySelector(parentSelector)
            this.transfer = 80
            this.changeToRub()
        }

        changeToRub() {
            this.price = this.price * this.transfer
        }

        render() {
            const element = document.createElement('div')
            if (this.classes.length === 0) {
                this.element = 'menu__item'
                element.classList.add(this.element)
            } else {
            this.classes.forEach(className => element.classList.add(className))
            }

            element.innerHTML += `
                <img src=${this.pic} alt="vegy">
                <h3 class="menu__item-subtitle">Меню ${this.menuName}</h3>
                <div class="menu__item-descr">${this.about}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
                </div>
                `
                this.parent.append(element)
        }
    }

    new MenuCard('"img/tabs/vegy.jpg"',
    'vegy',
    '"Фитнес"',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', 
    9, 
    '.menu .container',
    // 'menu__item',
    // 'big'
    ).render()

    new MenuCard('"img/tabs/elite.jpg"',
    'elite',
    '“Премиум”',
    'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!', 
    15, 
    '.menu .container',
    'menu__item'
    ).render()

    new MenuCard('"img/tabs/post.jpg"',
    'post',
    '"Постное"',
    'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.', 
    10, 
    '.menu .container',
    'menu__item'
    ).render()

 })
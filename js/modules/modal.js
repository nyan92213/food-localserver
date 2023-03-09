function modal() {
    // вызов модального окна
    //=================================================================================

    const modalTimerId = setTimeout(openModal, 50000)

    function listener(event) {
        // console.log('close')
        if (event.code === 'Escape' && modal.classList.contains('show')) {
            closeModal()
        }
    }

    const modalBtns = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal')
    
    function openModal() {
        // modal.classList.add('show')
        // modal.classList.remove('hide')
        modal.classList.add('show');
        modal.classList.remove('hide');
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
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = ''

        document.removeEventListener('keydown', listener)
    }

    modal.addEventListener('click', (event)  => {
        // console.log('click')
        if (event.target === modal || event.target.getAttribute('data-close') == "") {
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
}

module.exports = modal
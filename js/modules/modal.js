function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector)
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden'

    if (modalTimerId) {
        clearInterval(modalTimerId)
    }
    
    console.log(modalTimerId)
    document.addEventListener('keydown', listener)
}

function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector)
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = ''

    document.removeEventListener('keydown', listener)
}

function listener(event) {
    // console.log('close')
    if (event.code === 'Escape' && modal.classList.contains('show')) {
        closeModal(modalSelector)
    }
}

function modal(triggerSelector, modalSelector, modalTimerId) {

    const modalBtns = document.querySelectorAll(triggerSelector),
          modal = document.querySelector(modalSelector)

    modalBtns.forEach(btn => {
        btn.addEventListener('click', () => openModal(modalSelector, modalTimerId))
    })

    modal.addEventListener('click', (event)  => {
        // console.log('click')
        if (event.target === modal || event.target.getAttribute('data-close') == "") {
            closeModal(modalSelector)
        }
    })
    
    function showModelByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1) {
            openModal(modalSelector, modalTimerId)
            window.removeEventListener('scroll', showModelByScroll)
        }
    }

    window.addEventListener('scroll', showModelByScroll)
}

export default modal
export {closeModal}
export {openModal}
export {listener}
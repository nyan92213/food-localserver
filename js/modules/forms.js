import { openModal, closeModal} from "./modal"
import { postData } from "../services/services"

function forms(formSelector, modalSelector, modalTimerId) {
     // работа с формами отправки

     const forms = document.querySelectorAll(formSelector)
     const message = {
         loading: 'img/form/spinner.svg',
         success: 'Спасибо, мы скоро с Вами свяжемся',
         failure: 'Что-то пошло не так'
     }
 
     forms.forEach(item => {
         bindPostData(item)
     })
 
     function bindPostData(form) {
         form.addEventListener('submit', (e) => {
             e.preventDefault()
 
             let statusMessage = document.createElement('img')
             statusMessage.src = message.loading
             statusMessage.style.cssText = `
             display: block;
             margin: 0 auto;
             `
             form.insertAdjacentElement('afterend', statusMessage)
 
             const formData = new FormData(form)
 
             const json = JSON.stringify(Object.fromEntries(formData.entries())) // берем формдату, превращаем в массив масивов, потом в классический объект и уже его превращаем в json
 
             // Fetch API using
 
             postData('http://localhost:3000/requests', json)
             .then(data => {
                //  console.log(data)
                 showThanksModal(message.success, modalSelector, modalTimerId)
                 statusMessage.remove()
             }).catch(() => {
                 showThanksModal(message.failure, modalSelector, modalTimerId)
             }).finally(() => {
                 form.reset()
             })
         })
     }
 
     function showThanksModal(message, modalSelector) {
         const prevModalDialog = document.querySelector('.modal__dialog')
 
         prevModalDialog.classList.add('hide')
         openModal(modalSelector, modalTimerId)
 
         const thanksModal = document.createElement('div')
         thanksModal.classList.add('modal__dialog')
         thanksModal.innerHTML = `
         <div class="modal__content">
             <div data-close class="modal__close">&times;</div>
             <div class="modal__title">${message}</div>
         </div>
         `
         document.querySelector('.modal').append(thanksModal)
         setTimeout(() => {
             thanksModal.remove()
             prevModalDialog.classList.add('show')
             prevModalDialog.classList.remove('hide')
             closeModal(modalSelector)
         }, 4000)
     }
 
     // Fetch API using example
     //=================================================================================
 
     // fetch('https://jsonplaceholder.typicode.com/posts', {
     //     method: "POST",
     //     body: JSON.stringify({name: 'Alex'}),
     //     headers: {
     //         'Content-Type': 'application/json'
     //     }
     // })
     //   .then(response => response.json()) // здесь возвращается промис
     //   .then(json => console.log(json))
 
     // fetch('http://localhost:3000/menu')
     //     .then(data => data.json())
     //     .then(res => console.log(res))
}

export default forms
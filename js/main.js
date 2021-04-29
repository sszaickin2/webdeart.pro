//anim loading
$(document).ready(function() {
  $("body").css("display", "none");

  $("body").fadeIn(2000);

  $("a.transition").click(function(event){
      event.preventDefault();
      linkLocation = this.href;
      $("body").fadeOut(1000, redirectPage);
  });

  function redirectPage() {
      window.location = linkLocation;
  }
});



// animition



var wow = new WOW(
  {
    boxClass:     'wow',    
    animateClass: 'animated', 
    offset:       0,        
    mobile:       false,     
    live:         true,       
    callback:     function(box) {
      
    },
    scrollContainer: null 
  }
);
wow.init();


// popup


$(document).ready(function () {
  var modal = $('.modal'),
      modalBtn = $('[data-toggle="modal"]'),
      closeBtn = $('.modal__close'),
      bodyovere = $('body');


  modalBtn.on ('click', function() {
      modal.toggleClass('modal--visible');
      bodyovere.toggleClass('lock--overe');
  });
  closeBtn.on ('click', function () {
      modal.toggleClass('modal--visible');
      bodyovere.toggleClass('lock--overe');
  });
});




// form
"use strict"

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('form');
  form.addEventListener('submit', formSend);

  async function formSend(e) {
    e.preventDefault();

    let error = formValidate(form);

    let formData = new FormData(form);

    if (error === 0) {
      form.classList.add('_sending');
      let response = await fetch('sendmail.php', {
        method: 'POST',
        body: formData
      });
      if (response.ok) {
        let result = await response.json();
        alert(result.message);
        form.reset();
        document.querySelectorAll('.modal--visible').forEach((el) => {
          el.classList.remove('modal--visible')
        })
      } else {
        alert('Ошибка')
      }

    } else {
      alert('Заполните обязательные поля');
    }

  }

  function formValidate(form) {
    let error = 0;
    let formReq = document.querySelectorAll('._req');
    
    for (let i = 0; i < formReq.length; i++) {
      const input = formReq[i];
      
      formRemoveError(input);

      if (input.classList.contains('_email')) {
        if (emailTest(input)) {
          formAddError(input);
          error++;
        }
      } else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
        formAddError(input);
        error++;
      } else {
        if (input.value === '') {
          formAddError(input);
          error++;
        }
      }
    }
    return error;
  }

  function formAddError(input) {
    input.parentElement.classList.add('_error');
    input.classList.add('_error');
  }
  function formRemoveError(input) {
    input.parentElement.classList.remove('_error');
    input.classList.remove('_error');
  }
  function emailTest(input) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
  }
});




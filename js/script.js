window.addEventListener('DOMContentLoaded', (e) => {
    e.preventDefault();
    // Animation------------------------------------
    const body = document.querySelector('body'),
          header = document.querySelector('.header'),
          headerBtn = header.querySelector('.btn'),
          headerTitle = header.querySelector('.header__title'),
          about = document.querySelector('.about'),
          aboutCards = about.querySelectorAll('.cards-item'),
          benefits = document.querySelector('.benefits'),
          benefitsItem = benefits.querySelectorAll('.benefits__item'),
          why = document.querySelector('.why'),
          whyCards = why.querySelectorAll('.cards-item'),
          workflow = document.querySelector('.workflow'),
          workflowCards = workflow.querySelectorAll('.cards-item'),
          forms = document.querySelectorAll('form'),
          footer = document.querySelector('.footer'),
          footerFront = footer.querySelector('.footer__bg--front'),
          footerBack = footer.querySelector('.footer__bg--back'),
          footerInner = footer.querySelector('.footer__inner'),
          feedback = document.querySelector('.feedback'),
          feedbackView = feedback.querySelector('.feedback__view'),
          feedbackItem = feedback.querySelectorAll('.feedback__item'),
          feedbackSlider = feedback.querySelector('.feedback__slider'),
          prev = feedback.querySelector('.slider__prev'),
          next = feedback.querySelector('.slider__next'),
          modals = document.querySelectorAll('.modal'),
          modalForm = document.querySelector('#modal--form'),
          modalThanks = document.querySelector('#modal--thanks'),
          modalClose = document.querySelectorAll('.modal__close');


        function addClass(item, className){
            item.classList.add(`${className}`);
        }

        function removeClass(item, className){
            item.classList.remove(`${className}`);
        }

        function forAddClass(items, className){
            items.forEach(item =>{
                item.classList.add(`${className}`);
            });
        }

        function forRemoveClass(items, className){
            items.forEach(item =>{
                item.classList.remove(`${className}`);
            });
        }

    window.addEventListener('scroll', (e) => {
        e.preventDefault();
        // header---------------------------------------------
        if (document.documentElement.scrollTop > 0) {
            addClass(header, 'header--visible');
            addClass(headerBtn, 'btn--visible');
            headerTitle.style.color = "#fff";
        } else {
            removeClass(header, 'header--visible');
            removeClass(headerBtn, 'btn--visible');
            headerTitle.style.color = "";
        }

        // about----------------------------------------------------
        if (document.documentElement.scrollTop >= ((about.clientHeight * 1.9) + about.offsetTop)) {
            aboutCards.forEach(card => {
                addClass(card, 'hide');
            });
        } else {
            aboutCards.forEach(card => {
                removeClass(card, 'hide');
            });
        }

        // benefits-------------------------------------------------

        benefitsItem.forEach(item => {
            if ((document.documentElement.scrollTop + document.documentElement.clientHeight <= item.offsetTop) || document.documentElement.scrollTop >= item.offsetTop + (item.clientHeight / 2)) {
                addClass(item.querySelector('.benefits__item-icon'), 'hide');
            } else {
                removeClass(item.querySelector('.benefits__item-icon'), 'hide');
                if (document.documentElement.clientWidth <= 767) {
                    item.querySelector('.benefits__item-icon').style.animation = ".6s translate380px .15s both";
                } else {
                    item.querySelector('.benefits__item-icon').style.animation = "";
                }
            }
        });

        // why------------------------------------------------------
        if ((document.documentElement.scrollTop + document.documentElement.clientHeight <= why.offsetTop - (why.clientHeight / 2)) || document.documentElement.scrollTop >= why.offsetTop + (why.clientHeight * 1.8)) {
            forAddClass(whyCards, 'hide');
            
        } else {
            forRemoveClass(whyCards, 'hide');
        }

        // workflow-------------------------------------------------
        if (document.documentElement.clientWidth <= 767) {
            if ((document.documentElement.scrollTop + document.documentElement.clientHeight <= workflow.offsetTop + (workflow.clientHeight / 2)) || document.documentElement.scrollTop >= workflow.offsetTop + (workflow.clientHeight * 1.5)) {
                forAddClass(workflowCards, 'hide');

            } else {
                forRemoveClass(workflowCards, 'hide');

            }
        } else {
            if ((document.documentElement.scrollTop + document.documentElement.clientHeight <= workflow.offsetTop) || document.documentElement.scrollTop >= workflow.offsetTop + (workflow.clientHeight)) {
                forAddClass(workflowCards, 'hide');

            } else {
                forRemoveClass(workflowCards, 'hide');

            }
        }

        // footer-----------------------------------------------------
        if (document.documentElement.scrollTop + document.documentElement.clientHeight >= footer.offsetTop + (footer.clientHeight / 2)) {
            removeClass(footerFront, 'hide');
            removeClass(footerBack, 'hide');
            addClass(footerInner, 'anim--color');
        } else {
            if (document.documentElement.scrollTop + (document.documentElement.clientHeight) <= footer.offsetTop) {
                addClass(footerFront, 'hide');
                addClass(footerBack, 'hide');
                removeClass(footerInner, 'anim--color');
            }
        }
        
    });

    // Slider----------------------------------------------------
    let offset = 0,
        width = feedbackView.clientWidth,
        height = feedbackView.clientHeight;

    feedbackItem.forEach(item => {
        item.style.width = width + "px";
        item.style.height = height + "px";
    });
    feedbackSlider.style.width = 100 * feedbackItem.length + "%";

    next.addEventListener('click', () => {
        if (offset == width * (feedbackItem.length - 1)) {
            offset = 0;
        } else {
            offset += width;
        }

        feedbackSlider.style.transform = `translateX(-${offset}px)`;
    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = width * (feedbackItem.length - 1);
        } else {
            offset -= width;
        }

        feedbackSlider.style.transform = `translateX(-${offset}px)`;
    });

    // Modal----------------------------------------------
    headerBtn.addEventListener('click', (e) => {
        e.preventDefault();
        modalForm.classList.remove('hide');
        body.style.overflow = "hidden";
    });

    modalClose.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            modals.forEach(modal => {
                modal.classList.add('hide');
            });
            body.style.overflow = "";
        });
    });

    function showModalThanks() {
        modalForm.classList.add('hide');
        modalThanks.classList.remove('hide');

        setTimeout( () => {
            modalThanks.classList.add('hide'); 
            body.style.overflow = "";
        }, 3000);
    }


    forms.forEach(form => {
        form.addEventListener('submit', formSend);

        async function formSend(e) {
            e.preventDefault();

            let error = formValidate(form);

            if (error === 0) {
                forms.forEach(form => {
                    form.querySelector('.form__input').value = "";
                    formRemoveError(form.querySelector('.form__input'));
                });

                showModalThanks();
                body.style.overflow = "hidden";

            } else {
                alert('Заполните обязательные поля');
                forms.forEach(form => {
                    form.querySelector('.form__input').value = "";
                });
            }
        }

        function formValidate(form) {
            let error = 0;
            let formReq = form.querySelector('._req');

            formRemoveError(formReq);

            if (formReq.classList.contains('_email')) {
                if (emailTest(formReq)) {
                    formAddError(formReq);
                    error++;
                }
            } else {
                if (formReq.value === '') {
                    formAddError(formReq);
                    error++;
                }
            }

            return error;

        }
    });

    function formAddError(input) {
        input.parentElement.classList.add('_error');
        input.classList.add('_error');
    }

    function formRemoveError(input) {
        input.parentElement.classList.remove('_error');
        input.classList.remove('_error');
    }

    function emailTest(input) {
        return !/^\w+([\.-]?)*@\w+([\.-]?)*(\.\w{2,8})+$/.test(input.value);
    }
});
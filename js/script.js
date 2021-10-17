window.addEventListener('DOMContentLoaded', (e) => {
    e.preventDefault();
    // Animation------------------------------------
    const header = document.querySelector('.header'),
          headerBtn = header.querySelector('.btn'),
          headerTitle = header.querySelector('.header__title'),
          about = document.querySelector('.about'),
          aboutCards = about.querySelectorAll('.cards-item'),
          partners = document.querySelector('.partners'),
          benefits = document.querySelector('.benefits'),
          benefitsItem = benefits.querySelectorAll('.benefits__item'),
          benefitsPicture = benefits.querySelectorAll('.benefits__item-icon'),
          why = document.querySelector('.why'),
          whyCards = why.querySelectorAll('.cards-item'),
          workflow = document.querySelector('.workflow'),
          workflowCards = workflow.querySelectorAll('.cards-item'),
          footer = document.querySelector('.footer'),
          footerFront = footer.querySelector('.footer__bg--front'),
          footerBack = footer.querySelector('.footer__bg--back'),
          footerInner = footer.querySelector('.footer__inner'),
          feedback = document.querySelector('.feedback'),
          feedbackView = feedback.querySelector('.feedback__view'),
          feedbackItem = feedback.querySelectorAll('.feedback__item'),
          feedbackSlider = feedback.querySelector('.feedback__slider'),
          prev = feedback.querySelector('.slider__prev'),
          next = feedback.querySelector('.slider__next');


    window.addEventListener('scroll', (e) => {
        e.preventDefault();
        // header---------------------------------------------
        if (document.documentElement.scrollTop > 0){
            header.classList.add('header--visible');
            headerBtn.classList.add('btn--visible');
            headerTitle.style.color = "#ffffff";
        } else {
            header.classList.remove('header--visible');
            headerBtn.classList.remove('btn--visible');
            headerTitle.style.color = "";
        }

        // about----------------------------------------------------
            if (document.documentElement.scrollTop >= ((about.clientHeight * 1.5) + about.offsetTop)){
                aboutCards.forEach(card => {
                    card.style.display = "none";
                });
            } else {
                aboutCards.forEach(card => {
                    card.style.display = "";
                });
            }

        // benefits-------------------------------------------------

        benefitsItem.forEach(item => {
            if ((document.documentElement.scrollTop + document.documentElement.clientHeight <= item.offsetTop) || document.documentElement.scrollTop >= item.offsetTop + (item.clientHeight / 2)){
                item.querySelector('.benefits__item-icon').style.display = "none"; 
            } else {
                item.querySelector('.benefits__item-icon').style.display = "";
                if (document.documentElement.clientWidth <= 767){
                    item.querySelector('.benefits__item-icon').style.animation = ".6s translate380px .15s both";
                } else {
                    item.querySelector('.benefits__item-icon').style.animation = "";
                }
            }
        });

        // why------------------------------------------------------
        if((document.documentElement.scrollTop + document.documentElement.clientHeight <= why.offsetTop - (why.clientHeight / 2)) || document.documentElement.scrollTop >= why.offsetTop + (why.clientHeight * 1.8)) {
            whyCards.forEach(item => {
                item.style.display = "none";
                
            });
        } else {
            whyCards.forEach(item => {
            item.style.display = "";
            });
        }

        // workflow-------------------------------------------------
        if((document.documentElement.scrollTop + document.documentElement.clientHeight <= workflow.offsetTop + (workflow.clientHeight / 2)) || document.documentElement.scrollTop >= workflow.offsetTop + (workflow.clientHeight * 1.5)) {
            workflowCards.forEach(item => {
                item.style.display = "none";
                
            });
        } else {
            workflowCards.forEach(item => {
            item.style.display = "";
            });
        }

        // footer-----------------------------------------------------
        if (document.documentElement.scrollTop + document.documentElement.clientHeight >= footer.offsetTop + (footer.clientHeight / 2)){
            footerFront.style.display = "";
            footerBack.style.display = "";
            footerInner.classList.add('anim--color');
        } else{
            if (document.documentElement.scrollTop + (document.documentElement.clientHeight) <= footer.offsetTop){
                footerFront.style.display = "none";
                footerBack.style.display = "none";
                footerInner.classList.remove('anim--color');
            }
            
        }

    });  
    
    // Slider----------------------------------------------------
    let offset = 0,
        width = feedbackView.clientWidth,
        height = feedbackView.clientHeight;

    feedbackItem.forEach(item =>{
        item.style.width = width + "px";
        item.style.height = height + "px";
    });
    feedbackSlider.style.width = 100 * feedbackItem.length + "%";
    
    next.addEventListener('click', () => {
        if (offset == width * (feedbackItem.length - 1)){
            offset = 0;
        } else {
            offset += width;
        }

        feedbackSlider.style.transform = `translateX(-${offset}px)`;
        console.log(offset);
    });

    prev.addEventListener('click', () => {
        if (offset == 0){
            offset = width * (feedbackItem.length - 1);
        } else {
            offset -= width;
        }

        feedbackSlider.style.transform = `translateX(-${offset}px)`;
        console.log(offset);
    });

});
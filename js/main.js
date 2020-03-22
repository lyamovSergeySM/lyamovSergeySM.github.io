$(function() {


    //Стартовая страница - показать блок регистрации
    $("#showRegisterForm").on("click", function(e) {
        e.preventDefault();
        showRegisterBlock();
    })



    //показать блок с регистрацией
    function showRegisterBlock() {
        $(".start-block").addClass('hideBlock');
        $(".register-block").addClass('showBlock');
        $(".shadow-block").addClass("show");
    }

    //показать блок с регистрацией клиента + заменить фоновую картинку
    function showRegisterClient() {
        $(".register-client").addClass('showBlock');
        // $(".background-block").css("background-image", "url('../app/img/women-collection.jpg')");
        $(".background-block").css("background-image", "url('../img/women-collection.jpg')");
    }



    //Показать служебное сообщение при регистрации
    function showMessageMain(text) {
        $("<div class='message'><p>" + text + "</p></div>").appendTo("body");
        //Сообщение автоматически скрывается и показывается блок регистрации клиента
        setTimeout(function() {
            $(".message").fadeOut("400", function() {
                $(this).remove();
                showRegisterClient();
            })
        }, 3000);
    }



    //скрыть сообщение кликнув по нему
    $(document).on('click', '.message', function() {
        $(this).fadeOut("400", function() {
            $(this).remove();
            showRegisterClient();
        });
    })


    //Прелоадер добавить/убрать
    function addPreloader() {
        $("<div class='preloader'><img src='img/tenor.gif'></div>").appendTo("body");
    }

    function removePreloader() {
        $('.preloader').remove();
    }


    //валидация формы регистрации
    $(".signForm").validate({
        rules: {
            name: {
                required: true,
                minlength: 2
            },
            place: {
                required: true,
                minlength: 3
            },
            phoneNumber: {
                required: true
            }
        },
        messages: {
            name: {
                required: "Поле 'менеджер' не должно быть пустым",
                minlength: "Введите не меньше 2-х символов"
            },
            place: {
                required: "Поле 'регион' не должно быть пустым",
                minlength: "Введите не меньше 3-х символов"
            },
            phoneNumber: {
                required: "Поле 'телефон' не должно быть пустым"
            }
        }
    });

    //маска номера телефона
    $(".phone-number").mask("+38(999) 999-99-99");

    //валидация формы регистрации клиента
    $(".client-form").validate({
        rules: {
            company: {
                required: true,
                minlength: 2
            },
            place: {
                required: true,
                minlength: 3
            },
            presentationDate: {
                required: true
            }
        },

        messages: {
            company: {
                required: "Поле 'компания' не должно быть пустым",
                minlength: "Введите не меньше 2-х символов"
            },
            place: {
                required: "Поле 'регион' не должно быть пустым",
                minlength: "Введите не меньше 3-х символов"
            },
            presentationDate: {
                required: "Поле 'дата' не должно быть пустым"
            }
        }
    });



    //Дата подставляется в input при регистрации клиента
    var options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        timezone: 'UTC'
    };
    let date = new Date().toLocaleString("ru", options);



    //маска поля даты
    $(".presentationDate").mask("99.*9.9999", { placeholder: date });





    //тест формы
    $("#register").on("click", function(e) {
        e.preventDefault();
        if ($(".signForm").valid()) {
            $('.signForm').hide();
            addPreloader();
            setTimeout(function() {
                removePreloader();
                showMessageMain("Вы успешно зарегистрированы! Добро пожаловать в презентацию");
            }, 2000);

        }
    })

    //переход на страницу коллекции
    $(".client-form").on('submit', function(e) {
        e.preventDefault();
        $(location).attr('href', "https://lyamovsergeysm.github.io/collections.html");
    })


    //Страница каталог > заполнить элементы цифрами
    $(".catalog .catalog__num").each(function(index, el) {
        $(el).text(index + 1);
    });


    //header > показать/скрыть меню пользователя
    $(document).on('click', ".user", function() {
        let that = this;
        $(that).addClass("show-submenu");
        $(this).find(".user__name").delay(300).fadeIn('400', function() {
            $(this).css("display", "flex");
            $(that).find(".user__submenu").animate({ "height": 217 + "px" }, 200);
        });

    })
    $(document).mouseup(function(e) { // событие клика по веб-документу
        var div = $(".user"); // тут указываем ID элемента
        if (!div.is(e.target) // если клик был не по нашему блоку
            &&
            div.has(e.target).length === 0) { // и не по его дочерним элементам
            $(div).find(".user__name").hide();
            $(div).find(".user__submenu").css("height", 0);
            div.removeClass('show-submenu'); // скрываем его
        }
    });


    //карточка товара слайдер
    
    $("#modalSlider").on("shown.bs.modal", function() {
    	
        $('.slider-for').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            asNavFor: '.slider-nav'
        });
        $('.slider-nav').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            asNavFor: '.slider-for',
            dots: false,
            centerMode: false,
            focusOnSelect: true,
            vertical: true,
            appendArrows: $(".slider-nav"),
            prevArrow: "<span class='prevArr'></span>",
            nextArrow: "<span class='nextArr'></span>"
        });
        $('.slider-for').animate({"opacity": 1}, 300);
        $('.slider-nav').animate({"opacity": 1}, 300);
    })

    $("#modalSlider").on("hidden.bs.modal", function(){
    	$('.slider-for').slick('unslick');
    	$('.slider-nav').slick('unslick');
    	$('.slider-for').css("opacity", 0);
    	$('.slider-nav').css("opacity", 0);
    })

  	//карточка товара > выбор размера
  	$(".size-block__items span").on("click", function(){
  		$(this).addClass("active").siblings().removeClass("active");
  	})

  	//карточка товара > добавить числа в input
  	$(document).on("click", '.quantity__item span',  function(){
  		let inputValue = $(this).siblings('input').val();
  		if($(this).hasClass('plus')){
  			inputValue++;
  			$(this).siblings('input').val(inputValue);
  		}else if($(this).hasClass('minus')){
  			inputValue--;
  			if(inputValue > 0){
	  			$(this).siblings('input').val(inputValue);
  			}else{
  				$(this).siblings('input').val(0);
  			}
  		}
  	})
  	//Запрет ввода "руками" отрицательных значений в поле input
  	$("body").delegate('.quantity__item input', 'focusout', function(){
        if($(this).val() < 0){
            $(this).val('0');
        }
    });


  	//Карточка товара > смайл-комментарий

  	$(document).on("click", ".smile-block a", function(e){
  		e.preventDefault();
  		$(this).addClass("active").siblings().removeClass("active");
  	})


});
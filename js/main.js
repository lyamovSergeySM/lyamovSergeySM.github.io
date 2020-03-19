$(function() {


	//Стартовая страница - показать блок регистрации
	$("#showRegisterForm").on("click", function(e){
		e.preventDefault();
		showRegisterBlock();
	})



	//показать блок с регистрацией
	function showRegisterBlock(){
		$(".start-block").addClass('hideBlock');
		$(".register-block").addClass('showBlock');
		$(".shadow-block").addClass("show");
	}

	//показать блок с регистрацией клиента + заменить фоновую картинку
	function showRegisterClient(){
		$(".register-client").addClass('showBlock');
		// $(".background-block").css("background-image", "url('../app/img/women-collection.jpg')");
		$(".background-block").css("background-image", "url('../img/women-collection.jpg')");
	}



	//Показать служебное сообщение при регистрации
	function showMessageMain(text){
		$("<div class='message'><p>" + text + "</p></div>").appendTo("body");
		//Сообщение автоматически скрывается и показывается блок регистрации клиента
		setTimeout(function(){
			$(".message").fadeOut("400", function(){
				$(this).remove();
				showRegisterClient();
			})
		}, 3000);
	}



	//скрыть сообщение кликнув по нему
	$(document).on('click', '.message', function(){
		$(this).fadeOut("400", function(){
			$(this).remove();
			showRegisterClient();
		});
	})


	//Прелоадер добавить/убрать
	function addPreloader(){
		$("<div class='preloader'><img src='img/tenor.gif'></div>").appendTo("body");
	}
	function removePreloader(){
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
	$(".presentationDate").mask("99.*9.9999", {placeholder: date});





	//тест формы
	$("#register").on("click", function(e){
		e.preventDefault();
		if($(".signForm").valid()){
			$('.signForm').hide();
			addPreloader();
			setTimeout(function(){
				removePreloader();
				showMessageMain("Вы успешно зарегистрированы! Добро пожаловать в презентацию");
			}, 2000);

		}
	})

	//переход на страницу коллекции
	$(".client-form").on('submit', function(e){
		e.preventDefault();
		$(location).attr('href', "https://lyamovsergeysm.github.io/app/collections.html");
	})
	


});
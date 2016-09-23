
$(document).ready(function(e) {
	$('.with-hover-text, .regular-link').click(function(e){
		e.stopPropagation();
	});

	$(document).ready(function(e) {
		// Instantiate fancyBox:
		$(".fancybox").fancybox({
			padding: 10,
			helpers: {
				overlay: {
					locked: false
				}
			}
		});
	});

	var lis = $('.TheMenu > li');
	menu_focus( lis[0], 1 );

	/***************
	* = Hover text *
	* Hover text for the last slide
	***************
	$('.with-hover-text').hover(
		function(e) {
			$(this).css('overflow', 'visible');
			$(this).find('.hover-text')
				.show()
				.css('opacity', 0)
				.delay(200)
				.animate(
					{
						paddingTop: '25px',
						opacity: 1
					},
					'fast',
					'linear'
				);
		},
		function(e) {
			var obj = $(this);
			$(this).find('.hover-text')
				.animate(
					{
						paddingTop: '0',
						opacity: 0
					},
					'fast',
					'linear',
					function() {
						$(this).hide();
						$( obj ).css('overflow', 'hidden');
					}
				);
		}
	);*/

	var img_loaded = 0;
	var j_images = [];

	/*************************
	* = Controls active menu *
	* Hover text for the last slide
	*************************/
	$('#slide-3 img').each(function(index, element) {
		var time = new Date().getTime();
		var oldHref = $(this).attr('src');
		var myImg = $('<img />').attr('src', oldHref + '?' + time );

		myImg.load(function(e) {
			img_loaded += 1;;
			if ( img_loaded == $('#slide-3 img').length ) {
				$(function() {
					var pause = 10;
					$(document).scroll(function(e) {
						delay(function() {

							var tops = [];

							$('.story').each(function(index, element) {
								tops.push( $(element).offset().top - 200 );
							});

							var scroll_top = $(this).scrollTop();

							var lis = $('.nav > li');

							for ( var i=tops.length-1; i>=0; i-- ) {
								if ( scroll_top >= tops[i] ) {
									menu_focus( lis[i], i+1 );
									break;
								}
							}
						},
						pause);
					});
					$(document).scroll();
				});
			}
		});
	});

});

/******************
* = Gallery width *
******************/
$(function() {
	var pause = 50; // will only process code within delay(function() { ... }) every 100ms.
	$(window).resize(function() {
		delay(function() {
				var gallery_images = $('#slide-3 img');

				var images_per_row = 0;
				if ( gallery_images.length % 2 == 0 ) {
					images_per_row = gallery_images.length / 2;
				} else {
					images_per_row = gallery_images.length / 2 + 1;
				}

				var gallery_width = $('#slide-3 img').width() * $('#slide-3 img').length;
				gallery_width /= 2;
				if ( $('#slide-3 img').length % 2 != 0 ) {
					gallery_width += $('#slide-3 img').width();
				}

				$('#slide-3 .row').css('width', gallery_width );

				var left_pos = $('#slide-3 .row').width() - $('body').width();
				left_pos /= -2;

				$('#slide-3 .row').css('left', left_pos);

			},
			pause
		);
	});
	$(window).resize();
});

var delay = (function(){
	var timer = 0;
	return function(callback, ms){
		clearTimeout (timer);
		timer = setTimeout(callback, ms);
	};
})();

function menu_focus( element, i ) {
	if ( $(element).hasClass('active') ) {
		if ( i == 6 ) {
			if ( $('.navbar').hasClass('inv') == false )
				return;
		} else {
			return;
		}
	}

	enable_arrows( i );

	if ( i == 1 || i == 6 )
		$('.navbar').removeClass('inv');
	else
		$('.navbar').addClass('inv');

	$('.TheMenu > li').removeClass('active');
	$(element).addClass('active');

	var icon = $(element).find('.fa');

	var left_pos = icon.offset().left - $('.TheMenu').offset().left;
	var el_width = icon.width() + $(element).find('.text').width() + 10;

	$('.active-menu').stop(false, false).animate(
		{
			left: left_pos,
			width: el_width
		},
		1500,
		'easeInOutQuart'
	);
}

function enable_arrows( dataslide ) {
	$('#arrows div').addClass('disabled');
	if ( dataslide != 1 ) {
		$('#arrow-up').removeClass('disabled');
	}
	if ( dataslide != 6 ) {
		$('#arrow-down').removeClass('disabled');
	}
	if ( dataslide == 3 ) {
		$('#arrow-left').removeClass('disabled');
		$('#arrow-right').removeClass('disabled');
	}
}

/*************
* = Parallax, that is actualy not a parallax, depending on the definition *
*************/
jQuery(document).ready(function ($) {
	//Cache some variables
	var links = $('.nav').find('li');
	slide = $('.slide');
	button = $('.button');
	mywindow = $(window);
	htmlbody = $('html,body');

	//Create a function that will be passed a slide number and then will scroll to that slide using jquerys animate. The Jquery
	//easing plugin is also used, so we passed in the easing method of 'easeInOutQuint' which is available throught the plugin.
	function goToByScroll(dataslide) {
		var offset_top = ( dataslide == 1 ) ? '0px' : $('.slide[data-slide="' + dataslide + '"]').offset().top;

		htmlbody.stop(false, false).animate({
			scrollTop: offset_top
		}, 1500, 'easeInOutQuart');
	}

	//When the user clicks on the navigation links, get the data-slide attribute value of the link and pass that variable to the goToByScroll function
	links.click(function (e) {
		e.preventDefault();
		dataslide = $(this).attr('data-slide');
		goToByScroll(dataslide);
		$(".nav-collapse").collapse('hide');
	});

	//When the user clicks on the navigation links, get the data-slide attribute value of the link and pass that variable to the goToByScroll function
	$('.navigation-slide').click(function (e) {
		e.preventDefault();
		dataslide = $(this).attr('data-slide');
		goToByScroll(dataslide);
		$(".nav-collapse").collapse('hide');
	});
});

/***************
* = Menu hover *
***************/
jQuery(document).ready(function ($) {
	//Cache some variables
	var menu_item = $('.TheMenu').find('li');

	menu_item.hover(
		function(e) {
			var icon = $(this).find('.fa');

			var left_pos = icon.offset().left - $('.nav').offset().left;
			var el_width = icon.width() + $(this).find('.text').width() + 10;

			var hover_bar = $('<div class="active-menu special-active-menu"></div>')
				.css('left', left_pos)
				.css('width', el_width)
				.attr('id', 'special-active-menu-' + $(this).data('slide') );

			$('.active-menu').after( hover_bar );
		},
		function(e) {
			$('.special-active-menu').remove();
		}
	);
});

/******************
* = Gallery hover *
******************/
jQuery(document).ready(function ($) {
	//Cache some variables
	var images = $('#slide-3 a');

	images.hover(
		function(e) {
			var asta = $(this).find('img');
			$('#slide-3 img').not( asta ).stop(false, false).animate(
				{
					opacity: .5
				},
				'fast',
				'linear'
			);
			var zoom = $('<div class="zoom"></div>');
			if ( $(this).hasClass('video') ) {
				zoom.addClass('video');
			}
			$(this).prepend(zoom);
		},
		function(e) {
			$('#slide-3 img').stop(false, false).animate(
				{
					opacity: 1
				},
				'fast',
				'linear'
			);
			$('.zoom').remove();
		}
	);
});

/******************
* = Arrows click  *
******************/
jQuery(document).ready(function ($) {
	//Cache some variables
	var arrows = $('#arrows div');

	arrows.click(function(e) {
		e.preventDefault();

		if ( $(this).hasClass('disabled') )
			return;

		var slide = null;
		var datasheet = $('.nav > li.active').data('slide');
		var offset_top = false;
		var offset_left = false;


		switch( $(this).attr('id') ) {
			case 'arrow-up':
				offset_top = ( datasheet - 1 == 1 ) ? '0px' : $('.slide[data-slide="' + (datasheet-1) + '"]').offset().top;
				break;
			case 'arrow-down':
				offset_top = $('.slide[data-slide="' + (datasheet+1) + '"]').offset().top;
				break;
			case 'arrow-left':
				offset_left = $('#slide-3 .row').offset().left + 452;
				if ( offset_left > 0 ) {
					offset_left = '0px';
				}
				break;
			case 'arrow-right':
				offset_left = $('#slide-3 .row').offset().left - 452;
				if ( offset_left < $('body').width() - $('#slide-3 .row').width() ) {
					offset_left = $('body').width() - $('#slide-3 .row').width();
				}
				break;
		}

		if ( offset_top != false ) {
			htmlbody.stop(false, false).animate({
				scrollTop: offset_top
			}, 1500, 'easeInOutQuart');
		}

		if ( offset_left != false ) {
			if ( $('#slide-3 .row').width() != $('body').width() ) {
				$('#slide-3 .row').stop(false, false).animate({
					left: offset_left
				}, 1500, 'easeInOutQuart');
			}
		}
	});
});
/******************
* = mixItUp setup  *
******************/
$(document).ready(function(e) {
	$.ajax({
	  url: 'data.json',
	  dataType: 'json',
	  success: function (response) {
	  	var i = 1;
	    response.web.forEach(function(e){
	    	fillWorks(e,"web",i);
	    	i+=1;
	    });
	    // Instantiate MixItUp:
		$('#mixItUp').mixItUp();
	  }
	});
});
function fillWorks(data, genType,id){
	var bloc=`
		<div class="item mix `+data.type.toLowerCase()+` `+genType.toLowerCase()+`" data-myorder="`+id+`">
			<div class="img">
				<img src="images\\projects\\`+id+`.jpg">
			</div>
			<div class="pins">
				`+genType+`
			</div>
			<div class="hover vertical-align">
				<div class="inHover">
					<!--<a class="link vertical-align modalProject(`+id+`)">
						<i class="fa fa-arrows-alt fa-1x arrow"></i>
					</a>-->
					<a class="link vertical-align" href="`+data.link+`" target="_blank">
						<i class="fa fa-angle-right fa-1x angle"></i>
					</a>
					<span class="name">`+data.name+`</span>
				</div>
			</div>
			<div class="cadre">
				<div></div>
			</div>
		</div>`;
	$( "#mixItUp" ).append( bloc );
}
/************************
* = ScrollReveal setup  *
************************/
function triggerReveals() {
    sr.reveal('.bottomReveal', {
        origin: 'bottom'
    }).reveal('.leftReveal', {
        origin: 'left'
    }).reveal('.rightReveal', {
        origin: 'right'
    }).reveal('.topReveal', {
        origin: 'top'
    }).reveal('.scaleReveal, .title-row', {
        origin: 'top',
        scale: 0.6
    });
}
$(document).ready(function(e) {
	// Instantiate ScrollReveal once pace finished loading
	if (typeof sr == 'undefined') {
	    window.sr = ScrollReveal({
	        duration: 1500,
	        delay: 50
	    });
	} // In case i forget, pace monitors the global loading of the page !
	Pace.once(Pace.done, triggerReveals());
});
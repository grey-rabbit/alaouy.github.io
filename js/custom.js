// atSpotlight.js

(function($){
    $.fn.atSpotlight = function() {

        return this.each(function() {

            var $this = $(this);

            $this.children(":not(li.divider)").hover(function()
            {
                $(this).siblings().stop().animate({opacity: 0.5}, 300);
                $(this).stop().animate({opacity: 1.0}, 300);

                $(this).siblings().find('.work > h4').remove();
                $(this).find('.work').append('<h4>EXPLORE</h4>');
            });

            $this.mouseleave(function()
            {
                $(this).children().stop().animate({opacity: 1.0}, 300);
                $(this).find('.work > h4').remove();
            });
        });
    };
})(jQuery);

// ExpandPortfolio.js

(function($){
    $.fn.expandPortfolio = function()
    {

        var $el = this,
            $portfolio_detail = $('#portfolio-detail'),
            $portfolio_details = $('#portfolio-details');

        var init = function()
        {
            $el.children('li').on('click', function(e)
            {
                e.preventDefault();

                var $work_details = $(this).find('.work-details').clone();

                if ($(this).next().attr('id') !== undefined)
                {
                    $('.next-work', $work_details).attr('href', '#'+$(this).next().attr('id'));
                }
                else
                {
                    $('.next-work', $work_details).remove();
                }

                if ($(this).prev().attr('id') !== undefined)
                {
                    $('.prev-work', $work_details).attr('href', '#'+$(this).prev().attr('id'));
                }
                else
                {
                    $('.prev-work', $work_details).remove();
                }

                $portfolio_details.empty().append($work_details);
                $portfolio_detail.slideDown(1000, 'easeInOutExpo');

                $('html, body').stop().animate(
                {
                    scrollTop: $portfolio_detail.offset().top - 60
                }, 1500, 'easeInOutExpo');
            });
        };

        $portfolio_detail.on('click', '.portfolio-slider-control a', function(e)
        {
            e.preventDefault();

            var $target = $(this).attr('href');
            var $slider = $($target).closest('ul.portfolio-slider');

            $(this).addClass('active').siblings().removeClass('active');

            $($target).addClass('fadeIn').css(
            {
                left : '0',
                'z-index' : '9',
                opacity : '1'
            }).siblings().removeClass('fadeIn').css(
            {
                left : '0',
                'z-index' : '1',
                opacity : '0'
            });

            if ($slider.width() > $($target).width())
            {
                $($target).css('left', ($slider.width() - $($target).width()) / 2+'px');
            }

            if ($slider.height() < $($target).height())
            {
                $slider.animate({'height':$($target).height()+'px'}, 500, 'easeInOutQuad');
            }
            else
            {
                $slider.animate({'height':$($target).height()+'px'}, 500, 'easeInOutQuad');
            }
        });

        $portfolio_detail.on('click', '.next-work, .prev-work', function(e)
        {
            e.preventDefault();

            var $selected = $($(this).attr('href'));
            var $work_details = $selected.find('.work-details').clone();

            $('.portfolio-slider').css('height', '320px');

            if ($selected.next().attr('id') !== undefined)
            {
                $('.next-work', $work_details).attr('href', '#'+$selected.next().attr('id'));
            }
            else
            {
                $('.next-work', $work_details).remove();
            }

            if ($selected.prev().attr('id') !== undefined)
            {
                $('.prev-work', $work_details).attr('href', '#'+$selected.prev().attr('id'));
            }
            else
            {
                $('.prev-work', $work_details).remove();
            }

            $portfolio_details.empty().append($work_details);

            $('html, body').stop().animate(
            {
                scrollTop: $portfolio_detail.offset().top - 60
            }, 1500, 'easeInOutExpo');
        });

        $portfolio_detail.on('click', '.close-portfolio', function(e)
        {
            e.preventDefault();
            $portfolio_detail.slideUp(1000, 'easeInOutExpo', function(){
                $portfolio_details.empty();
            });
        });

        init();

        return this;
    };
})(jQuery);



$(function()
{
	var $intro = $('#intro'),
        $intro_content = $('#intro-content'),
        $who = $('#who'),
        $portfolio = $('.portfolio-title'),
        $portfolio_grid = $('ul#portfolio-grid'),
        $contact = $('#contact'),
        $contact_title = $('#contact-title'),
        $brand = $('.brand');

    $('body').scrollTop(1);

    $('html').niceScroll({
        cursorcolor:'#000000',
        cursorborder:'1px solid #3b3b3b',
        mousescrollstep:'50',
        horizrailenabled: false
    });

    $(".slabIt").slabText({
        viewportBreakpoint:320
    });

    $portfolio_grid.atSpotlight();

    $portfolio_grid.expandPortfolio();

    $('.tool-tip').tooltip();

    $intro.css({'height':($(window).height())+'px'});
    $intro_content.css({'margin-top': (($(window).height() - $intro_content.height()) / 2) - 30 +'px'});

	$(window).resize(function()
    {
        $intro.css({'height':($(window).height())+'px'});
        $intro_content.css({'margin-top': (($(window).height() - $intro_content.height()) / 2) - 30 +'px'});
	});

    $('.nav li a, .bottom-arrow a, .top-arrow a').on('click',function(e)
    {
        e.preventDefault();
        $('html, body').stop().animate(
        {
            scrollTop: $($(this).attr('href')).offset().top - 60
        }, 1500, 'easeInOutExpo');
    });

    $('#who, #who-two, #what, #whatMobile, #how, #hello, #iam, #mustapha, #portfolio-grid > li, .portfolio-title, #contact-title, #contact-form').css('opacity', '0');
    $who.waypoint(function()
    {
        $(this).addClass('bounceInRight').css('opacity', '1');
    },
    {
        offset: '80%',
        triggerOnce: true
    });
    $('#who-two').waypoint(function()
    {
        $(this).addClass('rotateIn').css('opacity', '1');
    },
    {
        offset: '80%',
        triggerOnce: true
    });
    $('#what').waypoint(function()
    {
        $(this).addClass('bounceInLeft').css('opacity', '1');
    },
    {
        offset: '95%',
        triggerOnce: true
    });
    $('#how').waypoint(function()
    {
        $(this).addClass('bounceIn').css('opacity', '1');
    },
    {
        offset: '80%',
        triggerOnce: true
    });
    $portfolio.waypoint(function()
    {
        $(this).addClass('flipInX').css('opacity', '1');
    },
    {
        offset: '80%',
        triggerOnce: true
    });
    $('#portfolio-grid').waypoint(function()
    {
        $('ul#portfolio-grid > li').each(function(i)
        {
            $(this).delay(i * 250).animate({'opacity':'1'}, 250, 'easeInExpo');
        });
    },
    {
        offset: '80%',
        triggerOnce: true
    });
    $contact_title.waypoint(function()
    {
        $(this).addClass('bounceInRight').css('opacity', '1');
    },
    {
        offset: '80%',
        triggerOnce: true
    });
    

    $intro.waypoint(function()
    {
        $brand.css('color', '#2C7BAB');
    },
    {
        offset: '-50%'
    });
    $who.waypoint(function(direction)
    {
        if (direction === 'down')
        {
            $brand.css('color', '#D82546');
        }
    },
    {
        offset: '50%'
    }).waypoint(function(direction)
    {
        if (direction === 'up')
        {
            $brand.css('color', '#D82546');
        }
    },
    {
        offset: '-50%'
    });
    $portfolio.waypoint(function(direction)
    {
        if (direction === 'down')
        {
            $brand.css('color', '#FEAB58');
        }
    },
    {
        offset: '50%'
    }).waypoint(function(direction)
    {
        if (direction === 'up')
        {
            $brand.css('color', '#FEAB58');
        }
    },
    {
        offset: '-50%'
    });
    $contact.waypoint(function(direction)
    {
        if (direction === 'down')
        {
            $brand.css('color', '#273C67');
        }
    },
    {
        offset: '50%'
    }).waypoint(function(direction)
    {
        if (direction === 'up')
        {
            $brand.css('color', '#273C67');
        }
    },
    {
        offset: '-50%'
    });
});

$(window).load(function()
{
    $("#preloader").fadeOut("slow", function(){
        $('#intro').waypoint(function()
        {
            $('#hello').addClass('bounceIn').css('opacity', '1');
            $('#iam').addClass('bounceInUp').css('opacity', '1');
            $('#mustapha').addClass('bounceInDown').css('opacity', '1');
        },
        {
            offset: '80%',
            triggerOnce: true
        });
    });
});
$(document).ready(function () {
    // Обработчик клика на кнопки переключения
    $('.js-popular-menus-switch').click(function () {
        $(this).addClass('active').siblings().removeClass('active');
    });

    // Инициализация селектов с помощью плагина Select2
    $('#selectFormatEvent, #selectCost, #selectNumberPersons').select2({
        theme: 'custom',
        closeOnSelect: false,
        templateSelection: function (data, container) {
            $(container).addClass('custom-select-arrow'); // Добавляем пользовательский класс для стрелки
            return data.text;
        }
    })

    const selectPlaceholder = $('#selectFormatEvent .js-select-placeholder').text();

    $('#selectFormatEvent').select2({
        placeholder: selectPlaceholder,
        allowClear: true,
        minimumResultsForSearch: Infinity,
        theme: 'custom-arrow'
    });

    // Обработчик клика на кнопку очистки фильтров
    $('.js-popular-menus-filter-clear-all').click(function () {
        $('#selectFormatEvent, #selectCost, #selectNumberPersons').val(null).trigger('change');
        $('.js-popular-menus-filter .js-popular-menus-input').val('');
        $('.js-popular-menus-filter .js-popular-menus-clear-button').hide();
    });

    // Показать кнопку очистки при вводе в поле
    $('.js-popular-menus-input, .js-popular-menus-textarea').on('input', function () {
        $(this).siblings('.js-popular-menus-clear-button').toggle(!!$(this).val()).css('display', 'flex');
    });

    // Очистить поле при клике на кнопку очистки полей input/textarea
    $('.js-popular-menus-clear-button').on('click', function () {
        $(this).siblings('.js-popular-menus-input, .js-popular-menus-textarea').val('');
        $(this).hide();
    });

    // модалка
    const $overlay = $('.js-popular-menus-overlay');
    const $openModalBtn = $('.js-modal-menus-btn');
    const $modal = $('.js-modal-menus');
    const $body = $('body');

    // все, чтo зaкрывaет мoдaльнoе oкнo, т.е. крестик и oверлэй-пoдлoжкa
    const $close = $('.js-modal-menus-close, .js-popular-menus-overlay');

    $openModalBtn.click(function (event) {
        event.preventDefault();
        const div = $(this).attr('data-id');
        $(`[data-id="${div}"]`).fadeIn();
        $body.addClass('hidden').css('padding-right', getScrollbarWidth() + 'px');;
    });

    // клик пo крестику или oверлэю
    $close.click(function () {
        $overlay.fadeOut();
        $body.removeClass('hidden').css('padding-right', '');;
    });

    $(document).keydown(function (e) {
        if (e.keyCode === 27) {
            e.stopPropagation();
            $overlay.fadeOut();
            $body.removeClass('hidden').css('padding-right', '');;
        }
    });

    function getScrollbarWidth() {
        const scrollDiv = document.createElement('div');
        scrollDiv.style.width = '100px';
        scrollDiv.style.height = '100px';
        scrollDiv.style.overflow = 'scroll';
        scrollDiv.style.position = 'absolute';
        scrollDiv.style.top = '-9999px';
        document.body.appendChild(scrollDiv);
        let scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
        document.body.removeChild(scrollDiv);
        return scrollbarWidth;
    }
    // END модалка

    // Инициализация основного слайдера
    $('.js-details-menus-slider-full').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.js-details-menus-thumbnail-slider'
    });

    // Инициализация слайдера с миниатюрами
    $('.js-details-menus-thumbnail-slider').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        asNavFor: '.js-details-menus-slider-full',
        dots: false,
        focusOnSelect: true,
        responsive: [{
            breakpoint: 540,
            settings: {
                slidesToShow: 3,
            }
        }]
    });

    // лайки
    $('.js-btn-like-icon').click(function () {
        $(this).attr('data-like', $(this).attr('data-like') === 'true' ? 'false' : 'true');
    });

    // табы
    const $tabTitle = $('.js-details-menus-tab');

    $tabTitle.click(function () {
        $tabTitle.removeClass('active');
        $(this).addClass('active');
    });

    // сортировка по цене/колличеству персон/умолчанию
    const $sortingBtn = $('.js-sorting-btn');

    $sortingBtn.click(function () {
        const $currentBtn = $(this);
        if ($currentBtn.hasClass('active')) {
            let isMaxSort = $currentBtn.attr('data-max-sort') === 'true' ? 'false' : 'true';
            $currentBtn.attr('data-max-sort', isMaxSort);
        } else {
            $sortingBtn.removeClass('active');
            $currentBtn.addClass('active');
        }
    });
});
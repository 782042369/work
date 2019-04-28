import '../../css/carousel.scss'
$(function(){
    function Carousel(element,options){
        this.element = element;
        this.options = {
            imgSrcList: options.imgSrcList,
            liW: options.liW,
            idx: options.idx || 0
        };
        this.init();
    }

    $.extend(Carousel.prototype,{
        constructor: Carousel,
        init: function(){
            this.creatHtml();
            this.bindEvent();
        },
        creatHtml: function(){
            let me = this;
            let cont = ``;
            let iconArr =  ``;
            $.each(me.options.imgSrcList,function(i,t){
                if(i == me.options.idx){
                    iconArr += `<span class="active"></span>`;
                } else {
                    iconArr += '<span></span>';
                }
                cont += `<li><img src=${t} /></li>`;
            })
            let carouselWrap = `<span class="close"></span><a href="" class="carousel_left" id="carousel_left"></a>
            <ul class="carouselInner" style="left:${me.options.idx * (me.options.liW*-1)}px;width:${me.options.imgSrcList.length*me.options.liW}px">${cont}</ul>
            <a href="" class="carousel_right" id="carousel_right"></a>
            <p class="carousel_icon">${iconArr}</p>`
            me.element.html(carouselWrap);
        },
        bindEvent: function(){
            this.turnImg();
            this.turnIcon();
            this.turnClose();
        },
        turnImg: function(){
            let that = this;
            that.element.on('click','a',function(e){
                e.preventDefault();
                let id = $(this).attr('id');
                if(id == 'carousel_left') {
                    if(that.options.idx <= 0){
                        that.options.idx = that.element.find('ul').children().length-1;
                    } else {
                        that.options.idx -= 1;
                    }
                } else if(id == 'carousel_right') {
                    if(that.options.idx >= that.element.find('ul').children().length-1){
                        that.options.idx = 0;
                    } else {
                        that.options.idx += 1;
                    }
                }
                that.element.find('ul').css('left',((that.options.liW*-1)*that.options.idx)+'px');
                that.element.find('.carousel_icon').children().eq(that.options.idx).addClass('active').siblings().removeClass('active');
            })
        },
        turnIcon: function(){
            let that = this;
            that.element.find('.carousel_icon').on('mouseover','span',function(){
                that.options.idx = $(this).index();
                that.element.find('.carousel_icon').children().eq(that.options.idx).addClass('active').siblings().removeClass('active');
                that.element.find('ul').css('left',((that.options.liW*-1)*that.options.idx)+'px');
            })
        },
        turnClose: function(){
            let that = this;
            that.element.on('click','.close',function(){
                $('.wrap').hide();
            })
        }
    });
    $.fn.carousel = function(options){
        return new Carousel($(this), options);
    }
})

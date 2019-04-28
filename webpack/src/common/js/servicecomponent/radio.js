import '../../css/radio.scss'

$("input[checked=checked]").next().addClass('radioed').removeClass('radio');

$("input[type='radio']").on('change',function(){
    if($(this).attr('checked') != true){
        $(this).next('span').removeClass('radio').addClass('radioed');
        $(this).parent().siblings().find('span').removeClass('radioed').addClass('radio');
    }else{
        return;
    }
})

import '../../css/zwselect.scss';

$(".downselect-inpu").on('click',function(e){
  $(".downselect-selectwrap").fadeOut(500);
  let that = $(this);
  $(this).next().stop().fadeToggle(500);  
  e.stopPropagation();
})
$(".downselect-selectwrap").on('click','li',function(e){
  $(this).parent().prev().val($(this).text());
  $(this).addClass('select-true').siblings('li').removeClass('select-true');
  $(".downselect-btn2").removeClass('downselect-btn2').addClass('downselect-btn');
  $(this).parents('ul').fadeOut(500); // 如不是则隐藏元素
  e.stopPropagation();
})
//点击非 选中区域
$(document).click(function(){
  $(".downselect-btn2").removeClass('downselect-btn2').addClass('downselect-btn');
  $('.downselect-selectwrap').fadeOut(500);
});

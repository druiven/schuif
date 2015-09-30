/**
 * Created by GD on 29-9-2015.
 * move element with less code
 */
 /*
 * TODO: get rid off jquery, not realy necessary
 */
function init(){
    /* set width height element accordding to picture inside*/
    jQuery(".shuffle-element").each(function(){
        jQuery(this).css({
            'width':jQuery('img',this).width(),
            'height':jQuery('img',this).height(),
            'left':Math.round(Math.random()*(jQuery(window).width()-jQuery('img',this).width())),
            'top':Math.round(Math.random()*(jQuery(window).height()-jQuery('img',this).height()))
        })
    }).on('mousedown',elementMouseDown);

    jQuery(document).on('mousemove', move).on('mouseup',stopmove);
}
var elementDown=null;
var thePos=null;

function elementMouseDown(ev){
    if(!elementDown) {
        ev.preventDefault();
        elementDown=jQuery(this);
        elementDown.addClass('selected');
        thePos=elementDown.position();
        elementDown.data('minx',ev.pageX-thePos.left).data('miny',ev.pageY-thePos.top)
    }
}

function stopmove(){
    if(elementDown){
        elementDown.removeClass('selected');
        elementDown=null;
    }
}

function move(ev){
    if(elementDown){
        elementDown.css({'left':ev.pageX-elementDown.data('minx'),'top':ev.pageY-elementDown.data('miny')});
    }
}
jQuery(window).load(init);


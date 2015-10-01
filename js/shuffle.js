/**
 * Created by GD on 29-9-2015.
 * move element with less code
 */
 /*
 * TODO: get rid off jquery, not realy necessary
 */

var windowWidth=jQuery(window).width();
var windowWidthOld=windowWidth;
var windowHeight=jQuery(window).height();
var windowHeightOld=windowHeight;

function init(){
    /* set width height element accordding to picture inside*/
    var l=pics.length;
    var id="",left= 0,top= 0,schaal= 0,schaaldiv=.8,w= 0,h=0;
    for(i=0;i<l;i++){

        id="se-"+i;
        jQuery('#shuffle-holder').append('<div id="'+id+'" class="shuffle-element"></div>');
        left=Math.round(Math.random()*(jQuery(window).width()-(windowWidth *.15)));
        top=Math.round(Math.random()*(jQuery(window).height()-(windowHeight *.15)));
        w=jQuery('#'+id).width();
        h=jQuery('#'+id).height();
        schaal=1.5-top/windowHeight;

        jQuery('#'+id).css({
            'left':left,
            'top':top,
            'background-image':'url("'+picsmap+pics[i].pic+'")',
            'width': (schaal*w),
            'height': (schaal*h)
        }).data('w',w).data('h',h).show();
    }

    if(is_touch_device()){
        jQuery(".shuffle-element").draggable();
    }else{
        jQuery(".shuffle-element").on('mousedown',elementMouseDown);
        jQuery(document).on('mousemove', move).on('mouseup',stopmove);
    }

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
    var top= 0,left= 0,schaal= 0,w= 0,h=0;
    if(elementDown){

        schaal=1.5-ev.pageY/windowHeight;
        //if(schaal<.2)schaal=.2;
        w=elementDown.data('w')*schaal;
        h=elementDown.data('h')*schaal;

        left=ev.pageX-w/2;
        top=ev.pageY-h/2;


        elementDown.css({
            'left':left,
            'top':top,
            'width': w,
            'height': h
        }).data('schaal',schaal);

    }
}

jQuery.fn.draggable = function() {
    var offset = null;
    var start = function(e) {
        var orig = e.originalEvent;
        var pos = jQuery(this).position();
        jQuery(this).addClass('selected');
        offset = {
            x: orig.changedTouches[0].pageX - pos.left,
            y: orig.changedTouches[0].pageY - pos.top
        };
    };
    var moveMe = function(e) {
        e.preventDefault();
        var orig = e.originalEvent;
        var w,h,schaal,left,top;
        schaal=1.5-orig.changedTouches[0].pageY/windowHeight;

        w=jQuery(this).data('w')*schaal;
        h=jQuery(this).data('h')*schaal;

        left=orig.changedTouches[0].pageX;
        top=orig.changedTouches[0].pageY;
        jQuery(this).css({
            top: top-w/2,
            left:left-w/2,
            width: w,
            height: h
        }).data('schaal',schaal);
    };
    var moveMeEnd=function(e){
        e.preventDefault();
        jQuery(this).removeClass('selected')
    }
    this.bind("touchstart", start);
    this.bind("touchmove", moveMe);
    this.bind("touchend", moveMeEnd);
};


function is_touch_device() {
    return !!('ontouchstart' in window);
}

function windowResize(){
    windowWidth=jQuery(window).width();
    windowHeight=jQuery(window).height();
    var scaleW=windowWidth/windowWidthOld;
    var scaleH=windowHeight/windowHeightOld;
    var iks= 0,ei= 0,pos=0;
    for(var i=0;i<pics.length;i++){
        pos=jQuery('#se-'+i).position();
        iks=pos.left*scaleW;
        ei=pos.top*scaleH;
        jQuery('#se-'+i).css({
            'top':ei,
            'left':iks
        })
    }
    windowWidthOld=windowWidth;
    windowHeightOld=windowHeight;
}

jQuery(window).resize(windowResize);

/* graphic array */
var pics=new Array();
var picsmap='images/kaarten/';
for(var i=0;i<12;i++){
    pics[i]={};
}
pics[0].pic='compliment.png';
pics[0].selected='compliment-selected.png';
pics[1].pic='cultuur.png';
pics[1].selected='cultuur-selected.png';
pics[2].pic='vriendschap.png';
pics[2].selected='vriendschap-selected.png';
pics[3].pic='drank.png';
pics[3].selected='drank-selected.png';
pics[4].pic='energie.png';
pics[4].selected='energie-selected.png';
pics[5].pic='fruit.png';
pics[5].selected='fruit-selected.png';
pics[6].pic='liefde.png';
pics[6].selected='liefde-selected.png';
pics[7].pic='natuur.png';
pics[7].selected='natuur-selected.png';
pics[8].pic='sport.png';
pics[8].selected='sport-selected.png';
pics[9].pic='studie.png';
pics[9].selected='studie-selected.png';
pics[10].pic='uitgaan.png';
pics[10].selected='uitgaan-selected.png';
pics[11].pic='verrassing.png';
pics[11].selected='verrassing-selected.png';
//
jQuery(document).ready(init);


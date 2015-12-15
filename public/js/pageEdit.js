$('.addBlock').click(function () {

    countee += 1;
    console.log("ccc " + countee);
    var former = document.getElementById("blockForm");
    var blocker = document.createElement("textarea");
    var li = document.createElement('li');
    var blockName = "block" + (countee);
    var labeler = document.createElement("label");
    labeler.appendChild(document.createTextNode(blockName));
    labeler.for = blockName;
    blocker.name = blockName;
    blocker.id = blockName;
    li.appendChild(labeler);
    li.appendChild(blocker);
    $(li).addClass('editBlock');
    $('ul').append(li);
});
$('.removeBlock').click(function () {
    $('li:last').remove();
    countee -= 1;
});
//    $('ul li').delegate('.checky', 'change', function(){
//        var li = $(this).parent('li');
//            if(this.checked) {
//                var myText = $('textarea')[li.index() + 1].textContent;
//                $('textarea')[li.index() + 1].textContent = '<h3>' + myText + '</h3>';
//            }else{
//                var myText = $('textarea')[li.index() + 1].textContent.toString();
//                console.log(myText);
//                var text = myText.substring(4, myText.length - 5);
//                $('textarea')[li.index() + 1].textContent = text;
//            }
//    });
$('ul li').delegate('button','click', function(){
    $('button').bind('input propertychange', function() {
        $("button").hide();

        if(this.value.length){
            $("button").show();
        }
    });
    var li = $(this).parent('li');
    console.log(li.index());
    var thisCunt = $('textarea')[li.index() + 1].textContent;
    var thatCunt = $('textarea')[li.index()].textContent;
    $('textarea')[li.index()].textContent = thisCunt;
    $('textarea')[li.index()+ 1].textContent = thatCunt;

});

$(function() {
    $('#blockForm').submit(function() {
        var len = $('#blockForm ul li').length;
        console.log("lenny "+ len);
        for(var i = 0; i < len ; i++) {
            testCheckedAndSet(i);

        };
        return true; // return false to cancel form action
    });
});

var testCheckedAndSet = function(i){
    var checked = $('ul li')[i].children[0].checked;
    if(checked) {
        var myText = $('ul li')[i].children[2].textContent;
        console.log("myText"  + myText);
        $('ul li')[i].children[2].textContent = '<h3>' + myText + '</h3>';
    }
}
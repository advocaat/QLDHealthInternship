$('.addBlock').click(function () {
    countee += 1;
    console.log("ccc " + countee);
    var former = document.getElementById("blockForm");
    var blocker = document.createElement("textarea");
    var li = document.createElement('li');
    li.setAttribute('class','editBlock');
    var blockName = "block" + (countee);
    var labeler = document.createElement("label");
    var select = document.createElement("select");
    var option1 = document.createElement('option');
    option1.innerHTML = "Text";
    option1.value = "text";
    var option2 = document.createElement('option');
    option2.innerHTML = "Sub";
    option2.value = "sub";
    var option3 = document.createElement('option');
    option3.innerHTML = "Image";
    option3.value = "img";
    var option4 = document.createElement('option');
    option4.innerHTML = "Video";
    option4.value = "vid";
    var option5 = document.createElement('option');
    option5.innerHTML = "Link";
    option5.value = "link";
    select.appendChild(option1);
    select.appendChild(option2);
    select.appendChild(option3);
    select.appendChild(option4);
    select.appendChild(option5);
    select.setAttribute('class', 'options');
    li.appendChild(select);
    var scriptly = document.createElement('script');
    labeler.appendChild(document.createTextNode(blockName));
    labeler.for = blockName;
    blocker.name = blockName;
    blocker.id = blockName;
    li.appendChild(scriptly);
    li.appendChild(labeler);
    li.appendChild(blocker);
    $(li).addClass('editBlock');
    $('ul').append(li);

});

$('.removeBlock').click(function () {
    $('li:last').remove();
    countee -= 1;
});


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
    var thisTag = $('.options')[li.index() - 1].value;
    var thatCunt = $('textarea')[li.index()].textContent
    var thatTag = $('.options')[li.index()].value;
    $('textarea')[li.index()].textContent = thisCunt;
    $('.options')[li.index()].value = thisTag;
    $('textarea')[li.index() + 1].textContent = thatCunt;
    $('.options')[li.index() - 1 ].value = thatTag;
});

$(function() {
    $('#blockForm').submit(function() {
        var len = $('#blockForm ul li').length;
        for(var i = 0; i < len ; i++) {
            testSelectedAndInjectTags(i);
        };
        return true; // return false to cancel form action
    });
});


var testSelectedAndInjectTags = function(i){
    console.log("setting for " + $('ul li')[i].children[3].textContent);
    var sel = $('ul li')[i].children[0];
    var val = sel.options[sel.selectedIndex].value;
    console.log("val " + val)
    if(val === "sub") {
        var myText = $('ul li')[i].children[3].textContent;
        console.log("myText"  + myText);
        $('ul li')[i].children[3].textContent = '<h3>' + myText + '</h3>';
    }else if(val === "img"){
        var myText = $('ul li')[i].children[3].textContent;
        $('ul li')[i].children[3].textContent = '<img src="/images/' + myText + '"/>';
    }else if(val === "vid"){
        var myText = $('ul li')[i].children[3].textContent;
        $('ul li')[i].children[3].textContent = '<video class="smallFrame" class="embed-responsive-item" controls type="video/mp4" src="/images/' + myText + '"></video>';
    }else if(val === "link"){
        var myText = $('ul li')[i].children[3].textContent;
        console.log("hey cunt0 " + myText);
        var myLinks = myText.split('|');
        console.log("myLInks " + myLinks[1]);
        $('ul li')[i].children[3].textContent = '<a href="' + myLinks[0] + '" class="link">' + '|' + myLinks[1] + "|</a>";
    }else if(val === "break"){
        $('ul li')[i].children[3].textContent = '<hr/>'
    }
}
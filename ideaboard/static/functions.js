$(document).on("click","#new-idea",function(){
    $.ajax({
        url: url,
        type: "post",
        data:{
            title:"",
            text:"",
            csrfmiddlewaretoken: token,
            action: 'post'
    },
        success: function(data) {
            $("#content").prepend('<div class="tile" id='+data.id+'>\
                <form>\
                    <div>\
                        <input type="text" name="title" class="input" id="title" value="'+data.title+'"/>\
                    </div>\
                    <div>\
                        <textarea name="text" id="text" class="input">'
                        + data.text +
                        '</textarea>\
                    </div>\
                </form>\
            </div>')
            $("#title").focus();
    }});
});

$(document).on("click",".tile",function(){{
    var $this = $(this);
    var id = $($this).attr('id');
    $.ajax({
        url: '/'+id,
        type: "get",
        success: function(response) {
            if($('#form-'+response.id).length === 0){
                $($this).html('<form id="form-'+response.id+'">\
                                <div>\
                                    <input type="text" name="title" class="input" id="title" value="'+response.title+'"/>\
                                </div>\
                                <div>\
                                    <textarea name="text" id="text" class="input">'
                                    +response.text+
                                    '</textarea>\
                                </div>\
                            </form>\
                        </div>')
                    }
    }});
}});

$(document).on('focusout', 'form', function(event) {
    var id = $(this).parent().attr('id');
    setTimeout(function() {
        if (!event.currentTarget.contains(document.activeElement)) {
            $.ajax({
                url: '/'+id,
                type: "post",
                data:{
                    title:$("#title").val(),
                    text:$("#text").val(),
                    csrfmiddlewaretoken: token,
                    action: 'post'
            },
            success: function(data) {
                $("#content").load(location.href+" #content>*","");
            }});
        }
    }, 0);
});
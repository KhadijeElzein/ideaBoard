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

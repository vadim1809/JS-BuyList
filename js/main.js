$(function(){
    
   $(".container").ready(function(){
       addProd("Печиво"); addProd("Шоколад"); addProd("Морозиво"); 
   }); 
    
    var id = 0;
    
  $("form input[type=submit]").click(
    function(){
      var prodName = $(".input_product").val();
      if(prodName) {
        $(".input_product").val("").focus();
        addProd(prodName);
      }
      return false;
    }
  );
    
    function addProd(prodName){
//       console.log("work2");
        var names = $("input[placeholder='Нова назва']").toArray();
        var labels = $(".count_lbl").toArray();
        var nameId = -1;
        for (var i = 0; i < names.length; i++) {
            if ($(names[i]).val().toLowerCase() === prodName.toLowerCase()) {
                nameId = i;
                break;
            }
        }
        if (nameId > -1) {
            var quantity = parseInt($(labels[nameId]).text());
            $(labels[nameId]).text(++quantity);
            var ind = parseInt($(labels[nameId]).attr("id").charAt(5));
            changeLabel(ind);
        } else {                        
            $(wrapProduct(prodName)).appendTo($(".informtable")).stop().hide().slideDown();
            addKeyUp($(".product input[value="+prodName+"]"));
            btnIncEvent($("#label"+(id-1)).parent().find(".increment_btn"));
            btnDecEvent($("#label"+(id-1)).parent().find(".decrement_btn"));
            btnBoughtedEvent($("#label"+(id-1)).parent().find(".buy_btn"));
            deleteEvent($("#label"+(id-1)).parent().find(".del_btn"));
            pickLabel(prodName, (id-1));
        }
    }
       /*<div class='product'>"+
            "<div class=\"name_product\">"+prodName+"</div>*/ 
    function wrapProduct(prodName){
        var product = "<div class='product'>"+
            "<input type='text' class=\"noBorder\" placeholder='Нова назва'' value="+prodName+">"+
            "<div class='count_control'>"+
            "<button class='round_btn decrement_btn' id='zo"+id+"'  disabled>-</button>"+
            "<span class='count_lbl' id='label"+(id++)+"'>1</span>"+
            "<button class='round_btn increment_btn'>+</button>"+
            "<button type='button' class='del_btn'>x</button>"+
            "<button type='button' class='buy_btn'>Куплено</button>"+
            "</div>"+
            "</div>"
        return product;
    }
    
    function pickLabel(prodName, id){
        var label = "<span class=\"bought\">"+"<span class=\"title\">"+prodName+"</span>"
        +"<button class=\"orng_circ_count\" id=\"tag"+id+"\">1</span></span>"
        $(".count_products").append(label);
    }

    function changeLabel(idl){
        var quantity = parseInt($("#tag"+idl).text());
        $("#tag"+idl).text(++quantity);
    }

    function addKeyUp(obj) {
        $(obj).keyup(function(){
            var index = parseInt(($(this).parent().find(".count_lbl").attr("id")).charAt(5));
            $("#tag"+index).parent().find("span").text($(this).val());
        });
    }


    function btnIncEvent(btn) {
        $(btn).click(function(){
            var n = parseInt($(this).parent().find(".count_lbl").text());
            $(this).parent().find(".count_lbl").text(++n);
            if(n > 1){
                $(this).parent().find(".decrement_btn").attr("disabled", false);
            }
            var label_id = "#tag"+$(this).parent().find(".count_lbl").attr("id").charAt(5);
            $(label_id).text(n);
        });
    }

    function btnDecEvent(btn){
        $(btn).click(function(){
            var n = parseInt($(this).parent().find(".count_lbl").text());
            $(this).parent().find(".count_lbl").text(--n);
            if (n<=1) {
                $(this).attr("disabled", true);
            }
            var label_id = "#tag"+$(this).parent().find(".count_lbl").attr("id").charAt(5);
            $(label_id).text(n);
        });
    }
    
    function btnBoughtedEvent(btn){
        $(btn).click(function(){
            var div = $(btn).parent();
            if($(this).text()==="Куплено") {
                //properties for boughted product in control-panel
                $(div).find(".decrement_btn").addClass("display-none");
                $(div).find(".increment_btn").addClass("display-none");
                $(div).find(".del_btn").addClass("display-none");
                $(div).find(".count_lbl").addClass("centered");
                $(div).parent().find("input").addClass("boughted-text-style");
                $(this).text("Не куплено");
                $(div).parent().find("input").attr("disabled", true);
                //make tag boughted
                var label_id = "#tag"+$(div).find(".count_lbl").attr("id").charAt(5);
                var label = $(".resulttable").find(".count_products").find(label_id).parent().remove();
                $(label).find(".orng_circ_count").addClass("boughted-text-style");
                $(label).find("span").addClass("boughted-text-style");
                //console.log(label);
                $(".resulttable").find(".stats-bought").append(label);
            } else {
                //make product unboughted)
                $(div).find(".decrement_btn").removeClass("display-none");
                $(div).find(".increment_btn").removeClass("display-none");
                $(div).find(".del_btn").removeClass("display-none");
                $(div).find(".count_lbl").removeClass("centered");
                $(div).parent().find("input").removeClass("boughted-text-style");
                $(div).parent().find("input").attr("disabled", false);
                $(this).text("Куплено");
                //make tag unboughted
                var label_id = "#tag"+$(div).find(".count_lbl").attr("id").charAt(5);
                var label = $(".resulttable").find(".stats-bought").find(label_id).parent().remove();
                $(label).find(".orng_circ_count").removeClass("boughted-text-style");
                $(label).find("span").removeClass("boughted-text-style");
                //console.log(label);
                $(".resulttable").find(".count_products").append(label);
            }
        });
    }
    
    function deleteEvent(btn){
        $(btn).click(function(){
            var label_id = "#tag"+$(this).parent().find(".count_lbl").attr("id").charAt(5);
            $(this).parent().parent().stop().slideUp("normal", function(){$(this).remove();});
            $(label_id).parent().fadeOut("normal", function(){$(this).remove()});
        });
    }
});
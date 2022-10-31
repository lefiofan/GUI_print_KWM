let strana;
let volume;
let name_product;
var codes_list = [];


window.onload = function() {
   eel.one_start()();
   //document.oncontextmenu = cmenu; function cmenu() { return false;}
};



async function strana_tar(st) {
    strana =  st.value
    tara_elems = await eel.tara_elem(strana)();
    console.log(strana)
    
    // Проверка на соединение с Админкой если нет вывод ошибки
    if (tara_elems != 'error') {
        document.getElementsByClassName('one_screen').hidden = true;
        $(".one_screen").hide();
        for (const elem of tara_elems) {
            create_tara_in_dom(elem);
        }
        $(".two_screen").show();
    
    } else {
        const toastLiveExample = document.getElementById('liveToast')
        const toast = new bootstrap.Toast(toastLiveExample)

        toast.show()
    }

}


eel.expose(create_Country_in_dom);
function create_Country_in_dom(elem) {
    let btn = document.createElement('button');
    btn.className = "btn strana_btn_img";
    btn.type = "button";
    btn.innerHTML = `<strong>${elem}</strong>`;
    btn.setAttribute("onclick", "strana_tar(this)")
    btn.setAttribute("style", "margin-right: 50px")
    btn.setAttribute("width", "550")
    btn.setAttribute("value", `${elem}`)
    btn.setAttribute("id", `${elem}`)
    document.body.append(btn);
    document.getElementsByClassName("kkk").appendChild(btn);
}



function create_tara_in_dom(elem) {
    let btn = document.createElement('button');
    btn.className = "btn btn-info tara_btn";
    btn.type = "button";
    btn.innerHTML = `<strong>${elem}</strong>`;
    btn.setAttribute("onclick", "tara(this)")
    btn.setAttribute("value", `${elem}`)
    document.body.append(btn);
    document.getElementById("tara_elems").appendChild(btn);
}




function create_taraName_in_dom(elem) {
    let btn = document.createElement('button');
    btn.className = "list-group-item list-group-item-action name_prod";
    btn.type = "button";
    btn.innerHTML = `<strong>${elem}</strong>`;
    btn.setAttribute("onclick", "tara_name(this)")
    btn.setAttribute("value", `${elem}`)
    btn.setAttribute("id", `${elem}`)
    document.body.append(btn);
    document.getElementById("list-group2").appendChild(btn);
}



// Функция принимает страну и отправляет в python принимает список тар
async function tara(obj) {
    $(".div_taras").hide();
    volume = obj.value;
    $("#img_name").attr("src", '');
    name_taraa = await eel.product_list(volume, strana)();
    
    $("#list-group2").empty();
    var eell = $("#list-group2").children().length
    for (const name of name_taraa) {
        create_taraName_in_dom(name['name']);
    }
}








// Во время нажатий на кнопку принимает название продукции и отправляет в python функцию ответ принимает страну гтин картинку обьем тары и количество в ящике
async function tara_name(name) {
    
    name_product = name.value;

    codes_list = await eel.codes_list(name_product, volume, strana)();
    src_product = codes_list[1];
    src_product = "http://127.0.0.1:8081/products/files/" + src_product;
    for (const name of codes_list[0]) {
        console.log(name);

    }
    $("#img_name").attr("src", src_product);
    
    
    document.getElementById('print_codes_list').innerHTML = codes_list.length
}



function next_screen() {
    $(".one_screen").show();
    $(".two_screen").hide();
    $("#img_name").attr("src", "");
    
     strana = 0;
     volume = 0;
     name_product = 0;
     codes_list = [];
    
        
      var taras_list = document.querySelector('#tara_elems')
      var products_list = document.querySelector('#list-group2')
      
      
      
      var delete_taras_listt = taras_list.querySelectorAll('button');
  for (let i = 0; i < delete_taras_listt.length; i++) {
    delete_taras_listt[i].remove();
  }
       
    
    var delete_products_list = products_list.querySelectorAll('button');
  for (let i = 0; i < delete_products_list.length; i++) {
    delete_products_list[i].remove();
  }
    
    document.getElementById('print_codes_list').innerHTML = "0"

}





$(document).ready(function(){
  $("#print_code_tara").click(function(){
      
      
          eel.print_code_tara(codes_list[0]);
         
      // $('#next_three_screen').prop( "disabled", false );
});
});


$(document).ready(function(){
  $("#test_print").click(function(obj){
      const codes = ["01048700310011182151G,W9hS<Y1hk93vHoA", "01048700310011182151G,W9hS<Y1hk93vHoA", "01048700310011182151G,W9hS<Y1hk93vHoA","01048700310011182151G,W9hS<Y1hk93vHoA", "01048700310011182151G,W9hS<Y1hk93vHoA", "01048700310011182151G,W9hS<Y1hk93vHoA"];
     eel.test_print(codes);
     //$('#down_code_tara').remove();
});
});
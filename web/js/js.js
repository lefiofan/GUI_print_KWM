

window.onload = function() {
   eel.one_start()();
   //document.oncontextmenu = cmenu; function cmenu() { return false;}
};



async function strana_tar(st) {
    strana =  st.value
    tara_elems = await eel.tara_elem(strana)();

    
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
async function tara(obj, strana) {

    name_taraa = await eel.tara_name(obj.value, strana)();
    $("#list-group2").empty();
    var eell = $("#list-group2").children().length
    for (const name of name_taraa) {
        create_taraName_in_dom(name['title']);
    }
}


// Во время нажатий на кнопку принимает название продукции и отправляет в python функцию ответ принимает страну гтин картинку обьем тары и количество в ящике
async function tara_name(name) {
    
    name_tara = name.value;
    name_tara_elems = await eel.tara_name_elem(name_tara)();


    for (const name of name_tara_elems) {

        gtin = name['gtin'];
        strana = name['country'];
        src = name['img'];
        name_tara = name['title'];
        tara_obm = name['tara'];
        korob = name['korob'];

    }
    $("#img_name").attr("src", src);
}


function next_screen() {
    document.getElementsByClassName('two_screen').hidden = true;
    $(".two_screen").hide();
    $(".three_screen").show();
    console.log(name_tara);
    console.log(strana);
    $("#img_tara").attr("src", src);

    document.getElementById('tara').innerHTML = tara_obm + ' литров';
    document.getElementById('strana').innerHTML = strana;
    document.getElementById('strix_code').innerHTML = gtin;
    document.getElementById('tara_info-name').innerHTML = name_tara;
}


function start() {

    eel.print_for_gui(1, gtin, korob, strana, name_tara, tara_obm);
}


function stop() {
     $("#tara_elems").empty();
    $("#list-group2").empty();
    $("#codes_list").empty();
    gtin = "0";
    korob = "0";
    strana = "0";
    src = "../img/tara.png";
    $("#img_name").attr("src", src);
    name_tara = "0";
    tara_obm = "0";
    $(".one_screen").show();
    $(".two_screen").hide();
    $(".three_screen").hide();
    
   
    eel.print_for_gui(0, gtin, korob, strana, name_tara, tara_obm);

}



function create_listCodes(elem) {

    $("#bcTarget2").barcode(elem, "datamatrix",{barWidth:2, barHeight:30});
}


// принимает ответ от python и выводит 
eel.expose(update_dom);

function update_dom(col, codes) {
    

    //document.getElementById('iz_py').innerHTML = col;
    $("#bcTarget").barcode(col, "code128",{barWidth:2, barHeight:30});
    
    $("#codes_list").empty();
    
    document.getElementById('dadta_code').innerHTML = codes.length;
    


}



eel.expose(update_dom_insertDB);
function update_dom_insertDB() {

    $('.print_codes_tara').css('background-color', 'green');
}


eel.expose(codes_d_DB);
function codes_d_DB() {

    $('.print_codes_tara').css('background-color', 'red');
}

// Функция запускаеться из python

eel.expose(js_fun);
function js_fun(path, name_file) {

    console.log(path);
    console.log(name_file);


    $('#down_code_input').val(name_file);
    $('#down_code_tara').html('Загрузить');

    path_tara = path;
}




// Печатать коды на ящики




$(document).ready(function(){
  $("#down_code_tara").click(function(obj){
      if(gtin.length > 3){
         eel.search_file(gtin);
         console.log(gtin);
         }else{
             console.log('Не выбран GTIN')
             $('#down_code_input').val('Не выбран GTIN');
         }
     
     //$('#down_code_tara').remove();
});
});

$(document).ready(function(){
  $("#print_code_tara").click(function(){
      
      if(path_tara != null){
         console.log(path_tara);
            console.log(gtin);
          eel.print_code_tara(path_tara, gtin);
         }else {
             console.log('ERRORO')
         }
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
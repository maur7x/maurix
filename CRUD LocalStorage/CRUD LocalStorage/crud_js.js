////un comentario
//
var usuarios = new Array({"ID":0,"Nombre":null,"Apellido":null,"Email":null,"Telefono":null,"Direccion":null,"Fecha":null,});
var controlB = 0;


$(document).ready(function(){ 

    var strUsuarios = localStorage.getItem("array_usuario");
    if (strUsuarios)
    {
        usuarios = JSON.parse(strUsuarios);
        
        refrescarUI();

        $("#selectB option:contains('0')").remove();
        $("#opSelect option:contains('0')").remove();

        
    }

    cargarModif();
    deshabilitar();
    
    });


function deshabilitar() {
    $("#nombreMd").prop('disabled', true);
    $("#apellidoMd").prop('disabled', true);
    $("#emailMd").prop('disabled', true);
    $("#telefonoMd").prop('disabled', true);
    $("#direccionMd").prop('disabled', true);
}


function agregar() {
    var nm = $('#nombreIn').val();
    var ap = $('#apellidoIn').val();
    var te = $('#telefonoIn').val();
    var di = $('#direccionIn').val();
    var em = $('#emailIn').val();
   
    if (nm != "" && ap != "" && te != "" && di != "" && em != "") {


        id = asignarID();
        var cliente = {
            "ID": id,
            "Nombre": $("#nombreIn").val(),
            "Apellido": $("#apellidoIn").val(),
            "Email": $("#emailIn").val(),
            "Telefono": $("#telefonoIn").val(),
            "Direccion": $("#direccionIn").val(),
            "Fecha": new Date().toDateString(),
        }

        usuarios.push(cliente);

        localStorage.setItem("array_usuario", JSON.stringify(usuarios));

        document.getElementById("nombreIn").value = "";
        document.getElementById("apellidoIn").value = "";
        document.getElementById("emailIn").value = "";
        document.getElementById("telefonoIn").value = "";
        document.getElementById("direccionIn").value = "";

        refrescarUI();

        BootstrapDialog.show({
            type: BootstrapDialog.TYPE_SUCCESS,
            draggable: true,
            title: 'Hecho',
            message: 'Se agrego el registro correctamente!',
            buttons: [{
                label: 'Cerrar',
                action: function (dialogItself) {
                    dialogItself.close();
                }
            }]


        });
    } else {
        BootstrapDialog.show({
            type: BootstrapDialog.TYPE_DANGER,
            draggable: true,
            title: 'Error!',
            message: 'Por favor,Verifique la informacion',
            buttons: [{
                label: 'Cerrar',
                action: function (dialogItself) {
                    dialogItself.close();
                }
            }]


        });

        return false;
    }
   
}


 
function asignarID() {
  
    return usuarios[usuarios.length-1].ID + 1;
   
       
}

function refrescarUI() {
    llenarSelect();
    llenarSelectB();
    actualizarTabla();
}


function llenarSelect() {

    for (var i = 0; i < usuarios.length; i++)
    {
        document.getElementById('opSelect').options[i] = new Option(usuarios[i].ID);
    }
    $("#selectB option:contains('0')").remove();
    $("#opSelect option:contains('0')").remove();
  
    $("#opSelect").prepend("<option id='S1' value='S1' selected='selected'>--id--</option>");
   
}


function llenarSelectB() {
    for (var i = 0; i < usuarios.length; i++) {
        document.getElementById('selectB').options[i] = new Option(usuarios[i].ID);
    }

    $("#selectB option:contains('0')").remove();
    $("#opSelect option:contains('0')").remove();
    $("#selectB").prepend("<option id='S2' value='S2' selected='selected'>--id--</option>");
}


function actDesIn() {

        if ($('#opSelect option[id="S1"]').is(':selected')) {
            

          
          

            $("#nombreMd").prop('disabled', true);
            $("#apellidoMd").prop('disabled', true);
            $("#emailMd").prop('disabled', true);
            $("#telefonoMd").prop('disabled', true);
            $("#direccionMd").prop('disabled', true);


           
           
        } else {
            $("#nombreMd").prop('disabled', false);
            $("#apellidoMd").prop('disabled', false);
            $("#emailMd").prop('disabled', false);
            $("#telefonoMd").prop('disabled', false);
            $("#direccionMd").prop('disabled', false);
        }

}


function cargarModif() {
    
    
    $("#opSelect").on("change", function () {
        actDesIn();
        var indice = "";
        if ($(this).val() != 'S1') {
            indice = $(this).val();
        }
            
           
            if (indice != "") {
                $("#nombreMd").val(usuarios[indice].Nombre);
                $("#apellidoMd").val(usuarios[indice].Apellido);
                $("#emailMd").val(usuarios[indice].Email);
                $("#telefonoMd").val(usuarios[indice].Telefono);
                $("#direccionMd").val(usuarios[indice].Direccion);


            } else {
                $("#nombreMd").val("");
                $("#apellidoMd").val("");
                $("#emailMd").val("");
                $("#telefonoMd").val("");
                $("#direccionMd").val("");
            }

            

        });
    
}





function modificar() {
    ind=document.getElementById('opSelect').options[document.getElementById('opSelect').selectedIndex].value;
    var nm = $('#nombreMd').val();
    var ap = $('#apellidoMd').val();
    var te = $('#telefonoMd').val();
    var di = $('#direccionMd').val();
    var em = $('#emailMd').val();
   
    if (nm != "" && ap != "" && te!="" && di!="" && em != "") {
        var cliente = {
            "ID": ind,
            "Nombre": $("#nombreMd").val(),
            "Apellido": $("#apellidoMd").val(),
            "Email": $("#emailMd").val(),
            "Telefono": $("#telefonoMd").val(),
            "Direccion": $("#direccionMd").val(),
            "Fecha": new Date().toDateString()
        }



        usuarios[ind].Nombre = cliente.Nombre;
        usuarios[ind].Apellido = cliente.Apellido;
        usuarios[ind].Email = cliente.Email;
        usuarios[ind].Telefono = cliente.Telefono;
        usuarios[ind].Direccion = cliente.Direccion;
        usuarios[ind].Fecha = cliente.Fecha;

        localStorage.setItem("array_usuario", JSON.stringify(usuarios));

        document.getElementById("nombreMd").value = "";
        document.getElementById("apellidoMd").value = "";
        document.getElementById("emailMd").value = "";
        document.getElementById("telefonoMd").value = "";
        document.getElementById("direccionMd").value = "";

        deshabilitar();

        BootstrapDialog.show({
            type: BootstrapDialog.TYPE_WARNING,
            draggable: true,
            title: 'Hecho',
            message: 'Se modifico el registro correctamente',
            buttons: [{
                label: 'Cerrar',
                action: function (dialogItself) {
                    dialogItself.close();
                }
            }]


        });

        refrescarUI();


    } else {
        BootstrapDialog.show({
            type: BootstrapDialog.TYPE_DANGER,
            draggable: true,
            title: 'Error!',
            message: 'Por favor, verifique la informacion.',
            buttons: [{
                label: 'Cerrar',
                action: function (dialogItself) {
                    dialogItself.close();
                }
            }]


        });
        return false;
    }

 
           
}

   //funcion borrar
var indiceB;

$("select#selectB").on("change", function () {
    indiceB = $(this).val();
    
})
        
  
$("#borrarboton").on('click', function () {


        for (var i = indiceB; i <= usuarios.length - 1; i++) {
            usuarios.splice(i, 1, usuarios[i * 1 + 1]);
        }
        usuarios.pop();



        $("#selectB option:selected").remove();
       
        var sel = document.getElementById('opSelect');
        sel.removeChild(sel.options[indiceB-1]);

        BootstrapDialog.show({
            type: BootstrapDialog.TYPE_SUCCESS,
            draggable: true,
            title: 'Eliminado',
            message: 'Se borro correctamente el registro con ID: ' + indiceB,
            //onclick: refrescarUI,
            buttons: [{
                label: 'Cerrar',
                action: function (dialogItself) {
                    dialogItself.close();
                }
            }]


        });


        refrescarUI();
});
  

//fin funcion Borrar

    function actualizarTabla() {

        var Table = document.getElementById("tablebody");
        Table.innerHTML = "";

        for (var IT = 1; IT < usuarios.length; IT++) {

          

            $("#tablebody").append('<tr><td>' + usuarios[IT].ID + '</td><td>' + usuarios[IT].Nombre + '</td><td>' + usuarios[IT].Apellido + '</td><td>' + usuarios[IT].Email + '</td>' +
      '<td>' + usuarios[IT].Telefono + '</td><td>' + usuarios[IT].Direccion + '</td><td>' + usuarios[IT].Fecha + '</td></tr>');
        
        
        }
       
        
    }
    
   
    function busca_palabras() {
        var controlB =0;

        $("#tablebody tr").remove();
        
        var Tbusqueda = $("#search").val();
        document.getElementById("search").value = "";
        
        for (var i = 1; i<=usuarios.length-1; i++) {

            if (Tbusqueda == usuarios[i].Nombre) {
                
                $("#tablebody").append('<tr><td>' + usuarios[i].ID + '</td><td>' + usuarios[i].Nombre + '</td><td>' + usuarios[i].Apellido + '</td><td>' + usuarios[i].Email + '</td>' +
                '<td>' + usuarios[i].Telefono + '</td><td>' + usuarios[i].Direccion + '</td><td>' + usuarios[i].Fecha + '</td></tr>');
                controlB++;
               

                               
            } 

        }
       
        if (controlB >= 1) {
    
            BootstrapDialog.show({
                type: BootstrapDialog.TYPE_SUCCESS,
                draggable: true,
                title: 'Hecho',
                message: 'Se encontraron' + '  ' + controlB + '  ' + 'clientes con ese apellido',
            });

        } else if (controlB == 0 || controlB=="undefined") {
            BootstrapDialog.show({
                type: BootstrapDialog.TYPE_DANGER,
                draggable: true,
                title: 'Oops!',
                message: 'No se encontraron clientes con ese nombre',
                buttons: [{
                    label: 'Cerrar',
                    action: function (dialogItself) {
                        dialogItself.close();
                    }
                }]
            });
            
        
        }
        
        
    }
   
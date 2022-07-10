  let tipo_soldados;
  /*Ataque, defensa, vida*/
  tipo_soldados = {
    soldado : [10, 6, 100],
    arquero : [9, 2, 100],
    caballero : [20, 5, 150],//Vonus caballería en carga: 100% ataque y 100%vida
  }
  ataque_soldado = tipo_soldados.soldado[0]
  armadura_soldado = tipo_soldados.soldado[1]
  vida_soldado = tipo_soldados.soldado[2]

  ataque_arquero = tipo_soldados.arquero[0]
  armadura_arquero = tipo_soldados.arquero[1]
  vida_arquero = tipo_soldados.arquero[2]

  ataque_caballero = tipo_soldados.caballero[0]
  ataque_caballero_carga = tipo_soldados.caballero[0] * 2
  armadura_caballero = tipo_soldados.caballero[1]
  vida_caballero = tipo_soldados.caballero[2]
  vida_caballero_carga = tipo_soldados.caballero[2] * 2
  /*_________________________________________________________________________*/
  /*Cantidad de tropas*/
  let ejercito_atacante;
  ejercito_atacante = {
    soldado : 100,
    arquero : 80,
    caballero : 20,
  }
  let ejercito_defensor;
  ejercito_defensor = {
    soldado : 200,
    arquero : 40,
    caballero : 0,
  }
  CS_atacante = ejercito_atacante.soldado
  CA_atacante = ejercito_atacante.arquero
  CC_atacante = ejercito_atacante.caballero

  CS_defensor = ejercito_defensor.soldado
  CA_defensor = ejercito_defensor.arquero
  CC_defensor = ejercito_defensor.caballero
  /*Muestro estadisticas de soldados*/
  /*_________________________________________________________________________*/
  /*Muestro en pantalla los ejercitos*/
  document.getElementById("soldados").innerHTML = ejercito_atacante.soldado
  document.getElementById("arqueros").innerHTML = ejercito_atacante.arquero
  document.getElementById("caballeros").innerHTML = ejercito_atacante.caballero

  document.getElementById("soldados_enemigos").innerHTML = ejercito_defensor.soldado
  document.getElementById("arqueros_enemigos").innerHTML = ejercito_defensor.arquero
  document.getElementById("caballeros_enemigos").innerHTML = ejercito_defensor.caballero
  
  console.log(ejercito_defensor.soldado)
  /*_________________________________________________________________________*/
  /*Función para calcular el resultado*/
  function fight(){
    ronda = 0
    /*Calculo cuantos soldados atacantes quedan tras el disparo de los arqueros*/
    if (CS_atacante > 0) {
      soldados_restantes = (vida_soldado*CS_atacante/*Vida total*/ -
      (ataque_arquero*CA_defensor - armadura_soldado*CA_defensor))
      /vida_soldado;
      soldados_restantes = Math.trunc(soldados_restantes);
      perdidas = soldados_restantes - CS_atacante;
      document.getElementById("perdidas_atacantes_soldados").innerHTML = perdidas;
      document.getElementById("restos_atacantes_soldados").innerHTML = soldados_restantes;
      ejercito_atacante.soldado = soldados_restantes
    }
    if (CC_atacante > 0 && CS_atacante === 0) { /*Caballeros atacantes restantes vs arquero*/
    	caballeros_restantes = (vida_caballero*CC_atacante/*Vida total*/ -
    	(ataque_arquero*CA_defensor/*Ataque total*/ - armadura_caballero*CA_defensor))
      /vida_caballero;
      caballeros_restantes = Math.trunc(soldados_restantes);
      perdidas = caballeros_restantes - CC_atacante;
      document.getElementById("perdidas_atacantes_caballeros").innerHTML = perdidas
      document.getElementById("restos_atacantes_caballeros").innerHTML = caballeros_restantes;
      ejercito_atacante.caballero = caballeros_restantes
    }
    if (CA_atacante > 0 && CS_atacante === 0 && CC_atacante === 0) {
      arqueros_restantes = (vida_arquero*CA_atacante/*vida total*/ -
      (ataque_arquero*CA_defensor/*ataque total*/ - armadura_arquero*CA_defensor))
      /vida_arquero;
      arqueros_restantes = Math.trunc(soldados_restantes);
      perdidas = arqueros_restantes - CA_atacante;
      document.getElementById("perdidas_atacantes_arqueros").innerHTML = perdidas
      document.getElementById("restos_atacantes_arqueros").innerHTML = arqueros_restantes;
      ejercito_atacante.arquero = arqueros_restantes
    }
    /*________________________TURNO ATACANTE_______________________*/
    /*Calculo soldados defensores restantes tras el ataque de los arqueros atacantes*/
    if (CS_defensor > 0) {
      soldados_restantes = (vida_soldado*CS_defensor - 
      (ataque_arquero*CA_atacante - armadura_soldado*CA_atacante))
      /vida_soldado;
      soldados_restantes = Math.trunc(soldados_restantes);
      perdidas = soldados_restantes - CS_defensor;
      document.getElementById("perdidas_defensores_soldados").innerHTML = perdidas
      document.getElementById("restos_defensores_soldados").innerHTML = soldados_restantes;
      ejercito_defensor.soldado = soldados_restantes
    }
    if (CC_defensor > 0 && CS_defensor === 0) { /*Caballeros atacantes restantes vs arquero*/
      caballeros_restantes = (vida_caballero*CC_defensor/*Vida total*/ -
      (ataque_arquero*CA_atacante/*Ataque total*/ - armadura_caballero*CA_atacante))
      /vida_caballero;
      caballeros_restantes = Math.trunc(soldados_restantes);
      perdidas = caballeros_restantes - CC_defensor;
      document.getElementById("perdidas_defensores_caballeros").innerHTML = perdidas
      document.getElementById("restos_defensores_caballeros").innerHTML = caballeros_restantes;
      ejercito_defensor.caballero = caballeros_restantes
    }
    if (CA_defensor > 0 && CS_defensor === 0 && CC_defensor === 0) {
      arqueros_restantes = (vida_arquero * CA_defensor/*vida total*/ -
      (ataque_arquero * CA_atacante/*Ataque total*/ - armadura_arquero*CA_atacante))
      /vida_arquero;
      arqueros_restantes = Math.trunc(soldados_restantes);
      perdidas = arqueros_restantes - CA_defensor;
      document.getElementById("perdidas_defensores_arqueros").innerHTML = perdidas
      document.getElementById("restos_defensores_arqueros").innerHTML = arqueros_restantes;
      ejercito_defensor.arquero = arqueros_restantes
    }
    /*_____________________________TURNO CABALLERÍA________________*/
    //Ambas caballerías se cargan mutuamente y en caso de no haber otra caballería que les cargue, 
    //realizarán una carga arrolladora contra los enemigos. 
    //1º cabVScab(simultanea), 2ªcabVSsol, 3ºcabVSarq
    //____________________CABALLERÍA CARGANDO CONTRA CABALLERIA____________________
    if (CC_defensor > 0 && ronda === 0) {
      //Calculo para calcular cuantos mueren de la caballería atacante
      caballeria_atacante_restante = (vida_caballero_carga*CC_atacante -
        (ataque_caballero_carga*CC_defensor - armadura_caballero*CC_defensor))/vida_caballero_carga;
      caballeria_atacante_restante = Math.trunc(caballeria_atacante_restante);
      document.getElementById("perdidas_atacantes_caballeros").innerHTML = caballeria_atacante_restante
      ejercito_atacante.caballero = caballeria_atacante_restante;
      //Calculo para conocer muertos defensores
      caballeria_defensora_restante = (vida_caballero_carga*CC_defensor -
        (ataque_caballero_carga * CC_atacante - armadura_caballero*CC_atacante))/vida_caballero_carga;
      caballeria_defensora_restante = Math.trunc(caballeria_defensora_restante);
      document.getElementById("perdidas_defensores_caballeros").innerHTML = caballeria_defensora_restante;
      ejercito_defensor.caballero = caballeria_defensora_restante;
    }
    //Caballeria sin carga contra caballeria
    if (CC_defensor > 0) {
      //Calculo para calcular cuantos mueren de la caballería atacante
      caballeria_atacante_restante = (vida_caballero*CC_atacante -
        (ataque_caballero*CC_defensor - armadura_caballero*CC_defensor))/vida_caballero;
      caballeria_atacante_restante = Math.trunc(caballeria_atacante_restante);
      document.getElementById("perdidas_atacantes_caballeros").innerHTML = caballeria_atacante_restante;
      ejercito_atacante.caballero = caballeria_atacante_restante;
      //Calculo para conocer muertos defensores
      caballeria_defensora_restante = (vida_caballero*CC_defensor -
        (ataque_caballero * CC_atacante - armadura_caballero*CC_atacante))/vida_caballero;
      caballeria_defensora_restante = Math.trunc(caballeria_defensora_restante);
      document.getElementById("perdidas_defensores_caballeros").innerHTML = caballeria_defensora_restante;
      ejercito_defensor.caballero = caballeria_defensora_restante;
    }
    //Caballería contra infantería
    // resultado defensores sin caballeria cabVSsol
    //SIN CARGA
    if (CC_defensor === 0 && CS_defensor > 0) {
      caballeria_atacante_restante = (vida_caballero*CC_atacante -
        (ataque_soldado*CS_defensor - armadura_caballero*CS_defensor))/vida_caballero;
      caballeria_atacante_restante = Math.trunc(caballeria_atacante_restante);
      document.getElementById("perdidas_atacantes_caballeros").innerHTML = caballeria_atacante_restante;
      console.log("aballería atacante vs infantería sin carga")
      soldados_defensores_restante = (vida_soldado*CS_defensor -
        (ataque_caballero * CC_atacante - armadura_soldado*CC_atacante)) / vida_soldado;
      soldados_defensores_restante = Math.trunc(soldados_defensores_restante);
      document.getElementById("perdidas_defensores_soldados").innerHTML = soldados_defensores_restante;
      console.log("aballería atacante vs infantería sin carga")
    }
    //CON CARGA
    if (CC_defensor === 0 && CS_defensor > 0 && ronda === 0) {
      caballeria_atacante_restante = ((vida_caballero*CC_atacante)*2 -
        (ataque_soldado*CS_defensor - armadura_caballero*CS_defensor))/(vida_caballero*2);
      caballeria_atacante_restante = Math.trunc(caballeria_atacante_restante);
      document.getElementById("perdidas_atacantes_caballeros").innerHTML = caballeria_atacante_restante;
      console.log("aballería atacante vs infantería con carga")
      soldados_defensores_restante = (vida_soldado*CS_defensor -
        ((ataque_caballero * 2 * CC_atacante) - armadura_soldado*CC_atacante)) / vida_soldado;
      soldados_defensores_restante = Math.trunc(soldados_defensores_restante);
      document.getElementById("test").innerHTML = soldados_defensores_restante;
      console.log("aballería atacante vs infantería con carga")
    }

  ronda = ronda + 1
  }
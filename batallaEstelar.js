// implementaciones futuras: regenerador de vida
//implementación urgente:
// 1 - cuadro de texto donde se muestre lo que pasa
class Nave {
  constructor(daño, puntosVida, nombre, precision, side1image, side2image, id) {
    this.daño = daño;
    this.puntosVida = puntosVida;
    this.nombre = nombre;
    this.estado = true;
    this.side1image = side1image;
    this.side2image = side2image;    
    // implementar precision+
    this.precision = precision;
    this.id = id;
  }
  disparar(turno, naveAtacante) {
    //selecciona nave objetivo en selector() y recoge el return
    let naveObjetivoPinned = this.selector(turno);
    console.log(naveObjetivoPinned.nombre + " is being attacked");

    //se ejecuta un disparo
    this.recibirDisparo(naveObjetivoPinned, naveAtacante);
  }
  selector(turno) {
    //selector de la nave que será atacada
    //seleccionar una nave del array de forma aleatoria, almacenarla en una variable
    // si el turno es par que dispare la nave de un espacio y si es impar
    //que dispare desde otro espacio
    let naveObjetivo;
    if (this.isEven(turno)) {
      let diceObjetivo = Math.floor(
        Math.random() * sectorEquipo.espacio2.length
      );
      naveObjetivo = sectorEquipo.espacio2[diceObjetivo];
    } else if (!this.isEven(turno)) {
      let diceObjetivo = Math.floor(
        Math.random() * sectorEquipo.espacio1.length
      );
      naveObjetivo = sectorEquipo.espacio1[diceObjetivo];
    }
    return naveObjetivo;
  }

  recibirDisparo(naveObjetivoPinned, naveAtacante, p) {
    // certezaAtaque = precisionCheck(naveAtacante);
    // se descuenta el daño a los puntos de vida
    let hit = naveAtacante.daño;    
    console.log(
      naveObjetivoPinned.nombre +
        " has " +
        naveObjetivoPinned.puntosVida +
        " life points before the attack\n"
    );
    // se realiza una verificación de la precisión de la nave, para decidir si esta falla o ejecuta un golpe crítico
    let certezaAtaque = this.precisionCheck(naveAtacante);
    switch (certezaAtaque) {
      case 0:
        //case 0: la nave ataca de forma normal
        naveObjetivoPinned.puntosVida -= hit;
        break;
      case 1:
        //case 1: la nave falla
        console.log(naveAtacante.nombre + " has failed its attack!");
        break;
      case 2:
        //case 2: la nave ejecuta un golpe crítico
        naveObjetivoPinned.puntosVida -= hit + 1;
        console.log("Critical hit!");
        break;
      case 3:
        //case 3: la nave ejecuta un golpe letal
        naveObjetivoPinned.puntosVida -= hit + 2;
        console.log("DEVASTATING hit!");
    }

    if (certezaAtaque != 1) {
      if (naveObjetivoPinned.puntosVida > 0) {
        console.log(
          naveObjetivoPinned.nombre +
            " has been attacked and now has " +
            naveObjetivoPinned.puntosVida +
            " life points\n"
        );
      }
      for (let index = 0; index < sectorEquipo.espacio1.length; index++) {
        p = document.getElementById("equipo1Vida"+sectorEquipo.espacio1[index].id);
        p.innerHTML = `<p id="equipo1Vida${sectorEquipo.espacio1[index].id}">Vida: ${sectorEquipo.espacio1[index].puntosVida}</p>`;        
      }

      for (let index = 0; index < sectorEquipo.espacio2.length; index++) {
        p = document.getElementById("equipo2Vida"+sectorEquipo.espacio2[index].id);
        p.innerHTML = `<p id="equipo2Vida${sectorEquipo.espacio2[index].id}">Vida: ${sectorEquipo.espacio2[index].puntosVida}</p>`;        
      }
      
    }
    // establecer cuando una nave muere, recorrer ambos arrays y borrar naves, mostrar imagen explosion
    this.deathCheck();
  }

  precisionCheck(naveAtacante) {
    let precisionDice = Math.random() * 100 - 5 + naveAtacante.precision;
    if (precisionDice <= 80) {
      return 0;
    } else if (precisionDice >= 81 && precisionDice <= 94) {
      return 1;
    } else if (precisionDice >= 95 && precisionDice <= 100) {
      return 2;
    } else if (precisionDice >= 101) {
      return 3;
    }
  }

  deathCheck() {
    for (let index = 0; index < sectorEquipo.espacio1.length; index++) {
      if (sectorEquipo.espacio1[index].puntosVida <= 0) {
        if( sectorEquipo.espacio1[index].id != undefined){
          let nave = document.getElementById("naveEjercito1"+sectorEquipo.espacio1[index].id);
          // const oldchild = document.getElementById("imgNave"+sectorEquipo.espacio1[index].id);
          nave.innerHTML = '<img src="img/explosion8.png" alt="explosion">';
          setTimeout(function(){
            while (nave.hasChildNodes()) {   
            nave.removeChild(nave.firstChild);
            }   
          }, 1000);
        }
        sectorEquipo.espacio1.splice(index, 1);
        if (sectorEquipo.espacio1[index] != undefined) {
          console.log(
            sectorEquipo.espacio1[index].nombre +
              " has lost all of its life points and it's been DEFEATED.\n"
          );
        }
      }

      for (let index = 0; index < sectorEquipo.espacio2.length; index++) {
        if (sectorEquipo.espacio2[index].puntosVida <= 0) {
          if( sectorEquipo.espacio2[index].id != undefined){
            let nave = document.getElementById("naveEjercito2"+sectorEquipo.espacio2[index].id);
            nave.innerHTML = '<img src="img/explosion8.png" alt="explosion">';
            setTimeout(function(){
              while (nave.hasChildNodes()) {   
              nave.removeChild(nave.firstChild);
              }   
            }, 1000);
          }
          sectorEquipo.espacio2.splice(index, 1);
          if (sectorEquipo.espacio2[index] != undefined) {
            console.log(
              sectorEquipo.espacio2[index].nombre +
                " has lost all of its life points and it's been DEFEATED.\n"
            );
          }
        }
      }
      //cambiar estado de la nave
    }
  }
  isEven(value) {
    // verificar si un número es par o impar
    if (value % 2 == 0) {
      return true;
    } else {
      return false;
    }
  }
}

class NaveI extends Nave {
  constructor() {
    super(
      10,
      5,
      "Vostok",
      8,
      "img/naveEjercito1re.png",
      "img/naveEjercito2re.png"
    );
  }
}

class NaveII extends Nave {
  constructor() {
    super(
      5,
      10,
      "Gemini 4",
      9,
      "img/naveEjercito1re.png",
      "img/naveEjercito2re.png"
    );
  }
}

class NaveIII extends Nave {
  constructor() {
    super(
      8,
      7,
      "Apollo XIII",
      6,
      "img/naveEjercito1re.png",
      "img/naveEjercito2re.png"
    );
  }
}

class Ejercito {
  constructor(nombre, estado) {
    this.nombre = nombre;
    this.listaNaves = [];
    this.estado = estado;
    this.derrotado = false;
  }
  agregarNaves(nave) {
    this.listaNaves.push(nave);
  }
}

class Generador {
  constructor() {}
  crearEjercito(nombre, cantidadClaseI, cantidadClaseII, cantidadClaseIII) {
    let equipo = new Ejercito(nombre);
    // verificar la existencia de la petición de naves de cada clase y llamar a un método que las cree en caso de que tal petición exista
    if (cantidadClaseI) {
      this.crearNaveI(cantidadClaseI, equipo);
    }
    if (cantidadClaseII) {
      this.crearNaveII(cantidadClaseII, equipo);
    }
    if (cantidadClaseIII) {
      this.crearNaveIII(cantidadClaseIII, equipo);
    }
    return equipo;
  }
  crearNaveI(cantidadClaseI, equipo) {
    for (let i = 0; i < cantidadClaseI; i++) {
      let nave = new NaveI();
      equipo.agregarNaves(nave);
    }
  }

  crearNaveII(cantidadClaseII, equipo) {
    for (let i = 0; i < cantidadClaseII; i++) {
      let nave = new NaveII();
      equipo.agregarNaves(nave);
    }
  }
  crearNaveIII(cantidadClaseIII, equipo) {
    for (let i = 0; i < cantidadClaseIII; i++) {
      let nave = new NaveIII();
      equipo.agregarNaves(nave);
    }
  }
}

class CampoDeBatalla {
  constructor(turno) {
    this.listaEquipos = [];
    this.sectores = [];
    this.turno = 1;
  }
  ejecutarTurno() {
    if (
      sectorEquipo.espacio1.length != 0 &&
      sectorEquipo.espacio2.length != 0
    ) {
      console.log("***TURNO " + this.turno + "***\n");
      let naveAtacante = null;
      if (this.isEven(this.turno)) {
        let diceAtaque = Math.floor(
          Math.random() * sectorEquipo.espacio1.length
        );
        naveAtacante = sectorEquipo.espacio1[diceAtaque];
        console.log(
          "The empire " + ejercito1.nombre + " is moving their troops.\n"
        );
      } else if (!this.isEven(this.turno)) {
        let diceAtaque = Math.floor(
          Math.random() * sectorEquipo.espacio2.length
        );
        naveAtacante = sectorEquipo.espacio2[diceAtaque];
        console.log(
          "The empire " + ejercito2.nombre + " is moving their troops.\n"
        );
      }
      console.log(naveAtacante.nombre + " is attacking.\n");
      naveAtacante.disparar(this.turno, naveAtacante);
      console.log(
        "The empire " +
          ejercito1.nombre +
          " has " +
          sectorEquipo.espacio1.length +
          " spaceship(s) left.\n"
      );
      console.log(
        "The empire " +
          ejercito2.nombre +
          " has " +
          sectorEquipo.espacio2.length +
          " spaceship(s) left.\n"
      );
      this.turno++;
    } else {
      if (sectorEquipo.espacio1.length == 0) {
        ejercito2.derrotado = true;
        let v =
          "THE EMPIRE " +
          ejercito2.nombre.toUpperCase() +
          " WON AND THUS BECAME THE RULER OF THE GALAXY.";
        document.getElementById("victoria").innerHTML = v;
      } else {
        ejercito1.derrotado = true;
        let v =
          "THE EMPIRE " +
          ejercito1.nombre.toUpperCase() +
          " WON AND THUS BECAME THE RULER OF THE GALAXY.";

        document.getElementById("victoria").innerHTML = v;
      }
    }
  }

  isEven(value) {
    //verificar si el número es par o impar
    if (value % 2 == 0) {
      return true;
    } else {
      return false;
    }
  }

  distribuirEjercito(equipo) {
    this.listaEquipos.push(equipo);
    this.sectores.push(sectorEquipo);
    if (this.listaEquipos.length == 1) {
      for (let index = 0; index < equipo.listaNaves.length; index++) {
        sectorEquipo.espacio1[index] = equipo.listaNaves[index];
        sectorEquipo.espacio1[index].id = index;
        console.log(sectorEquipo.espacio1[index].id);
        // poner naves en el html
      }
      let ul = document.createElement("ul");
      ul.setAttribute("class", "ejercito1");
      let naves = sectorEquipo.espacio1;
      document.getElementById("renderNaveList").appendChild(ul);
      let index = 0;
      naves.forEach(nave => {
        const li = document.createElement("li");
        const p = document.createElement("p");
        p.id = "equipo1Vida"+index;
        const t = document.createTextNode("Vida: "+nave.puntosVida)
        p.appendChild(t);
        li.setAttribute("id", "naveEjercito1" + index);
        ul.appendChild(li);
        li.appendChild(p);
        li.innerHTML =
          li.innerHTML +
          '<img id="imgNave' + index+'" src="' +
          nave.side1image +
          '" alt="nave ejercito1">';
        index++;
      });
    } else {
      for (let index = 0; index < equipo.listaNaves.length; index++) {
        sectorEquipo.espacio2[index] = equipo.listaNaves[index];
        sectorEquipo.espacio2[index].id = index;
        // poner naves en el html
      }
      let ul = document.createElement("ul");
      ul.setAttribute("class", "ejercito2");
      let naves = sectorEquipo.espacio1;
      document.getElementById("renderNaveList").appendChild(ul);
      let index = 0;
      naves.forEach(nave => {
        const li = document.createElement("li");
        const p = document.createElement("p");
        p.id = "equipo2Vida"+index;
        const t = document.createTextNode("Vida: "+nave.puntosVida)
        p.appendChild(t);
        li.setAttribute("id", "naveEjercito2" + index);
        ul.appendChild(li);
        li.appendChild(p);
        li.innerHTML =
          li.innerHTML +
          '<img id="imgNave" src="' +
          nave.side2image +
          '" alt="nave ejercito1">';
        index++;
      });
    }
  }
}

class Sector {
  constructor() {
    this.espacio1 = [];
    this.espacio2 = [];
  }
}

let generador = new Generador();
let ejercito1name = prompt("Write the first empire name: ");
let ejercito2name = prompt("Write the second empire name: ");
let ejercito1 = generador.crearEjercito(ejercito1name, 3, 5, 7);
let ejercito2 = generador.crearEjercito(ejercito2name, 3, 5, 7);
let campo = new CampoDeBatalla();
let sectorEquipo = new Sector();
campo.distribuirEjercito(ejercito1);
campo.distribuirEjercito(ejercito2);
//campo.ejecutarTurno();

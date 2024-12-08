/**
 * obtenerMedicos()
 * Carga data de los médicos que vienen de medicos.json
 */
function obtenerMedicos() {
    console.log("[reservas][obtenerMedicos]-- Cargando los datos de los médicos...");

    // ES6 fetch para importar
    fetch('./src/js/medicos.json')
        .then(response => {
            //debugger;
            if (!response.ok) {
                throw new Error(`[reservas][obtenerMedicos]--Error al cargar el archivo JSON: ${response.statusText}`);
            }
            return response.json();
        })
        .then(doctores => {
            console.log("[reservas][obtenerMedicos]--Datos de médicos cargados exitosamente:", doctores);
            mostrarMedicos(doctores);
        })
        .catch(error => {
            //debugger;
            console.error("[reservas][obtenerMedicos]--Error al cargar los doctores:", error);
        });
}

function mostrarMedicos(doctores) {
    const listaDoctores = document.getElementById("listaDoctores");
    listaDoctores.innerHTML = ''; //Limpia

    //recorrer y mostrar == GETALL
    doctores.forEach((
        { nombre, anoEgreso, comuna, especialidad, disponibilidad, jornadaLaboral, contacto, anoEspecialidad }
    ) => {
        const li = document.createElement("li");
        li.classList.add( "col-6", "col-md-4", "col-lg-3", "d-flex", "flex-column", "align-items-start", "mb-4");
        li.innerHTML = `
        <div class="card card-doctor-list d-flex justify-content-start" style="width: 40rem;">
            <img src="src/img/home-welcome.jpg" class="card-img-top card-doctor-list-img" alt="...">
                <div class="card-body">
                <h5 class="card-title text-start">${nombre}</h5>
                <p class="text-start"><b>Año de especialidad:</b> ${especialidad}</p>
                <p class="text-start"><b>Comuna de atención:</b> ${comuna}</p>
                <p class="text-start"><b>Disponibilidad:</b> ${disponibilidad}</p>
                <p class="text-start"><b>Jornada Laboral:</b> ${jornadaLaboral}</p>
                <button id="btnReservar" class="btn btn-primary w-100" onclick="solicitarDatosUsuario()">Reservar
                    Cita</button>
            </div>
        </div>
        `;
        listaDoctores.appendChild(li);
    });

}






/**
 * 
 * @param {*} nombre 
 * @param {*} email 
 * @param {*} telefono 
 * @returns bool
 */
function validarDatosUsuario(nombre, email, telefono) {
    //debugger;
    if (!nombre || !email || !telefono) {
        alert(`Ingrese datos`);
        return false;
    }

    if (typeof email === 'string' && email.includes('@')) {
        console.log(`[reservas][validarDatosUsuario]-- Email ${email} válido`);
    } else {
        alert(`Email ${email} inválido`);
        return false;
    }

    if (typeof telefono === 'string' && telefono.length <= 10) {
        console.log(`[reservas][validarDatosUsuario]-- Telefono ${telefono} válido`);
    } else {
        alert(`Telefono ${telefono} inválido`);
        return false;
    }

    return true;
}

/**
 * solicitarDatosUsuario()
 * sinparams
 * 
 */
function solicitarDatosUsuario() {
    try {
        let nombre = prompt("¿Cuál es tu nombre?");
        let email = prompt("¿Cuál es tu email?");
        let telefono = prompt("¿Cuál es tu teléfono?");
        let medico = prompt("¿Con qué médico deseas agendar tu cita?");  // Nuevo prompt para el nombre del médico

        if (validarDatosUsuario(nombre, email, telefono)) {
            console.log(`[reservas][solicitarDatosUsuario]-- Nueva reserva: ${nombre}, ${email}, ${telefono}, Médico: ${medico}`);
        } else {
            throw new Error("Los datos ingresados no son válidos.");
        }
    } catch (error) {

        console.error("[reservas][solicitarDatosUsuario][error]", error.message);

        alert("Ocurrió un error al procesar los datos. Por favor, intenta de nuevo.");
    } finally {
        console.log("[reservas][solicitarDatosUsuario]-- Proceso de solicitud de datos finalizado.");
    }
}


/**
 * manejarErrores() sin uso
 */

function manejarErrores() {
    try {
        console.log(noExistenteVariable); // Esto generará un error
    } catch (error) {
        console.error("Error detectado:", error);
    }
}


document.addEventListener('DOMContentLoaded', () => {
    obtenerMedicos();
    const btnReservar = document.getElementById('btnReservar');
    if (btnReservar) {
        btnReservar.addEventListener('click', solicitarDatosUsuario);
    }
});

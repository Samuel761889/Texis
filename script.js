/* =========================
   INICIAR TEXIS
   ========================= */

function comenzar() {
    document.querySelector(".container").innerHTML = `
        <h1 class="logo">TEXIS</h1>

        <p class="subtitle">
            ¡Hola! Soy Texis.<br>
            Elige tu etapa para personalizar tu experiencia.
        </p>

        <div class="stage-container">

            <button class="stage-button" onclick="seleccionarEtapa('Teen')">
                <strong>Texis Teen</strong>
                <span>Secundaria</span>
            </button>

            <button class="stage-button" onclick="seleccionarEtapa('Student')">
                <strong>Texis Student</strong>
                <span>Universidad</span>
            </button>

            <button class="stage-button" onclick="seleccionarEtapa('Adult')">
                <strong>Texis</strong>
                <span>Organización personal</span>
            </button>

        </div>
    `;
}


/* =========================
   ETAPA
   ========================= */

function seleccionarEtapa(etapa) {
    localStorage.setItem("texisEtapa", etapa);
    mostrarDashboard();
}


/* =========================
   DASHBOARD
   ========================= */

function mostrarDashboard() {

    const etapa = localStorage.getItem("texisEtapa") || "Teen";

    document.querySelector(".container").innerHTML = `

        <div class="dashboard">

            <aside class="sidebar">

                <div class="sidebar-logo">
                    TEXIS
                </div>

                <button class="menu-button active" onclick="mostrarSeccion('inicio')">
                    Inicio
                </button>

                <button class="menu-button" onclick="mostrarSeccion('chat')">
                    Chat
                </button>

                <button class="menu-button" onclick="mostrarSeccion('tareas')">
                    Tareas
                </button>

                <button class="menu-button" onclick="mostrarSeccion('horario')">
                    Horario
                </button>

                <button class="menu-button" onclick="mostrarSeccion('metas')">
                    Metas
                </button>

            </aside>

            <main class="main-content">

                <header class="topbar">

                    <div>
                        <h2 id="page-title">
                            Hola, soy Texis.
                        </h2>

                        <p id="page-description">
                            Tu asistente personal está listo para ayudarte.
                        </p>
                    </div>

                    <div class="profile">
                        Texis ${etapa}
                    </div>

                </header>

                <div id="content">
                    ${contenidoInicio()}
                </div>

            </main>

        </div>
    `;
}


/* =========================
   SECCIONES
   ========================= */

function mostrarSeccion(seccion) {

    const content = document.getElementById("content");
    const title = document.getElementById("page-title");
    const description = document.getElementById("page-description");

    if (seccion === "inicio") {

        title.textContent = "Hola, soy Texis.";
        description.textContent = "Tu asistente personal está listo para ayudarte.";
        content.innerHTML = contenidoInicio();

    } else if (seccion === "chat") {

        title.textContent = "Chat";
        description.textContent = "Habla con Texis.";
        content.innerHTML = contenidoChat();

    } else if (seccion === "tareas") {

        title.textContent = "Tareas";
        description.textContent = "Organiza todo lo que tienes pendiente.";
        content.innerHTML = contenidoTareas();

    } else if (seccion === "horario") {

        title.textContent = "Horario";
        description.textContent = "Organiza tus actividades durante la semana.";
        content.innerHTML = contenidoHorario();

    } else if (seccion === "metas") {

        title.textContent = "Metas";
        description.textContent = "Convierte tus objetivos en pasos.";
        content.innerHTML = contenidoMetas();
    }

    actualizarMenu(seccion);
}


function actualizarMenu(seccion) {

    const botones = document.querySelectorAll(".menu-button");

    botones.forEach(button => {

        button.classList.remove("active");

        if (
            button.textContent.trim().toLowerCase() === seccion
        ) {
            button.classList.add("active");
        }
    });
}


/* =========================
   INICIO
   ========================= */

function contenidoInicio() {

    const tareas = obtenerTareas();
    const metas = obtenerMetas();
    const actividades = obtenerHorario();

    const pendientes = tareas.filter(t => !t.completada).length;
    const completadas = tareas.filter(t => t.completada).length;

    return `

        <section class="welcome-card">

            <h1>
                ¿En qué te ayudo hoy?
            </h1>

            <p>
                Organiza tu día, aprende algo nuevo,
                trabaja en tus metas o simplemente habla conmigo.
            </p>

            <div class="chat-preview">

                <input
                    type="text"
                    placeholder="Pregúntale algo a Texis..."
                >

                <button onclick="mostrarSeccion('chat')">
                    Enviar
                </button>

            </div>

        </section>

        <section class="dashboard-cards">

            <div class="info-card">
                <span class="card-number">${pendientes}</span>
                <span class="card-title">Tareas pendientes</span>
            </div>

            <div class="info-card">
                <span class="card-number">${actividades.length}</span>
                <span class="card-title">Actividades en horario</span>
            </div>

            <div class="info-card">
                <span class="card-number">${metas.length}</span>
                <span class="card-title">Metas activas</span>
            </div>

        </section>

    `;
}


/* =========================
   CHAT
   ========================= */

/* =========================
   CHAT DE TEXIS
   ========================= */

function contenidoChat() {

    return `
        <h1 class="section-title">
            Habla con Texis
        </h1>

        <p class="section-description">
            Habla conmigo y recibe respuestas directamente desde Texis.
        </p>

        <section class="welcome-card">

            <h1>
                Hola, soy Texis. 👋
            </h1>

            <div
                id="chat-messages"
                class="chat-messages"
            >

                <div class="chat-message texis-message">
                    Hola 👋 Soy Texis. ¿En qué puedo ayudarte?
                </div>

            </div>

            <div class="chat-preview">

                <input
                    id="texis-chat-input"
                    type="text"
                    placeholder="Escribe un mensaje..."
                    onkeydown="
                        if (event.key === 'Enter') {
                            enviarMensajeTexis();
                        }
                    "
                >

                <button
                    id="texis-send-button"
                    onclick="enviarMensajeTexis()"
                >
                    Enviar
                </button>

            </div>

        </section>
    `;
}


/* =========================
   ENVIAR MENSAJE A TEXIS
   ========================= */

async function enviarMensajeTexis() {

    const input =
        document.getElementById("texis-chat-input");

    const mensajes =
        document.getElementById("chat-messages");

    const boton =
        document.getElementById("texis-send-button");

    if (!input || !mensajes || !boton) {
        return;
    }

    const mensaje =
        input.value.trim();

    if (!mensaje) {
        return;
    }


    /* =========================
       MENSAJE DEL USUARIO
       ========================= */

    mensajes.innerHTML += `
        <div class="chat-message user-message">
            ${escaparHTML(mensaje)}
        </div>
    `;


    input.value = "";

    boton.disabled = true;
    boton.textContent = "Enviando...";


    /* =========================
       TEXIS PENSANDO
       ========================= */

    mensajes.innerHTML += `
        <div
            id="texis-loading"
            class="chat-message texis-message"
        >
            Texis está pensando... 🧠
        </div>
    `;

    mensajes.scrollTop =
        mensajes.scrollHeight;


    try {

        const respuesta = await fetch(
            "https://zrntlqntsufxsgxfosbf.supabase.co/functions/v1/texis-chat",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    mensaje: mensaje
                })
            }
        );


        const datos =
            await respuesta.json();


        const loading =
            document.getElementById("texis-loading");


        if (loading) {
            loading.remove();
        }


        if (!respuesta.ok) {

            throw new Error(
                datos.error ||
                "No se pudo obtener una respuesta."
            );

        }


        mensajes.innerHTML += `
            <div class="chat-message texis-message">
                ${escaparHTML(datos.respuesta)}
            </div>
        `;


        mensajes.scrollTop =
            mensajes.scrollHeight;


    } catch (error) {

        const loading =
            document.getElementById("texis-loading");


        if (loading) {
            loading.remove();
        }


        mensajes.innerHTML += `
            <div class="chat-message texis-message">
                ❌ No pude conectarme con Texis.
            </div>
        `;


        console.error(
            "Error de Texis:",
            error
        );

    } finally {

        boton.disabled = false;
        boton.textContent = "Enviar";

        input.focus();

    }
}


/* ==================================================
   TAREAS
   ================================================== */

function contenidoTareas(filtro = "todas") {

    const tareas = obtenerTareas();

    let filtradas = tareas;

    if (filtro === "pendientes") {
        filtradas = tareas.filter(t => !t.completada);
    }

    if (filtro === "completadas") {
        filtradas = tareas.filter(t => t.completada);
    }

    let lista = "";

    if (filtradas.length === 0) {

        lista = `
            <div class="no-content">
                No hay tareas aquí.
            </div>
        `;

    } else {

        filtradas.forEach(tarea => {

            const indice = tareas.indexOf(tarea);

            lista += crearHTMLTarea(tarea, indice);

        });
    }

    return `

        <div class="task-header">

            <div>
                <h1 class="section-title">
                    Mis tareas
                </h1>

                <p class="section-description">
                    Organiza todo lo que tienes pendiente.
                </p>
            </div>

            <button
                class="new-task-button"
                onclick="mostrarFormularioTarea()"
            >
                + Nueva tarea
            </button>

        </div>

        <div class="task-filters">

            <button
                class="filter-button ${filtro === "todas" ? "active" : ""}"
                onclick="mostrarSeccionConFiltro('todas')"
            >
                Todas
            </button>

            <button
                class="filter-button ${filtro === "pendientes" ? "active" : ""}"
                onclick="mostrarSeccionConFiltro('pendientes')"
            >
                Pendientes
            </button>

            <button
                class="filter-button ${filtro === "completadas" ? "active" : ""}"
                onclick="mostrarSeccionConFiltro('completadas')"
            >
                Completadas
            </button>

        </div>

        <div class="task-list">
            ${lista}
        </div>
    `;
}


function crearHTMLTarea(tarea, indice) {

    const estado = obtenerEstadoTarea(tarea);

    let clase = "status-normal";

    if (tarea.completada) {
        clase = "status-completed";
    } else if (estado === "Vencida") {
        clase = "status-overdue";
    } else if (estado === "Próxima") {
        clase = "status-soon";
    }

    return `

        <div class="task ${tarea.completada ? "completed" : ""}">

            <input
                type="checkbox"
                class="task-checkbox"
                ${tarea.completada ? "checked" : ""}
                onchange="cambiarEstadoTarea(${indice})"
            >

            <div class="task-content">

                <h3>${escaparHTML(tarea.nombre)}</h3>

                <p>${escaparHTML(tarea.materia)}</p>

                <span class="task-date">
                    Entrega: ${formatearFecha(tarea.fecha)}
                </span>

                <br>

                <span class="task-status ${clase}">
                    ${tarea.completada ? "Completada" : estado}
                </span>

            </div>

            <div class="task-actions">

                <button
                    class="edit-task"
                    onclick="editarTarea(${indice})"
                >
                    Editar
                </button>

                <button
                    class="delete-task"
                    onclick="eliminarTarea(${indice})"
                >
                    Eliminar
                </button>

            </div>

        </div>
    `;
}


function mostrarSeccionConFiltro(filtro) {
    document.getElementById("content").innerHTML =
        contenidoTareas(filtro);
}


function mostrarFormularioTarea() {

    document.getElementById("content").innerHTML = `

        <h1 class="section-title">
            Nueva tarea
        </h1>

        <p class="section-description">
            Agrega una tarea para comenzar a organizarte.
        </p>

        <form
            class="task-form"
            onsubmit="guardarTarea(event)"
        >

            <div class="form-group">
                <label>Nombre de la tarea</label>

                <input
                    id="task-name"
                    type="text"
                    placeholder="Ej. Resolver ejercicios"
                    required
                >
            </div>

            <div class="form-group">
                <label>Materia</label>

                <input
                    id="task-subject"
                    type="text"
                    placeholder="Ej. Matemáticas"
                    required
                >
            </div>

            <div class="form-group">
                <label>Fecha de entrega</label>

                <input
                    id="task-date"
                    type="date"
                    required
                >
            </div>

            <div class="form-buttons">

                <button type="submit" class="save-button">
                    Guardar tarea
                </button>

                <button
                    type="button"
                    class="cancel-button"
                    onclick="mostrarSeccion('tareas')"
                >
                    Cancelar
                </button>

            </div>

        </form>
    `;
}


function guardarTarea(event) {

    event.preventDefault();

    const tareas = obtenerTareas();

    tareas.push({

        nombre: document.getElementById("task-name").value.trim(),

        materia: document.getElementById("task-subject").value.trim(),

        fecha: document.getElementById("task-date").value,

        completada: false

    });

    localStorage.setItem(
        "texisTareas",
        JSON.stringify(tareas)
    );

    mostrarSeccion("tareas");
}


function obtenerTareas() {

    const guardadas =
        localStorage.getItem("texisTareas");

    if (!guardadas) return [];

    try {
        return JSON.parse(guardadas);
    } catch {
        return [];
    }
}


function cambiarEstadoTarea(indice) {

    const tareas = obtenerTareas();

    tareas[indice].completada =
        !tareas[indice].completada;

    localStorage.setItem(
        "texisTareas",
        JSON.stringify(tareas)
    );

    mostrarSeccion("tareas");
}


function eliminarTarea(indice) {

    if (!confirm("¿Quieres eliminar esta tarea?")) {
        return;
    }

    const tareas = obtenerTareas();

    tareas.splice(indice, 1);

    localStorage.setItem(
        "texisTareas",
        JSON.stringify(tareas)
    );

    mostrarSeccion("tareas");
}


function editarTarea(indice) {

    const tareas = obtenerTareas();
    const tarea = tareas[indice];

    document.getElementById("content").innerHTML = `

        <h1 class="section-title">
            Editar tarea
        </h1>

        <p class="section-description">
            Modifica la información de tu tarea.
        </p>

        <form
            class="task-form"
            onsubmit="actualizarTarea(event, ${indice})"
        >

            <div class="form-group">

                <label>Nombre de la tarea</label>

                <input
                    id="task-name"
                    type="text"
                    value="${escaparHTML(tarea.nombre)}"
                    required
                >

            </div>

            <div class="form-group">

                <label>Materia</label>

                <input
                    id="task-subject"
                    type="text"
                    value="${escaparHTML(tarea.materia)}"
                    required
                >

            </div>

            <div class="form-group">

                <label>Fecha de entrega</label>

                <input
                    id="task-date"
                    type="date"
                    value="${tarea.fecha}"
                    required
                >

            </div>

            <div class="form-buttons">

                <button type="submit" class="save-button">
                    Guardar cambios
                </button>

                <button
                    type="button"
                    class="cancel-button"
                    onclick="mostrarSeccion('tareas')"
                >
                    Cancelar
                </button>

            </div>

        </form>
    `;
}


function actualizarTarea(event, indice) {

    event.preventDefault();

    const tareas = obtenerTareas();

    tareas[indice].nombre =
        document.getElementById("task-name").value.trim();

    tareas[indice].materia =
        document.getElementById("task-subject").value.trim();

    tareas[indice].fecha =
        document.getElementById("task-date").value;

    localStorage.setItem(
        "texisTareas",
        JSON.stringify(tareas)
    );

    mostrarSeccion("tareas");
}


function obtenerEstadoTarea(tarea) {

    const hoy = new Date();

    hoy.setHours(0, 0, 0, 0);

    const fecha =
        new Date(tarea.fecha + "T00:00:00");

    const dias =
        Math.ceil(
            (fecha - hoy) /
            (1000 * 60 * 60 * 24)
        );

    if (dias < 0) return "Vencida";

    if (dias <= 2) return "Próxima";

    return "Pendiente";
}


function formatearFecha(fecha) {

    const partes = fecha.split("-");

    if (partes.length !== 3) return fecha;

    const fechaFormateada =
        new Date(
            partes[0],
            parseInt(partes[1]) - 1,
            partes[2]
        );

    return fechaFormateada.toLocaleDateString(
        "es-CO",
        {
            day: "numeric",
            month: "long",
            year: "numeric"
        }
    );
}


/* ==================================================
   HORARIO
   ================================================== */

const diasSemana = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo"
];


function contenidoHorario() {

    const actividades = obtenerHorario();

    return `

        <div class="task-header">

            <div>

                <h1 class="section-title">
                    Mi horario
                </h1>

                <p class="section-description">
                    Organiza tus clases, estudio, descanso y tiempo libre.
                </p>

            </div>

            <button
                class="new-task-button"
                onclick="mostrarFormularioHorario()"
            >
                + Nueva actividad
            </button>

        </div>

        <div class="schedule-container">

            ${diasSemana.map(dia => {

                const actividadesDia =
                    actividades
                        .filter(a => a.dia === dia)
                        .sort((a, b) =>
                            a.inicio.localeCompare(b.inicio)
                        );

                let contenido = "";

                if (actividadesDia.length === 0) {

                    contenido = `
                        <div class="empty-schedule">
                            No tienes actividades programadas.
                        </div>
                    `;

                } else {

                    actividadesDia.forEach(actividad => {

                        const indice =
                            actividades.indexOf(actividad);

                        contenido += `

                            <div class="schedule-item">

                                <div class="schedule-time">
                                    ${actividad.inicio} - ${actividad.fin}
                                </div>

                                <div class="schedule-info">

                                    <strong>
                                        ${escaparHTML(actividad.nombre)}
                                    </strong>

                                    <span>
                                        ${escaparHTML(actividad.detalle || "")}
                                    </span>

                                </div>

                                <div class="schedule-type">
                                    ${escaparHTML(actividad.tipo)}
                                </div>

                                <div class="schedule-actions">

                                    <button
                                        class="edit-task"
                                        onclick="editarActividad(${indice})"
                                    >
                                        Editar
                                    </button>

                                    <button
                                        class="delete-task"
                                        onclick="eliminarActividad(${indice})"
                                    >
                                        Eliminar
                                    </button>

                                </div>

                            </div>
                        `;
                    });
                }

                return `

                    <div class="schedule-day">

                        <div class="schedule-day-header">
                            <h3>${dia}</h3>
                        </div>

                        <div class="schedule-activities">
                            ${contenido}
                        </div>

                    </div>
                `;

            }).join("")}

        </div>
    `;
}


function mostrarFormularioHorario() {

    document.getElementById("content").innerHTML = `

        <h1 class="section-title">
            Nueva actividad
        </h1>

        <p class="section-description">
            Agrega una actividad a tu horario.
        </p>

        <form
            class="task-form"
            onsubmit="guardarActividad(event)"
        >

            <div class="form-group">

                <label>Nombre</label>

                <input
                    id="schedule-name"
                    type="text"
                    placeholder="Ej. Clase de Matemáticas"
                    required
                >

            </div>

            <div class="form-group">

                <label>Día</label>

                <select id="schedule-day" required>

                    ${diasSemana.map(dia => `
                        <option value="${dia}">
                            ${dia}
                        </option>
                    `).join("")}

                </select>

            </div>

            <div class="form-group">

                <label>Hora de inicio</label>

                <input
                    id="schedule-start"
                    type="time"
                    required
                >

            </div>

            <div class="form-group">

                <label>Hora de finalización</label>

                <input
                    id="schedule-end"
                    type="time"
                    required
                >

            </div>

            <div class="form-group">

                <label>Tipo de actividad</label>

                <select id="schedule-type" required>

                    <option value="Clase">Clase</option>
                    <option value="Estudio">Estudio</option>
                    <option value="Tarea">Tarea</option>
                    <option value="Descanso">Descanso</option>
                    <option value="Tiempo libre">Tiempo libre</option>
                    <option value="Videojuegos">Videojuegos</option>
                    <option value="Otra">Otra</option>

                </select>

            </div>

            <div class="form-group">

                <label>Detalle</label>

                <input
                    id="schedule-detail"
                    type="text"
                    placeholder="Ej. Salón 204"
                >

            </div>

            <div class="form-buttons">

                <button type="submit" class="save-button">
                    Guardar actividad
                </button>

                <button
                    type="button"
                    class="cancel-button"
                    onclick="mostrarSeccion('horario')"
                >
                    Cancelar
                </button>

            </div>

        </form>
    `;
}


function guardarActividad(event) {

    event.preventDefault();

    const inicio =
        document.getElementById("schedule-start").value;

    const fin =
        document.getElementById("schedule-end").value;

    if (inicio >= fin) {

        alert(
            "La hora de finalización debe ser después de la hora de inicio."
        );

        return;
    }

    const actividades = obtenerHorario();

    actividades.push({

        nombre:
            document.getElementById("schedule-name").value.trim(),

        dia:
            document.getElementById("schedule-day").value,

        inicio,

        fin,

        tipo:
            document.getElementById("schedule-type").value,

        detalle:
            document.getElementById("schedule-detail").value.trim()

    });

    localStorage.setItem(
        "texisHorario",
        JSON.stringify(actividades)
    );

    mostrarSeccion("horario");
}


function obtenerHorario() {

    const guardado =
        localStorage.getItem("texisHorario");

    if (!guardado) return [];

    try {
        return JSON.parse(guardado);
    } catch {
        return [];
    }
}


function editarActividad(indice) {

    const actividades = obtenerHorario();
    const actividad = actividades[indice];

    document.getElementById("content").innerHTML = `

        <h1 class="section-title">
            Editar actividad
        </h1>

        <p class="section-description">
            Modifica tu actividad.
        </p>

        <form
            class="task-form"
            onsubmit="actualizarActividad(event, ${indice})"
        >

            <div class="form-group">

                <label>Nombre</label>

                <input
                    id="schedule-name"
                    type="text"
                    value="${escaparHTML(actividad.nombre)}"
                    required
                >

            </div>

            <div class="form-group">

                <label>Día</label>

                <select id="schedule-day" required>

                    ${diasSemana.map(dia => `

                        <option
                            value="${dia}"
                            ${actividad.dia === dia ? "selected" : ""}
                        >
                            ${dia}
                        </option>

                    `).join("")}

                </select>

            </div>

            <div class="form-group">

                <label>Hora de inicio</label>

                <input
                    id="schedule-start"
                    type="time"
                    value="${actividad.inicio}"
                    required
                >

            </div>

            <div class="form-group">

                <label>Hora de finalización</label>

                <input
                    id="schedule-end"
                    type="time"
                    value="${actividad.fin}"
                    required
                >

            </div>

            <div class="form-group">

                <label>Tipo</label>

                <select id="schedule-type" required>

                    ${[
                        "Clase",
                        "Estudio",
                        "Tarea",
                        "Descanso",
                        "Tiempo libre",
                        "Videojuegos",
                        "Otra"
                    ].map(tipo => `

                        <option
                            value="${tipo}"
                            ${actividad.tipo === tipo ? "selected" : ""}
                        >
                            ${tipo}
                        </option>

                    `).join("")}

                </select>

            </div>

            <div class="form-group">

                <label>Detalle</label>

                <input
                    id="schedule-detail"
                    type="text"
                    value="${escaparHTML(actividad.detalle || "")}"
                >

            </div>

            <div class="form-buttons">

                <button type="submit" class="save-button">
                    Guardar cambios
                </button>

                <button
                    type="button"
                    class="cancel-button"
                    onclick="mostrarSeccion('horario')"
                >
                    Cancelar
                </button>

            </div>

        </form>
    `;
}


function actualizarActividad(event, indice) {

    event.preventDefault();

    const inicio =
        document.getElementById("schedule-start").value;

    const fin =
        document.getElementById("schedule-end").value;

    if (inicio >= fin) {

        alert(
            "La hora de finalización debe ser después de la hora de inicio."
        );

        return;
    }

    const actividades = obtenerHorario();

    actividades[indice] = {

        nombre:
            document.getElementById("schedule-name").value.trim(),

        dia:
            document.getElementById("schedule-day").value,

        inicio,

        fin,

        tipo:
            document.getElementById("schedule-type").value,

        detalle:
            document.getElementById("schedule-detail").value.trim()

    };

    localStorage.setItem(
        "texisHorario",
        JSON.stringify(actividades)
    );

    mostrarSeccion("horario");
}


function eliminarActividad(indice) {

    if (!confirm("¿Quieres eliminar esta actividad?")) {
        return;
    }

    const actividades = obtenerHorario();

    actividades.splice(indice, 1);

    localStorage.setItem(
        "texisHorario",
        JSON.stringify(actividades)
    );

    mostrarSeccion("horario");
}


/* ==================================================
   METAS
   ================================================== */

function contenidoMetas() {

    const metas = obtenerMetas();

    let contenido = "";

    if (metas.length === 0) {

        contenido = `

            <div class="no-content">

                <h3>
                    Todavía no tienes metas
                </h3>

                <p style="margin-top: 10px;">
                    Crea tu primera meta y divídela en pequeños pasos.
                </p>

            </div>

        `;

    } else {

        contenido = `

            <div class="goals-list">

                ${metas.map((meta, indice) =>
                    crearHTMLMeta(meta, indice)
                ).join("")}

            </div>

        `;
    }

    return `

        <div class="task-header">

            <div>

                <h1 class="section-title">
                    Mis metas
                </h1>

                <p class="section-description">
                    Convierte tus objetivos en pequeños pasos.
                </p>

            </div>

            <button
                class="new-task-button"
                onclick="mostrarFormularioMeta()"
            >
                + Nueva meta
            </button>

        </div>

        ${contenido}
    `;
}


/* =========================
   CREAR META
   ========================= */

function mostrarFormularioMeta() {

    document.getElementById("content").innerHTML = `

        <h1 class="section-title">
            Nueva meta
        </h1>

        <p class="section-description">
            Define qué quieres conseguir y los pasos para lograrlo.
        </p>

        <form
            class="task-form"
            onsubmit="guardarMeta(event)"
        >

            <div class="form-group">

                <label>
                    Nombre de la meta
                </label>

                <input
                    id="goal-name"
                    type="text"
                    placeholder="Ej. Mejorar en matemáticas"
                    required
                >

            </div>

            <div class="form-group">

                <label>
                    Descripción
                </label>

                <textarea
                    id="goal-description"
                    placeholder="Describe brevemente tu objetivo..."
                ></textarea>

            </div>

            <div class="form-group">

                <label>
                    Primer paso
                </label>

                <input
                    id="goal-step-1"
                    type="text"
                    placeholder="Ej. Repasar fórmulas"
                    required
                >

            </div>

            <div class="form-group">

                <label>
                    Segundo paso
                </label>

                <input
                    id="goal-step-2"
                    type="text"
                    placeholder="Ej. Resolver ejercicios"
                >

            </div>

            <div class="form-group">

                <label>
                    Tercer paso
                </label>

                <input
                    id="goal-step-3"
                    type="text"
                    placeholder="Ej. Hacer un simulacro"
                >

            </div>

            <div class="form-group">

                <label>
                    Cuarto paso
                </label>

                <input
                    id="goal-step-4"
                    type="text"
                    placeholder="Ej. Revisar errores"
                >

            </div>

            <div class="form-buttons">

                <button
                    type="submit"
                    class="save-button"
                >
                    Crear meta
                </button>

                <button
                    type="button"
                    class="cancel-button"
                    onclick="mostrarSeccion('metas')"
                >
                    Cancelar
                </button>

            </div>

        </form>
    `;
}


function guardarMeta(event) {

    event.preventDefault();

    const pasos = [];

    for (let i = 1; i <= 4; i++) {

        const input =
            document.getElementById(`goal-step-${i}`);

        if (input && input.value.trim() !== "") {

            pasos.push({

                texto: input.value.trim(),

                completado: false

            });
        }
    }

    if (pasos.length === 0) {

        alert("Agrega al menos un paso.");

        return;
    }

    const metas = obtenerMetas();

    metas.push({

        nombre:
            document.getElementById("goal-name")
                .value.trim(),

        descripcion:
            document.getElementById("goal-description")
                .value.trim(),

        pasos

    });

    localStorage.setItem(
        "texisMetas",
        JSON.stringify(metas)
    );

    mostrarSeccion("metas");
}


/* =========================
   MOSTRAR META
   ========================= */

function crearHTMLMeta(meta, indice) {

    const total = meta.pasos.length;

    const completados =
        meta.pasos.filter(
            paso => paso.completado
        ).length;

    const porcentaje =
        total === 0
            ? 0
            : Math.round(
                (completados / total) * 100
            );

    return `

        <div class="goal-card">

            <div class="goal-header">

                <div>

                    <h3>
                        ${escaparHTML(meta.nombre)}
                    </h3>

                    <p class="goal-description">
                        ${escaparHTML(
                            meta.descripcion || "Sin descripción."
                        )}
                    </p>

                </div>

                <div class="goal-percentage">
                    ${porcentaje}%
                </div>

            </div>


            <div class="progress-container">

                <div class="progress-info">

                    <span>
                        Progreso
                    </span>

                    <span>
                        ${completados}/${total} pasos
                    </span>

                </div>

                <div class="progress">

                    <div
                        class="progress-bar"
                        style="width: ${porcentaje}%"
                    ></div>

                </div>

            </div>


            <div class="goal-steps">

                ${meta.pasos.map((paso, pasoIndice) => `

                    <label
                        class="goal-step ${paso.completado ? "completed" : ""}"
                    >

                        <input
                            type="checkbox"
                            ${paso.completado ? "checked" : ""}
                            onchange="cambiarPasoMeta(${indice}, ${pasoIndice})"
                        >

                        <span>
                            ${escaparHTML(paso.texto)}
                        </span>

                    </label>

                `).join("")}

            </div>


            <div class="goal-actions">

                <button
                    class="delete-task"
                    onclick="eliminarMeta(${indice})"
                >
                    Eliminar meta
                </button>

            </div>

        </div>
    `;
}


/* =========================
   OBTENER METAS
   ========================= */

function obtenerMetas() {

    const guardadas =
        localStorage.getItem("texisMetas");

    if (!guardadas) return [];

    try {
        return JSON.parse(guardadas);
    } catch {
        return [];
    }
}


/* =========================
   COMPLETAR PASO
   ========================= */

function cambiarPasoMeta(metaIndice, pasoIndice) {

    const metas = obtenerMetas();

    metas[metaIndice]
        .pasos[pasoIndice]
        .completado =
        !metas[metaIndice]
            .pasos[pasoIndice]
            .completado;

    localStorage.setItem(
        "texisMetas",
        JSON.stringify(metas)
    );

    mostrarSeccion("metas");
}


/* =========================
   ELIMINAR META
   ========================= */

function eliminarMeta(indice) {

    if (!confirm("¿Quieres eliminar esta meta?")) {
        return;
    }

    const metas = obtenerMetas();

    metas.splice(indice, 1);

    localStorage.setItem(
        "texisMetas",
        JSON.stringify(metas)
    );

    mostrarSeccion("metas");
}


/* =========================
   SEGURIDAD HTML
   ========================= */

function escaparHTML(texto) {

    return String(texto)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
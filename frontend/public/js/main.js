//FILTRO CATEGORIAS
const mostrarMasCategoriasBtn = document.getElementById("mostrar-mas-categorias-btn");
const mostrarMenosCategoriasBtn = document.getElementById("mostrar-menos-categorias-btn");
const categoriasList = document.getElementById("categorias-list");
const categoriasData = JSON.parse(categoriasList.getAttribute("data-categorias")); // Obtener los datos de las editoriales

let visibleCountCategorias = 10; // Contador de elementos visibles

function mostrarCategorias() {
    // Limpiar la lista antes de mostrar los elementos
    categoriasList.innerHTML = "";

    // Mostrar los elementos hasta el contador de elementos visibles
    for (let i = 0; i < visibleCountCategorias && i < categoriasData.length; i++) {
        const li = document.createElement("li");
        li.innerHTML = `
        <form action="/libros" method="post">
            <input class="form-check-input check-filtros" onchange="form.submit()" type="checkbox" name="categorias" value="${categoriasData[i]}" id="${categoriasData[i]}">
            ${categoriasData[i]}
            </form>
        `;
        categoriasList.appendChild(li);
        
    }

    // Actualizar la deshabilitación de los botones
    mostrarMasCategoriasBtn.disabled = visibleCountCategorias >= categoriasData.length;
    mostrarMenosCategoriasBtn.disabled = visibleCountCategorias <= 10;
}

mostrarMasCategoriasBtn.addEventListener("click", function () {
    visibleCountCategorias += 10;
    mostrarCategorias();
    mostrarMasCategoriasBtn.scrollIntoView({ behavior: "smooth", block: "end" });
});

mostrarMenosCategoriasBtn.addEventListener("click", function () {
    visibleCountCategorias -= 10;
    mostrarCategorias();
    mostrarMenosCategoriasBtn.scrollIntoView({ behavior: "smooth", block: "end" });
});

// Mostrar los primeros 10 elementos al cargar la página
mostrarCategorias();

//FILTRO EDITORIALES
const mostrarMasEditorialesBtn = document.getElementById("mostrar-mas-editoriales-btn");
const mostrarMenosEditorialesBtn = document.getElementById("mostrar-menos-editoriales-btn");
const editorialesList = document.getElementById("editoriales-list");
const editorialesData = JSON.parse(editorialesList.getAttribute("data-editoriales")); // Obtener los datos de las editoriales

let visibleCountEditoriales = 10; // Contador de elementos visibles

function mostrarEditoriales() {
    // Limpiar la lista antes de mostrar los elementos
    editorialesList.innerHTML = "";

    // Mostrar los elementos hasta el contador de elementos visibles
    for (let i = 0; i < visibleCountEditoriales && i < editorialesData.length; i++) {
        const li = document.createElement("li");
        li.innerHTML = `
        <input class="form-check-input check-filtros" type="checkbox" name="editoriales" value="${editorialesData[i]}" id="${editorialesData[i]}">
        ${editorialesData[i]}
        `;
        editorialesList.appendChild(li);
    }

    // Actualizar la deshabilitación de los botones
    mostrarMasEditorialesBtn.disabled = visibleCountEditoriales >= editorialesData.length;
    mostrarMenosEditorialesBtn.disabled = visibleCountEditoriales <= 10;
}

mostrarMasEditorialesBtn.addEventListener("click", function () {
    visibleCountEditoriales += 10;
    mostrarEditoriales();
    mostrarMasEditorialesBtn.scrollIntoView({ behavior: "smooth", block: "end" });
});

mostrarMenosEditorialesBtn.addEventListener("click", function () {
    visibleCountEditoriales -= 10;
    mostrarEditoriales();
    mostrarMenosEditorialesBtn.scrollIntoView({ behavior: "smooth", block: "end" });
});

// Mostrar los primeros 10 elementos al cargar la página
mostrarEditoriales();

//FILTRO AUTORES
const mostrarMasAutoresBtn = document.getElementById("mostrar-mas-autores-btn");
const mostrarMenosAutoresBtn = document.getElementById("mostrar-menos-autores-btn");
const autoresList = document.getElementById("autores-list");
const autoresData = JSON.parse(autoresList.getAttribute("data-autores")); // Obtener los datos de las editoriales

let visibleCountAutores = 10; // Contador de elementos visibles

function mostrarAutores() {
    // Limpiar la lista antes de mostrar los elementos
    autoresList.innerHTML = "";

    // Mostrar los elementos hasta el contador de elementos visibles
    for (let i = 0; i < visibleCountAutores && i < autoresData.length; i++) {
        const li = document.createElement("li");
        li.innerHTML = `
        <input class="form-check-input check-filtros" type="checkbox" name="autores" value="${autoresData[i]}" id="${autoresData[i]}">
        ${autoresData[i]}
        `;
        autoresList.appendChild(li);
    }

    // Actualizar la deshabilitación de los botones
    mostrarMasAutoresBtn.disabled = visibleCountAutores >= autoresData.length;
    mostrarMenosAutoresBtn.disabled = visibleCountAutores <= 10;
}

mostrarMasAutoresBtn.addEventListener("click", function () {
    visibleCountAutores += 10;
    mostrarAutores();
    mostrarMasAutoresBtn.scrollIntoView({ behavior: "smooth", block: "end" });
});

mostrarMenosAutoresBtn.addEventListener("click", function () {
    visibleCountAutores -= 10;
    mostrarAutores();
    mostrarMenosAutoresBtn.scrollIntoView({ behavior: "smooth", block: "end" });
});

// Mostrar los primeros 10 elementos al cargar la página
mostrarAutores();

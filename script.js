const container = document.getElementById("malla-container");
let materiasAprobadas = JSON.parse(localStorage.getItem("materiasAprobadas")) || [];

fetch("data.json")
  .then(res => res.json())
  .then(data => {
    Object.entries(data).forEach(([semestre, materias]) => {
      const div = document.createElement("div");
      div.className = "semestre";
      div.innerHTML = `<h2>Semestre ${semestre}</h2>`;

      materias.forEach(m => {
        const matDiv = document.createElement("div");
        matDiv.className = "materia";
        if (m.enfasis) matDiv.classList.add("enfasis");
        if (materiasAprobadas.includes(m.id)) matDiv.classList.add("aprobada");

        matDiv.textContent = m.nombre;
        matDiv.title = `${m.descripcion} (${m.creditos} créditos)`;

        matDiv.addEventListener("click", () => {
          if (!materiasAprobadas.includes(m.id)) {
            materiasAprobadas.push(m.id);
          } else {
            materiasAprobadas = materiasAprobadas.filter(id => id !== m.id);
          }
          localStorage.setItem("materiasAprobadas", JSON.stringify(materiasAprobadas));
          matDiv.classList.toggle("aprobada");
        });

        div.appendChild(matDiv);
      });

      container.appendChild(div);
    });
  });

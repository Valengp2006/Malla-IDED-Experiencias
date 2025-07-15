async function cargarMalla() {
  const response = await fetch('data.json');
  const data = await response.json();

  const contenedor = document.getElementById('malla-container');
  contenedor.innerHTML = '';

  Object.keys(data).forEach(semestre => {
    const divSemestre = document.createElement('div');
    divSemestre.classList.add('semestre');
    divSemestre.innerHTML = `<h2>Semestre ${semestre}</h2>`;

    data[semestre].forEach(materia => {
      const divMateria = document.createElement('div');
      divMateria.classList.add('materia');
      if (materia.enfasis) divMateria.classList.add('enfasis');

      const materiaId = materia.id;
      if (localStorage.getItem(materiaId) === 'true') {
        divMateria.classList.add('completada');
      }

      divMateria.innerHTML = `
        <strong>${materia.nombre}</strong>
        <br><small>${materia.creditos} créditos</small>
        ${materia.prerrequisitos ? `<br><small><em>Prerrequisitos:</em> ${materia.prerrequisitos}</small>` : ''}
        ${materia.descripcion ? `<br><small>${materia.descripcion}</small>` : ''}
      `;

      divMateria.addEventListener('click', () => {
        if (divMateria.classList.contains('completada')) {
          divMateria.classList.remove('completada');
          localStorage.setItem(materiaId, 'false');
        } else {
          divMateria.classList.add('completada');
          localStorage.setItem(materiaId, 'true');
        }
      });

      divSemestre.appendChild(divMateria);
    });

    contenedor.appendChild(divSemestre);
  });
}

document.addEventListener('DOMContentLoaded', cargarMalla);

async function cargarMalla() {
  let data = {};
  try {
    const resp = await fetch('data.json');
    data = await resp.json();
  } catch (err) {
    console.error('Error al cargar data.json:', err);
    document.getElementById('malla-container').innerText = 'Error cargando la malla.';
    return;
  }

  const cont = document.getElementById('malla-container');
  cont.innerHTML = '';

  Object.keys(data).forEach(sem => {
    const divS = document.createElement('div');
    divS.className = 'semestre';
    divS.innerHTML = `<h2>Semestre ${sem}</h2>`;
    data[sem].forEach(m => {
      const d = document.createElement('div');
      d.className = 'materia' + (m.enfasis ? ' enfasis' : '');
      if (localStorage.getItem(m.id)==='true') d.classList.add('completada');
      d.innerHTML = `<strong>${m.nombre}</strong> (${m.creditos} cr)
                     ${m.prerrequisitos?'<br><em>Prerrequisitos:</em> '+m.prerrequisitos:''}
                     <br><small>${m.descripcion}</small>`;
      d.addEventListener('click', () => {
        const comp = d.classList.toggle('completada');
        localStorage.setItem(m.id, comp);
      });
      divS.append(d);
    });
    cont.append(divS);
  });
}

document.addEventListener('DOMContentLoaded', cargarMalla);

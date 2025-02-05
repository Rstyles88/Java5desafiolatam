const propiedadesJSON = [
    {
      name: 'Casa de campo',
      description: 'Un lugar ideal para descansar de la ciudad',
      src: 'https://www.construyehogar.com/wp-content/uploads/2020/02/Dise%C3%B1o-casa-en-ladera.jpg',
      rooms: 2,
      m: 170,
    },
    {
      name: 'Casa de playa',
      description: 'Despierta tus días oyendo el oceano',
      src: 'https://images.adsttc.com/media/images/54ee/ac81/e58e/ce7e/1000/0066/large_jpg/PORTADA_E04.jpg?1424927863',
      rooms: 2,
      m: 130,
    },
    {
      name: 'Casa en el centro',
      description: 'Ten cerca de ti todo lo que necesitas',
      src: 'https://fotos.perfil.com/2018/09/21/trim/950/534/nueva-york-09212018-366965.jpg',
      rooms: 1,
      m: 80,
    },
    {
      name: 'Casa rodante',
      description: 'Conviertete en un nómada del mundo sin salir de tu casa',
      src: 'https://cdn.bioguia.com/embed/3d0fb0142790e6b90664042cbafcb1581427139/furgoneta.jpg',
      rooms: 1,
      m: 6,
    },
    {
      name: 'Departamento',
      description: 'Desde las alturas todo se ve mejor',
      src: 'https://www.comparaonline.cl/blog-statics/cl/uploads/2014/09/Casa_o_departamento__conoce_las_ventajas_de_cada_uno_zocr91.jpg',
      rooms: 3,
      m: 200,
    },
    {
      name: 'Mansión',
      description: 'Vive una vida lujosa en la mansión de tus sueños ',
      src: 'https://resizer.glanacion.com/resizer/fhK-tSVag_8UGJjPMgWrspslPoU=/768x0/filters:quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/CUXVMXQE4JD5XIXX4X3PDZAVMY.jpg',
      rooms: 5,
      m: 500,
    },
  ];
  
  
  const pintarHtml = (propiedades) => {
    const divPropiedades = document.getElementById('Propiedades');
    let html = `<h4 class="mb-4">Propiedades encontradas: <span>${propiedades.length}</span></h4>`;
  
    if (propiedades.length > 0) {
      html += '<div class="d-flex flex-wrap gap-3">';
  
      propiedades.forEach((propiedad) => {
        html += `<div class="card propiedad">
                  <img src="${propiedad.src}" class="card-img-top" alt="Foto de la Propiedad">
                  <div class="card-body">
                    <h5 class="card-title text-center">${propiedad.name}</h5>
                    <p class="d-flex justify-content-between card-text">
                      <span>Cuartos: ${propiedad.rooms}</span>
                      <span>Metros: ${propiedad.m}</span>
                    </p>
                    <p class="card-text">${propiedad.description}</p>
                    <button class="btn btn-info">Ver más</button>
                  </div>
              </div>`;
      });
  
      html += '</div>';
    }
  
    divPropiedades.innerHTML = html;
  };
  
  pintarHtml(propiedadesJSON);
  

  
  document.getElementById('btn-buscar').addEventListener('click', () => {
    const inputCuartos = document.getElementById('input-cuartos');
    const inputDesde = document.getElementById('input-desde');
    const inputHasta = document.getElementById('input-hasta');
  
    let propiedadesFiltradas = [];
  
    if (validarInput(inputDesde, inputHasta)) {
      for (let propiedad of propiedadesJSON) {
        if (
          propiedad.rooms == Number(inputCuartos.value) &&
          propiedad.m >= Number(inputDesde.value) &&
          propiedad.m <= Number(inputHasta.value)
        ) {
          propiedadesFiltradas.push(propiedad);
        }
      }
    } else {
      return;
    }
  
    pintarHtml(propiedadesFiltradas);
  });
  
  document.getElementById('btn-reset').addEventListener('click', () => {
    document.getElementById('input-cuartos').value = '1';
    document.getElementById('input-desde').value = '';
    document.getElementById('input-hasta').value = '';
    pintarHtml(propiedadesJSON);
  });
  
  document.getElementById('input-desde').addEventListener('click', () => {
    document.getElementById('input-desde').classList.remove('is-invalid');
    document.getElementById('input-desde').value = '';
  });
  
  document.getElementById('input-hasta').addEventListener('click', () => {
    document.getElementById('input-hasta').classList.remove('is-invalid');
    document.getElementById('input-hasta').value = '';
  });
  
   
  function validarInput(inputDesde, inputHasta) {
    const valorDesde = parseFloat(inputDesde.value);
    const valorHasta = parseFloat(inputHasta.value);
  
    if (!Number.isInteger(valorDesde) || valorDesde <= 0) {
      inputDesde.classList.add('is-invalid');
      swal({
        text: 'Ingrese un numero mayor a Cero y que sea valido!',
        icon: 'error',
      });
      return false;
    } else if (!Number.isInteger(valorHasta) || valorDesde >= valorHasta) {
      inputHasta.classList.add('is-invalid');
      swal({
        text: 'Ingrese un numero mayor a "Desde" y que sea valido!',
        icon: 'error',
      });
      return false;
    } else {
      return true;
    }
  }
  
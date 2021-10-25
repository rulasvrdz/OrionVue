<template>
    <div class="content-wrapper" style="margin-left: 0px;">
        <section class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                  <div class="col-sm-3"></div>
                  <div class="col-sm-6">
                      <h1>Generar Reporte</h1>
                  </div>
                  <div class="col-sm-3">
                      <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><a href="/">Inicio</a></li>
                        <li class="breadcrumb-item active">Generar Reporte</li>
                      </ol>
                  </div>
                </div>
            </div><!-- /.container-fluid -->
        </section>
        <section class="content">
      <div class="container-fluid">
        <div class="row" style="display: flex; justify-content: center;">
          <div class="col-md-6 justify-center">
            <div class="card card-primary">
              <form>
                <div class="card-body">
                  <div class="form-group">
                      <label>Selecciona el delito</label>
                        <select class="form-control">
                          <option>Delito 1</option>
                          <option>Delito 2</option>
                          <option>Delito 3</option>
                          <option>Delito 4</option>
                          <option>Delito 5</option>
                        </select>
                  </div>
                  <div class="form-group">
                    <label>Selecciona el Municipio</label>
                        <select class="form-control">
                          <option>Opcion 1</option>
                          <option>Opcion 2</option>
                          <option>Opcion 3</option>
                          <option>Opcion 4</option>
                          <option>Opcion 5</option>
                        </select>
                  </div>
                  <div class="form-group">
                    <label>Hora:</label>
                    <input class="form-control" type="text" placeholder="HH:MM">
                  </div>
                  <div class="form-group">
                    <label>Ubicacion:</label>
                    <input class="form-control" type="text" placeholder="Calle, Colonia, CP">
                  </div>
                  <div class="form-group">
                    <label>Descripcion</label>
                    <textarea class="form-control" rows="3" placeholder="Agrega una breve descripcion ..."></textarea>
                  </div>

                </div>
                <div class="card-footer justify-end">
                  <button type="submit" class="btn btn-primary">Enviar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
</template>
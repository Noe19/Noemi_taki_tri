import { FiltroSolicitudPipe } from './filtro-solicitud.pipe';

describe('FiltroSolicitudPipe', () => {
  it('Mostrar notificaciones ', () => {
    const pipe = new FiltroSolicitudPipe();
    expect(pipe).toBeTruthy();
  });
});

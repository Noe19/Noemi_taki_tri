import { FiltrarAlbumesPipe } from './filtrar-albumes.pipe';

describe('FiltrarAlbumesPipe', () => {
  it('Buscador de Albumes', () => {
    const pipe = new FiltrarAlbumesPipe();
    expect(pipe).toBeTruthy();
  });
});

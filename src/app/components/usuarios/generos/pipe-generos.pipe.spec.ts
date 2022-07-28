import { PipeGenerosPipe } from './pipe-generos.pipe';

describe('PipeGenerosPipe', () => {
  it('Buscador de Generos', () => {
    const pipe = new PipeGenerosPipe();
    expect(pipe).toBeTruthy();
  });
});

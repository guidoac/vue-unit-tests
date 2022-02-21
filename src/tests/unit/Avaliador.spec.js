import Avaliador from '@/views/Avaliador';

import { mount, RouterLinkStub } from '@vue/test-utils';
import { getLeiloes } from '@/http';

import flushPromises from 'flush-promises';

jest.mock('@/http');

const leiloes = [
    {
      "produto": "Video Game",
      "descricao": "Um video game bem bacana, com vários jogos exclusivos.",
      "lanceInicial": 50
    },
    {
      "produto": "Notebook",
      "descricao": "Completinho, quase novo. A diversão é garantida!",
      "lanceInicial": 50
    }
];

describe('um avaliador que se conecta com a api', () => {
    test('deve mostrar todos os leilões retornados pela api', async () => {
        getLeiloes.mockResolvedValueOnce(leiloes);
        const wrapper = mount(Avaliador, {
          stubs: {
            RouterLink: RouterLinkStub
          }
        });
        await flushPromises();
        const totalLeiloesExibidos = wrapper.findAll('.leilao').length;

        expect(totalLeiloesExibidos).toBe(leiloes.length);
    });

    test('não há leilões retornados pela api', async () => {
      getLeiloes.mockResolvedValueOnce([]);
      const wrapper = mount(Avaliador, {
        stubs: {
          RouterLink: RouterLinkStub
        }
      });
      await flushPromises();
      const totalLeiloesExibidos = wrapper.findAll('.leilao').length;

      expect(totalLeiloesExibidos).toBe(0);
  });
});
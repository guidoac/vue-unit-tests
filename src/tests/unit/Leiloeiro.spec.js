import Leiloeiro from '@/views/Leiloeiro';

import { mount } from '@vue/test-utils';
import { getLeilao, getLances } from '@/http';

import flushPromises from 'flush-promises';

jest.mock('@/http');

const leilao = {
  id: 5,
  produto: 'Video Game',
  descricao: 'Um video game bem bacana, com vários jogos exclusivos.',
  lanceInicial: 200
};

const lances = [
  {
    id: 1,
    valor: 1001,
    data: '2020-06-13T18:04:26.826Z',
    leilao_id: 1
  },
  {
    valor: 1005,
    data: '2020-06-13T18:04:26.826Z',
    leilao_id: 1,
    id: 2
  },
  {
    valor: 1099,
    data: '2020-06-13T18:19:44.871Z',
    leilao_id: 1,
    id: 3
  },
  {
    valor: 500,
    data: '2020-07-24T14:40:33.951Z',
    leilao_id: 4,
    id: 4
  },
  {
    valor: 2000,
    data: '2022-02-17T13:17:16.547Z',
    leilao_id: 2,
    id: {}
  }
];

describe('leiloeiro inicia um leilão que não possui lances', () => {
  test('avisa quando não existem lances', async () => {
    getLeilao.mockResolvedValueOnce(leilao);
    getLances.mockResolvedValueOnce([]);

    const wrapper = mount(Leiloeiro, {
      propsData: {
        id: 1
      }
    });

    await flushPromises();

    const alerta = wrapper.find('.alert-dark');

    expect(alerta.exists()).toBe(true);
  });
});

describe('Um leiloeiro exibe os lances existentes', () => {
  test('não deve mostrar o aviso de sem lances', async () => {
    getLeilao.mockResolvedValueOnce(leilao);
    getLances.mockResolvedValueOnce(lances);

    const wrapper = mount(Leiloeiro, {
      propsData: {
        id: 1
      }
    });

    await flushPromises();

    const alerta = wrapper.find('.alert-dark');

    expect(alerta.exists()).toBe(false);
  });

  test('deve mostrar os lances recebidos', async () => {
    getLeilao.mockResolvedValueOnce(leilao);
    getLances.mockResolvedValueOnce(lances);

    const wrapper = mount(Leiloeiro, {
      propsData: {
        id: 1
      }
    });

    await flushPromises();

    const alerta = wrapper.find('.list-inline');

    expect(alerta.exists()).toBe(true);
  });
});

describe('leiloeiro comunica os valores de menor e maior lance', () => {
  test('deve mostrar o maior lance do leilão', async () => {
    getLeilao.mockResolvedValueOnce(leilao);
    getLances.mockResolvedValueOnce(lances);

    const wrapper = mount(Leiloeiro, {
      propsData: {
        id: 1
      }
    });

    await flushPromises();

    const maiorLance = wrapper.find('.maior-lance').text();

    expect(maiorLance).toContain('Maior lance: R$ 2000');
  });

  test('deve mostrar o menor lance do leilão', async () => {
    getLeilao.mockResolvedValueOnce(leilao);
    getLances.mockResolvedValueOnce(lances);

    const wrapper = mount(Leiloeiro, {
      propsData: {
        id: 1
      }
    });

    await flushPromises();

    const maiorLance = wrapper.find('.menor-lance').text();

    expect(maiorLance).toContain('Menor lance: R$ 500');
  });
});

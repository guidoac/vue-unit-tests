import NovoLeilao from '@/views/NovoLeilao';

import { mount } from '@vue/test-utils';
import { createLeilao } from '@/http';

jest.mock('@/http');

const $router = {
    push: jest.fn()
};

describe('um novo leilão deve ser criado', () => {
    test('um leilão deve ser criado ao preencher o form', async () => {
        createLeilao.mockResolvedValueOnce();

        const wrapper = mount(NovoLeilao, {
            mocks: {
                $router
            }
        });

        const produtoInput = wrapper.find('input.produto');
        const descricaoInput = wrapper.find('textarea.descricao');
        const valorInput = wrapper.find('input.valor');

        produtoInput.setValue('Um livro top');
        descricaoInput.setValue('Melhor livro de todos');
        valorInput.setValue(200);

        wrapper.find('form').trigger('submit');

        expect(createLeilao).toHaveBeenCalled();
    });
});
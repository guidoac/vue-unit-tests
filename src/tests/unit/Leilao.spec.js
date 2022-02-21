import Leilao from '@/components/Leilao';
import { mount } from '@vue/test-utils';

const leilao = {
    produto: 'Livro da casa do código',
    lanceInicial: 49,
    descricao: 'Um maravilhoso livro sobre vue'
}

describe('Leião exibe os dados do produto', () => {
    test('exibe os dados do leilão no card', () => {
        const wrapper = mount(Leilao, {
            propsData: {
                leilao
            }
        });

        const header = wrapper.find('.card-header').text();
        const header_exp = 'Estamos leiloando um(a): Livro da casa do código';

        const title = wrapper.find('.card-title').text();
        const title_exp = 'Lance inicial: R$ 49';

        const text = wrapper.find('.card-text').text();
        const text_exp = 'Um maravilhoso livro sobre vue';

        expect(header).toContain(header_exp);
        expect(title).toContain(title_exp);
        expect(text).toContain(text_exp);
    });
});
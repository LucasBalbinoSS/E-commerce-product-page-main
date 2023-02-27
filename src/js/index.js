const menu = () => {
    const $body = document.querySelector('body')
    const $menuRwd = document.querySelector('.js-container-menu')
    const $menuRwdLista = document.querySelector('.js-interno-1__lista')
    const $menuBtnAbrir = document.querySelector('.js-menu-abrir-svg')


    larguraTelaValidar()

    $menuBtnAbrir.addEventListener('click', function() {
        mostrar($menuRwd)
        setTimeout(() => {
            $menuRwdLista?.classList.add('ativo')
        }, 100);
        
        $menuRwd.style.visibility = 'visible'
        $body.style.overflowY = 'hidden'
    })
    
    $menuRwd.addEventListener('click', (clique) => {
        validaClicadoFechar(clique)
    })


    // funcoes
    function validaClicadoFechar(clique) {
        const $menuBtnFechar = document.querySelector('.js-menu-svg-fechar')

        if (clique.target == $menuRwd ||
            clique.target == $menuBtnFechar) {

            $menuRwdLista?.classList.remove('ativo')
            $body.style.overflowY = 'visible'

            setTimeout(() => {
                $menuRwd.style.visibility = 'hidden'
            }, 370);
        }
    }

    function larguraTelaValidar() {
        window.addEventListener('resize', function() {
            const larguraTela = innerWidth

            if (larguraTela >= 850) {
                $menuRwd.style.visibility = 'visible'
            } 
            else {
                $menuRwd.style.visibility = 'hidden'
            }
        })
    }
}

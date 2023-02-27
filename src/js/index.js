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

const slider = () => {
    padrao('padrao')
    padrao('modal')


    function padrao(alvo) {
        const $setaVoltar = document.querySelector(`.js-container-seta-voltar-${alvo}`)
        const $setaAvancar = document.querySelector(`.js-container-seta-avancar-${alvo}`)
        const $containerImg = document.querySelector(`.js-container-img-${alvo}`)

        const $imagens = document.querySelectorAll(`.js-img-tenis-${alvo}`)
        const $imagensCarrossel = document.querySelectorAll(`.js-img-tenis-carrossel-${alvo}`)

        let contador = $containerImg.getAttribute('data-foto-ativa')


        // logica
        carrosselImagens()
        displaySetasValidar()
        modalFotoAlternado()

        $setaAvancar.addEventListener('click', function() {
            fotoAvancar()
            imagemCarrosselPreencher()
            displaySetasValidar()
        })

        $setaVoltar.addEventListener('click', function() {
            fotoVoltar()
            imagemCarrosselPreencher()
            displaySetasValidar()
        })


        // funcoes
        function carrosselImagens() {
            $imagensCarrossel.forEach(function($imagemCarrossel) {
                imagemCarrosselPreencher()
    
                $imagemCarrossel.addEventListener('click', function() {
                    contador = $imagemCarrossel.getAttribute('data-foto-carrossel-ativa')
                    $containerImg.setAttribute('data-foto-ativa', contador)
    
                    displaySetasValidar()
                    imagemCarrosselTrocar()
    
                    imagemCarrosselClicadaValidar()
                    imagemCarrosselAtivar($imagemCarrossel)
                })
            })
    
    
        }
    
        function imagemCarrosselPreencher() {
            $imagensCarrossel.forEach(function($imagemCarrossel) {
    
                if ($imagemCarrossel.dataset.fotoCarrosselAtiva == contador) {
                    imagemCarrosselClicadaValidar()
                    imagemCarrosselAtivar($imagemCarrossel)
                }
            })
        }
    
        function imagemCarrosselTrocar() {
            $containerImg.style.transform = `translateX(-${contador - 1}00%)`
        }
    
        function imagemCarrosselLimpar($alvo) {
            $alvo.classList.remove('clicada')
        }
    
        function imagemCarrosselClicadaValidar() {
            $imagensCarrossel.forEach(function($imagemCarrossel) {
                imagemCarrosselLimpar($imagemCarrossel)
            })
        }
    
        function imagemCarrosselAtivar($alvo) {
            $alvo.classList.add('clicada')
        }
    
        function fotoAvancar() {
            $containerImg.style.transform = `translateX(-${contador}00%)`
    
            contador ++
            $containerImg.setAttribute('data-foto-ativa', contador)
        }
    
        function fotoVoltar() {
            contador --
            $containerImg.setAttribute('data-foto-ativa', contador)
    
            $containerImg.style.transform = `translateX(-${contador - 1}00%)`
        }
    
        function displaySetasValidar() {
    
            if (contador == 1) {
                esconder($setaVoltar)
                mostrar($setaAvancar)
            }
    
            if (contador > 1) {
                mostrar($setaAvancar)
                mostrar($setaVoltar)
            }
    
            if (contador == $imagens.length) {esconder($setaAvancar)}
        }

        function modalFotoAlternado() {
            const $modalFotoAlternado = document.querySelector('.modal-foto-alternado')
            const $containerImgModal = document.querySelector('.js-container-img-modal')
            const mobile = innerWidth < 1000

            
            $containerImg.addEventListener('click', function() {
                $containerImgModal.setAttribute('data-foto-ativa', contador)
                console.log(contador)
    
                if (mobile) {
                    return
                }

                modalAbrir()
            })
        
        
            // funcoes
            function modalAbrir() {
                $modalFotoAlternado.classList.remove('esconder')
                $modalFotoAlternado.style.display = 'flex'
            }
        }
    }
}

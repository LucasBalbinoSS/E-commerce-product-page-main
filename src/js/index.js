document.addEventListener('DOMContentLoaded', () => {
    menuHamburguer()
    slider()
    precoCalcular()
    carrinho()
})


const menuHamburguer = () => {
    const $body = document.querySelector('body')
    const $menuRwd = document.querySelector('.js-container-menu')
    const $menuRwdLista = document.querySelector('.js-interno-1__lista')
    const $menuBtnAbrir = document.querySelector('.js-menu-abrir-svg')


    telaTabletLarguraValidar()

    $menuBtnAbrir.addEventListener('click', menuAbrir)
    
    $menuRwd.addEventListener('click', (clique) => menuFechar(clique))


    // funcoes
    function menuAbrir() {
        mostrar($menuRwd)

        // transicao menu entrada
        setTimeout(() => {
            $menuRwdLista?.classList.add('ativo')
        }, 100)

        $menuRwd.style.visibility = 'visible'
        $body.style.overflowY = 'hidden'
    }

    function menuFechar(clique) {
        const $menuBtnFechar = document.querySelector('.js-menu-svg-fechar')

        clicadoValidar()


        function clicadoValidar() {

            if (clique.target == $menuRwd ||
                clique.target == $menuBtnFechar) {
    
                $menuRwdLista?.classList.remove('ativo')
                $body.style.overflowY = 'visible'
                    
                // transicao menu saida
                setTimeout(() => {
                    $menuRwd.style.visibility = 'hidden'
                }, 370)
            }
        }
    }

    function telaTabletLarguraValidar() {
        addEventListener('resize', function() {
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
        const $setaVoltar = document.querySelector(`.js-container-seta-voltar-padrao`)
        const $setaAvancar = document.querySelector(`.js-container-seta-avancar-padrao`)
        const $containerImg = document.querySelector(`.js-container-img-${alvo}`)
        const $containerImgModal = document.querySelector('.js-container-img-modal')

        const $imagens = document.querySelectorAll(`.js-img-tenis-padrao`)
        const $imagensCarrossel = document.querySelectorAll(`.js-img-tenis-carrossel-padrao`)

        let contador = $containerImg.getAttribute('data-foto-ativa')


        // logica
        imagensCarrossel()
        setasDisplayValidar()
        modalFotoAlternado()

        $setaAvancar.addEventListener('click', () => {
            fotoAvancar()
            imagemCarrosselPreencher()
            setasDisplayValidar()
        })

        $setaVoltar.addEventListener('click', () => {
            fotoVoltar()
            imagemCarrosselPreencher()
            setasDisplayValidar()
        })


        // funcoes
        function imagensCarrossel() {
            $imagensCarrossel.forEach(function($imagemCarrossel) {
                imagemCarrosselPreencher()
                
                $imagemCarrossel.addEventListener('click', () => {
                    contador = $imagemCarrossel.getAttribute('data-foto-carrossel-ativa')
                    $containerImg.setAttribute('data-foto-ativa', contador)
                    $containerImgModal.setAttribute('data-foto-ativa', contador)
    
                    setasDisplayValidar()
                    imagemCarrosselTrocar($containerImg)
                    imagemCarrosselTrocar($containerImgModal)
    
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
    
        function imagemCarrosselTrocar($alvo) {
            $alvo.style.transform = `translateX(-${contador - 1}00%)`
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
            $containerImgModal.style.transform = `translateX(-${contador}00%)`
    
            contador ++
            $containerImg.setAttribute('data-foto-ativa', contador)
            $containerImgModal.setAttribute('data-foto-ativa', contador)
        }
    
        function fotoVoltar() {
            contador --
            $containerImg.setAttribute('data-foto-ativa', contador)
            $containerImgModal.setAttribute('data-foto-ativa', contador)
    
            $containerImg.style.transform = `translateX(-${contador - 1}00%)`
            $containerImgModal.style.transform = `translateX(-${contador - 1}00%)`
        }
    
        function setasDisplayValidar() {
    
            if (contador == 1) {
                esconder($setaVoltar)
                mostrar($setaAvancar)
            }
    
            if (contador > 1) {
                mostrar($setaAvancar)
                mostrar($setaVoltar)
            }
    
            if (contador == $imagens.length) {
                esconder($setaAvancar)
            }
        }

        function modalFotoAlternado() {
            const $modalFotoAlternado = document.querySelector('.js-foto-alternado-modal')
            const $modalBtnFechar = $modalFotoAlternado.querySelector('.js-menu-svg-fechar-modal')

            $containerImg.addEventListener('click', modalAbrir)
            $modalBtnFechar.addEventListener('click', modalFechar)


            // funcoes
            function modalAbrir() {
                $modalFotoAlternado.showModal()
            }
            
            function modalFechar() {
                $modalFotoAlternado.close()
            }
        }
    }
}

const precoCalcular = () => {
    const $body = document.querySelector('body')
    const $menos = document.querySelector('.js-descricao-quantidade-menos')
    const $quantidade = document.querySelector('.js-descricao-quantidade')
    const $mais = document.querySelector('.js-descricao-quantidade-mais')
    const $botaoComprar = document.querySelector('.js-botao-comprar')
    const $carrinho = document.querySelector('.js-carrinho-svg')
    const $precoBruto = document.querySelector('.js-preco-bruto')
    const $precoLiquido = document.querySelector('.js-preco-liquido')

    let contadorQuantidade = $quantidade.getAttribute('data-quantidade')
    let contadorPrecoBruto = $precoBruto.getAttribute('data-preco-bruto')


    // logica
    $quantidade.innerHTML = contadorQuantidade
    precoCalcular()
    botoesDesativar()
    quantidadeValidar()


    $mais.addEventListener('click', () => {
        quantidadeAumentar()
        botoesValidar()
        itemAdicionar()
    })

    $menos.addEventListener('click', () => {
        quantidadeDiminuir()
        itemRemover()
        botoesValidar()
    })


    // funcoes
    function quantidadeAumentar() {
        contadorQuantidade ++
        $quantidade.setAttribute('data-quantidade', contadorQuantidade)
        $quantidade.innerHTML = contadorQuantidade
    }

    function quantidadeDiminuir() {

        if (contadorQuantidade < 1) {
            $menos?.classList.add('botao-desativado')
            return
        }

        $menos.classList.remove('botao-desativado')
        contadorQuantidade --
        $quantidade.setAttribute('data-quantidade', contadorQuantidade)
        $quantidade.innerHTML = contadorQuantidade
    }
    
    function botoesDesativar() {
        $menos?.classList.add('botao-desativado')
        $botaoComprar?.classList.add('botao-desativado')
    }

    function botoesValidar() {

        if ($menos?.classList.contains('botao-desativado'
        || $botaoComprar?.classList.contains('botao-desativado'))) {

            $menos?.classList.remove('botao-desativado')
            $botaoComprar?.classList.remove('botao-desativado')
        }

        if (contadorQuantidade == 0) {
            botoesDesativar()
        }
    }

    function precoCalcular() {
        $precoBruto.innerHTML = `$${contadorPrecoBruto}`
    }

    function itemAdicionar() {
        $precoBruto.setAttribute('data-preco-bruto', contadorPrecoBruto * contadorQuantidade)

        $precoBruto.innerHTML = `$${contadorPrecoBruto * contadorQuantidade}.00`
        $precoLiquido.innerHTML = `$${(contadorPrecoBruto * contadorQuantidade) / 2}.00`
    }

    function itemRemover() {
        let contadorPrecoLiquido = $precoBruto.getAttribute('data-preco-bruto')

        if (contadorQuantidade < 1) {
            return
        }

        $precoBruto.setAttribute('data-preco-bruto', contadorPrecoLiquido - contadorPrecoBruto)

        $precoBruto.innerHTML = `$${contadorPrecoLiquido - contadorPrecoBruto}.00`
        $precoLiquido.innerHTML = `$${(contadorPrecoBruto * contadorQuantidade) / 2}.00`
    }

    function quantidadeValidar() {

        if (contadorQuantidade == 1) {
            return
        }
    }
}

const carrinho = () => {
    const $containerCarrinho = document.querySelector('.js-container-carrinho')
    const $sacola = document.querySelector('.js-carrinho-svg')
    const $menuBtnAbrir = document.querySelector('.js-menu-abrir-svg')

    const $botaoComprar = document.querySelector('.js-botao-comprar')
    const $carrinhoVazioTexto = document.querySelector('.js-carrinho-vazio')
    const $containerCarrinhoPreenchido = document.querySelector('.js-container-carrinho-preenchido')
    const $carrinhoPreenchidoBotao = document.querySelector('.js-carrinho-preenchido-botao')
    const $carrinhoQtdItens = document.querySelector('.js-carrinho-preenchido-qtd-itens')
    const $carrinhoPrecoFinal = document.querySelector('.js-carrinho-preenchido-preco-final')
    const $quantidade = document.querySelector('.js-descricao-quantidade')
    const $precoLiquido = document.querySelector('.js-preco-liquido')
    const $carrinhoMarcador = document.querySelector('.js-marcador-carrinho')

    const $itemDeletar = document.querySelector('.js-carrinho-excluir')


    carrinhoDisplayValidar()


    $botaoComprar.addEventListener('click', () => {
        
        if ($botaoComprar.classList.contains('botao-desativado')) {
            return
        }

        itemCarrinhoAdicionar()
    })

    $itemDeletar.addEventListener('click', () => {
        itemCarrinhoExcluir()
    })

    $containerCarrinho.addEventListener('click', (clique) => carrinhoEsconder(clique))
    $menuBtnAbrir.addEventListener('click', (clique) => carrinhoEsconder(clique))


    // funcoes
    function carrinhoDisplayValidar() {
        $sacola.addEventListener('click', (clique) => {
        
            if ($containerCarrinho.classList.contains('esconder')) {
                carrinhoMostrar()
            }
            else if ($containerCarrinho.style.display = 'flex') {
                carrinhoEsconder(clique)
            }
        })
    }

    function carrinhoMostrar() {
        mostrar($containerCarrinho)
        $containerCarrinho.style.display = 'flex'
    }

    function carrinhoEsconder(clique) {

        clicadoCarrinhoValidar()

        function clicadoCarrinhoValidar() {

            if (clique.target == $containerCarrinho ||
                clique.target == $sacola || clique.target == $menuBtnAbrir) {
                $containerCarrinho.style.removeProperty('display')
                esconder($containerCarrinho)
            }
        }

        
    }

    function itemCarrinhoAdicionar() {
        esconder($carrinhoVazioTexto)
        mostrar($carrinhoPreenchidoBotao)
        mostrar($containerCarrinhoPreenchido)
        mostrar($carrinhoMarcador)
        $containerCarrinhoPreenchido.style.display = 'flex'

        $carrinhoQtdItens.innerHTML = $quantidade.getAttribute('data-quantidade')
        $carrinhoPrecoFinal.innerText = $precoLiquido.innerText
    }

    function itemCarrinhoExcluir() {
        mostrar($carrinhoVazioTexto)
        esconder($carrinhoMarcador)
        esconder($carrinhoPreenchidoBotao)
        $containerCarrinhoPreenchido.style.removeProperty('display')
        esconder($containerCarrinhoPreenchido)
    }
}


// funcoes globais
function mostrar($alvo) {
    $alvo?.classList.remove('esconder')
}

function esconder($alvo) {
    $alvo?.classList.add('esconder')
}
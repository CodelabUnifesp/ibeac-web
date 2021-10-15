# IBEAC-Web
Plataforma Social Moderada para Disseminação de Informações sobre Saúde 

Ação do projeto de extensão CodeLab-Unifesp - IBEAC

[![NPM Version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Downloads Stats][npm-downloads]][npm-url]

O projeto CodeLab-Unifesp desenvolve uma plataforma de comunicação e interação social para que a organização social IBEAC - Instituto Brasileiro de Estudos e Apoio Comunitário Queiróz Filho dissemine informações de saúde a gestantes e puérperas das comunidades da região de Parelheiros em São Paulo. A ideia, formatada a partir de várias reuniões com representantes da ONG, é desenvolver um aplicativo de fórum de discussão que criará uma ponte entre especialistas em primeira infância do CEPI (Centro de Estudos em Primeira Infância) e as mães e puérperas. Entre os tópicos do aplicativo estão os cuidados com as mães, o parto e os bebês, além de trocas solidárias e indicações de cultura e lazer. O projeto tem potencial de atingir um grande número de pessoas da comunidade, visto que a ONG trabalha com toda a região de Parelheiros e tem atuação e reconhecimento nacionais. O software a ser desenvolvido será de licença livre e poderá ser usado também por outras comunidades. 

## Ambientes

### Desenvolvimento

**WEB**
https://plasmedis-web-dev.herokuapp.com/

**API**
http://plasmedis-api-dev.herokuapp.com/


## Configuração para Desenvolvimento

### Preparando Ambiente:
* Instalar Nodejs: https://nodejs.org/en/download/
* Instalar Yarn: `npm install --global yarn` (no terminal)
* Instalar o git: https://git-scm.com/downloads

### Baixando o repositorio: (todos os comandos são executados no terminal) 
* `git clone https://github.com/CodelabUnifesp/ibeac-web` (o código sera baixado na pasta ibeac-web)
* Entrando no diretório do código: `cd ibeac-web`
* Instalando depencias: `yarn install`

### Rodando a aplicação Localmente:
* No terminal, no diretorio raiz do código, rode o comando: `yarn start`

### Criando uma nova branch de desenvolvimento:
* No terminal, no diretorio raiz do código, rode o comando: `git checkout -b issue-XXXX` (XXXX = numero da issue)
* Depois adicione essa branch ao repositório: `git push --set-upstream origin issue-XXXX` 

### Aplicando alterações: (todos os comandos são executados no terminal) 
* Adiciona todas as modificações feitas: `git add .`
* Comentar as mudanças implementadas: `git commit -m "meus comentarios resumindo as mudanças"`
* Envia as mudanças ao repositório: `git push`

### Abrindo o pull request:
* No repositorio do git, vá em pull requests > new pull request, defina o base como "master" e compare como a branch "issue-XXXX" (sua branch atual)
clique em Create Pull Request

## Organização do Código

Sugestões de diretrizes para organização do código.


### Gerenciador de Pacotes do Node.js

Ao adicionar, remover ou manipular pacotes para o projeto, utilizar o gerenciador de pacotes **yarn**.
(Ao invés de *npm install*, utilizar o *yarn install*)

### Responsividade

Ao implementar as páginas, ter cuidado com a responsividade dos componentes e do comportamento geral em telas de diferentes resoluções.

### Convenções de nome para variáveis, constantes e funções

Dar preferência ao inglês, mas mantendo em português palavras com relação direta às regras de negócio:

- Postagem
- Comentário
- Bairro
- Categoria

### Estrutura de pastas/responsabilidade de código

Manter todas as funções que realizam chamadas à api devem ficar centralizadas dentro da pasta "/domain".

### Consistência e Qualidade de Código

As regras para consistência e qualidade de código do projeto são aplicadas pelo eslint/prettier. Essas regras são baseadas no style guide da Airbnb, com alterações presentes no arquivo de configuração ".eslintrc.js".

Pelo **Visual Studio Code**, o código pode ser automaticamente formatado ao salvar qualquer documento. Para isso é necessário instalar as extensões: **ESLint** e **Prettier - Code formatter**

### Convenções de nome para branches/commits

*tbd*

### Estilos, temas e cores

*tbd*

## Diagramas

### Banco de Dados

![Banco de Dados](/docs/db.png)

### Funcionalidades

![Cadastro de Novos Usuários](/docs/diagram_cadastro_novos_usuarios.png)
Cadastro de Novos Usuários

![Cadastro de Novo Bairro](/docs/diagram_novo_bairro.png)
Cadastro de Novo Bairro

![Complemento de Dados](/docs/diagram_complemento_de_dados.png)
Complemento de Dados

![Criar Postagem](/docs/diagram_criar_postagem.png)
Criar Postagem

![Comentar Postagem](/docs/diagram_comentar_postagem.png)
Comentar Postagem

![Complemento de Dados](/docs/diagram_complemento_de_dados.png)
Complemento de Dados

![Formulário Socioeconômico](/docs/diagram_formulario_socioeconomico.png)
Formulário Socioeconômico

![Verificar Postagem](/docs/diagram_verificar_postagem.png)
Verificar Postagem

### Hipotéticos

Diagramas-sugestão para algumas funcionalidades, não necessáriamente reflete como a funcionalidade vai/foi implementada.

![Esqueci minha Senha](/docs/diagram_esqueci_minha_senha.png)
Esqueci minha Senha


## Rodando com Docker
* Para construir o container ```docker-compose build```

* Para iniciar o serviço ```docker-compose up```

* [Opcional] Para rodar algum comando dentro do container ```docker-compose exec ibeac-front bash```

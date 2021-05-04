# IBEAC-Web
Plataforma Social Moderada para Disseminação de Informações sobre Saúde 

Ação do projeto de extensão CodeLab-Unifesp - IBEAC

[![NPM Version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Downloads Stats][npm-downloads]][npm-url]

O projeto CodeLab-Unifesp desenvolve uma plataforma de comunicação e interação social para que a organização social IBEAC - Instituto Brasileiro de Estudos e Apoio Comunitário Queiróz Filho dissemine informações de saúde a gestantes e puérperas das comunidades da região de Parelheiros em São Paulo. A ideia, formatada a partir de várias reuniões com representantes da ONG, é desenvolver um aplicativo de fórum de discussão que criará uma ponte entre especialistas em primeira infância do CEPI (Centro de Estudos em Primeira Infância) e as mães e puérperas. Entre os tópicos do aplicativo estão os cuidados com as mães, o parto e os bebês, além de trocas solidárias e indicações de cultura e lazer. O projeto tem potencial de atingir um grande número de pessoas da comunidade, visto que a ONG trabalha com toda a região de Parelheiros e tem atuação e reconhecimento nacionais. O software a ser desenvolvido será de licença livre e poderá ser usado também por outras comunidades. 

## Configuração para Desenvolvimento

* Instalar Nodejs: https://nodejs.org/en/download/
* Instalar Yarn: `npm install --global yarn` (no terminal)
* Instalar o git: https://git-scm.com/downloads

* Baixando o repositorio: (todos os comandos são executados no terminal) 
    `git clone https://github.com/CodelabUnifesp/ibeac-web` (o código sera baixado na pasta ibeac-web)
    entre no diretório: `cd ibeac-web`
* Instalando depencias:
    `yarn` - instala as dependencias

* Criando uma nova branch de desenvolvimento:
    No terminal, no diretorio raiz do código, rode o comando: `git checkout -b issue-XXXX` (XXXX = numero da issue)
    Depois adicione essa branch ao repositório: `git push --set-upstream origin issue-XXXX` 

* Aplicando alterações: (todos os comandos são executados no terminal) 
    `git add .`
    `git commit -m "meus comentarios resumindo as mudanças"`
    `git push`

* Abrindo o pull request:
    No repositorio do git, vá em pull requests > new pull request,
    defina o base como "master" e compare como a branch "issue-XXXX" (sua branch atual)
    clique em Create Pull Request

* Instalando dependências: `yarn install`
* Iniciando aplicação: `yarn start`

# Gerador de Anamnese

Aplicação estática para criar anamneses e evoluções clínicas. Os formulários, modelos, pesquisa de CID, geração de documentos e exportação em PDF funcionam no próprio navegador. Rascunhos ficam no armazenamento local do navegador.

## Uso offline

Abra a versão publicada pelo menos uma vez com internet e aguarde o carregamento completo. O navegador instala um service worker que guarda todos os arquivos da aplicação, incluindo os módulos usados para gerar PDF. Depois disso, a página pode ser reaberta sem conexão. Pelo menu do navegador, também é possível instalar o site como aplicativo.

O cache e os rascunhos pertencem ao navegador e ao dispositivo usados. Limpar os dados do site, usar navegação privada ou remover o aplicativo pode apagá-los. Exporte um JSON para fazer uma cópia dos dados clínicos que queira preservar.

## Desenvolvimento e publicação

```sh
npm ci
npm run dev
npm run lint
npm run build
```

O build produz `dist/` com o manifesto, os ícones e o service worker. O workflow em `.github/workflows/deploy.yml` usa `BASE_PATH` para publicar o projeto em um subcaminho do GitHub Pages. Para testar o mesmo caminho localmente, defina `BASE_PATH=/geradorAnamnese/` antes de `npm run build` e execute `npm run preview`.

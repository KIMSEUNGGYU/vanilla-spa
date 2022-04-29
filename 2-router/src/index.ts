import { $ } from './utils/dom';

import { Target } from './types';

import Pages from './pages';
import Router, { CHANGE_ROUTE_EVENT } from './router';

const pages = Pages($('#root') as Target);

const router = new Router();

$('header > nav > ul')?.addEventListener('click', (event: any) => {
  const { target } = event;

  if (target.matches('button[data-navigate]')) {
    const { navigate } = target?.dataset;

    router.changeRoute(navigate);
  }
});

router //
  .addRoute('/', pages.home)
  .addRoute('/posts', pages.posts)
  .setNotFound(pages.notFound)
  .route();

// ❓ THINK : 라우터 이벤트 위치..
window.addEventListener(CHANGE_ROUTE_EVENT, router.route);
window.addEventListener('popstate', router.route); // 뒤로 가기 이벤트 등록

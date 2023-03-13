import { page } from './lib.js';
import { renderPage } from './middleware/meinRender.js';
import { navView } from './middleware/navType.js';
import { setUser } from './middleware/userData.js';
import { getSessiong } from './utility/utility.js';
import { catalogView } from './views/catalogView.js';
import { createView } from './views/createView.js';
import { detailView } from './views/detailView.js';
import { editView } from './views/editView.js';
import { homeView } from './views/homeView.js';
import { loginView } from './views/loginView.js';
import { logoutFunction } from './views/logoutFn.js';
import { navTemplate } from './views/navView.js';
import { registerlView } from './views/registerView.js';

const nav = document.querySelector('#box header');
const main = document.querySelector('#box #main-content');

page(renderPage(nav, main));
page(setUser(getSessiong));
page(navView(navTemplate));

page('/', homeView);
page('/catalog', catalogView);
page('/catalog/:id', detailView);
page('/create', createView);
page('/edit', editView);
page('/register', registerlView);
page('/login', loginView);
page('/logout', logoutFunction)

page.start();
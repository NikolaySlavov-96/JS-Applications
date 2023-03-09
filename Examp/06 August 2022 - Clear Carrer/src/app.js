import { page } from './lib.js';
import { navView } from './middleware/navUser.js';
import { createRender } from './middleware/render.js';
import { getUser } from './middleware/userData.js';
import { getSession } from './utility.js';
import { catalogView } from './views/catalogView.js';
import { createView } from './views/createView.js';
import { detailView } from './views/detailView.js';
import { editView } from './views/editView.js';
import { homeView } from './views/homeView.js';
import { loginView } from './views/loginView.js';
import { logoutFn } from './views/logoutFn.js';
import { navViewType } from './views/navType.js';
import { registerView } from './views/registerView.js';

const nav = document.querySelector('#wrapper header');
const main = document.querySelector('#wrapper main');

page(createRender(nav, main));
page(getUser(getSession));
page(navView(navViewType));

page('/index.html', '/');
page('/', homeView);
page('/login', loginView);
page('/register', registerView);
page('/logout', logoutFn);
page('/catalog', catalogView);
page('/catalog/:id', detailView);
page('/edit/:id', editView);
page('/create', createView);

page.start()
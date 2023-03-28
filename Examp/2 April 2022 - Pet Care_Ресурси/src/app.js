import { page } from './lib.js';
import { navView } from './midlleware/navType.js';
import { myRender } from './midlleware/render.js';
import { setUser } from './midlleware/userData.js';
import { getSession } from './utility.js';
import { catalogView } from './views/catalogView.js';
import { createView } from './views/createView.js';
import { detailView } from './views/detailView.js';
import { editView } from './views/editView.js';
import { homeView } from './views/homeView.js';
import { loginView } from './views/loginView.js';
import { logoutFn } from './views/logout.js';
import { navigationTemplate } from './views/navigation.js';
import { registerView } from './views/registerView.js';


const nav = document.querySelector('header');
const main = document.querySelector('#content');

page(myRender(nav, main));
page(setUser(getSession));
page(navView(navigationTemplate));
page('/', homeView);
page('/catalog', catalogView);
page('/catalog/:id', detailView);
page('/create', createView);
page('/edit/:id', editView);
page('/logout', logoutFn);
page('/login', loginView);
page('/register', registerView);

page.start()
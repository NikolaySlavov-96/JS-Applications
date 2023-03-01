import page from '../node_modules/page/page.mjs';
import { addSesion } from './middleware/addSession.js';
import { addRender } from './middleware/render.js';
import { addUserNav } from './middleware/userNav.js';
import { getSession } from './until.js';
import { catalogView } from './views/catalogView.js';
import { createView } from './views/createView.js';
import { detailView } from './views/detailView.js';
import { editView } from './views/editView.js';
import { homeView } from './views/homeView.js';
import { loginVIew } from './views/loginView.js';
import { logoutFunction } from './views/logoutView.js';
import { navTemplate } from './views/navView.js';
import { registerView } from './views/registerView.js';

const header = document.querySelector('#wrapper header');
const main = document.querySelector('#wrapper main');

page(addRender(header, main));
page(addSesion(getSession));
page(addUserNav(navTemplate));

page('/index.html' , '/');
page('/' ,homeView);
page('/login', loginVIew);
page('/register', registerView);
page('/logout', logoutFunction);
page('/catalog', catalogView);
page('/detail/:id', detailView);
page('/edit/:id', editView);
page('/create', createView)

page.start()
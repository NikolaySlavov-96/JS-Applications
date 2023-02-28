import page from './node_modules/page/page.mjs';
import { renderItem } from './src/middelware/render.js';
import { addSession } from './src/middelware/addSession.js';
import { getSessionStorage } from './src/until.js';
import { userTemplate } from './src/middelware/userNav.js';
import { navTemplate } from './src/views/navView.js';
import { registerView } from './src/views/register.js';
import { loginView } from './src/views/login.js';
import { homeView } from './src/views/home.js';
import { logoutView } from './src/views/logout.js';
import { createView } from './src/views/dashbord.js';
import { datailView } from './src/views/detail.js';
import { createProductView } from './src/views/create.js';
import { editProcutView } from './src/views/edit.js';



const header = document.querySelector('#wrapper header');
const main = document.querySelector('#wrapper main');

page(renderItem(header, main));
page(addSession(getSessionStorage));
page(userTemplate(navTemplate));

page('/', homeView);
page('/catalog', createView);
page('/detail/:id', datailView);
page('/edit/:id', editProcutView);
page('/create', createProductView)
page('/register', registerView);
page('/login', loginView);
page('/logout', logoutView);

page.start();
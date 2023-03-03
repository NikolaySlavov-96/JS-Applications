import page from '../node_modules/page/page.mjs';
import { getUserData } from './until.js';
import { addRender } from './middleware/render.js';
import { addSession } from './middleware/addSession.js';
import { addUserNav } from './middleware/userNav.js';
import { navTemplate } from './views/navView.js';
import { loginTemplate } from '../src/views/login.js';
import { registerTemplate } from './views/register.js';
import { createTemplate } from './views/create.js'
import { dashbordTemplate } from './views/dashbord.js';
import { detailTemplate } from './views/datails.js';
import { myFurnitureTemplate } from './views/myFurniture.js';
import { editTemplate } from './views/edit.js';
import { logout } from './views/logout.js';
import { parseQuery } from './middleware/parserQuery.js';

const header = document.querySelector('header');
const container = document.querySelector('.container');

page(addRender(header, container));
page(addSession(getUserData));
page(parseQuery);
page(addUserNav(navTemplate));

page('/index.html', '/');
page('/', dashbordTemplate)
page('/details/:id', detailTemplate);
page('/create', createTemplate);
page('/edit/:id', editTemplate);
page('/my-furniture', myFurnitureTemplate);
page('/login', loginTemplate);
page('/register', registerTemplate);
page('/logout', logout);

page.start();


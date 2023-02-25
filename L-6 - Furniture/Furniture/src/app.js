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

const header = document.querySelector('header');
const container = document.querySelector('.container');

page(addRender(header, container));
page(addSession(getUserData));
page(addUserNav(navTemplate));

page('/index.html', '/');
page('/', dashbordTemplate)
page('/create', createTemplate);
page('/:id', detailTemplate);
// page('/my-furniture',);
page('/login', loginTemplate);
page('/register', registerTemplate);

page.start();
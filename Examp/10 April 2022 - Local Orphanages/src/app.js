import { page } from './lib.js';
import { navView } from './midlleware/navType.js';
import { myRender } from './midlleware/render.js';
import { setUser } from './midlleware/userData.js';
import { getSession } from './utility.js';
import { catalogView } from './views/catalogView.js';
import { createView } from './views/createView.js';
import { detailView } from './views/detailView.js';
import { editView } from './views/editView.js';
import { loginView } from './views/loginView.js';
import { logoutFn } from './views/logout.js';
import { myPostView } from './views/myPostView.js';
import { navigationTemplate } from './views/navigation.js';
import { registerView } from './views/registerView.js';


const nav = document.querySelector('#box header');
const main = document.querySelector('#box #main-content');

page(myRender(nav, main));
page(setUser(getSession));
page(navView(navigationTemplate));
page('/', '/catalog');
page('/catalog', catalogView);
page('/catalog/:id', detailView);
page('/myPost', myPostView);
page('/create', createView);
page('/edit/:id', editView);
page('/logout', logoutFn);
page('/login', loginView);
page('/register', registerView);

page.start()
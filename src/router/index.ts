import { createRouter, createWebHashHistory, Router } from 'vue-router';

const router: Router = createNewRouter()

function createNewRouter(){
   return createRouter({
     history: createWebHashHistory(),
     routes: [
       {
         path: '/',
         name: 'test',
         component: () => import('@/views/test/index.vue')
       }
     ]
   });
}

export default router;

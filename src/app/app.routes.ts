import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadComponent: () => import('./auth/auth.component'),
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        loadComponent: () => import('./auth/login/login.component')
      },
      {
        path: 'recover',
        loadComponent: () => import('./auth/recover/recover.component')
      },
      {
        path: 'password/:id',
        loadComponent: () => import('./auth/password/password.component')
      },
    ]
  },
  {
    path: 'dashboard-principal',
    loadComponent: () => import('./core/dashboard-general/dashboard-general.component'),
    children: [
      {
        path: 'home',
        loadComponent: () => import('./core/dashboard-general/dg-home/dg-home.component')
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'perfil',
        children: [
          {
            path: '',
            loadComponent: () => import('./core/dashboard-general/dg-perfil/dg-perfil-view/dg-perfil-view.component')
          },
          {
            path: 'edit',
            loadComponent: () => import('./core/dashboard-general/dg-perfil/dg-perfil-edit/dg-perfil-edit.component')
          }
        ]
      },
      {
        path: 'empresa',
        children: [
          {
            path: '',
            loadComponent: () => import('./core/dashboard-general/empresa/empresa-view/empresa-view.component')
          },
          {
            path: 'edit',
            loadComponent: () => import('./core/dashboard-general/empresa/empresa-edit/empresa-edit.component')
          }
        ]
      },
      {
        path: 'usuario',
        children: [
          {
            path: 'listado',
            loadComponent: () => import('./core/dashboard-general/dg-usuario/dg-usuario-listado/dg-usuario-listado.component')
          },
          {
            path: 'creacion',
            loadComponent: () => import('./core/dashboard-general/dg-usuario/dg-usuario-creacion/dg-usuario-creacion.component')
          },
          {
            path: 'modificacion/:id',
            loadComponent: () => import('./core/dashboard-general/dg-usuario/dg-usuario-modificacion/dg-usuario-modificacion.component')
          },
          {
            path: '**',
            redirectTo: 'listado',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: 'sede',
        children: [
          {
            path: 'listado',
            loadComponent: () => import('./core/dashboard-general/dg-sede/dg-sede-listado/dg-sede-listado.component')
          },
          {
            path: 'creacion',
            loadComponent: () => import('./core/dashboard-general/dg-sede/dg-sede-creacion/dg-sede-creacion.component')
          },
          {
            path: 'modificacion/:id',
            loadComponent: () => import('./core/dashboard-general/dg-sede/dg-sede-modificacion/dg-sede-modificacion.component')
          },
          {
            path: '**',
            redirectTo: 'listado',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: 'periodo',
        children: [
          {
            path: 'listado',
            loadComponent: () => import('./core/dashboard-general/dg-periodo/dg-periodo-listado/dg-periodo-listado.component')
          },
          {
            path: 'creacion',
            loadComponent: () => import('./core/dashboard-general/dg-periodo/dg-periodo-creacion/dg-periodo-creacion.component')
          },
          {
            path: 'modificacion/:id',
            loadComponent: () => import('./core/dashboard-general/dg-periodo/dg-periodo-modificacion/dg-periodo-modificacion.component')
          },
          {
            path: '**',
            redirectTo: 'listado',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: 'curso',
        children: [
          {
            path: 'listado',
            loadComponent: () => import('./core/dashboard-general/dg-curso/dg-curso-listado/dg-curso-listado.component')
          },
          {
            path: 'creacion',
            loadComponent: () => import('./core/dashboard-general/dg-curso/dg-curso-creacion/dg-curso-creacion.component')
          },
          {
            path: 'modificacion/:id',
            loadComponent: () => import('./core/dashboard-general/dg-curso/dg-curso-modificacion/dg-curso-modificacion.component')
          },
          {
            path: '**',
            redirectTo: 'listado',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: 'docente',
        children: [
          {
            path: 'listado',
            loadComponent: () => import('./core/dashboard-general/dg-docente/dg-docente-listado/dg-docente-listado.component')
          },
          {
            path: 'creacion',
            loadComponent: () => import('./core/dashboard-general/dg-docente/dg-docente-creacion/dg-docente-creacion.component')
          },
          {
            path: 'modificacion/:id',
            loadComponent: () => import('./core/dashboard-general/dg-docente/dg-docente-modificacion/dg-docente-modificacion.component')
          },
          {
            path: '**',
            redirectTo: 'listado',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: 'estudiante',
        children: [
          {
            path: 'listado',
            loadComponent: () => import('./core/dashboard-general/dg-estudiante/dg-estudiante-listado/dg-estudiante-listado.component')
          },
          {
            path: 'creacion',
            loadComponent: () => import('./core/dashboard-general/dg-estudiante/dg-estudiante-creacion/dg-estudiante-creacion.component')
          },
          {
            path: 'modificacion/:id',
            loadComponent: () => import('./core/dashboard-general/dg-estudiante/dg-estudiante-modificacion/dg-estudiante-modificacion.component')
          },
          {
            path: '**',
            redirectTo: 'listado',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: 'clase',
        children: [
          {
            path: 'listado',
            loadComponent: () => import('./core/dashboard-general/dg-clase/dg-clase-listado/dg-clase-listado.component')
          },
          {
            path: 'creacion',
            loadComponent: () => import('./core/dashboard-general/dg-clase/dg-clase-creacion/dg-clase-creacion.component')
          },
          {
            path: 'modificacion/:id',
            loadComponent: () => import('./core/dashboard-general/dg-clase/dg-clase-modificacion/dg-clase-modificacion.component')
          },
          {
            path: '**',
            redirectTo: 'listado',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: 'integrante',
        children: [
          {
            path: 'listado',
            loadComponent: () => import('./core/dashboard-general/dg-integrante/dg-integrante-listado/dg-integrante-listado.component')
          },
          {
            path: 'creacion',
            loadComponent: () => import('./core/dashboard-general/dg-integrante/dg-integrante-creacion/dg-integrante-creacion.component')
          },
          {
            path: 'modificacion/:id',
            loadComponent: () => import('./core/dashboard-general/dg-integrante/dg-integrante-modificacion/dg-integrante-modificacion.component')
          },
          {
            path: '**',
            redirectTo: 'listado',
            pathMatch: 'full'
          }
        ]
      },
    ]
  },
  {
    path: 'dashboard-docente',
    loadComponent: () => import('./core/dashboard-docente/dashboard-docente.component'),
    children: [
      {
        path: 'home',
        loadComponent: () => import('./core/dashboard-general/dg-home/dg-home.component')
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'perfil',
        children: [
          {
            path: '',
            loadComponent: () => import('./core/dashboard-docente/dd-perfil/dd-perfil-view/dd-perfil-view.component')
          },
          {
            path: 'edit',
            loadComponent: () => import('./core/dashboard-docente/dd-perfil/dd-perfil-edit/dd-perfil-edit.component')
          }
        ]
      },
      {
        path: 'estudiante',
        children: [
          {
            path: 'listado',
            loadComponent: () => import('./core/dashboard-docente/dd-estudiante/dd-estudiante-listado/dd-estudiante-listado.component')
          },
          {
            path: 'creacion',
            loadComponent: () => import('./core/dashboard-docente/dd-estudiante/dd-estudiante-creacion/dd-estudiante-creacion.component')
          },
          {
            path: 'modificacion/:id',
            loadComponent: () => import('./core/dashboard-docente/dd-estudiante/dd-estudiante-modificacion/dd-estudiante-modificacion.component')
          },
          {
            path: '**',
            redirectTo: 'listado',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: 'integrante',
        children: [
          {
            path: 'listado',
            loadComponent: () => import('./core/dashboard-docente/dd-integrante/dd-integrante-listado/dd-integrante-listado.component')
          },
          {
            path: 'creacion',
            loadComponent: () => import('./core/dashboard-docente/dd-integrante/dd-integrante-creacion/dd-integrante-creacion.component')
          },
          {
            path: 'modificacion/:id',
            loadComponent: () => import('./core/dashboard-docente/dd-integrante/dd-integrante-modificacion/dd-integrante-modificacion.component')
          },
          {
            path: '**',
            redirectTo: 'listado',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: 'paciente',
        children: [
          {
            path: 'listado',
            loadComponent: () => import('./core/dashboard-docente/dd-paciente/dd-paciente-listado/dd-paciente-listado.component')
          },
          {
            path: 'creacion',
            loadComponent: () => import('./core/dashboard-docente/dd-paciente/dd-paciente-creacion/dd-paciente-creacion.component')
          },
          {
            path: 'modificacion/:id',
            loadComponent: () => import('./core/dashboard-docente/dd-paciente/dd-paciente-modificacion/dd-paciente-modificacion.component')
          },
          {
            path: '**',
            redirectTo: 'listado',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: 'cita',
        children: [
          {
            path: 'listado',
            loadComponent: () => import('./core/dashboard-docente/dd-cita/dd-cita-listado/dd-cita-listado.component')
          },
          {
            path: 'creacion',
            loadComponent: () => import('./core/dashboard-docente/dd-cita/dd-cita-creacion/dd-cita-creacion.component')
          },
          {
            path: 'modificacion/:id',
            loadComponent: () => import('./core/dashboard-docente/dd-cita/dd-cita-modificacion/dd-cita-modificacion.component')
          },
          {
            path: '**',
            redirectTo: 'listado',
            pathMatch: 'full'
          }
        ]
      },
    ]
  },
  {
    path: 'dashboard-estudiante',
    loadComponent: () => import('./core/dashboard-estudiante/dashboard-estudiante.component'),
    children: [
      {
        path: 'home',
        loadComponent: () => import('./core/dashboard-estudiante/de-home/de-home.component')
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'perfil',
        children: [
          {
            path: '',
            loadComponent: () => import('./core/dashboard-estudiante/de-perfil/de-perfil-view/de-perfil-view.component')
          },
          {
            path: 'edit',
            loadComponent: () => import('./core/dashboard-estudiante/de-perfil/de-perfil-edit/de-perfil-edit.component')
          }
        ]
      },
      {
        path: 'paciente',
        children: [
          {
            path: 'listado',
            loadComponent: () => import('./core/dashboard-estudiante/de-paciente/de-paciente-listado/de-paciente-listado.component')
          },
          {
            path: 'creacion',
            loadComponent: () => import('./core/dashboard-estudiante/de-paciente/de-paciente-creacion/de-paciente-creacion.component')
          },
          {
            path: 'modificacion/:id',
            loadComponent: () => import('./core/dashboard-estudiante/de-paciente/de-paciente-modificacion/de-paciente-modificacion.component')
          },
          {
            path: '**',
            redirectTo: 'listado',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: 'cita',
        children: [
          {
            path: 'listado',
            loadComponent: () => import('./core/dashboard-estudiante/de-cita/de-cita-listado/de-cita-listado.component')
          },
          {
            path: 'creacion',
            loadComponent: () => import('./core/dashboard-estudiante/de-cita/de-cita-creacion/de-cita-creacion.component')
          },
          {
            path: 'modificacion/:id',
            loadComponent: () => import('./core/dashboard-estudiante/de-cita/de-cita-modificacion/de-cita-modificacion.component')
          },
          {
            path: '**',
            redirectTo: 'listado',
            pathMatch: 'full'
          }
        ]
      },
    ]
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  }
];

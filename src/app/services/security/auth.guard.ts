import { inject } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { UtilsService } from './utils.service';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router = inject(Router)
  const util = inject(UtilsService)

  const allowedRoles = route.data['allowedRoles'] as Array<string>;


  // Special handling for login page
  if (route.routeConfig && (route.routeConfig.path === 'registration' || route.routeConfig.path === 'login')) {
    const userRole = util.getUserRole();
    if (userRole) {
      // User has a role, redirect to home page
      if(userRole === 'ROLE_ADMIN') {
        router.navigate(['/admin/users']);
        return false;
      } else
      router.navigate(['']);
      return false;
    }
    // User has no role, allow access to login page
    return true;
  }

  // Handling for other pages
  const userRole = util.getUserRole();
  if (allowedRoles && allowedRoles.includes(userRole)) {
    return true;
  } else {
    // Navigate to a default route if the user doesn't have the necessary permissions
    router.navigate(['/login']);
    return false;
  }
};
